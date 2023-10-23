import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/sign-in", "/sign-up"];
const protectedRoutes = ["/dashboard", "/settings", "/profile", "/security"];

export function middleware(request: NextRequest) {
  const isAuthValue = request.cookies.get("isAuth")?.value;
  const cookieValueRegEx = /^[a-zA-Z0-9]{30}$/;
  const cookieValueToString = `${isAuthValue}`;
  const randomResult = cookieValueRegEx.test(cookieValueToString);

  const response = NextResponse.next();

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    response.cookies.set({
      name: "",
      value: "",
      path: "",
    });
  }

  if (
    !isAuthValue &&
    randomResult === false &&
    protectedRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (
    isAuthValue &&
    randomResult === true &&
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
