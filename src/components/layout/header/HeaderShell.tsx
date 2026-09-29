"use client";

import { usePathname } from "next/navigation";

// Pages whose mobile design has its own top bar instead of the site header (exact paths).
const OWN_MOBILE_TOP_BAR = ["/cart", "/category"];

export default function HeaderShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideOnMobile = OWN_MOBILE_TOP_BAR.includes(pathname);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-black/5 bg-background/90 backdrop-blur-md ${hideOnMobile ? "max-md:hidden" : ""}`}
    >
      {children}
    </header>
  );
}
