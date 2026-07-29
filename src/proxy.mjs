import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login", "/_next"];
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (!isPublic) {
    const userCookie = request.cookies.get("gsp_auth");
    if (!userCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/login") {
    const userCookie = request.cookies.get("gsp_auth");
    if (userCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
