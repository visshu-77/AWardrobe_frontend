import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import SignupForm from "@/components/auth/SignupForm";
import { buildMetadata } from "@/lib/seo";
import { safeRedirect } from "@/lib/auth";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Create Account", description: "Create your Awardrobe account.", path: "/signup" }),
  robots: { index: false, follow: true },
};

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const redirectTo = safeRedirect((await searchParams).next);

  return (
    <AuthShell
      title="Create Your Account"
      subtitle="Welcome Back! Please Enter Your Details"
      image={{ src: "/images/auth/signup-hero.jpg", alt: "Model wearing an Awardrobe outfit", bg: "#d8a87b" }}
      showBack
    >
      <SignupForm redirectTo={redirectTo} />
    </AuthShell>
  );
}
