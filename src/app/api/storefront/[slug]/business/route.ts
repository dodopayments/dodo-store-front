import { createStorefrontRouteHandler } from "@/lib/server/storefront-route-handler";
import { getBusiness } from "@/lib/server/storefront-client";

export const GET = createStorefrontRouteHandler(async (mode, slug) => {
  return getBusiness(mode, slug);
});
