import { MinusIcon, PlusIcon } from "@/components/icons";

type QuantityStepperProps = {
  value: number;
  max: number;
  onChange: (value: number) => void;
  label: string;
};

const stepButton =
  "grid size-8 place-items-center rounded-full bg-black text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30 md:size-9";

// At quantity 1 the minus button removes the item (as in the design, it never greys out).
export default function QuantityStepper({ value, max, onChange, label }: QuantityStepperProps) {
  return (
    <div className="flex items-center" role="group" aria-label={`Quantity for ${label}`}>
      <button
        type="button"
        className={stepButton}
        onClick={() => onChange(value - 1)}
        aria-label={value <= 1 ? "Remove item" : "Decrease quantity"}
      >
        <MinusIcon width={16} height={16} strokeWidth={2.4} />
      </button>
      <output aria-live="polite" className="w-10 text-center text-[15px] md:w-11">
        {value}
      </output>
      <button
        type="button"
        className={stepButton}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon width={16} height={16} strokeWidth={2.4} />
      </button>
    </div>
  );
}
