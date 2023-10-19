import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const unprotectedRoutes = ["/", "/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const usernameCookie = request.cookies.get("cookieName");
  const cookieValue = usernameCookie?.value;

  if (cookieValue && unprotectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!cookieValue) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/settings")) {
    if (!cookieValue) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/profile")) {
    if (!cookieValue) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/security")) {
    if (!cookieValue) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*",
    "/sign-i/:path*",
    "/sign-u/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/security/:path*",
    "/profile/:path*",
  ],
};
