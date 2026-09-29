import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@/components/icons";

type CategoryCardProps = {
  name: string;
  href: string;
  image: { url: string; alt: string } | null;
  count: number;
  priority?: boolean;
};

export default function CategoryCard({ name, href, image, count, priority }: CategoryCardProps) {
  return (
    <li className="group relative aspect-[167/192] overflow-hidden rounded-2xl bg-muted">
      <Link href={href} className="absolute inset-0">
        {image && (
          <Image
            src={image.url}
            alt={image.alt || name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-center gap-1 rounded-2xl bg-black/40 px-2 text-white backdrop-blur-sm md:h-12">
          <span className="text-[15px] font-semibold md:text-base">{name}</span>
          <span className="text-xs md:text-[13px]">({count} Items)</span>
        </span>
      </Link>
      {/* Saved categories aren't built yet; this becomes a real toggle with the wishlist. */}
      <button
        type="button"
        aria-label={`Save ${name}`}
        className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-colors hover:bg-white/40 md:right-3 md:top-3 md:size-10"
      >
        <HeartIcon width={18} height={18} />
      </button>
    </li>
  );
}
