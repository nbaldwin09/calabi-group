import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { OFFERS } from "@/lib/calabi/content";

export const Route = createFileRoute("/")({ component: CalabiHome });

const LIFECYCLE = [
  { title: "Launch a GPU pod in seconds.", body: "Spin up a GPU environment in under a minute. From B200s to RTX 4090s." },
  { title: "Deploy globally with a few clicks.", body: "Workloads land in Calabi regions in the US, EU, and APAC." },
  { title: "Scale on autopilot with endpoints.", body: "From 0 to thousands of workers. Pay while a request is running." },
];

const POINTS = [
  { title: "Autoscale in seconds", body: "Workers appear when traffic arrives." },
  { title: "Fast cold starts", body: "Keep inference on the hot path." },
  { title: "Zero idle cost", body: "Endpoints scale to zero." },
  { title: "Persistent storage", body: "Volumes stay attached across pods." },
];

const FAQ = [
  { q: "What is a pod?", a: "A dedicated GPU or CPU machine you SSH into. Billed per minute." },
  { q: "Who do I buy from?", a: "Calabi Group is the merchant of record. Capacity is fulfilled on a private fabric." },
  { q: "How do I start?", a: "Create an account, add credits, deploy from Compute." },
];

function CalabiHome() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const featured = OFFERS.filter((o) => o.kind === "gpu").slice(0, 5);
  const go = (e: FormEvent) => {
    e.preventDefault();
    nav({ to: "/account" });
  };
  return (
    <main className="bg-[#07060f] text-[#f4f2ff]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,#7c5cff55,transparent_55%)]" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-5 pb-16 pt-16 lg:grid-cols-[1fr_28rem] lg:pt-24">
          <div>
            <h1 className="text-5xl font-medium tracking-tight sm:text-7xl">The AI Developer Cloud</h1>
            <p className="mt-5 max-w-md text-lg text-[#c8c4d8]">Experiment, train, fine-tune, deploy, scale<br />on one platform</p>
            <form onSubmit={go} className="mt-8 flex max-w-md items-center rounded-full bg-white p-1">
              <input className="h-12 min-w-0 flex-1 bg-transparent px-5 text-sm text-[#161226] outline-none placeholder:text-[#7a7690]" placeholder="What’s your work email?" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" className="h-12 shrink-0 rounded-full bg-[#7c5cff] px-5 text-sm font-medium text-white">Get started for free</button>
            </form>
          </div>
          <div className="relative mx-auto h-72 w-72">
            <div className="absolute left-16 top-6 h-40 w-40 rotate-12 rounded-lg bg-[#7c5cff]/40 shadow-[0_30px_80px_#7c5cff66]" />
            <div className="absolute left-0 top-24 h-36 w-36 -rotate-6 rounded-lg bg-[#4b3cff]/50" />
          </div>
        </div>
        <p className="relative pb-10 text-center text-sm text-[#7a7690]">Trusted by teams shipping production inference</p>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-8">
        <div className="grid items-center gap-8 rounded-3xl bg-[#12101c] p-8 shadow-[0_0_0_1px_#ffffff12] lg:grid-cols-2 lg:p-12">
          <div>
            <h2 className="text-4xl font-medium leading-tight">Developers on Calabi,<br />and the cloud we’re building next.</h2>
            <p className="mt-4 text-sm text-[#7a7690]">Updated September 11, 2026</p>
            <Link to="/docs" className="mt-8 inline-flex h-12 items-center rounded-full bg-[#7c5cff] px-6 text-sm">Read what’s next →</Link>
          </div>
          <div className="h-56 rounded-2xl bg-[radial-gradient(circle_at_50%_40%,#7c5cff44,transparent_70%)]" />
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-20">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-[#7a7690]">What’s new</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl bg-[#12101c] p-6 shadow-[0_0_0_1px_#ffffff12]"><p className="text-lg">How to get started with a GPU pod</p><p className="mt-2 text-sm text-[#7a7690]">September 11, 2026</p></article>
          <article className="rounded-2xl bg-[#12101c] p-6 shadow-[0_0_0_1px_#ffffff12]"><p className="text-lg">Deploy an endpoint for inference</p><p className="mt-2 text-sm text-[#7a7690]">September 11, 2026</p></article>
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-10">
        <h2 className="text-4xl font-medium">One platform. Full lifecycle.</h2>
        <p className="mt-3 max-w-xl text-[#b7b3c9]">Go from experiment to production without replatforming. Pods, endpoints, and clusters, all in one account.</p>
        <div className="mt-12 grid gap-10 lg:grid-cols-[22rem_1fr]">
          <div className="space-y-10">
            {LIFECYCLE.map((item) => (
              <div key={item.title} className="border-l border-[#7c5cff] pl-4">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-[#9b97ad]">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="min-h-[22rem] rounded-3xl bg-[#12101c] shadow-[0_0_0_1px_#ffffff12]" />
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-16">
        <h2 className="max-w-2xl text-4xl font-medium">Production inference without the warm-up tax.</h2>
        <p className="mt-4 max-w-2xl text-[#b7b3c9]">Endpoints scale to zero when idle. You are billed while a request is running.</p>
        <Link to="/compute" className="mt-6 inline-flex h-11 items-center text-sm text-[#7c5cff]">Try endpoints</Link>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p) => (
            <article key={p.title} className="rounded-2xl bg-[#12101c] p-5 shadow-[0_0_0_1px_#ffffff12]"><h3>{p.title}</h3><p className="mt-2 text-sm text-[#9b97ad]">{p.body}</p></article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-10">
        <h2 className="text-4xl font-medium">GPU cloud pricing</h2>
        <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {featured.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-5">
              <p className="text-xl">{o.name}</p>
              <div className="flex flex-wrap gap-2 text-xs text-[#b7b3c9]">
                <span className="rounded-full bg-[#161326] px-3 py-1">{o.vram} GB VRAM</span>
                <span className="rounded-full bg-[#161326] px-3 py-1">{o.ram} GB RAM</span>
                <span className="rounded-full bg-[#161326] px-3 py-1">{o.vcpu} vCPU</span>
              </div>
              <p className="font-mono text-sm">${o.price.toFixed(2)}/hr</p>
            </li>
          ))}
        </ul>
        <Link to="/pricing" className="mt-6 inline-flex h-11 items-center text-sm text-[#7c5cff]">Full price list</Link>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-16">
        <h2 className="text-4xl font-medium">Enterprise-grade from day one</h2>
        <p className="mt-3 text-[#b7b3c9]">Built for scale. Secured for trust.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["99.9% target uptime", "Secure by default", "Scale across the catalog"].map((t) => (
            <article key={t} className="rounded-2xl bg-[#12101c] p-6 shadow-[0_0_0_1px_#ffffff12]">{t}</article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[800px] px-5 py-16">
        <h2 className="text-4xl font-medium">Questions? Answers.</h2>
        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {FAQ.map((item) => (
            <details key={item.q} className="py-4">
              <summary className="cursor-pointer text-lg">{item.q}</summary>
              <p className="mt-2 text-sm text-[#9b97ad]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
