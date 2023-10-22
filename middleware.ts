import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/sign-in", "/sign-up"];
const protectedRoutes = ["/dashboard", "/settings", "/profile", "/security"];

export function middleware(request: NextRequest) {
  const usernameCookie = request.cookies.get("cookieName");
  const passwordCookie = request.cookies.get("cookieTrue");
  const cookieValue = usernameCookie?.value;
  const cookieTrueValue = passwordCookie?.value;

  const response = NextResponse.next();

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    response.cookies.set({
      name: "cookieName",
      value: "undefined",
      path: "/",
    });
    response.cookies.set({
      name: "cookieTrue",
      value: "undefined",
      path: "/",
    });
  }

  if (
    cookieValue === "undefined" &&
    cookieTrueValue === "undefined" &&
    protectedRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (
    cookieTrueValue === "true" &&
    cookieValue === "true" &&
    publicRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return response;
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
