import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const runtime = "experimental-edge";

const unprotectedRoutes = ["/", "/sign-in", "/sign-up"];
const protectedRoutes = ["/dashboard", "/settings", "/profile", "/security"];
const pathPattern =
  /^\/(?!$|dashboard$|profile$|settings$|security$|sign-in$|sign-up$)[a-zA-Z0-9_-]+\/?$/;

export function middleware(request: NextRequest) {
  const usernameCookie = request.cookies.get("cookieName");
  const cookieValue = usernameCookie?.value;

  if (pathPattern.test(request.nextUrl.pathname) === true) {
    return NextResponse.rewrite(new URL("/notFound", request.url));
  }

  if (cookieValue && unprotectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!cookieValue && protectedRoutes.includes(request.nextUrl.pathname)) {
    console.log("no user");
    return NextResponse.redirect(new URL("/", request.url));
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
