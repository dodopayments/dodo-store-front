import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { resolveModeFromHost } from "@/lib/server/resolve-storefront";
import { getBusiness } from "@/lib/server/storefront-client";

export async function GET(
  _req: Request,
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

  try {
    const business = await getBusiness(mode, slug);
    return NextResponse.json(business, {
      status: 200,
      // Optional caching headers for CDN/edge
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err: any) {
    const message = err?.message || "Failed to fetch business";
    const status = /404/.test(message) ? 404 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
