import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { User } from "@/lib/auth";

const API_URL = process.env.API_URL ?? "http://localhost:5000/api";
const AUTH_COOKIE = "aw_token";

// Reads the signed-in user on the server by forwarding the session cookie to Express.
export async function getSessionUser(): Promise<User | null> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Cookie: `${AUTH_COOKIE}=${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { user: User };
    return data.user;
  } catch {
    return null;
  }
}

// For protected pages: returns the user or sends them to login, then back here.
export async function requireUser(returnTo: string): Promise<User> {
  const user = await getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  return user;
}
