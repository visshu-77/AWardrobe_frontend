import { apiFetch } from "@/lib/api";

export type DepartmentKey = "kids" | "men" | "women";

export type Department = {
  key: DepartmentKey;
  label: string;
  image: { url: string; alt: string };
  productCount: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: { url: string; alt: string } | null;
  counts: Record<DepartmentKey | "all", number>;
};

export type CategoryIndex = { departments: Department[]; categories: Category[] };

// Server-side: cached and refreshed every 5 minutes. If the API is unreachable
// (e.g. during a build without the backend running) the page renders empty and retries later.
export async function getCategoryIndex(): Promise<CategoryIndex> {
  try {
    return await apiFetch<CategoryIndex>("/categories", { revalidate: 300 });
  } catch (err) {
    console.error("Failed to load categories:", err);
    return { departments: [], categories: [] };
  }
}
