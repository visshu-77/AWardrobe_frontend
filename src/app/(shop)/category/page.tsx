import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getCategoryIndex } from "@/lib/catalog";
import CategoryBrowser from "@/components/category/CategoryBrowser";
import SearchOverlay from "@/components/layout/header/SearchOverlay";

export const metadata: Metadata = buildMetadata({
  title: "Shop by Category",
  description: "Browse jackets, coats, tops, dresses and more for women, men and kids at Awardrobe.",
  path: "/category",
});

// Rebuilt in the background at most every 5 minutes so counts stay fresh.
export const revalidate = 300;

export default async function CategoryPage() {
  const { departments, categories } = await getCategoryIndex();

  return (
    <>
      {/* Mobile top bar from the design (the site header is hidden on this page on mobile) */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between bg-white pl-4 pr-2 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.15)] md:hidden">
        <p className="text-xl font-semibold">Category</p>
        <SearchOverlay />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-5 md:px-6 md:pt-10 lg:px-8 lg:pt-12">
        <h1 className="max-w-[20ch] text-[22px] font-medium leading-tight md:mx-auto md:max-w-none md:text-center md:text-[32px] lg:text-[40px]">
          Set Your Wardrobe With Our <br className="hidden md:block" />
          Amazing Selection!
        </h1>
        <CategoryBrowser departments={departments} categories={categories} />
      </div>
    </>
  );
}
