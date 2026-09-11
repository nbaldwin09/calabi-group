import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join } from "node:path";
import { deleteById, insertTable, listTable } from "./sb.mjs";

const PORT = Number(process.env.PORT) || 8080;
const DIST = join(process.cwd(), "dist");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

async function json(res, data) {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(data));
}

function nid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function official(url) {
  return /youtube\.com|youtu\.be|twitch\.tv|\.m3u8(\?|$)|\.(mp4|webm)(\?|$)/i.test(url);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", "http://localhost");
    
    if (req.method === "POST" && url.pathname === "/api/house/pins") return json(res, await listTable("desk_pins"));
    if (req.method === "POST" && url.pathname === "/api/house/pins/add") {
      const body = JSON.parse((await readBody(req)) || "{}");
      if (!official(String(body.url || ""))) return json(res, { error: "Official YouTube, Twitch, HLS, or MP4 only." });
      const row = { id: nid("pin"), label: String(body.label || "Pin").slice(0, 80), url: String(body.url).slice(0, 500), created_at: new Date().toISOString() };
      await insertTable("desk_pins", row);
      return json(res, { id: row.id });
    }
    if (req.method === "POST" && url.pathname === "/api/house/board") return json(res, await listTable("board"));
    if (req.method === "POST" && url.pathname === "/api/house/board/add") {
      const body = JSON.parse((await readBody(req)) || "{}");
      const role = ["grower", "kitchen", "lab"].includes(body.role) ? body.role : "grower";
      const row = { id: nid("note"), role, crop: String(body.crop || "").slice(0, 80), note: String(body.note || "").slice(0, 500), created_at: new Date().toISOString() };
      await insertTable("board", row);
      return json(res, { id: row.id });
    }
    if (req.method === "POST" && url.pathname === "/api/house/pods") return json(res, await listTable("pods"));
    if (req.method === "POST" && url.pathname === "/api/house/pods/add") {
      const body = JSON.parse((await readBody(req)) || "{}");
      const row = { id: nid("pod"), sku: String(body.sku || "").slice(0, 16), region: String(body.region || "").slice(0, 16), vault: Boolean(body.vault), created_at: new Date().toISOString() };
      await insertTable("pods", row);
      return json(res, { id: row.id });
    }
    if (req.method === "POST" && url.pathname === "/api/house/pods/del") {
      const body = JSON.parse((await readBody(req)) || "{}");
      await deleteById("pods", String(body.id || ""));
      return json(res, { id: body.id });
    }
    if (req.method === "POST" && url.pathname === "/api/house/heartbeats") return json(res, await listTable("heartbeats", "region_id.asc"));
    let path = url.pathname === "/" ? "/index.html" : url.pathname;
    let file = join(DIST, path);
    if (!existsSync(file) || path.split("/").pop()?.includes(".") === false) {
      file = join(DIST, "index.html");
    }
    const buf = await readFile(file);
    res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
    res.end(buf);
  } catch (err) {
    res.writeHead(500, { "content-type": "text/plain" });
    res.end(err instanceof Error ? err.message : "error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("listening on", PORT);
});
