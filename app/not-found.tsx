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
      <div className="errorPageContainer !gap-8">
        <h2 className="errorPageHeader">Something went wrong!</h2>
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
        <Link href="/" className="errorPageBtn text-white/70">
          Home
        </Link>
      </div>
    </>
  );
}
