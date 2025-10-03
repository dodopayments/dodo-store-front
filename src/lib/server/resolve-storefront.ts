import { headers } from "next/headers";
import type { Mode } from "@/types/storefront";

type HeaderLike = { get(name: string): string | null };

export function resolveModeFromHost(h: HeaderLike): Mode {
  const host = h.get("host") || "";
  const subdomain = host.split(".")[0];
  // Convention: 'store' subdomain means live; otherwise test
  return subdomain === "store" ? "live" : "test";
}

export function getOrigin(h: HeaderLike): string {
  const proto = h.get("x-forwarded-proto") || (process.env.NODE_ENV === "production" ? "https" : "http");
  const host = h.get("host") || "localhost:3000";
  return `${proto}://${host}`;
}

export async function useServerHeaders() {
  // Small helper to get a snapshot of headers in server context (Next 15: async)
  return await headers();
}

export function getCheckoutBaseUrl(mode: Mode): string {
  const base = mode === "live" ? process.env.DODO_LIVE_CHECKOUT_URL : process.env.DODO_TEST_CHECKOUT_URL;
  if (!base) {
    throw new Error(`Missing checkout base URL for mode=${mode}. Set DODO_LIVE_CHECKOUT_URL and DODO_TEST_CHECKOUT_URL.`);
  }
  return base.replace(/\/$/, "");
}
