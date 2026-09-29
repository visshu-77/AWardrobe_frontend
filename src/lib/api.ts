// Server-side fetches call Express directly; browser code uses the /api proxy instead.
const API_URL = process.env.API_URL ?? "http://localhost:5000/api";

type FetchOptions = RequestInit & { revalidate?: number | false };

// Thin wrapper around fetch for the Express API. `revalidate` enables
// Next.js caching so product pages can be statically cached and refreshed.
export async function apiFetch<T>(path: string, { revalidate = 60, ...init }: FetchOptions = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}
