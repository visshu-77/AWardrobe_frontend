"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { ChevronDownIcon, UserIcon } from "@/components/icons";
import Avatar from "@/components/ui/Avatar";
import { isGreetingInPage } from "./MobileBrand";

const pill =
  "flex h-10 items-center gap-2 rounded-full bg-white pl-1 pr-3.5 text-[13px] font-semibold shadow-[0_1px_4px_rgba(0,0,0,0.06)] ring-1 ring-black/5";

// The "Hello' Name" pill from the design. Guests get a Sign In pill instead.
export default function AccountMenu({ className: baseClass = "" }: { className?: string }) {
  const { user, status, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  // Pages like /account show the greeting in the page body, so the pill is hidden on mobile there.
  const className = isGreetingInPage(pathname) ? `${baseClass} max-md:hidden` : baseClass;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (status === "loading") {
    return <div className={`${className} h-10 w-32 animate-pulse rounded-full bg-black/5`} aria-hidden />;
  }

  if (!user) {
    return (
      <Link href="/login" className={`${pill} ${className} pl-1`}>
        <span className="grid size-8 place-items-center rounded-full bg-muted">
          <UserIcon width={18} height={18} />
        </span>
        Sign In
      </Link>
    );
  }

  const firstName = user.name.split(" ")[0];

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    router.refresh();
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={pill}
      >
        <Avatar name={user.name} src={user.avatar} />
        <span className="max-w-[9rem] truncate">Hello&apos; {firstName}</span>
        <ChevronDownIcon width={14} height={14} className={`hidden transition-transform md:block ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-12 z-50 w-56 overflow-hidden rounded-2xl bg-white p-1.5 text-sm shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 md:left-auto md:right-0"
        >
          <div className="px-3 py-2.5">
            <p className="truncate font-medium">{user.name}</p>
            <p className="truncate text-xs text-foreground/60">{user.email}</p>
          </div>
          <div className="my-1 h-px bg-black/5" />
          <Link
            href="/account"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-2.5 hover:bg-muted"
          >
            My Account
          </Link>
          <Link
            href="/orders"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-2.5 hover:bg-muted"
          >
            My Orders
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="w-full rounded-xl px-3 py-2.5 text-left hover:bg-muted"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
