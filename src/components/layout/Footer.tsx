import Link from "next/link";
import { siteConfig } from "@/config/site";

// Tablet and desktop only: the mobile design has no footer.
export default function Footer() {
  return (
    <footer className="mt-auto hidden bg-[#1a1a1a] text-background md:block">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-10 pt-14 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8 lg:pt-16">
        <div className="md:col-span-3 lg:col-span-1">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-background/65">{siteConfig.description}</p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-5 inline-block text-sm underline underline-offset-4 hover:text-white"
          >
            {siteConfig.contactEmail}
          </a>
        </div>

        {siteConfig.footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-background/50">{group.title}</h2>
            <ul className="mt-4 space-y-3 text-[15px]">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-background/85 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-6 py-5 text-[13px] text-background/55 lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Secure payments · Easy returns · Fast delivery</p>
        </div>
      </div>
    </footer>
  );
}
