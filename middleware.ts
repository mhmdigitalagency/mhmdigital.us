import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedPrefixes = ["/profile", "/checkout", "/admin"];

function isProtected(pathname: string) {
  return protectedPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isAuthRoute(pathname: string) {
  return pathname === "/connexion" || pathname.startsWith("/connexion/")
    || pathname === "/inscription" || pathname.startsWith("/inscription/");
}

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const sessionCookie = getSessionCookie(req);
  const isLoggedIn = !!sessionCookie;

  if (isProtected(pathname) && !isLoggedIn) {
    const loginUrl = new URL("/connexion", req.url);
    loginUrl.searchParams.set("callbackURL", pathname + nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute(pathname) && isLoggedIn) {
    const cb = nextUrl.searchParams.get("callbackURL");
    const safeCb = cb && cb.startsWith("/") ? cb : "/profile";
    return NextResponse.redirect(new URL(safeCb, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
