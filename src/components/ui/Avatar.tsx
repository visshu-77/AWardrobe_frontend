import Image from "next/image";

type AvatarProps = { name: string; src?: string | null; size?: number };

// Profile photo when available, otherwise the first letter of the name.
export default function Avatar({ name, src, size = 32 }: AvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        unoptimized
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#e9a27c] to-[#c46d49] text-sm font-medium uppercase text-white"
      style={{ width: size, height: size }}
    >
      {name.trim().charAt(0) || "?"}
    </span>
  );
}
