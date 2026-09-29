import Link from "next/link";
import { iconButton } from "./styles";

type IconLinkProps = {
  href: string;
  label: string;
  count?: number;
  className?: string;
  children: React.ReactNode;
};

// Header icon with an optional red count badge (notifications, cart).
export default function IconLink({ href, label, count = 0, className = "", children }: IconLinkProps) {
  const badge = count > 99 ? "99+" : String(count);

  return (
    <Link href={href} aria-label={count ? `${label} (${count})` : label} className={`${iconButton} ${className}`}>
      {children}
      {count > 0 && (
        <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#ef3b36] px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-background">
          {badge}
        </span>
      )}
    </Link>
  );
}
