const RUNPOD_BASE = "https://rest.runpod.io/v1";
const GPU_IMAGE = "runpod/pytorch:2.4.0-py3.11-cuda12.4.1-devel-ubuntu22.04";

export const SKU_FABRIC = {
  "v-s": { computeType: "CPU", vcpuCount: 4, volumeInGb: 40, containerDiskInGb: 20, imageName: GPU_IMAGE, price: 0.04 },
  "v-m": { computeType: "CPU", vcpuCount: 16, volumeInGb: 80, containerDiskInGb: 40, imageName: GPU_IMAGE, price: 0.18 },
  "rtx-2000": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA RTX 2000 Ada Generation"], volumeInGb: 40, containerDiskInGb: 20, imageName: GPU_IMAGE, price: 0.29 },
  "rtx-a4000": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA RTX A4000"], volumeInGb: 40, containerDiskInGb: 20, imageName: GPU_IMAGE, price: 0.3 },
  "rtx-a5000": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA RTX A5000"], volumeInGb: 60, containerDiskInGb: 30, imageName: GPU_IMAGE, price: 0.34 },
  "rtx-3090": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA GeForce RTX 3090"], volumeInGb: 60, containerDiskInGb: 30, imageName: GPU_IMAGE, price: 0.39 },
  "l4": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA L4"], volumeInGb: 60, containerDiskInGb: 30, imageName: GPU_IMAGE, price: 0.59 },
  "rtx-4090": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA GeForce RTX 4090"], volumeInGb: 80, containerDiskInGb: 40, imageName: GPU_IMAGE, price: 0.44 },
  "c-s": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA GeForce RTX 4090"], volumeInGb: 80, containerDiskInGb: 40, imageName: GPU_IMAGE, price: 0.44 },
  "rtx-5090": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA GeForce RTX 5090"], volumeInGb: 80, containerDiskInGb: 40, imageName: GPU_IMAGE, price: 1.19 },
  "a40": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA A40"], volumeInGb: 80, containerDiskInGb: 40, imageName: GPU_IMAGE, price: 0.59 },
  "l40s": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA L40S"], volumeInGb: 100, containerDiskInGb: 40, imageName: GPU_IMAGE, price: 1.29 },
  "rtx-6000": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA RTX 6000 Ada Generation"], volumeInGb: 100, containerDiskInGb: 40, imageName: GPU_IMAGE, price: 0.99 },
  "a100": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA A100 80GB PCIe", "NVIDIA A100-SXM4-80GB"], volumeInGb: 200, containerDiskInGb: 50, imageName: GPU_IMAGE, price: 1.89 },
  "c-m": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA A100 80GB PCIe", "NVIDIA A100-SXM4-80GB"], volumeInGb: 200, containerDiskInGb: 50, imageName: GPU_IMAGE, price: 1.89 },
  "h100-pcie": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA H100 PCIe"], volumeInGb: 200, containerDiskInGb: 50, imageName: GPU_IMAGE, price: 3.39 },
  "h100-sxm": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA H100 80GB HBM3"], volumeInGb: 200, containerDiskInGb: 50, imageName: GPU_IMAGE, price: 3.99 },
  "c-l": { computeType: "GPU", gpuCount: 2, gpuTypeIds: ["NVIDIA H100 80GB HBM3", "NVIDIA H100 PCIe"], volumeInGb: 400, containerDiskInGb: 80, imageName: GPU_IMAGE, price: 6.4 },
  "c-x": { computeType: "GPU", gpuCount: 8, gpuTypeIds: ["NVIDIA H100 80GB HBM3"], volumeInGb: 1000, containerDiskInGb: 100, imageName: GPU_IMAGE, price: 24 },
  "rtx-pro-6000": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA RTX PRO 6000 Blackwell Server Edition"], volumeInGb: 200, containerDiskInGb: 50, imageName: GPU_IMAGE, price: 2.49 },
  "h200": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA H200"], volumeInGb: 300, containerDiskInGb: 60, imageName: GPU_IMAGE, price: 5.29 },
  "b200": { computeType: "GPU", gpuCount: 1, gpuTypeIds: ["NVIDIA B200"], volumeInGb: 400, containerDiskInGb: 80, imageName: GPU_IMAGE, price: 7.79 },
};

