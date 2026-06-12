import { NextRequest, NextResponse } from "next/server";
import ApiError from "./lib/apiError";
import { verifyToken } from "./lib/token";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  /**
   * verify token does not work here as middleware runs on edge runtime
   * and verifyToken function uses node:crypto which is not supported in
   * edge runtime. Hence, we will just check if token exist or not in middleware
   * and do the actual verification in the server action where we can use node:crypto. */
  // try {
  //   const user = verifyToken(token);
  //   console.log("Middleware UserCheck: ", user);

  //   if (!user) {
  //     throw ApiError.NOT_FOUND("No user found");
  //   }

  //   return NextResponse.next();
  // } catch (error) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
