import Image from "next/image";
import type { Department, DepartmentKey } from "@/lib/catalog";

type DepartmentPickerProps = {
  departments: Department[];
  selected: DepartmentKey | null;
  onSelect: (key: DepartmentKey | null) => void;
};

// The "Child / Man / Woman" circles. Tapping one filters the grid; tapping it again clears the filter.
export default function DepartmentPicker({ departments, selected, onSelect }: DepartmentPickerProps) {
  return (
    <div role="group" aria-label="Shop by department" className="flex justify-between gap-3 md:justify-center md:gap-14 lg:gap-20">
      {departments.map((d) => {
        const active = selected === d.key;
        return (
          <button
            key={d.key}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(active ? null : d.key)}
            className="group flex w-24 flex-col items-center md:w-32 lg:w-36"
          >
            <span
              className={`relative block aspect-square w-full overflow-hidden rounded-full ring-offset-2 ring-offset-background transition-shadow ${
                active ? "ring-2 ring-foreground" : ""
              }`}
            >
              <Image
                src={d.image.url}
                alt={d.image.alt}
                fill
                sizes="(min-width: 1024px) 144px, (min-width: 768px) 128px, 96px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </span>
            <span
              className={`mt-2.5 rounded-full border px-4 py-1 text-[15px] font-medium transition-colors md:mt-3 md:px-5 md:text-base ${
                active ? "border-foreground bg-foreground text-white" : "border-foreground bg-transparent"
              }`}
            >
              {d.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
