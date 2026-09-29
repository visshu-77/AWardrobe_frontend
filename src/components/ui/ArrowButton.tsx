import { ArrowRightIcon } from "@/components/icons";

type ArrowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

// Black pill button with the white arrow circle on the left, as in the design.
export default function ArrowButton({ children, loading, disabled, className = "", ...props }: ArrowButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading}
      className={`group relative flex h-12 w-full items-center justify-center rounded-full bg-black text-[15px] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 md:h-13 ${className}`}
      {...props}
    >
      <span className="absolute inset-y-1 left-1 grid aspect-square place-items-center rounded-full bg-white text-black">
        {loading ? (
          <span className="size-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
        ) : (
          <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
      {children}
    </button>
  );
}
