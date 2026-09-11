async function post(path: string, data?: unknown) {
  const r = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data ?? {}),
  });
  return r.json();
}
export const listPins = () => post("/api/house/pins");
export const addPin = ({ data }: { data: { label: string; url: string } }) => post("/api/house/pins/add", data);
export const listBoard = () => post("/api/house/board");
export const addBoard = ({ data }: { data: { role: string; crop: string; note: string } }) => post("/api/house/board/add", data);
export const listPods = () => post("/api/house/pods");
export const launchPod = ({ data }: { data: { sku: string; region: string; vault: boolean } }) => post("/api/house/pods/add", data);
export const terminatePod = ({ data }: { data: { id: string } }) => post("/api/house/pods/del", data);
export const listHeartbeats = () => post("/api/house/heartbeats");
