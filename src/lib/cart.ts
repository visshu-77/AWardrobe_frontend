// Cart API calls + guest cart storage. Shapes mirror server/src/services/cartService.js.

export type CartLineInput = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: { url: string; alt: string } | null;
  size: string;
  color: string;
  quantity: number;
  maxQuantity: number;
  outOfStock: boolean;
  price: number;
  compareAtPrice: number | null;
  rating: number;
  reviewCount: number;
};

export type Cart = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
  freeShipping: boolean;
  freeShippingThreshold: number;
};

export const emptyCart: Cart = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  savings: 0,
  shipping: 0,
  total: 0,
  freeShipping: false,
  freeShippingThreshold: 0,
};

async function call(method: "GET" | "POST" | "PATCH", path: string, body?: unknown): Promise<Cart> {
  const res = await fetch(`/api/cart${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    cache: "no-store",
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message ?? "Could not update your cart");
  return data as Cart;
}

export const cartApi = {
  get: () => call("GET", ""),
  add: (line: CartLineInput) => call("POST", "/items", line),
  set: (line: CartLineInput) => call("PATCH", "/items", line),
  merge: (items: CartLineInput[]) => call("POST", "/merge", { items }),
  preview: (items: CartLineInput[]) => call("POST", "/preview", { items }),
};

// ---- Guest cart (browser only) ----
const GUEST_KEY = "aw_guest_cart";

export const sameLine = (a: Omit<CartLineInput, "quantity">, b: Omit<CartLineInput, "quantity">) =>
  a.productId === b.productId && a.size === b.size && a.color === b.color;

export function readGuestCart(): CartLineInput[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(GUEST_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeGuestCart(lines: CartLineInput[]) {
  try {
    if (lines.length) localStorage.setItem(GUEST_KEY, JSON.stringify(lines));
    else localStorage.removeItem(GUEST_KEY);
  } catch {
    // Storage unavailable (private mode): the cart just won't survive a reload.
  }
}
