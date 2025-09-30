import { Mode } from "./resolve-storefront";

function getBaseUrl(mode: Mode): string {
  const base = mode === "live" ? process.env.DODO_LIVE_API_URL : process.env.DODO_TEST_API_URL;
  if (!base) {
    throw new Error(`Missing API base URL for mode=${mode}. Set DODO_LIVE_API_URL and DODO_TEST_API_URL.`);
  }
  return base.replace(/\/$/, "");
}

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    // Disable Next cache by default for freshness; tune as needed
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upstream request failed ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export type BusinessResponse = {
  name: string;
  // extend as needed based on upstream shape
  [k: string]: unknown;
};

export type OneTimeProductApiResponse = {
  product_id: string;
  name: string;
  image?: string | null;
  price: number;
  currency: string;
  description?: string | null;
  price_detail?: {
    pay_what_you_want?: boolean;
  };
};

export type RecurringProductApiResponse = {
  product_id: string;
  name: string;
  image?: string | null;
  price: number;
  currency: string;
  description?: string | null;
  price_detail?: {
    payment_frequency_count?: number;
    payment_frequency_interval?: string;
    trial_period_days?: number;
  };
};

export async function getBusiness(mode: Mode, slug: string) {
  const base = getBaseUrl(mode);
  const url = `${base}/storefront/${encodeURIComponent(slug)}`;
  return fetchJson<BusinessResponse>(url);
}

export async function getProducts(
  mode: Mode,
  slug: string,
  opts: { recurring: boolean; page_size?: number } = { recurring: false }
) {
  const base = getBaseUrl(mode);
  const params = new URLSearchParams();
  params.set("recurring", String(opts.recurring));
  params.set("page_size", String(opts.page_size ?? 100));
  const url = `${base}/storefront/${encodeURIComponent(slug)}/products?${params.toString()}`;
  return fetchJson<{ items: Array<OneTimeProductApiResponse | RecurringProductApiResponse> }>(url);
}
