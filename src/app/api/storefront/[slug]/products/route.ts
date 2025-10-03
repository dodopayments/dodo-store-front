import { createStorefrontRouteHandler } from "@/lib/server/storefront-route-handler";
import { getProducts } from "@/lib/server/storefront-client";

export const GET = createStorefrontRouteHandler(async (mode, slug, url) => {
  const recurring = url.searchParams.get("recurring") === "true";
  const raw = url.searchParams.get("page_size");
  const page_size = Math.min(Math.max(Number(raw) || 100, 1), 100);
  return getProducts(mode, slug, { recurring, page_size });
});
