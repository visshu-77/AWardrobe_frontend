"use client";

import { AppleIcon, GoogleIcon } from "@/components/icons";

type Provider = "google" | "apple";

const buttonClass =
  "flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-muted text-sm text-foreground transition-colors hover:bg-[#ded7cc] md:h-13";

// "Or Continue With" divider plus Google/Apple buttons.
// OAuth is not wired up yet; `onSelect` lets the form show a notice meanwhile.
export default function SocialAuth({ onSelect }: { onSelect: (provider: Provider) => void }) {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 text-[13px] font-medium">
        <span className="h-px flex-1 bg-foreground/40" />
        Or Continue With
        <span className="h-px flex-1 bg-foreground/40" />
      </div>

      <div className="mt-5 space-y-3">
        <button type="button" className={buttonClass} onClick={() => onSelect("google")}>
          <GoogleIcon />
          Sign In With Google
        </button>
        <button type="button" className={buttonClass} onClick={() => onSelect("apple")}>
          <AppleIcon />
          Sign In With Apple
        </button>
      </div>
    </div>
  );
}
