"use client";

import { useId } from "react";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  /** Extra element rendered inside the input on the right, e.g. a visibility toggle. */
  endAdornment?: React.ReactNode;
};

export default function TextField({ label, error, endAdornment, required, className = "", ...props }: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] text-foreground md:text-sm">
        {label}
        {required && <span aria-hidden>*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          // text-base (16px) stops iOS Safari from zooming in on focus.
          className={`h-12 w-full rounded-md border bg-white px-3.5 text-base outline-none transition-colors focus:border-foreground focus:ring-1 focus:ring-foreground ${
            error ? "border-red-600" : "border-field-border/70"
          } ${endAdornment ? "pr-12" : ""}`}
          {...props}
        />
        {endAdornment && <div className="absolute inset-y-0 right-0 flex items-center pr-2">{endAdornment}</div>}
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
