import React from 'react'
import Image from "next/image";
import { Link } from '@nextui-org/react';

export default function BrandLogo(): React.ReactNode {

  const logo = {
    src: "/assets/logo/user_logo.svg",
    name: "Logo"
  }

  return (
    <>
      <Link href="/dashboard">
        <Image
          priority
          src={logo.src}
          alt={logo.name}
          width={48}
          height={48}
          style={{
            objectFit: "cover",
          }}
          className="sm:w-10 w-7 sm:h-10 h-7 border-2 rounded-md border-default-200/80"
        />
      </Link>

      <Link
        href="/dashboard"
      >
        <p className="lg:text-2xl md:text-xl sm:text-lg font-bold nav_name cursor-pointer sm:flex hidden drop-shadow-lg !text-[#FB542B]">Authentication</p>
      </Link>
    </>
  )
}
