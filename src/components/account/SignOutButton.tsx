"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { LogoutIcon } from "@/components/icons";

export default function SignOutButton({ className = "" }: { className?: string }) {
  const { signOut } = useAuth();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    await signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={`flex w-full items-center gap-3.5 py-3 text-left text-base text-[#c0392b] disabled:opacity-60 ${className}`}
    >
      <LogoutIcon width={22} height={22} />
      {pending ? "Signing out…" : "Sign Out"}
    </button>
  );
}
