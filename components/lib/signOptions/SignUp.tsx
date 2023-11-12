import React from "react";
import { Button, Link } from "@nextui-org/react";

export default function SignUp() {
  return (
    <>
      <Button
        as={Link}
        size="sm"
        href="/sign-up"
        variant="flat"
        className="hidden sm:flex !text-white font-semibold bg-[#af2604]"
      >
        <p className="px-1 text-sm">Sign Up</p>
      </Button>
    </>
  );
}
