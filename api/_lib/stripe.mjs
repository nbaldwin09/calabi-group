export const PACKS = {
  p25: 2500,
  p100: 10000,
  p500: 50000,
};

export function stripeReady() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

async function stripe(path, body) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("stripe_unconfigured");
  const r = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  });
  return r.json();
}

export async function createCreditCheckout({ accountId, pack, origin }) {
  const cents = PACKS[pack];
  if (!cents) throw new Error("unknown_pack");
  if (!stripeReady()) return { error: "Card checkout is not live yet. Wire credits or wait for Stripe." };
  const success = `${origin}/account?session_id={CHECKOUT_SESSION_ID}`;
  const cancel = `${origin}/account`;
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("success_url", success);
  params.set("cancel_url", cancel);
  params.set("client_reference_id", accountId);
  params.set("metadata[account_id]", accountId);
  params.set("metadata[pack]", pack);
  params.set("line_items[0][quantity]", "1");
  params.set("line_items[0][price_data][currency]", "usd");
  params.set("line_items[0][price_data][unit_amount]", String(cents));
  params.set("line_items[0][price_data][product_data][name]", `Calabi credits $${cents / 100}`);
  const session = await stripe("checkout/sessions", params);
  if (session.error) return { error: session.error.message || "Stripe rejected the session." };
  return { url: session.url, id: session.id };
}

export async function confirmCheckout(sessionId, accountId) {
  if (!stripeReady()) return { error: "stripe_unconfigured" };
  const session = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
  }).then((r) => r.json());
  if (session.payment_status !== "paid") return { error: "Payment is not complete." };
  if (session.client_reference_id && session.client_reference_id !== accountId) {
    return { error: "Session does not match this account." };
  }
  const cents = Number(session.amount_total || 0);
  return { cents, session: session.id };
}
