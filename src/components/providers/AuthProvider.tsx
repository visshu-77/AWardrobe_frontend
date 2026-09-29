"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, logoutUser, type User } from "@/lib/auth";

type AuthStatus = "loading" | "authenticated" | "guest";

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// Loads the session in the browser so pages stay statically rendered (fast + cacheable)
// while the header still shows who is signed in.
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let cancelled = false;
    getCurrentUser()
      .then(({ user }) => {
        if (cancelled) return;
        setUserState(user);
        setStatus("authenticated");
      })
      .catch(() => {
        if (!cancelled) setStatus("guest");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setUser = useCallback((next: User | null) => {
    setUserState(next);
    setStatus(next ? "authenticated" : "guest");
  }, []);

  const signOut = useCallback(async () => {
    await logoutUser().catch(() => {});
    setUser(null);
  }, [setUser]);

  const value = useMemo(() => ({ user, status, setUser, signOut }), [user, status, setUser, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
