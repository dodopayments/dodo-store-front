import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { resolveModeFromHost } from "@/lib/server/resolve-storefront";
import { getProducts } from "@/lib/server/storefront-client";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const h = await headers();
  const mode = resolveModeFromHost(h);
  const slug = params.slug;

  if (!slug) {
    return NextResponse.json(
      { error: "Missing storefront slug" },
      { status: 400 }
    );
  }

  const url = new URL(req.url);
  const page_size = Number(url.searchParams.get("page_size") || 100);

  try {
    const data = await getProducts(mode, slug, { recurring: true, page_size });
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err: any) {
    const message = err?.message || "Failed to fetch subscriptions";
    const status = /404/.test(message) ? 404 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
