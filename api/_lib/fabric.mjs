const RUNPOD_BASE = "https://rest.runpod.io/v1";

export const SKU_FABRIC = {
  "v-s": { computeType: "CPU", vcpuCount: 4, volumeInGb: 40, containerDiskInGb: 20, imageName: "runpod/pytorch:2.4.0-py3.11-cuda12.4.1-devel-ubuntu22.04", price: 0.04 },
  "v-m": { computeType: "CPU", vcpuCount: 16, volumeInGb: 80, containerDiskInGb: 40, imageName: "runpod/pytorch:2.4.0-py3.11-cuda12.4.1-devel-ubuntu22.04", price: 0.18 },
  "c-s": {
    computeType: "GPU",
    gpuCount: 1,
    gpuTypeIds: ["NVIDIA GeForce RTX 4090"],
    volumeInGb: 80,
    containerDiskInGb: 40,
    imageName: "runpod/pytorch:2.4.0-py3.11-cuda12.4.1-devel-ubuntu22.04",
    price: 0.44,
  },
  "c-m": {
    computeType: "GPU",
    gpuCount: 1,
    gpuTypeIds: ["NVIDIA A100 80GB PCIe", "NVIDIA A100-SXM4-80GB"],
    volumeInGb: 200,
    containerDiskInGb: 50,
    imageName: "runpod/pytorch:2.4.0-py3.11-cuda12.4.1-devel-ubuntu22.04",
    price: 1.89,
  },
  "c-l": {
    computeType: "GPU",
    gpuCount: 2,
    gpuTypeIds: ["NVIDIA H100 80GB HBM3", "NVIDIA H100 PCIe"],
    volumeInGb: 400,
    containerDiskInGb: 80,
    imageName: "runpod/pytorch:2.4.0-py3.11-cuda12.4.1-devel-ubuntu22.04",
    price: 6.4,
  },
  "c-x": {
    computeType: "GPU",
    gpuCount: 8,
    gpuTypeIds: ["NVIDIA H100 80GB HBM3"],
    volumeInGb: 1000,
    containerDiskInGb: 100,
    imageName: "runpod/pytorch:2.4.0-py3.11-cuda12.4.1-devel-ubuntu22.04",
    price: 24,
  },
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
    headers: {
      Authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
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
  return {
    method: "ssh",
    host: String(host),
    port: Number(port),
    user: "root",
    command: `ssh -p ${port} root@${host}`,
  };
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
    env: {
      CALABI_POD: calabiId,
      CALABI_SKU: sku,
      ...(sshPublicKey ? { PUBLIC_KEY: sshPublicKey } : {}),
    },
  };
  if (spec.computeType === "GPU") {
    payload.gpuCount = spec.gpuCount;
    payload.gpuTypeIds = spec.gpuTypeIds;
    payload.gpuTypePriority = "availability";
  } else {
    payload.vcpuCount = spec.vcpuCount;
  }

  const created = await runpod("/pods", { method: "POST", body: payload });
  return {
    mode: "live",
    providerRef: created?.id || null,
    status: mapStatus(created?.desiredStatus) || "provisioning",
    connect: connectFromPod(created),
  };
}

export async function inspectOnFabric(providerRef) {
  if (!providerRef || !fabricReady()) return null;
  try {
    const pod = await runpod(`/pods/${encodeURIComponent(providerRef)}`);
    return {
      status: mapStatus(pod?.desiredStatus),
      connect: connectFromPod(pod),
    };
  } catch {
    return null;
  }
}

export async function destroyOnFabric(providerRef) {
  if (!providerRef || !fabricReady()) return { ok: true, skipped: true };
  try {
    await runpod(`/pods/${encodeURIComponent(providerRef)}`, { method: "DELETE" });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export function spareFor(region) {
  const order = ["iad", "sjc", "ams", "sin"];
  const i = order.indexOf(region);
  return order[(i + 1) % order.length];
}

export function publicPod(row) {
  if (!row) return row;
  let connect = null;
  try {
    connect = row.connect_json ? JSON.parse(row.connect_json) : null;
  } catch {
    connect = null;
  }
  return {
    id: row.id,
    sku: row.sku,
    region: row.region,
    spare: row.spare || spareFor(row.region),
    vault: Boolean(row.vault),
    status: row.status || "queued",
    created_at: row.created_at,
    connect,
  };
}
