import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { siteConfig } from "@/config/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import AuthProvider from "@/components/providers/AuthProvider";
import CartProvider from "@/components/providers/CartProvider";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the bottom tab bar sit above the iPhone home indicator via safe-area insets.
  viewportFit: "cover",
  themeColor: "#fffaf3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} h-full antialiased`}>
      {/* min-h-dvh (not min-h-full): Lenis sets html height to auto */}
      <body className="flex min-h-dvh flex-col">
        <AuthProvider>
          <CartProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
