import { type NextRequest, NextResponse } from "next/server";
import { pageList } from "./configs/routes";
import { findRouteByPathname } from "./utils/find-route";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const cookies = request.cookies;
  const jwt = cookies.get("jwt")?.value;
  const response = NextResponse.next();

  // check jwt expired
  if (jwt) {
    const decoded = JSON.parse(atob(jwt.split(".")[1]));
    const expired = decoded.exp * 1000;
    const now = Date.now();
    if (now > expired) {
      const redirectUrl = new URL(pageList.home.href, request.url);
      return NextResponse.redirect(redirectUrl).cookies.delete("jwt");
    }
  }
  // check route is exist
  const routeFound = findRouteByPathname(url.pathname);

  if (!routeFound) {
    return response;
  }
  // check route is auth and customer not logged in
  if (!jwt && routeFound.isAuth) {
    const redirectUrl = new URL(pageList.login.href, request.url);
    return NextResponse.redirect(redirectUrl);
  }
  // access to login page while logged in
  if (jwt && routeFound.href === pageList.login.href) {
    const redirectUrl = new URL(pageList.home.href, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|images|fonts|manifest|serviceworker|favicon.ico|robots.txt).*)",
    "/",
  ],
};
