"use client";
import React, { useEffect, useState } from "react";
import { bgIllustration } from "@/components/constants";
import { Image } from "@nextui-org/react";
import Link from "next/link";

export default function NotFound(): React.JSX.Element | null {
  const [mounted, setMounted] = useState<boolean | null>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      {mounted ? (
        <div className="text-foreground/80 flex flex-1 w-full h-screen justify-center items-center gap-8 flex-col fadeIn">
          <h2 className="text-4xl text-foreground/80 drop-shadow-xl font-bold">
            Something went wrong!
          </h2>
          <Image
            src={bgIllustration.errorNotFound.src}
            alt={bgIllustration.errorNotFound.name}
            width={600}
            height={600}
            style={{
              objectFit: "cover",
            }}
            className="fade-in-bg"
          />
          <Link
            href="/"
            className="bg-[#661fe0] px-5 py-2 rounded-2xl text-xl font-semibold hover:scale-105 hover:bg-[hsl(262,76%,30%)] transition-all duration-300 shadow-lg shadow-background/70"
          >
            Home
          </Link>
        </div>
      ) : null}
    </>
  );
}
