import React from "react";
import { bgIllustration } from "@/components/constants";
import { Image } from "@nextui-org/react";
import Link from "next/link";

export const metadata = {
  title: "Not-Found | Authentication",
};
export default function NotFound(): React.JSX.Element | null {
  return (
    <>
      <div className="errorPageContainer !gap-8">
        <div className="flex flex-1 justify-center items-center text-center flex-col gap-2 !px-3 !py-6">
          <h2 className="errorPageHeader">Something went wrong!</h2>
          <p className="sm:text-base text-xs text-foreground/70">
            Requested page could not be found
          </p>
        </div>
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
