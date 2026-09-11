export const REGIONS = [
  { id: "iad", city: "Ashburn", code: "us-east-1", role: "Primary" },
  { id: "sjc", city: "San Jose", code: "us-west-1", role: "Hot spare" },
  { id: "ams", city: "Amsterdam", code: "eu-west-1", role: "Quorum" },
  { id: "sin", city: "Singapore", code: "ap-southeast-1", role: "Quorum" },
];

export const CREDIT_PACKS = [
  { id: "p25", dollars: 25, cents: 2500 },
  { id: "p100", dollars: 100, cents: 10000 },
  { id: "p500", dollars: 500, cents: 50000 },
];

export type Offer = {
  id: string;
  name: string;
  gpu: string;
  gpuTypeId: string;
  vram: number;
  ram: number;
  vcpu: number;
  maxGpus: number;
  price: number;
  demand: "low" | "medium" | "high";
  available: boolean;
  kind: "gpu" | "cpu";
  band: "24" | "32" | "48" | "80" | "96" | "140" | "cpu";
};

export const OFFERS: Offer[] = [
  { id: "rtx-2000", name: "RTX 2000 Ada", gpu: "1× RTX 2000 Ada", gpuTypeId: "NVIDIA RTX 2000 Ada Generation", vram: 16, ram: 31, vcpu: 6, maxGpus: 8, price: 0.29, demand: "low", available: true, kind: "gpu", band: "24" },
  { id: "rtx-a4000", name: "RTX A4000", gpu: "1× RTX A4000", gpuTypeId: "NVIDIA RTX A4000", vram: 16, ram: 62, vcpu: 8, maxGpus: 8, price: 0.3, demand: "low", available: true, kind: "gpu", band: "24" },
  { id: "rtx-a5000", name: "RTX A5000", gpu: "1× RTX A5000", gpuTypeId: "NVIDIA RTX A5000", vram: 24, ram: 50, vcpu: 9, maxGpus: 8, price: 0.34, demand: "low", available: true, kind: "gpu", band: "24" },
  { id: "rtx-3090", name: "RTX 3090", gpu: "1× RTX 3090", gpuTypeId: "NVIDIA GeForce RTX 3090", vram: 24, ram: 48, vcpu: 8, maxGpus: 8, price: 0.39, demand: "medium", available: true, kind: "gpu", band: "24" },
  { id: "l4", name: "L4", gpu: "1× L4", gpuTypeId: "NVIDIA L4", vram: 24, ram: 23, vcpu: 4, maxGpus: 8, price: 0.59, demand: "low", available: true, kind: "gpu", band: "24" },
  { id: "rtx-4090", name: "RTX 4090", gpu: "1× RTX 4090", gpuTypeId: "NVIDIA GeForce RTX 4090", vram: 24, ram: 32, vcpu: 8, maxGpus: 8, price: 0.44, demand: "high", available: true, kind: "gpu", band: "24" },
  { id: "rtx-5090", name: "RTX 5090", gpu: "1× RTX 5090", gpuTypeId: "NVIDIA GeForce RTX 5090", vram: 32, ram: 60, vcpu: 16, maxGpus: 8, price: 1.19, demand: "medium", available: true, kind: "gpu", band: "32" },
  { id: "a40", name: "A40", gpu: "1× A40", gpuTypeId: "NVIDIA A40", vram: 48, ram: 50, vcpu: 9, maxGpus: 8, price: 0.59, demand: "low", available: true, kind: "gpu", band: "48" },
  { id: "l40s", name: "L40S", gpu: "1× L40S", gpuTypeId: "NVIDIA L40S", vram: 48, ram: 94, vcpu: 16, maxGpus: 8, price: 1.29, demand: "low", available: true, kind: "gpu", band: "48" },
  { id: "rtx-6000", name: "RTX 6000 Ada", gpu: "1× RTX 6000 Ada", gpuTypeId: "NVIDIA RTX 6000 Ada Generation", vram: 48, ram: 62, vcpu: 16, maxGpus: 8, price: 0.99, demand: "low", available: true, kind: "gpu", band: "48" },
  { id: "a100", name: "A100 80GB", gpu: "1× A100 80GB", gpuTypeId: "NVIDIA A100 80GB PCIe", vram: 80, ram: 117, vcpu: 8, maxGpus: 8, price: 1.89, demand: "medium", available: true, kind: "gpu", band: "80" },
  { id: "h100-pcie", name: "H100 PCIe", gpu: "1× H100 PCIe", gpuTypeId: "NVIDIA H100 PCIe", vram: 80, ram: 188, vcpu: 16, maxGpus: 8, price: 3.39, demand: "medium", available: true, kind: "gpu", band: "80" },
  { id: "h100-sxm", name: "H100 SXM", gpu: "1× H100 SXM", gpuTypeId: "NVIDIA H100 80GB HBM3", vram: 80, ram: 125, vcpu: 20, maxGpus: 8, price: 3.99, demand: "high", available: true, kind: "gpu", band: "80" },
  { id: "rtx-pro-6000", name: "RTX PRO 6000", gpu: "1× RTX PRO 6000", gpuTypeId: "NVIDIA RTX PRO 6000 Blackwell Server Edition", vram: 96, ram: 188, vcpu: 16, maxGpus: 8, price: 2.49, demand: "low", available: true, kind: "gpu", band: "96" },
  { id: "h200", name: "H200", gpu: "1× H200", gpuTypeId: "NVIDIA H200", vram: 141, ram: 276, vcpu: 24, maxGpus: 8, price: 5.29, demand: "medium", available: true, kind: "gpu", band: "140" },
  { id: "b200", name: "B200", gpu: "1× B200", gpuTypeId: "NVIDIA B200", vram: 180, ram: 283, vcpu: 28, maxGpus: 8, price: 7.79, demand: "high", available: true, kind: "gpu", band: "140" },
  { id: "v-s", name: "CPU Node", gpu: "—", gpuTypeId: "", vram: 0, ram: 8, vcpu: 4, maxGpus: 0, price: 0.04, demand: "low", available: true, kind: "cpu", band: "cpu" },
  { id: "v-m", name: "CPU Forge", gpu: "—", gpuTypeId: "", vram: 0, ram: 64, vcpu: 16, maxGpus: 0, price: 0.18, demand: "low", available: true, kind: "cpu", band: "cpu" },
];

