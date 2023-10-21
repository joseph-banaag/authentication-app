"use client";
import React, { useEffect, useState } from "react";
import { bgIllustration } from "@/components/constants";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound({
  error,
}: {
  error: Error & { digest?: string };
}): React.JSX.Element | null {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    console.error(error);
    setIsClient(true);
  }, [error]);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 0.5 }}
      >
        <div className="text-foreground/80 flex flex-1 w-full h-screen justify-center items-center gap-8 flex-col">
          <h2 className="text-4xl text-foreground/80 drop-shadow-xl font-bold">
            {isClient ? "Something went wrong!" : ""}
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
      </motion.div>
    </>
  );
}
