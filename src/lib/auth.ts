// Browser-side auth calls. Requests go to /api/* on the same origin and are
// proxied to Express (see next.config.ts), so the httpOnly session cookie is first-party.

export type Role = "user" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string | null;
};

export type FieldErrors = Partial<Record<string, string>>;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fieldErrors: FieldErrors = {}
  ) {
    super(message);
  }
}

async function request<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("Unable to reach the server. Check your connection and try again.", 0);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.message ?? "Something went wrong", res.status, data.errors);
  }
  return data as T;
}

export const loginUser = (input: { email: string; password: string }) =>
  request<{ user: User }>("POST", "/auth/login", input);

export const registerUser = (input: { name: string; email: string; password: string; acceptTerms: boolean }) =>
  request<{ user: User }>("POST", "/auth/register", input);

export const logoutUser = () => request<{ message: string }>("POST", "/auth/logout");

export const getCurrentUser = () => request<{ user: User }>("GET", "/auth/me");

// Where to send someone after they sign in, based on role.
// Point "admin" at the dashboard route once it exists.
export const homeForRole = (role: Role): string => ({ user: "/", admin: "/" })[role];

// Only allow same-site relative paths as post-login redirects (blocks open redirects like //evil.com).
export function safeRedirect(next: unknown): string | undefined {
  return typeof next === "string" && /^\/(?![/\\])/.test(next) ? next : undefined;
}
