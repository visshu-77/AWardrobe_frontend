"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/components/icons";

export default function BackButton({ fallback = "/" }: { fallback?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={() => (window.history.length > 1 ? router.back() : router.push(fallback))}
      className="absolute left-4 top-4 z-10 grid size-8 place-items-center rounded-full bg-white/35 text-foreground backdrop-blur-sm transition-colors hover:bg-white/55 md:size-10"
    >
      <ChevronLeftIcon width={18} height={18} />
    </button>
  );
}
