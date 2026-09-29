import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link href="/" className="mt-4 inline-block underline">
        Back to home
      </Link>
    </section>
  );
}
