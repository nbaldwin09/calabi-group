import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join } from "node:path";
import { deleteById, insertTable, listTable } from "./sb.mjs";
import { destroyOnFabric, fabricReady, provisionOnFabric, publicPod, spareFor } from "./api/_lib/fabric.mjs";

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

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", "http://localhost");

    if (req.method === "POST" && url.pathname === "/api/house/pods") {
      const rows = await listTable("pods");
      return json(res, (rows || []).map(publicPod));
    }
    if (req.method === "POST" && url.pathname === "/api/house/pods/add") {
      const body = JSON.parse((await readBody(req)) || "{}");
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
      } catch {
        return json(res, { error: "Capacity is tight in that region. Try another region or SKU." });
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
      return json(res, publicPod(row));
    }
    if (req.method === "POST" && url.pathname === "/api/house/pods/del") {
      const body = JSON.parse((await readBody(req)) || "{}");
      const id = String(body.id || "");
      const rows = await listTable("pods");
      const found = (rows || []).find((r) => r.id === id);
      if (found?.provider_ref) await destroyOnFabric(found.provider_ref);
      await deleteById("pods", id);
      return json(res, { id });
    }
    if (req.method === "POST" && url.pathname === "/api/house/heartbeats") {
      return json(res, await listTable("heartbeats", "region_id.asc"));
    }

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
