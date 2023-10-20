import SkeletonLoader from "@/components/skeletons/Loader";
import React from "react";

export default function Loading(): React.JSX.Element | null {
  return (
    <>
      <SkeletonLoader />
    </>
  );
}
