"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextField from "@/components/ui/TextField";
import PasswordField from "@/components/ui/PasswordField";
import ArrowButton from "@/components/ui/ArrowButton";
import SocialAuth from "./SocialAuth";
import FormAlert from "./FormAlert";
import { useAuth } from "@/components/providers/AuthProvider";
import { ApiError, homeForRole, registerUser, type FieldErrors } from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter();
  const { setUser } = useAuth();
  const termsId = useId();
  const [form, setForm] = useState({ name: "", email: "", password: "", acceptTerms: false });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [alert, setAlert] = useState<{ message: string; tone: "error" | "info" } | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (field: "name" | "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors: FieldErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Name must be at least 2 characters";
    if (!EMAIL_RE.test(form.email.trim())) nextErrors.email = "Enter a valid email address";
    if (form.password.length < 8) nextErrors.password = "Password must be at least 8 characters";
    if (!form.acceptTerms) nextErrors.acceptTerms = "You must accept the terms";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setAlert(null);
    try {
      const { user } = await registerUser({ ...form, name: form.name.trim(), email: form.email.trim() });
      setUser(user);
      router.replace(redirectTo ?? homeForRole(user.role));
      router.refresh();
    } catch (err) {
      const apiErr = err instanceof ApiError ? err : null;
      setErrors(apiErr?.fieldErrors ?? {});
      setAlert({ message: apiErr?.message ?? "Something went wrong", tone: "error" });
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <FormAlert message={alert?.message ?? null} tone={alert?.tone} />

        <TextField
          label="Name"
          name="name"
          autoComplete="name"
          required
          value={form.name}
          onChange={update("name")}
          error={errors.name}
        />

        <TextField
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          className="mt-4"
          value={form.email}
          onChange={update("email")}
          error={errors.email}
        />

        <PasswordField
          label="Password"
          name="password"
          autoComplete="new-password"
          required
          className="mt-4"
          value={form.password}
          onChange={update("password")}
          error={errors.password}
        />

        <div className="mt-3">
          <label htmlFor={termsId} className="flex cursor-pointer items-center gap-2.5 text-[13px]">
            <input
              id={termsId}
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(e) => {
                setForm((f) => ({ ...f, acceptTerms: e.target.checked }));
                setErrors((errs) => ({ ...errs, acceptTerms: undefined }));
              }}
              aria-invalid={!!errors.acceptTerms}
              className="size-[18px] shrink-0 cursor-pointer rounded-[3px] border-field-border accent-black"
            />
            I agree to all Term, Privacy and Fees
          </label>
          {errors.acceptTerms && <p className="mt-1 text-xs text-red-600">{errors.acceptTerms}</p>}
        </div>

        <ArrowButton type="submit" loading={loading} className="mt-5">
          Sign Up
        </ArrowButton>
      </form>

      <SocialAuth
        onSelect={(p) =>
          setAlert({ message: `Sign up with ${p === "google" ? "Google" : "Apple"} is coming soon.`, tone: "info" })
        }
      />

      <p className="mt-6 text-center text-[13px]">
        Already a member?{" "}
        <Link href={redirectTo ? `/login?next=${encodeURIComponent(redirectTo)}` : "/login"} className="font-semibold underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </>
  );
}
