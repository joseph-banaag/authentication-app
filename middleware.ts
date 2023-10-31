import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import Authenticate from "@/app/api/actions/actions";

const publicRoutes = ["/", "/sign-in", "/sign-up"];
const protectedRoutes = ["/dashboard", "/settings", "/profile", "/security"];

export function middleware(request: NextRequest) {
  {
    Authenticate();
  }
  const isAuthValue = request.cookies.get("isAuth")?.value;
  const cookieValueRegEx = /^[a-zA-Z0-9]{30}$/;
  const cookieValueToString = `${isAuthValue}`;
  const randomResult = cookieValueRegEx.test(cookieValueToString);
  const response = NextResponse.next();
  const cookieJar = cookies();
  const token = cookieJar.get("decoded")?.value;
  const jwt = `${token}`;

  console.log("JWT", jwt);

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    response.cookies.set({
      name: "",
      value: "",
      path: "/",
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
    "/sign-in/:path*",
    "/sign-up/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/security/:path*",
    "/profile/:path*",
  ],
};
