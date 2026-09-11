import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { findWhere, insertTable } from "../../sb.mjs";

export function nid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${randomBytes(4).toString("hex")}`;
}

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

export function checkPassword(password, stored) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 32);
  const prev = Buffer.from(hash, "hex");
  if (next.length !== prev.length) return false;
  return timingSafeEqual(next, prev);
}

export function publicAccount(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    credits_cents: Number(row.credits_cents || 0),
    ssh_public_key: row.ssh_public_key || "",
  };
}

export async function accountFromAuth(header) {
  const raw = String(header || "");
  const token = raw.toLowerCase().startsWith("bearer ") ? raw.slice(7).trim() : raw.trim();
  if (!token) return null;
  if (token.startsWith("ck_")) {
    const keys = await findWhere("api_keys", "token", token);
    const key = keys[0];
    if (!key) return null;
    const accounts = await findWhere("accounts", "id", key.account_id);
    return accounts[0] || null;
  }
  const sessions = await findWhere("sessions", "token", token);
  const session = sessions[0];
  if (!session) return null;
  const accounts = await findWhere("accounts", "id", session.account_id);
  return accounts[0] || null;
}

export async function registerAccount(email, password) {
  const clean = String(email || "").trim().toLowerCase();
  if (!/[^\s@]+@[^\s@]+\.[^\s@]+/.test(clean)) return { error: "Enter a real email." };
  if (String(password || "").length < 8) return { error: "Password must be at least 8 characters." };
  const existing = await findWhere("accounts", "email", clean);
  if (existing.length) return { error: "That email already has an account." };
  const trial = Number(process.env.CALABI_TRIAL_CENTS || 500);
  const row = {
    id: nid("acct"),
    email: clean,
    password_hash: hashPassword(password),
    credits_cents: trial,
    ssh_public_key: "",
    created_at: new Date().toISOString(),
  };
  await insertTable("accounts", row);
  const session = { id: nid("sess"), token: nid("tok"), account_id: row.id, created_at: new Date().toISOString() };
  await insertTable("sessions", session);
  return { token: session.token, account: publicAccount(row) };
}

export async function loginAccount(email, password) {
  const clean = String(email || "").trim().toLowerCase();
  const found = await findWhere("accounts", "email", clean);
  const row = found[0];
  if (!row || !checkPassword(password, row.password_hash)) return { error: "Email or password is wrong." };
  const session = { id: nid("sess"), token: nid("tok"), account_id: row.id, created_at: new Date().toISOString() };
  await insertTable("sessions", session);
  return { token: session.token, account: publicAccount(row) };
}

export async function issueKey(account) {
  const token = `ck_${randomBytes(18).toString("hex")}`;
  const row = {
    id: nid("key"),
    account_id: account.id,
    token,
    created_at: new Date().toISOString(),
  };
  await insertTable("api_keys", row);
  return { id: row.id, token, created_at: row.created_at };
}

export async function listKeys(account) {
  const rows = await findWhere("api_keys", "account_id", account.id);
  return rows.map((k) => ({
    id: k.id,
    token: `${String(k.token).slice(0, 7)}…`,
    created_at: k.created_at,
  }));
}
