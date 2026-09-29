"use client";

import { useId } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";

type SearchFormProps = {
  autoFocus?: boolean;
  onSubmitted?: () => void;
  className?: string;
};

// Sends the query to the product listing page (/products?q=...).
export default function SearchForm({ autoFocus, onSubmitted, className = "" }: SearchFormProps) {
  const router = useRouter();
  const id = useId();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    if (!q) return;
    router.push(`/products?q=${encodeURIComponent(q)}`);
    onSubmitted?.();
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <SearchIcon width={18} height={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/60" />
      <input
        id={id}
        name="q"
        type="search"
        autoFocus={autoFocus}
        autoComplete="off"
        enterKeyHint="search"
        placeholder="Search for dresses, shirts…"
        className="h-11 w-full rounded-full bg-white pl-10 pr-4 text-base outline-none ring-1 ring-black/10 placeholder:text-foreground/45 focus:ring-2 focus:ring-foreground lg:h-10 lg:text-sm"
      />
    </form>
  );
}
