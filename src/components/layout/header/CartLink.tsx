"use client";

import { useCart } from "@/components/providers/CartProvider";
import { BagIcon } from "@/components/icons";
import IconLink from "./IconLink";

export default function CartLink({ className }: { className?: string }) {
  const { cart } = useCart();
  return (
    <IconLink href="/cart" label="Cart" count={cart.itemCount} className={className}>
      <BagIcon />
    </IconLink>
  );
}
