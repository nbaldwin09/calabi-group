import { handleHouse } from "../_lib/house.mjs";

export default async function handler(req, res) {
  req.method = "POST";
  req.query = { path: ["cron", "settle"] };
  req.body = { secret: req.headers["authorization"] || req.headers["x-cron-secret"] || process.env.CRON_SECRET };
  const out = await handleHouse(req);
  res.status(out.status || 200).json({ ok: !out.error });
}
