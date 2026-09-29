import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/session";
import { accountQuickLinks, accountSections } from "@/config/account";
import Avatar from "@/components/ui/Avatar";
import SignOutButton from "@/components/account/SignOutButton";
import { ChevronRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false, follow: false },
};

// Mobile: exact design (list rows on the page background).
// Tablet/desktop: same content, with the sections as white cards side by side.
export default async function AccountPage() {
  const user = await requireUser("/account");
  const firstName = user.name.split(" ")[0];

  return (
    <div className="bg-linear-to-b from-[#ffe9a8] via-[#fff4dc] via-35% to-background to-60% md:from-[#fff0c4] md:to-40%">
      <div className="mx-auto max-w-5xl px-4 pb-10 pt-5 md:px-6 md:pt-10 lg:px-8 lg:pt-12">
        {/* Greeting */}
        <div className="flex items-center gap-3 md:gap-4">
          <span className="rounded-full ring-2 ring-white">
            <Avatar name={user.name} src={user.avatar} size={40} />
          </span>
          <h1 className="text-[26px] leading-tight md:text-[32px]">
            Hello, <span className="font-semibold">{firstName}</span>
          </h1>
        </div>

        {/* Quick links: 2x2 on mobile, one row of 4 from tablet up */}
        <nav aria-label="Quick links" className="mt-6 grid grid-cols-2 gap-2.5 md:mt-8 md:grid-cols-4 md:gap-4">
          {accountQuickLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-white text-[15px] font-medium shadow-[0_2px_10px_-4px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_6px_18px_-6px_rgba(0,0,0,0.2)] md:h-14"
            >
              <Icon width={20} height={20} className="hidden md:block" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Settings sections */}
        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-2 md:gap-5">
          {accountSections.map((section) => (
            <section
              key={section.title}
              aria-labelledby={`section-${section.title}`}
              className="md:rounded-3xl md:bg-white md:p-6 md:shadow-[0_2px_16px_-8px_rgba(0,0,0,0.15)]"
            >
              <h2 id={`section-${section.title}`} className="text-xl font-medium">
                {section.title}
              </h2>
              <ul className="mt-2">
                {section.links.map(({ label, href, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group -mx-2 flex items-center gap-3.5 rounded-xl px-2 py-3 text-base transition-colors hover:bg-black/[0.03]"
                    >
                      <Icon width={22} height={22} className="shrink-0" />
                      <span className="flex-1">{label}</span>
                      <ChevronRightIcon width={18} height={18} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-6 border-t border-black/5 pt-2 md:mt-8 md:border-0">
          <SignOutButton className="md:w-auto" />
        </div>
      </div>
    </div>
  );
}
