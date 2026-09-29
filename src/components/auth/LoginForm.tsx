"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextField from "@/components/ui/TextField";
import PasswordField from "@/components/ui/PasswordField";
import ArrowButton from "@/components/ui/ArrowButton";
import SocialAuth from "./SocialAuth";
import FormAlert from "./FormAlert";
import { useAuth } from "@/components/providers/AuthProvider";
import { ApiError, homeForRole, loginUser, type FieldErrors } from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [alert, setAlert] = useState<{ message: string; tone: "error" | "info" } | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors: FieldErrors = {};
    if (!EMAIL_RE.test(form.email.trim())) nextErrors.email = "Enter a valid email address";
    if (!form.password) nextErrors.password = "Password is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setAlert(null);
    try {
      const { user } = await loginUser({ email: form.email.trim(), password: form.password });
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
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          value={form.email}
          onChange={update("email")}
          error={errors.email}
        />

        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          required
          className="mt-4"
          value={form.password}
          onChange={update("password")}
          error={errors.password}
        />

        <div className="mt-2 text-right">
          <Link href="/forgot-password" className="text-[13px] underline underline-offset-2">
            Forgot password?
          </Link>
        </div>

        <ArrowButton type="submit" loading={loading} className="mt-5">
          Sign In
        </ArrowButton>
      </form>

      <SocialAuth
        onSelect={(p) =>
          setAlert({ message: `Sign in with ${p === "google" ? "Google" : "Apple"} is coming soon.`, tone: "info" })
        }
      />

      <p className="mt-6 text-center text-[13px]">
        Not a member?{" "}
        <Link href={redirectTo ? `/signup?next=${encodeURIComponent(redirectTo)}` : "/signup"} className="font-semibold underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </>
  );
}
