const mem = {
  desk_pins: [],
  board: [],
  pods: [],
  heartbeats: [
    { region_id: "iad", status: "nominal", lag_ms: 42, updated_at: new Date().toISOString() },
    { region_id: "sjc", status: "nominal", lag_ms: 61, updated_at: new Date().toISOString() },
    { region_id: "ams", status: "nominal", lag_ms: 88, updated_at: new Date().toISOString() },
    { region_id: "sin", status: "nominal", lag_ms: 73, updated_at: new Date().toISOString() },
  ],
};

export async function sb(path, { method = "GET", body } = {}) {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) return { configured: false, rows: null };
  const r = await fetch(`${base}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const rows = await r.json().catch(() => []);
  return { configured: true, ok: r.ok, rows };
}

export async function listTable(name, order = "created_at.desc") {
  const r = await sb(`${name}?select=*&order=${order}`);
  if (r.configured) return Array.isArray(r.rows) ? r.rows : [];
  return mem[name] || [];
}

export async function insertTable(name, row) {
  const r = await sb(name, { method: "POST", body: row });
  if (r.configured) return r.rows;
  mem[name] = [row, ...(mem[name] || [])];
  return [row];
}

export async function deleteById(name, id) {
  await sb(`${name}?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
  mem[name] = (mem[name] || []).filter((x) => x.id !== id);
}
