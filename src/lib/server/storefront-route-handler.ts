import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { resolveModeFromHost } from "@/lib/server/resolve-storefront";
import type { Mode } from "@/types/storefront";

export type StorefrontFetcher<T> = (
  mode: Mode,
  slug: string,
  url: URL,
  req: Request
) => Promise<T>;

export function createStorefrontRouteHandler<T>(fetcher: StorefrontFetcher<T>) {
  return async (req: Request, { params }: { params: Promise<{ slug: string }> }) => {
    const h = await headers();
    const mode = resolveModeFromHost(h);
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Missing storefront slug" }, { status: 400 });
    }

    try {
      const url = new URL(req.url);
      const data = await fetcher(mode, slug, url, req);
      return NextResponse.json(data, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch data";
      const status = err && typeof err === 'object' && 'statusCode' in err && typeof err.statusCode === 'number' 
        ? err.statusCode 
        : 502;
      return NextResponse.json({ error: message }, { status });
    }
  };
}