export const SKUS = OFFERS.map((o) => ({
  id: o.id,
  name: o.name,
  gpu: o.gpu,
  vram: o.vram ? `${o.vram} GB` : "—",
  cpu: `${o.vcpu} vCPU`,
  ram: `${o.ram} GB`,
  price: o.price,
  kind: o.kind,
}));

export const STORAGE = [
  { id: "block", name: "Block", copy: "NVMe, attached, snapshot every 15 minutes to a second region.", price: 0.12, unit: "/ GB-mo" },
  { id: "object", name: "Object", copy: "S3-compatible. Versioned. Immutable vault option.", price: 0.008, unit: "/ GB-mo" },
  { id: "vault", name: "Vault", copy: "WORM object lock. 3-2-1: three copies, two media, one offline.", price: 0.014, unit: "/ GB-mo" },
];

export const PRODUCTS = [
  { id: "pods", title: "Pods", body: "Dedicated GPU or CPU. SSH in. Stop and resume. Billed per minute." },
  { id: "endpoints", title: "Endpoints", body: "Autoscale workers. Pay while a request is running." },
  { id: "clusters", title: "Clusters", body: "Multi-node H100 / H200 / B200. Sales desk for reserved." },
  { id: "storage", title: "Storage", body: "Volume, object, and vault. No egress fee on the list price." },
];

export const SLA = [
  { name: "24 GB class", rpo: "15 min", rto: "8 min", spare: "us-west-1" },
  { name: "80 GB class", rpo: "10 min", rto: "6 min", spare: "declared at launch" },
  { name: "140 GB class", rpo: "5 min", rto: "4 min", spare: "always hot" },
];
