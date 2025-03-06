import { NextResponse, type NextRequest } from "next/server";
import { parseHostname } from "./lib/parse-hostname";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || '';
  const { mode } = parseHostname(hostname);
  
  const response = NextResponse.next();
  response.cookies.set("mode", mode);
  
  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
