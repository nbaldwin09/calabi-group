export const REGIONS = [
  { id: "iad", city: "Ashburn", code: "us-east-1", role: "Primary", provider: "RunPod + CoreWeave" },
  { id: "sjc", city: "San Jose", code: "us-west-1", role: "Hot spare", provider: "Lambda + RunPod" },
  { id: "ams", city: "Amsterdam", code: "eu-west-1", role: "Quorum", provider: "Hetzner + Vast" },
  { id: "sin", city: "Singapore", code: "ap-southeast-1", role: "Quorum", provider: "Together + Fly" },
];

export const PROVIDERS = [
  { id: "runpod", name: "RunPod", kind: "GPU marketplace", use: "Burst GPU hours, community + secure cloud" },
  { id: "vast", name: "Vast.ai", kind: "Distributed GPU", use: "Price-seeking training jobs with snapshot hooks" },
  { id: "lambda", name: "Lambda", kind: "GPU cloud", use: "Reserved A100 / H100 when the hall is quiet" },
  { id: "coreweave", name: "CoreWeave", kind: "HPC cloud", use: "Lattice-class pods and InfiniBand fabrics" },
  { id: "together", name: "Together", kind: "Inference", use: "Managed endpoints when you do not want a VM" },
  { id: "fly", name: "Fly.io", kind: "Edge VM", use: "Anycast CPU close to the user" },
  { id: "hetzner", name: "Hetzner", kind: "Storage / CPU", use: "Cheap quorum disks and CPU nodes" },
  { id: "backblaze", name: "Backblaze B2", kind: "Object cold", use: "Vault copies, object lock, second media" },
];

export const SKUS = [
  { id: "v-s", name: "Calabi Node", gpu: "—", vram: "—", cpu: "4 vCPU", ram: "8 GB", price: 0.04, kind: "cpu" as const },
  { id: "v-m", name: "Calabi Forge", gpu: "—", vram: "—", cpu: "16 vCPU", ram: "64 GB", price: 0.18, kind: "cpu" as const },
  { id: "c-s", name: "Calabi Spark", gpu: "1× RTX 4090", vram: "24 GB", cpu: "8 vCPU", ram: "32 GB", price: 0.44, kind: "gpu" as const },
  { id: "c-m", name: "Calabi Loom", gpu: "1× A100 80GB", vram: "80 GB", cpu: "16 vCPU", ram: "96 GB", price: 1.89, kind: "gpu" as const },
  { id: "c-l", name: "Calabi Vault", gpu: "2× H100 80GB", vram: "160 GB", cpu: "32 vCPU", ram: "192 GB", price: 6.4, kind: "gpu" as const },
  { id: "c-x", name: "Calabi Lattice", gpu: "8× H100 80GB", vram: "640 GB", cpu: "96 vCPU", ram: "720 GB", price: 24.0, kind: "gpu" as const },
];

export const STORAGE = [
  { id: "block", name: "Block", copy: "NVMe, attached, snapshot every 15 minutes to a second region.", price: 0.12, unit: "/ GB-mo" },
  { id: "object", name: "Object", copy: "S3-compatible. Versioned. Immutable vault option.", price: 0.008, unit: "/ GB-mo" },
  { id: "vault", name: "Vault", copy: "WORM object lock. 3-2-1: three copies, two media, one offline.", price: 0.014, unit: "/ GB-mo" },
];

export const SLA = [
  { name: "Spark / Node", rpo: "15 min", rto: "8 min", spare: "us-west-1" },
  { name: "Loom / Forge", rpo: "10 min", rto: "6 min", spare: "declared at launch" },
  { name: "Vault / Lattice", rpo: "5 min", rto: "4 min", spare: "always hot" },
];
