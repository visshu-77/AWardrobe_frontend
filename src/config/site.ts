export type NavLink = { label: string; href: string; highlight?: boolean };

// Single source of truth for store-wide details used in metadata, sitemap and UI.
export const siteConfig = {
  name: "Awardrobe",
  description: "Shop the latest clothing for men and women at Awardrobe.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.jpg",
  locale: "en_IN",
  contactEmail: "support@awardrobe.com",
  currency: "INR",

  // Category links shown in the tablet/desktop header.
  mainNav: [
    { label: "Categories", href: "/category" },
    { label: "New In", href: "/category/new-in" },
    { label: "Women", href: "/category/women" },
    { label: "Men", href: "/category/men" },
    { label: "Accessories", href: "/category/accessories" },
    { label: "Sale", href: "/category/sale", highlight: true },
  ] as NavLink[],

  footerNav: [
    {
      title: "Shop",
      links: [
        { label: "New In", href: "/category/new-in" },
        { label: "Women", href: "/category/women" },
        { label: "Men", href: "/category/men" },
        { label: "Sale", href: "/category/sale" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Shipping", href: "/shipping" },
        { label: "Returns & Exchanges", href: "/returns" },
        { label: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
      ],
    },
  ],
} as const;
