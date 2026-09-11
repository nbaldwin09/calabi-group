import { handleHouse } from "../_lib/house.mjs";

export default async function handler(req, res) {
  res.setHeader("content-type", "application/json");
  try {
    const out = await handleHouse(req);
    const status = out?.status || 200;
    if (out && out.status) delete out.status;
    return res.status(status).json(out);
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : "error" });
  }
}
