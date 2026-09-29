"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, SearchIcon } from "@/components/icons";
import SearchForm from "./SearchForm";
import { iconButton } from "./styles";

// Search icon (mobile + tablet) that opens a full-width search panel.
export default function SearchOverlay({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const panel = (
    <div role="dialog" aria-modal="true" aria-label="Search" className="fixed inset-0 z-50" data-lenis-prevent>
      <button
        type="button"
        aria-label="Close search"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
      />
      <div className="relative flex items-center gap-2 bg-background px-4 py-3 shadow-lg md:px-6">
        <SearchForm autoFocus onSubmitted={() => setOpen(false)} className="flex-1" />
        <button type="button" aria-label="Close search" onClick={() => setOpen(false)} className={iconButton}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button type="button" aria-label="Search" onClick={() => setOpen(true)} className={`${iconButton} ${className}`}>
        <SearchIcon />
      </button>
      {/* Portal: the header's backdrop-blur would otherwise trap `fixed` inside the header box */}
      {open && createPortal(panel, document.body)}
    </>
  );
}
