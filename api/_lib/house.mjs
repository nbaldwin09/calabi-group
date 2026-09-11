import { deleteById, findWhere, insertTable, listTable, updateById } from "../../sb.mjs";
import {
  accountFromAuth,
  issueKey,
  listKeys,
  loginAccount,
  nid,
  publicAccount,
  registerAccount,
} from "./auth.mjs";
import { destroyOnFabric, fabricReady, inspectOnFabric, provisionOnFabric, publicPod, skuPrice, spareFor } from "./fabric.mjs";

function header(req) {
  return req.headers?.authorization || req.headers?.Authorization || "";
}

async function requireAccount(req) {
  const account = await accountFromAuth(header(req));
  if (!account) return { error: "Sign in first.", status: 401 };
  return { account };
}

async function debit(account, cents, reason) {
  const next = Number(account.credits_cents || 0) - cents;
  if (next < 0) return { error: "Add credits before this launch." };
  await updateById("accounts", account.id, { credits_cents: next });
  account.credits_cents = next;
  return { ok: true, credits_cents: next, reason };
}

export async function settleAccountPods(account) {
  const rows = (await findWhere("pods", "account_id", account.id)).filter((p) => p.status === "running");
  let credits = Number(account.credits_cents || 0);
  const now = Date.now();
  for (const pod of rows) {
    const price = skuPrice(pod.sku);
    const last = Date.parse(pod.last_billed_at || pod.created_at || new Date().toISOString());
    const minutes = Math.max(0, Math.floor((now - last) / 60000));
    if (!minutes || !price) continue;
    const cents = Math.ceil(price * 100 * (minutes / 60));
    credits -= cents;
    await updateById("pods", pod.id, { last_billed_at: new Date().toISOString() });
  }
  if (credits < 0) {
    for (const pod of rows) {
      if (pod.provider_ref) await destroyOnFabric(pod.provider_ref);
      await updateById("pods", pod.id, { status: "stopped" });
    }
    credits = 0;
  }
  if (credits !== Number(account.credits_cents || 0)) {
    await updateById("accounts", account.id, { credits_cents: credits });
    account.credits_cents = credits;
  }
  return account;
}

async function syncPods(account) {
  const rows = await findWhere("pods", "account_id", account.id);
  const out = [];
  for (const pod of rows) {
    if (!pod.provider_ref) {
      out.push(publicPod(pod));
      continue;
    }
    const live = await inspectOnFabric(pod.provider_ref);
    if (live) {
      const patch = { status: live.status };
      if (live.connect) patch.connect_json = JSON.stringify(live.connect);
      await updateById("pods", pod.id, patch);
      out.push(publicPod({ ...pod, ...patch }));
    } else {
      out.push(publicPod(pod));
    }
  }
  return out;
}

export async function handleHouse(req) {
  const parts = [].concat(req.query?.path || []);
  const path = parts.join("/");
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const method = req.method || "GET";

  if (path === "auth/register" && method === "POST") return registerAccount(body.email, body.password);
  if (path === "auth/login" && method === "POST") return loginAccount(body.email, body.password);

  if (path === "auth/me" && method === "POST") {
    const gate = await requireAccount(req);
    if (gate.error) return gate;
    await settleAccountPods(gate.account);
    const fresh = (await findWhere("accounts", "id", gate.account.id))[0] || gate.account;
    return { account: publicAccount(fresh), fabric: fabricReady() };
  }

  if (path === "auth/key" && method === "POST") {
    const gate = await requireAccount(req);
    if (gate.error) return gate;
    return issueKey(gate.account);
  }
  if (path === "auth/keys" && method === "POST") {
    const gate = await requireAccount(req);
    if (gate.error) return gate;
    return listKeys(gate.account);
  }
  if (path === "auth/ssh" && method === "POST") {
    const gate = await requireAccount(req);
    if (gate.error) return gate;
    const key = String(body.ssh_public_key || "").slice(0, 800);
    await updateById("accounts", gate.account.id, { ssh_public_key: key });
    return { ok: true };
  }

  if (path === "heartbeats" && method === "POST") return listTable("heartbeats", "region_id.asc");

  if (path === "pods" && method === "POST") {
    const gate = await requireAccount(req);
    if (gate.error) return gate;
    await settleAccountPods(gate.account);
    return syncPods(gate.account);
  }

  if (path === "pods/add" && method === "POST") {
    const gate = await requireAccount(req);
    if (gate.error) return gate;
    const account = await settleAccountPods(gate.account);
    const sku = String(body.sku || "").slice(0, 16);
    const region = String(body.region || "").slice(0, 16);
    const price = skuPrice(sku);
    if (!price) return { error: "Unknown SKU." };
    const reserve = Math.ceil(price * 100 * 0.25);
    const paid = await debit(account, reserve, "launch reserve");
    if (paid.error) return paid;

    const id = nid("pod");
    let status = fabricReady() ? "provisioning" : "queued";
    let providerRef = null;
    let connect = null;
    try {
      const out = await provisionOnFabric({
        calabiId: id,
        sku,
        region,
        sshPublicKey: account.ssh_public_key,
      });
      status = out.status || (out.mode === "live" ? "running" : "queued");
      providerRef = out.providerRef;
      connect = out.connect;
    } catch {
      await updateById("accounts", account.id, { credits_cents: Number(account.credits_cents || 0) + reserve });
      return { error: "Capacity is tight in that region. Try another region or SKU." };
    }

    const row = {
      id,
      account_id: account.id,
      sku,
      region,
      spare: spareFor(region),
      vault: Boolean(body.vault),
      status,
      provider_ref: providerRef,
      connect_json: connect ? JSON.stringify(connect) : null,
      last_billed_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };
    await insertTable("pods", row);
    return publicPod(row);
  }

  if (path === "pods/del" && method === "POST") {
    const gate = await requireAccount(req);
    if (gate.error) return gate;
    const id = String(body.id || "");
    const rows = await findWhere("pods", "id", id);
    const found = rows[0];
    if (!found || found.account_id !== gate.account.id) return { error: "Pod not found." };
    if (found.provider_ref) await destroyOnFabric(found.provider_ref);
    await deleteById("pods", id);
    return { id };
  }

  if (path === "cron/settle" && (method === "POST" || method === "GET")) {
    if (!process.env.CRON_SECRET || body.secret === process.env.CRON_SECRET) {
      const accounts = await listTable("accounts");
      for (const a of accounts) await settleAccountPods(a);
      return { ok: true };
    }
    return { error: "forbidden", status: 403 };
  }

  return { error: "not found", status: 404 };
}
