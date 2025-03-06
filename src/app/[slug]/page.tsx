import Header, { Business } from "@/components/header";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Suspense } from "react";

import { getServerConfig } from "@/lib/http";
import { LinkBreak } from "@phosphor-icons/react/dist/ssr";
import LoadingShimmer from "@/components/LoadingShimmer";
import {
  OneTimeProductApiResponse,
  RecurringProductApiResponse,
} from "@/type/product";
import Banner from "@/components/ui/dodoui/banner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const { api } = await getServerConfig();
    const response = await api.get(`/storefront/${slug}`);

    return {
      title: response.data.name || "Dodopayment Storefront",
      description: response.data.description || "Dodopayment Storefront",
    };
  } catch {
    return {
      title: "Dodopayment Storefront",
      description: "Dodopayment Storefront",
    };
  }
}

async function getBusiness(slug: string): Promise<Business | null> {
  try {
    if (!slug) {
      return null;
    }

    const { api } = await getServerConfig();
    const response = await api.get(`/storefront/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching business:", error);
    return null;
  }
}

function ProductLoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <LoadingShimmer key={i} />
      ))}
    </div>
  );
}

async function ProductSection({ slug }: { slug: string }) {
  if (!slug) return null;

  const { api } = await getServerConfig();
  const response = await api.get(`/storefront/${slug}/products`, {
    params: {
      recurring: false,
    },
  });

  const products = response.data.items.map(
    (product: OneTimeProductApiResponse) => ({
      product_id: product.product_id,
      name: product.name,
      image: product.image,
      price: product.price,
      pay_what_you_want: product.price_detail?.pay_what_you_want,
      description: product.description,
      currency: product.currency,
    })
  );

  if (products.length === 0) return null;

  return <ProductGrid title="Products" products={products} />;
}

async function SubscriptionSection({ slug }: { slug: string }) {
  if (!slug) return null;

  const { api } = await getServerConfig();
  const response = await api.get(`/storefront/${slug}/products`, {
    params: {
      recurring: true,
    },
  });

  const subscriptions = response.data.items.map(
    (product: RecurringProductApiResponse) => ({
      product_id: product.product_id,
      name: product.name,
      image: product.image,
      price: product.price,
      description: product.description,
      currency: product.currency,
      payment_frequency_count: product.price_detail?.payment_frequency_count,
      payment_frequency_interval:
        product.price_detail?.payment_frequency_interval,
      trial_period_days: product.price_detail?.trial_period_days,
    })
  );

  if (subscriptions.length === 0) return null;

  return <ProductGrid title="Subscriptions" products={subscriptions} />;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = await getBusiness(slug);

  if (!business) {
    return (
      <main className="min-h-screen bg-bg-primary flex flex-col items-center justify-center">
        <div className="rounded-full bg-bg-secondary w-fit p-4">
          <LinkBreak className="w-6 h-6" />
        </div>
        <div className="text-center p-8">
          <h1 className="text-2xl font-semibold font-display mb-2">
            Storefront Not Found
          </h1>
          <p className="text-text-secondary">
            This storefront does not exist or is no longer available.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      <Banner />
      <Header business={business} />
      <section className="flex flex-col pb-20 items-center max-w-[1145px] mx-auto justify-center mt-10 px-4">
        <Suspense fallback={<ProductLoadingState />}>
          <ProductSection slug={slug} />
        </Suspense>

        <div className="mt-8 w-full">
          <Suspense fallback={<ProductLoadingState />}>
            <SubscriptionSection slug={slug} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
