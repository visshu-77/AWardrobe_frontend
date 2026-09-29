"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/format";
import { CartIcon, MapPinIcon } from "@/components/icons";
import CartItemRow from "./CartItemRow";
import FreeDeliveryNote from "./FreeDeliveryNote";

const proceedClass =
  "flex h-14 w-full items-center justify-center rounded-full bg-black text-[17px] text-white transition-opacity hover:opacity-90";

// Mobile: design as given (own top bar, list, sticky "Proceed To Buy" above the tab bar).
// Tablet: same, wider. Desktop: list on the left, sticky order summary on the right.
export default function CartView() {
  const { user } = useAuth();
  const { cart, status, error, setQuantity, removeItem } = useCart();

  const checkoutHref = user ? "/checkout" : `/login?next=${encodeURIComponent("/checkout")}`;
  const addressHref = user ? "/account/addresses" : `/login?next=${encodeURIComponent("/cart")}`;
  const itemsLabel = `${cart.itemCount} ${cart.itemCount === 1 ? "Item" : "Items"}`;
  const hasItems = cart.items.length > 0;

  return (
    <div className={hasItems ? "pb-24 lg:pb-12" : ""}>
      {/* Top bar: sticky on mobile (replaces the site header there), plain heading from tablet up */}
      <div className="sticky top-0 z-30 bg-white shadow-[0_2px_12px_-6px_rgba(0,0,0,0.15)] md:static md:bg-transparent md:shadow-none">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:pt-10 lg:px-8">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold leading-tight md:text-3xl">My Cart</h1>
            <p className="mt-0.5 flex items-center gap-1.5 truncate text-[13px] md:mt-1.5 md:text-[15px]">
              <span className="font-semibold">{itemsLabel}</span>
              <span aria-hidden className="text-[8px]">◆</span>
              Deliver To: <span className="font-semibold">{user ? "Add address" : "Sign in to choose"}</span>
            </p>
          </div>
          <Link
            href={addressHref}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-foreground px-3 py-1.5 text-[15px] font-medium transition-colors hover:bg-black hover:text-white"
          >
            <MapPinIcon width={18} height={18} />
            Change
          </Link>
        </div>
      </div>

      {status === "loading" ? (
        <CartSkeleton />
      ) : !hasItems ? (
        <EmptyCart />
      ) : (
        <div className="mx-auto max-w-7xl md:px-6 lg:grid lg:grid-cols-[1fr_380px] lg:items-start lg:gap-10 lg:px-8">
          <div>
            <div className="border-b border-black/10 px-4 py-4 md:px-0 md:py-6">
              <p className="text-xl">
                Subtotal <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
              </p>
              <div className="mt-2">
                <FreeDeliveryNote cart={cart} />
              </div>
              {error && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <ul className="divide-y divide-black/10 border-b border-black/10 px-4 md:px-0">
              {cart.items.map((item) => (
                <CartItemRow
                  key={item.key}
                  item={item}
                  freeDelivery={cart.freeShipping}
                  onQuantityChange={(q) => setQuantity(item, q)}
                  onRemove={() => removeItem(item)}
                />
              ))}
            </ul>
          </div>

          {/* Desktop order summary */}
          <aside className="sticky top-28 mt-6 hidden rounded-3xl bg-white p-6 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.2)] lg:block">
            <h2 className="text-xl font-medium">Order Summary</h2>
            <dl className="mt-5 space-y-3 text-[15px]">
              <div className="flex justify-between">
                <dt>Subtotal ({itemsLabel})</dt>
                <dd>{formatPrice(cart.subtotal + cart.savings)}</dd>
              </div>
              {cart.savings > 0 && (
                <div className="flex justify-between text-[#16a34a]">
                  <dt>You save</dt>
                  <dd>−{formatPrice(cart.savings)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt>Delivery</dt>
                <dd className={cart.shipping ? "" : "font-medium text-[#16a34a]"}>
                  {cart.shipping ? formatPrice(cart.shipping) : "FREE"}
                </dd>
              </div>
              <div className="flex justify-between border-t border-black/10 pt-4 text-lg font-semibold">
                <dt>Total</dt>
                <dd>{formatPrice(cart.total)}</dd>
              </div>
            </dl>
            <Link href={checkoutHref} className={`${proceedClass} mt-6`}>
              Proceed To Buy <span className="ml-1 font-semibold">({itemsLabel})</span>
            </Link>
          </aside>

          {/* Mobile + tablet sticky action; sits above the mobile tab bar */}
          <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 bg-linear-to-t from-background via-background to-transparent px-4 pb-3 pt-4 md:bottom-0 md:px-6 md:pb-5 lg:hidden">
            <Link href={checkoutHref} className={`${proceedClass} mx-auto max-w-3xl`}>
              Proceed To Buy <span className="ml-1 font-semibold">({itemsLabel})</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-20 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-muted">
        <CartIcon width={34} height={34} />
      </span>
      <h2 className="mt-5 text-xl font-medium">Your cart is empty</h2>
      <p className="mt-1.5 text-[15px] text-foreground/65">Looks like you haven&apos;t added anything yet.</p>
      <Link href="/" className={`${proceedClass} mt-7 h-12 max-w-64 text-[15px]`}>
        Continue Shopping
      </Link>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div aria-busy className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
      <div className="my-5 h-6 w-48 animate-pulse rounded bg-black/5" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex gap-3.5 border-t border-black/10 py-4">
          <div className="aspect-[120/138] w-[120px] animate-pulse rounded-2xl bg-black/5" />
          <div className="flex-1 space-y-3 pt-1">
            <div className="h-4 w-4/5 animate-pulse rounded bg-black/5" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-black/5" />
            <div className="h-8 w-32 animate-pulse rounded-full bg-black/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
