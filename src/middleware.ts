import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const origin = url.origin;
  const path = url.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  requestHeaders.set("x-origin", origin);
  requestHeaders.set("x-pathname", path);

  const { pathname } = request.nextUrl;
  const cayp = request.cookies.get("yp_tkn");

  if (typeof cayp == "undefined") {
    if (!pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth/login", request.url), {headers: requestHeaders});
    }
  } else {
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", request.url), {headers: requestHeaders});
    }
  }

  const response = NextResponse.next({headers: requestHeaders});
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|icons|favicon.ico).*)",
  ],
}