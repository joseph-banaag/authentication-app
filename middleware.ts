import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware() {}

export const config = {
  matcher: ["/dashboard/ :path*", "/api/ :path*"],
};
