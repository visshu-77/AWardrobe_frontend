"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "./AuthProvider";
import {
  cartApi,
  emptyCart,
  readGuestCart,
  sameLine,
  writeGuestCart,
  type Cart,
  type CartItem,
  type CartLineInput,
} from "@/lib/cart";

type CartStatus = "loading" | "ready";

type CartContextValue = {
  cart: Cart;
  status: CartStatus;
  error: string | null;
  addItem: (line: CartLineInput) => Promise<void>;
  setQuantity: (item: CartItem, quantity: number) => Promise<void>;
  removeItem: (item: CartItem) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

const toLine = (i: CartItem, quantity = i.quantity): CartLineInput => ({
  productId: i.productId,
  size: i.size,
  color: i.color,
  quantity,
});

// Signed-in users: cart lives on the server. Guests: lines live in localStorage and are
// priced by the server (/cart/preview). On sign-in the guest cart is merged into the account.
export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { status: authStatus } = useAuth();
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [status, setStatus] = useState<CartStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  // Only the newest request may update state, so fast +/+/+ taps can't be overwritten by a slow older reply.
  const requestId = useRef(0);

  // State is only ever set from the promise callbacks, i.e. after the request settles.
  const run = useCallback((task: () => Promise<Cart>): Promise<void> => {
    const id = ++requestId.current;
    const isLatest = () => id === requestId.current;
    return task()
      .then((next) => {
        if (!isLatest()) return;
        setCart(next);
        setError(null);
      })
      .catch((err: unknown) => {
        if (isLatest()) setError(err instanceof Error ? err.message : "Something went wrong");
      })
      .finally(() => {
        if (isLatest()) setStatus("ready");
      });
  }, []);

  const isGuest = authStatus === "guest";

  useEffect(() => {
    if (authStatus === "loading") return;
    run(async () => {
      if (isGuest) {
        const lines = readGuestCart();
        return lines.length ? cartApi.preview(lines) : emptyCart;
      }
      const guestLines = readGuestCart();
      if (!guestLines.length) return cartApi.get();
      const merged = await cartApi.merge(guestLines);
      writeGuestCart([]);
      return merged;
    });
  }, [authStatus, isGuest, run]);

  const addItem = useCallback(
    (line: CartLineInput) =>
      run(async () => {
        if (!isGuest) return cartApi.add(line);
        const lines = readGuestCart();
        const existing = lines.find((l) => sameLine(l, line));
        if (existing) existing.quantity = Math.min(existing.quantity + line.quantity, 10);
        else lines.push(line);
        writeGuestCart(lines);
        return cartApi.preview(lines);
      }),
    [isGuest, run]
  );

  const setQuantity = useCallback(
    (item: CartItem, quantity: number) => {
      // Optimistic: update the number immediately, the server reply then corrects totals.
      setCart((c) => ({
        ...c,
        items: quantity === 0 ? c.items.filter((i) => i.key !== item.key) : c.items.map((i) => (i.key === item.key ? { ...i, quantity } : i)),
      }));
      return run(async () => {
        if (!isGuest) return cartApi.set(toLine(item, quantity));
        const lines = readGuestCart()
          .map((l) => (sameLine(l, item) ? { ...l, quantity } : l))
          .filter((l) => l.quantity > 0);
        writeGuestCart(lines);
        return lines.length ? cartApi.preview(lines) : emptyCart;
      });
    },
    [isGuest, run]
  );

  const removeItem = useCallback((item: CartItem) => setQuantity(item, 0), [setQuantity]);

  const value = useMemo(
    () => ({ cart, status, error, addItem, setQuantity, removeItem }),
    [cart, status, error, addItem, setQuantity, removeItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
