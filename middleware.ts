import type { Session } from "better-auth/types";

import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

// ---

const notAuthenticated = ["/login", "/setup"];

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const isNotAuthenticatedRoute = notAuthenticated.includes(
    request.nextUrl.pathname,
  );

  if (isNotAuthenticatedRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && !isNotAuthenticatedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|logo|robots.txt|403|404|500).*)",
  ],
};
