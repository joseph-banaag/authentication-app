"use client"
import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function LoadingSample() {
    return (
        <div className="w-full min-h-screen flex flex-1 flex-col justify-center items-center">
            <Card className="w-[75%] min-h-screen space-y-5 p-24 rounded-2xl ">
                <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
                <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </div>
            </Card>
        </div>
    );
}
