"use client"

import React from 'react'
import { Spinner } from "@nextui-org/react";

export default function SkeletonLoader(): React.JSX.Element | null {
    return (
        <div className="w-full min-h-screen flex justify-center items-center backdrop-blur-sm">
            <div className="motion-safe:animate-pulse space-y-3 w-unit-9xl m-auto flex flex-col justify-center items-center">
                <div className="">
                    <Spinner color="secondary" labelColor="secondary" size="lg" />
                </div>
                <p className="text-secondary ">Page is loading...</p>
            </div>
        </div>
    )
}
