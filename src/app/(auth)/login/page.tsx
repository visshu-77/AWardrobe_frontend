import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";
import { buildMetadata } from "@/lib/seo";
import { safeRedirect } from "@/lib/auth";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Sign In", description: "Sign in to your Awardrobe account.", path: "/login" }),
  robots: { index: false, follow: true },
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const redirectTo = safeRedirect((await searchParams).next);

  return (
    <AuthShell
      title="Sign In To Your Account"
      subtitle="Welcome Back You've Been Missed!"
      image={{ src: "/images/auth/login-hero.jpg", alt: "Models wearing the latest Awardrobe collection", bg: "#e27f4d" }}
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthShell>
  );
}
