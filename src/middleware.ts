import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const requestUrl = request.nextUrl;
  const params = requestUrl.pathname.split("/")[1];
  const response = NextResponse.next();

  const host = request.headers.get("host") || requestUrl.host;
  console.log(host);
  const subdomain = host.split(".")[0];
  console.log(subdomain);
  switch (subdomain) {
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
