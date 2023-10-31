import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const publicRoutes = ["/", "/sign-in", "/sign-up"];
const protectedRoutes = ["/dashboard", "/settings", "/profile", "/security"];
const secretAccess = process.env.ACCESS_TOKEN_SECRET;
const privateKey = `${secretAccess}`;

export function middleware(request: NextRequest) {
  const isAuthValue = request.cookies.get("isAuth")?.value;
  const cookieValueRegEx = /^[a-zA-Z0-9]{30}$/;
  const cookieValueToString = `${isAuthValue}`;
  const randomResult = cookieValueRegEx.test(cookieValueToString);
  const response = NextResponse.next();

  {
    /*

  const decoded = jwt.verify(token, privateKey, function (err, decoded) {
        try {
          if (!err && decoded) {
            console.log(decoded);
          }
        } catch (error) {
          throw new Error(`Something went wrong. Error: ${error}`);
        }
      });
      console.log("decoded: ", decoded);
*/
  }

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
