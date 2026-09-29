import Image from "next/image";
import BackButton from "./BackButton";

type AuthShellProps = {
  title: string;
  subtitle: string;
  image: { src: string; alt: string; bg: string };
  showBack?: boolean;
  children: React.ReactNode;
};

// Layout for login/signup:
// - mobile: hero image on top with a curved bottom-right edge, form below
// - tablet: the same layout as a centered card
// - desktop: split screen, sticky image on the left, form on the right
export default function AuthShell({ title, subtitle, image, showBack, children }: AuthShellProps) {
  return (
    <div className="min-h-dvh md:grid md:place-items-center md:px-6 md:py-12 lg:block lg:p-0">
      <div className="w-full md:max-w-[500px] md:overflow-hidden md:rounded-[28px] md:bg-background md:shadow-[0_20px_60px_-20px_rgba(60,40,20,0.25)] md:ring-1 md:ring-black/5 lg:grid lg:min-h-dvh lg:max-w-none lg:grid-cols-2 lg:rounded-none lg:shadow-none lg:ring-0">
        <div
          className="relative h-44 overflow-hidden rounded-br-[96px] sm:h-60 md:h-64 md:rounded-br-[120px] lg:sticky lg:top-0 lg:h-dvh lg:self-start lg:rounded-br-[220px]"
          style={{ backgroundColor: image.bg }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 500px, 100vw"
            className="object-cover object-top"
          />
          {showBack && <BackButton />}
        </div>

        <section className="px-5 pb-10 pt-7 md:px-9 md:pb-12 md:pt-9 lg:flex lg:items-center lg:justify-center lg:px-12 lg:py-16">
          <div className="w-full lg:max-w-[440px]">
            <h1 className="text-[22px] font-medium leading-tight md:text-[26px] lg:text-[32px]">{title}</h1>
            <p className="mt-1 text-[13px] text-foreground/80 md:text-sm lg:mt-2 lg:text-base">{subtitle}</p>
            <div className="mt-6 lg:mt-8">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
