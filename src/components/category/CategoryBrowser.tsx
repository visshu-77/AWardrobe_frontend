"use client";

import { useState } from "react";
import type { CategoryIndex, DepartmentKey } from "@/lib/catalog";
import DepartmentPicker from "./DepartmentPicker";
import CategoryCard from "./CategoryCard";

// Department circles + category grid. Filtering happens in the browser on data the
// server already rendered, so the page stays static (fast, fully crawlable).
export default function CategoryBrowser({ departments, categories }: CategoryIndex) {
  const [department, setDepartment] = useState<DepartmentKey | null>(null);

  const visible = categories
    .map((c) => ({ ...c, count: c.counts[department ?? "all"] }))
    .filter((c) => c.count > 0);

  return (
    <>
      {departments.length > 0 && (
        <div className="mt-5 md:mt-8">
          <DepartmentPicker departments={departments} selected={department} onSelect={setDepartment} />
        </div>
      )}

      {visible.length === 0 ? (
        <p className="py-16 text-center text-foreground/60">No categories to show right now.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-4 md:mt-10 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {visible.map((c, i) => (
            <CategoryCard
              key={c.id}
              name={c.name}
              href={department ? `/category/${c.slug}?for=${department}` : `/category/${c.slug}`}
              image={c.image}
              count={c.count}
              priority={i < 4}
            />
          ))}
        </ul>
      )}
    </>
  );
}
