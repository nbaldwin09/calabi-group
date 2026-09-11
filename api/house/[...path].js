import { deleteById, insertTable, listTable } from "../../sb.mjs";

function nid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
function official(url) {
  return /youtube\.com|youtu\.be|twitch\.tv|\.m3u8(\?|$)|\.(mp4|webm)(\?|$)/i.test(url);
}

export default async function handler(req, res) {
  const parts = [].concat(req.query.path || []);
  const p = parts.join("/");
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  res.setHeader("content-type", "application/json");
  if (p === "pins" && req.method === "POST") return res.status(200).json(await listTable("desk_pins"));
  if (p === "pins/add" && req.method === "POST") {
    if (!official(String(body.url || ""))) return res.status(200).json({ error: "Official YouTube, Twitch, HLS, or MP4 only." });
    const row = { id: nid("pin"), label: String(body.label || "Pin").slice(0, 80), url: String(body.url).slice(0, 500), created_at: new Date().toISOString() };
    await insertTable("desk_pins", row);
    return res.status(200).json({ id: row.id });
  }
  if (p === "board" && req.method === "POST") return res.status(200).json(await listTable("board"));
  if (p === "board/add" && req.method === "POST") {
    const role = ["grower", "kitchen", "lab"].includes(body.role) ? body.role : "grower";
    const row = { id: nid("note"), role, crop: String(body.crop || "").slice(0, 80), note: String(body.note || "").slice(0, 500), created_at: new Date().toISOString() };
    await insertTable("board", row);
    return res.status(200).json({ id: row.id });
  }
  if (p === "pods" && req.method === "POST") return res.status(200).json(await listTable("pods"));
  if (p === "pods/add" && req.method === "POST") {
    const row = { id: nid("pod"), sku: String(body.sku || "").slice(0, 16), region: String(body.region || "").slice(0, 16), vault: Boolean(body.vault), created_at: new Date().toISOString() };
    await insertTable("pods", row);
    return res.status(200).json({ id: row.id });
  }
  if (p === "pods/del" && req.method === "POST") {
    await deleteById("pods", String(body.id || ""));
    return res.status(200).json({ id: body.id });
  }
  if (p === "heartbeats" && req.method === "POST") return res.status(200).json(await listTable("heartbeats", "region_id.asc"));
  res.status(404).json({ error: "not found" });
}
