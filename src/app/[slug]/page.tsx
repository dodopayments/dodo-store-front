import Header, { Business } from "@/components/header";
import { ProductGrid } from "@/components/product/ProductGrid";
import Banner from "@/components/ui/dodoui/banner";
import { ProductCardProps } from "@/components/product/ProductCard";
import { headers } from "next/headers";
import { getOrigin, getCheckoutBaseUrl, resolveModeFromHost } from "@/lib/server/resolve-storefront";
import { notFound } from "next/navigation";

type ProductsResponse = {
  items: Array<{
    product_id: string;
    name: string;
    image?: string | null;
    price: number;
    currency: string;
    description?: string | null;
    price_detail?: {
      pay_what_you_want?: boolean;
      payment_frequency_count?: number;
      payment_frequency_interval?: string;
      trial_period_days?: number;
    };
  }>;
};

async function getData(slug: string) {
  const h = await headers();
  const origin = getOrigin(h);
  const mode = resolveModeFromHost(h);
  const checkoutBaseUrl = getCheckoutBaseUrl(mode);

  const businessReq = fetch(`${origin}/api/storefront/${slug}/business`, {
    cache: "no-store",
  });
  const productsReq = fetch(
    `${origin}/api/storefront/${slug}/products?page_size=100&recurring=false`,
    { cache: "no-store" }
  );
  const subsReq = fetch(
    `${origin}/api/storefront/${slug}/subscriptions?page_size=100`,
    { cache: "no-store" }
  );

  const [businessRes, productsRes, subsRes] = await Promise.all([
    businessReq,
    productsReq,
    subsReq,
  ]);

  if (businessRes.status === 404) {
    return { notFound: true as const };
  }
  if (!businessRes.ok) {
    throw new Error(`Business fetch failed: ${businessRes.status}`);
  }

  const business = (await businessRes.json()) as Business;
  const productsJson = (await productsRes.json()) as ProductsResponse;
  const subsJson = (await subsRes.json()) as ProductsResponse;

  const products: ProductCardProps[] = (productsJson.items || []).map((p) => ({
    product_id: p.product_id,
    name: p.name,
    image: p.image || undefined,
    price: p.price,
    pay_what_you_want: p.price_detail?.pay_what_you_want,
    description: p.description || "",
    currency: p.currency,
  }));

  const subscriptions: ProductCardProps[] = (subsJson.items || []).map((p) => ({
    product_id: p.product_id,
    name: p.name,
    image: p.image || undefined,
    price: p.price,
    description: p.description || "",
    currency: p.currency,
    payment_frequency_count: p.price_detail?.payment_frequency_count,
    payment_frequency_interval: p.price_detail?.payment_frequency_interval,
    trial_period_days: p.price_detail?.trial_period_days,
  }));

  return { business, products, subscriptions, mode, checkoutBaseUrl } as const;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const h = await headers();
    const origin = getOrigin(h);
    const { slug } = await params;
    const res = await fetch(`${origin}/api/storefront/${slug}/business`, {
      cache: "no-store",
    });
    if (!res.ok) return { title: "Dodo Payments" };
    const business = (await res.json()) as Business;
    return { title: business.name ?? "Dodo Payments" };
  } catch {
    return { title: "Dodo Payments" };
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getData(slug);
  if ("notFound" in data) return notFound();

  const { business, products, subscriptions, mode, checkoutBaseUrl } = data;

  return (
    <main className="min-h-screen bg-bg-primary">
      <Banner mode={mode} />
      <Header business={business} />
      <section className="flex flex-col pb-20 items-center max-w-[1145px] mx-auto justify-center mt-10 px-4">
        {products.length > 0 && (
          <ProductGrid title="Products" products={products} checkoutBaseUrl={checkoutBaseUrl} />
        )}

        {subscriptions.length > 0 && (
          <div className="mt-8 w-full">
            <ProductGrid title="Subscriptions" products={subscriptions} checkoutBaseUrl={checkoutBaseUrl} />
          </div>
        )}
      </section>
    </main>
  );
}
