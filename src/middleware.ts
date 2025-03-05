import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const requestUrl = request.nextUrl;
  const params = requestUrl.pathname.split("/")[1];
  const response = NextResponse.next();
  
  // Add debug logging to see all relevant URL information
  console.log({
    host: requestUrl.host,
    hostname: requestUrl.hostname,
    fullUrl: request.url,
    headers: Object.fromEntries(request.headers.entries())
  });
  
  switch (requestUrl.host.split(".")[0] || "test") {
    case "test":
      response.cookies.set("mode", "test");
      response.cookies.set("slug", params ?? "");
      return NextResponse.rewrite(request.url, response);
    case "store":
      response.cookies.set("mode", "live");
      response.cookies.set("slug", params ?? "");
      return NextResponse.rewrite(request.url, response);
    default:
      response.cookies.set("mode", "test");
      response.cookies.set("slug", params ?? "");
      return NextResponse.rewrite(request.url, response);
  }
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
