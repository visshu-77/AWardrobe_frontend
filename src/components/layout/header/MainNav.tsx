"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

// Category links. Horizontal scroll row on tablet, inline on desktop.
export default function MainNav({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={className}>
      <ul className="flex items-center gap-7 overflow-x-auto whitespace-nowrap [scrollbar-width:none] lg:gap-9">
        {siteConfig.mainNav.map((item) => {
          const active = item.href === "/category" ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative block py-2 text-[15px] transition-colors after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform hover:after:scale-x-100 ${
                  active ? "font-medium after:scale-x-100" : "after:scale-x-0"
                } ${item.highlight ? "text-[#c0392b]" : active ? "text-foreground" : "text-foreground/75 hover:text-foreground"}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
