import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isCigaretteRedirectPath, VAPE_PAGE_PATH } from "./app/lib/siteConfig";

export function middleware(request: NextRequest) {
  if (!isCigaretteRedirectPath(request.nextUrl.pathname)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = VAPE_PAGE_PATH;
  url.search = "";
  return NextResponse.redirect(url, 302);
}

export const config = {
  matcher: [
    "/cigarettes",
    "/native-cigarettes-jane-finch",
    "/info/native-cigarettes-north-york",
    "/info/native-cigarettes-york",
    "/resources/native-smokes",
    "/resources/native-smokes/:path*",
    "/guides/:slug",
    "/item/:slug",
  ],
};
