import { siteConfig } from "@/config/site";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: siteConfig.currency,
  maximumFractionDigits: 0,
});

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

export const formatPrice = (amount: number) => money.format(amount);

// 2140 -> "2.1k"
export const formatCount = (n: number) => compact.format(n).toLowerCase();
