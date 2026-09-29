import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BellIcon, HeartIcon } from "@/components/icons";
import AccountMenu from "./header/AccountMenu";
import MainNav from "./header/MainNav";
import SearchForm from "./header/SearchForm";
import SearchOverlay from "./header/SearchOverlay";
import IconLink from "./header/IconLink";
import MobileBrand from "./header/MobileBrand";
import CartLink from "./header/CartLink";
import HeaderShell from "./header/HeaderShell";

// Mobile:  [Hello' Name]                 [bell] [search]
// Tablet:  [Logo]           [bell] [search] [heart] [bag] [Hello' Name]
//          [New In  Women  Men  Accessories  Sale]
// Desktop: [Logo]  [New In ... Sale]  [search field] [bell] [heart] [bag] [Hello' Name]
export default function Header() {
  // Replace with the real count once notifications are wired to the API.
  const notificationCount = 0;

  return (
    <HeaderShell>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:h-[72px] md:gap-6 md:px-6 lg:px-8">
        <Link href="/" className="hidden text-2xl font-semibold tracking-tight md:block">
          {siteConfig.name}
        </Link>
        {/* Mobile: logo is screen-reader-only, except on pages like /account where it's shown */}
        <MobileBrand />

        <MainNav className="mx-auto hidden lg:block" />

        <div className="ml-auto flex items-center gap-0.5 md:gap-1 lg:ml-0">
          <SearchForm className="mr-2 hidden w-56 lg:block xl:w-72" />
          <IconLink href="/notifications" label="Notifications" count={notificationCount}>
            <BellIcon />
          </IconLink>
          <SearchOverlay className="lg:hidden" />
          {/* Wishlist + cart live in the bottom tab bar on mobile */}
          <IconLink href="/wishlist" label="Wishlist" className="hidden md:grid">
            <HeartIcon />
          </IconLink>
          <CartLink className="hidden md:grid" />
        </div>

        {/* Greeting pill: first on mobile (as in the design), last on tablet/desktop */}
        <AccountMenu className="order-first md:order-last md:ml-2" />
      </div>

      <MainNav className="hidden border-t border-black/5 px-6 md:block lg:hidden" />
    </HeaderShell>
  );
}
