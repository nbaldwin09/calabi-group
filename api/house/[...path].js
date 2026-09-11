import { deleteById, insertTable, listTable } from "../../sb.mjs";
import { destroyOnFabric, fabricReady, provisionOnFabric, publicPod, spareFor } from "../_lib/fabric.mjs";

function nid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export default async function handler(req, res) {
  const parts = [].concat(req.query.path || []);
  const p = parts.join("/");
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  res.setHeader("content-type", "application/json");

  if (p === "pods" && req.method === "POST") {
    const rows = await listTable("pods");
    return res.status(200).json((rows || []).map(publicPod));
  }
  if (p === "pods/add" && req.method === "POST") {
    const sku = String(body.sku || "").slice(0, 16);
    const region = String(body.region || "").slice(0, 16);
    const id = nid("pod");
    const spare = spareFor(region);
    let status = fabricReady() ? "provisioning" : "queued";
    let providerRef = null;
    try {
      const out = await provisionOnFabric({ calabiId: id, sku, region });
      status = out.mode === "live" ? "running" : "queued";
      providerRef = out.providerRef;
    } catch (e) {
      return res.status(200).json({
        error:
          e.message === "unknown_sku"
            ? "Unknown SKU."
            : "Capacity is tight in that region. Try another region or SKU.",
      });
    }
    const row = {
      id,
      sku,
      region,
      spare,
      vault: Boolean(body.vault),
      status,
      provider_ref: providerRef,
      created_at: new Date().toISOString(),
    };
    await insertTable("pods", row);
    return res.status(200).json(publicPod(row));
  }
  if (p === "pods/del" && req.method === "POST") {
    const id = String(body.id || "");
    const rows = await listTable("pods");
    const found = (rows || []).find((r) => r.id === id);
    if (found?.provider_ref) await destroyOnFabric(found.provider_ref);
    await deleteById("pods", id);
    return res.status(200).json({ id });
  }
  if (p === "heartbeats" && req.method === "POST") {
    return res.status(200).json(await listTable("heartbeats", "region_id.asc"));
  }
  res.status(404).json({ error: "not found" });
}
