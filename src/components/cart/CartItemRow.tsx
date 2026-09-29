"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "@/lib/cart";
import { formatCount, formatPrice } from "@/lib/format";
import { HeartIcon, StarFilledIcon, TrashIcon } from "@/components/icons";
import QuantityStepper from "./QuantityStepper";

type CartItemRowProps = {
  item: CartItem;
  freeDelivery: boolean;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
};

export default function CartItemRow({ item, freeDelivery, onQuantityChange, onRemove }: CartItemRowProps) {
  const href = `/products/${item.slug}`;

  return (
    <li className="flex gap-3.5 py-4 md:gap-5 md:py-5">
      <div className="relative aspect-[120/138] w-[120px] shrink-0 overflow-hidden rounded-2xl bg-muted md:w-36 lg:w-40">
        <Link href={href} tabIndex={-1} aria-hidden>
          {item.image && (
            <Image
              src={item.image.url}
              alt={item.image.alt || item.name}
              fill
              sizes="(min-width: 1024px) 160px, (min-width: 768px) 144px, 120px"
              className="object-cover"
            />
          )}
        </Link>
        {/* Wishlist is not built yet; this becomes a real toggle then. */}
        <button
          type="button"
          aria-label={`Save ${item.name} to wishlist`}
          className="absolute left-2 top-2 grid size-9 place-items-center rounded-full bg-black/15 text-white backdrop-blur-sm transition-colors hover:bg-black/25"
        >
          <HeartIcon width={18} height={18} />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="line-clamp-2 text-[17px] font-medium leading-snug md:text-lg">
          <Link href={href}>{item.name}</Link>
        </h3>
        <p className="mt-0.5 text-xs text-foreground/55 md:text-[13px]">
          Size {item.size} · {item.color}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
          <span className="text-[17px] font-semibold md:text-lg">{formatPrice(item.price)}</span>
          {item.compareAtPrice && (
            <span className="text-[13px] text-foreground/55 line-through">{formatPrice(item.compareAtPrice)}</span>
          )}
          {item.reviewCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-foreground/55">
              <StarFilledIcon className="text-[#f5a524]" />({formatCount(item.reviewCount)} Review)
            </span>
          )}
        </div>

        {item.outOfStock ? (
          <p className="mt-1 text-[15px] font-medium text-red-600">Out of stock</p>
        ) : (
          freeDelivery && <p className="mt-1 text-[15px] text-[#16a34a]">FREE Delivery</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          {item.outOfStock ? (
            <span />
          ) : (
            <QuantityStepper value={item.quantity} max={item.maxQuantity} onChange={onQuantityChange} label={item.name} />
          )}
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 text-[15px] text-foreground/75 transition-colors hover:text-red-600"
          >
            <TrashIcon width={18} height={18} />
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
