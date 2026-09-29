"use client";

import { useState } from "react";
import TextField from "./TextField";
import { EyeIcon, EyeOffIcon } from "@/components/icons";

type PasswordFieldProps = Omit<React.ComponentProps<typeof TextField>, "type" | "endAdornment">;

export default function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="grid size-9 place-items-center rounded-full text-foreground hover:bg-black/5"
        >
          {visible ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      }
    />
  );
}
