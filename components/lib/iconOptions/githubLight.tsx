import React from 'react'
import Image from 'next/image';
import { iconsSrc } from "@/components/constants";

export default function GithubLight() {
    return (
        <Image
            src={iconsSrc.githubDark}
            alt={iconsSrc.nameGit}
            width={24}
            height={24}
            style={{
                objectFit: "cover"
            }}
            className="drop-shadow-lg "
        />
    );
}
