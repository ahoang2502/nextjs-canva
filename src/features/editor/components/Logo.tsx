import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="">
      <div className="size-8 relative shrink-0">
        <Image
          src="/logo.png"
          fill
          alt="canva"
          className="shrink-0 hover:opacity-75 transition"
        />
      </div>
    </Link>
  );
};
