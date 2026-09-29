"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

// Pages that greet the user in the page body show the logo in the mobile header instead of the greeting pill.
export const GREETING_IN_PAGE = ["/account"];

export const isGreetingInPage = (pathname: string) => GREETING_IN_PAGE.some((p) => pathname.startsWith(p));

export default function MobileBrand() {
  const visible = isGreetingInPage(usePathname());

  return (
    <Link
      href="/"
      className={visible ? "text-xl font-semibold tracking-tight md:hidden" : "sr-only md:hidden"}
    >
      {siteConfig.name}
      {!visible && " home"}
    </Link>
  );
}
