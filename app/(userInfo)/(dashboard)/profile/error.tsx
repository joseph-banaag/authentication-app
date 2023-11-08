"use client";
import React, { useEffect, useState } from "react";
import { bgIllustration } from "@/components/constants";
import { Image } from "@nextui-org/react";

export default function Error({
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
      <div className="errorPageContainer">
        <h2 className="errorPageHeader">
          {isClient ? "Something went wrong!" : ""}
        </h2>
        <Image
          src={bgIllustration.unexpectedError.src}
          alt={bgIllustration.unexpectedError.name}
          width={600}
          height={600}
          style={{
            objectFit: "cover",
          }}
          className="fadeIn"
        />
        <button onClick={() => location.reload()} className="errorPageBtn">
          Try again
        </button>
      </div>
    </>
  );
}