export const REGION_COUNTRY = {
  iad: ["US"],
  sjc: ["US"],
  ams: ["NL", "DE", "RO"],
  sin: ["SG", "JP", "KR"],
};

export function skuPrice(id) {
  return SKU_FABRIC[id]?.price || 0;
}

export function fabricReady() {
  return Boolean(process.env.RUNPOD_API_KEY);
}

async function runpod(path, { method = "GET", body } = {}) {
  const key = process.env.RUNPOD_API_KEY;
  if (!key) throw new Error("fabric_unconfigured");
  const r = await fetch(`${RUNPOD_BASE}${path}`, {
    method,
    headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = { raw: text }; }
  if (!r.ok) {
    const err = new Error("fabric_rejected");
    err.status = r.status;
    err.detail = data;
    throw err;
  }
  return data;
}

function mapStatus(desired) {
  const s = String(desired || "").toUpperCase();
  if (s === "RUNNING") return "running";
  if (s === "EXITED" || s === "STOPPED") return "stopped";
  if (s === "TERMINATED") return "terminated";
  return "provisioning";
}

function connectFromPod(pod) {
  if (!pod) return null;
  const ports = pod.portMappings || {};
  const sshPort = ports["22"] || ports[22];
  const host = pod.publicIp || pod.machine?.podHostId;
  if (!host) return null;
  const port = sshPort || 22;
  return { method: "ssh", host: String(host), port: Number(port), user: "root", command: `ssh -p ${port} root@${host}` };
}

export async function provisionOnFabric({ calabiId, sku, region, sshPublicKey }) {
  const spec = SKU_FABRIC[sku];
  if (!spec) throw new Error("unknown_sku");
  if (!fabricReady()) return { mode: "queued", providerRef: null, status: "queued", connect: null };
  const payload = {
    name: `calabi-${calabiId}`,
    imageName: spec.imageName,
    computeType: spec.computeType,
    volumeInGb: spec.volumeInGb,
    containerDiskInGb: spec.containerDiskInGb,
    volumeMountPath: "/workspace",
    cloudType: "SECURE",
    countryCodes: REGION_COUNTRY[region] || ["US"],
    ports: ["8888/http", "22/tcp"],
    env: { CALABI_POD: calabiId, CALABI_SKU: sku, ...(sshPublicKey ? { PUBLIC_KEY: sshPublicKey } : {}) },
  };
  if (spec.computeType === "GPU") {
    payload.gpuCount = spec.gpuCount;
    payload.gpuTypeIds = spec.gpuTypeIds;
    payload.gpuTypePriority = "availability";
  } else payload.vcpuCount = spec.vcpuCount;
  const created = await runpod("/pods", { method: "POST", body: payload });
  return { mode: "live", providerRef: created?.id || null, status: mapStatus(created?.desiredStatus) || "provisioning", connect: connectFromPod(created) };
}

export async function inspectOnFabric(providerRef) {
  if (!providerRef || !fabricReady()) return null;
  try {
    const pod = await runpod(`/pods/${encodeURIComponent(providerRef)}`);
    return { status: mapStatus(pod?.desiredStatus), connect: connectFromPod(pod) };
  } catch { return null; }
}

export async function destroyOnFabric(providerRef) {
  if (!providerRef || !fabricReady()) return { ok: true, skipped: true };
  try {
    await runpod(`/pods/${encodeURIComponent(providerRef)}`, { method: "DELETE" });
    return { ok: true };
  } catch { return { ok: false }; }
}

export function spareFor(region) {
  const order = ["iad", "sjc", "ams", "sin"];
  const i = order.indexOf(region);
  return order[(i + 1) % order.length];
}

export function publicPod(row) {
  if (!row) return row;
  let connect = null;
  try { connect = row.connect_json ? JSON.parse(row.connect_json) : null; } catch { connect = null; }
  return { id: row.id, sku: row.sku, region: row.region, spare: row.spare || spareFor(row.region), vault: Boolean(row.vault), status: row.status || "queued", created_at: row.created_at, connect };
}
