import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const publicRoutes = ["/", "/sign-in", "/sign-up"];
const protectedRoutes = ["/dashboard", "/settings", "/profile", "/security"];
const pathPattern =
  /^\/(?!$|dashboard$|profile$|settings$|security$|sign-in$|sign-up$)[a-zA-Z0-9_-]+\/?$/;

export function middleware(request: NextRequest) {
  const usernameCookie = request.cookies.get("cookieName");
  const passwordCookie = request.cookies.get("cookieTrue");
  const cookieValue = usernameCookie?.value;
  const cookieTrueValue = passwordCookie?.value;

  console.log("password", cookieTrueValue);
  console.log("username", cookieValue);

  if (pathPattern.test(request.nextUrl.pathname) === true) {
    return NextResponse.rewrite(new URL("/notFound", request.url));
  }

  if (
    cookieValue === "undefined" &&
    cookieTrueValue === "undefined" &&
    protectedRoutes.includes(request.nextUrl.pathname)
  ) {
    console.log("no user");
    return NextResponse.redirect(new URL("/", request.url));
  } else if (
    cookieTrueValue === "true" &&
    cookieValue === "true" &&
    publicRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
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
