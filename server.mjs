import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join } from "node:path";
import { handleHouse } from "./api/_lib/house.mjs";

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

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", "http://localhost");
    if (url.pathname.startsWith("/api/house/")) {
      const path = url.pathname.replace(/^\/api\/house\//, "");
      const body = JSON.parse((await readBody(req)) || "{}");
      const out = await handleHouse({
        method: req.method,
        query: { path: path.split("/").filter(Boolean) },
        body,
        headers: req.headers,
      });
      const status = out?.status || 200;
      if (out && out.status) delete out.status;
      res.writeHead(status, { "content-type": "application/json" });
      res.end(JSON.stringify(out));
      return;
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
