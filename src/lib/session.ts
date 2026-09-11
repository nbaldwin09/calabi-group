const TOKEN = "calabi_token";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN) || "";
  } catch {
    return "";
  }
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN);
}

export async function api(path: string, data?: unknown) {
  const headers: Record<string, string> = { "content-type": "application/json" };
  const token = getToken();
  if (token) headers.authorization = `Bearer ${token}`;
  const r = await fetch(path, { method: "POST", headers, body: JSON.stringify(data ?? {}) });
  return r.json();
}
