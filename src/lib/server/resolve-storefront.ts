import { headers } from "next/headers";

export type Mode = "test" | "live";

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

export function useServerHeaders() {
  // Small helper to get a snapshot of headers in server context
  return headers();
}
