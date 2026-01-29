// middleware.js - SSOT 07번 2-1절: 언어 자동 감지

import { NextResponse } from "next/server";

const SUPPORTED_LANGS = ["en", "ja", "es", "fr", "pt"];
const DEFAULT_LANG = "en";

function detectLanguage(acceptLanguage) {
  if (!acceptLanguage) return DEFAULT_LANG;
  const langs = acceptLanguage.split(",").map((l) => l.split(";")[0].trim().substring(0, 2).toLowerCase());
  for (const lang of langs) {
    if (SUPPORTED_LANGS.includes(lang)) return lang;
  }
  return DEFAULT_LANG;
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }
  
  const hasLangPrefix = SUPPORTED_LANGS.some(
    (lang) => pathname.startsWith("/" + lang + "/") || pathname === "/" + lang
  );
  
  if (hasLangPrefix) {
    return NextResponse.next();
  }
  
  if (pathname.startsWith("/product/")) {
    const acceptLanguage = request.headers.get("accept-language") || "";
    const detectedLang = detectLanguage(acceptLanguage);
    const newUrl = new URL("/" + detectedLang + pathname, request.url);
    return NextResponse.redirect(newUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
