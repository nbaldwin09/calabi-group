import { api } from "@/lib/session";

export const listPods = () => api("/api/house/pods");
export const launchPod = ({ data }: { data: { sku: string; region: string; vault: boolean } }) =>
  api("/api/house/pods/add", data);
export const terminatePod = ({ data }: { data: { id: string } }) => api("/api/house/pods/del", data);
export const listHeartbeats = () => api("/api/house/heartbeats");
export const register = (email: string, password: string) => api("/api/house/auth/register", { email, password });
export const login = (email: string, password: string) => api("/api/house/auth/login", { email, password });
export const me = () => api("/api/house/auth/me");
export const saveSsh = (ssh_public_key: string) => api("/api/house/auth/ssh", { ssh_public_key });
export const createKey = () => api("/api/house/auth/key");
export const listKeys = () => api("/api/house/auth/keys");
