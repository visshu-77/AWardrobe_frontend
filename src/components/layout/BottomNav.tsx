"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { useCart } from "@/components/providers/CartProvider";
import { CartIcon, HeartIcon, HomeIcon, OrdersIcon, UserIcon } from "@/components/icons";

type Tab = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  count?: number;
};

// Mobile-only tab bar fixed to the bottom of the screen.
export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const cartCount = useCart().cart.itemCount;

  const tabs: Tab[] = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Wishlist", href: "/wishlist", icon: HeartIcon },
    { label: "Cart", href: "/cart", icon: CartIcon, count: cartCount },
    { label: "Categories", href: "/category", icon: OrdersIcon },
    { label: "Profile", href: user ? "/account" : "/login", icon: UserIcon },
  ];

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 rounded-t-3xl bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_-8px_rgba(0,0,0,0.12)] md:hidden"
    >
      <ul className="mx-auto flex h-16 max-w-md items-center justify-around px-3">
        {tabs.map(({ label, href, icon: Icon, count = 0 }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={label}>
              <Link
                href={href}
                aria-label={count ? `${label} (${count})` : label}
                aria-current={active ? "page" : undefined}
                className={`relative grid size-11 place-items-center rounded-full transition-colors ${
                  active ? "bg-black text-white" : "text-foreground active:bg-black/5"
                }`}
              >
                <Icon width={22} height={22} />
                {count > 0 && (
                  <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#ef3b36] px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-white">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
