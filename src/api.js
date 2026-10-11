const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fileUrl = (path) => `${API}${path}`;

async function readError(res, fallback) {
  const body = await res.json().catch(() => ({}));
  return body.error || fallback;
}

export async function registerStudent(data) {
  const res = await fetch(`${API}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await readError(res, "Could not register. Try again."));
  return res.json();
}

export async function getResources(params) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v !== "" && v != null && q.set(k, v));
  const res = await fetch(`${API}/api/resources?${q}`);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export async function uploadResource(formData, adminKey) {
  const res = await fetch(`${API}/api/resources`, {
    method: "POST",
    headers: { "x-admin-key": adminKey },
    body: formData,
  });
  if (!res.ok) throw new Error(await readError(res, "Upload failed."));
  return res.json();
}
