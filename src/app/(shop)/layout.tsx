import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

// Storefront pages share the header and footer (bottom tab bar on mobile); auth pages do not.
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {/* Bottom padding on mobile so content isn't hidden behind the tab bar */}
      <main className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </>
  );
}
