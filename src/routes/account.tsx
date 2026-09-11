import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createKey, listKeys, login, me, register, saveSsh } from "@/lib/houses/api";
import { clearToken, getToken, setToken } from "@/lib/session";

export const Route = createFileRoute("/account")({ component: AccountPage });

function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ssh, setSsh] = useState("");
  const [msg, setMsg] = useState("");
  const [account, setAccount] = useState<any>(null);
  const [keys, setKeys] = useState<any[]>([]);
  const [freshKey, setFreshKey] = useState("");

  const refresh = async () => {
    if (!getToken()) {
      setAccount(null);
      return;
    }
    const res = await me();
    if (res?.account) {
      setAccount(res.account);
      setSsh(res.account.ssh_public_key || "");
      const listed = await listKeys();
      setKeys(Array.isArray(listed) ? listed : []);
    } else {
      clearToken();
      setAccount(null);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const onAuth = async (mode: "login" | "register") => {
    setMsg("");
    const res = mode === "login" ? await login(email, password) : await register(email, password);
    if (res.error) {
      setMsg(String(res.error));
      return;
    }
    setToken(res.token);
    setAccount(res.account);
    await refresh();
  };

  if (!account) {
    return (
      <main className="mx-auto max-w-md px-5 py-16">
        <h1 className="font-display text-5xl">Account</h1>
        <p className="mt-3 text-sm text-muted">Sign in to launch pods. New accounts receive a trial balance.</p>
        <form
          className="mt-8 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            void onAuth("login");
          }}
        >
          <input
            className="h-11 w-full rounded-md bg-surface px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            className="h-11 w-full rounded-md bg-surface px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {msg ? <p className="text-sm text-warn">{msg}</p> : null}
          <div className="flex gap-3">
            <Button type="submit">Sign in</Button>
            <Button type="button" variant="line" onClick={() => void onAuth("register")}>
              Create account
            </Button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-5xl">Account</h1>
      <p className="mt-3 text-muted">{account.email}</p>
      <p className="mt-2 font-mono text-sm">${(Number(account.credits_cents || 0) / 100).toFixed(2)} on account</p>
      <p className="mt-2 text-sm text-muted">Minutes are settled automatically. When the balance hits zero, running pods stop.</p>
      <label className="mt-10 block text-sm text-muted">
        SSH public key
        <textarea
          className="mt-2 h-28 w-full rounded-md bg-surface p-3 font-mono text-xs shadow-[0_0_0_1px_var(--color-line)]"
          value={ssh}
          onChange={(e) => setSsh(e.target.value)}
        />
      </label>
      <div className="mt-3 flex flex-wrap gap-3">
        <Button type="button" onClick={() => void saveSsh(ssh)}>Save key</Button>
        <Button
          type="button"
          variant="line"
          onClick={async () => {
            const k = await createKey();
            if (k?.token) setFreshKey(k.token);
            const listed = await listKeys();
            setKeys(Array.isArray(listed) ? listed : []);
          }}
        >
          New API key
        </Button>
        <Link to="/console" className="inline-flex h-11 items-center text-sm text-accent">Console</Link>
        <button type="button" className="text-sm text-muted" onClick={() => { clearToken(); setAccount(null); }}>Sign out</button>
      </div>
      {freshKey ? <p className="mt-4 break-all font-mono text-xs">Copy now — {freshKey}</p> : null}
      <ul className="mt-8 divide-y divide-line border-y border-line text-sm">
        {keys.map((k) => (
          <li key={k.id} className="flex justify-between py-3">
            <span className="font-mono text-xs">{k.token}</span>
            <span className="text-faint">{k.created_at?.slice(0, 10)}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
