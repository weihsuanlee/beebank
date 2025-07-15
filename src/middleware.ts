import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("strapi-jwt")?.value;
  const isLoggedIn = !!token;

  const { pathname } = request.nextUrl;

  // If user is logged in and tries to access homepage or login page, redirect to dashboard
  if (isLoggedIn && ["/login", "/"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not logged in and tries to access protected routes, redirect to login
  if (!isLoggedIn && ["/dashboard", "/"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/login"],
};
