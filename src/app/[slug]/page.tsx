"use client";
import { useEffect, useState } from "react";
import Header, { Business } from "@/components/header";
import { ProductGrid } from "@/components/product/ProductGrid";

import { LinkBreak } from "@phosphor-icons/react/dist/ssr";
import LoadingOverlay from "@/components/loading-overlay";
import {
  OneTimeProductApiResponse,
  RecurringProductApiResponse,
} from "@/type/product";
import Banner from "@/components/ui/dodoui/banner";
import { ProductCardProps } from "@/components/product/ProductCard";
import { useStorefront } from "@/hooks/useStorefront";
import Head from "next/head";
import { t } from "@/lib/i18n";

export default function Page() {
  const { api, slug, isLoading } = useStorefront();
  const [business, setBusiness] = useState<Business | null>(null);
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [subscriptions, setSubscriptions] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && slug) {
      const fetchData = async () => {
        try {
          const [businessRes, productsRes, subscriptionsRes] = await Promise.all([
            api.get(`/storefront/${slug}`),
            api.get(`/storefront/${slug}/products`, {
              params: { recurring: false, page_size: 100 },
            }),
            api.get(`/storefront/${slug}/products`, {
              params: { recurring: true, page_size: 100 },
            }),
          ]);

          setBusiness(businessRes.data);

          setProducts(
            productsRes.data.items.map((product: OneTimeProductApiResponse) => ({
              product_id: product.product_id,
              name: product.name,
              image: product.image,
              price: product.price,
              pay_what_you_want: product.price_detail?.pay_what_you_want,
              description: product.description,
              currency: product.currency,
            }))
          );

          setSubscriptions(
            subscriptionsRes.data.items.map((product: RecurringProductApiResponse) => ({
              product_id: product.product_id,
              name: product.name,
              image: product.image,
              price: product.price,
              description: product.description,
              currency: product.currency,
              payment_frequency_count: product.price_detail?.payment_frequency_count,
              payment_frequency_interval: product.price_detail?.payment_frequency_interval,
              trial_period_days: product.price_detail?.trial_period_days,
            }))
          );
        } catch (error) {
          console.error("Error fetching data:", error);
          setBusiness(null);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [api, slug, isLoading]);

  useEffect(() => {
    document.title = business?.name
      ? `${business?.name}`
      : "Dodo Payments";
  }, [business]);
  if (loading || isLoading) {
    return <LoadingOverlay />;
  }

  if (!business) {
    return (
      <main className="min-h-screen bg-bg-primary flex flex-col items-center justify-center">
        <div className="rounded-full bg-bg-secondary w-fit p-4">
          <LinkBreak className="w-6 h-6" />
        </div>
        <div className="text-center p-8">
          <h1 className="text-2xl font-semibold font-display mb-2">{t("pages.slug.notFound.title")}</h1>
          <p className="text-text-secondary">{t("pages.slug.notFound.description")}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      <Head>
        <title>{business.name}</title>
      </Head>
      <Banner />
      <Header business={business} />
      <section className="flex flex-col pb-20 items-center max-w-[1145px] mx-auto justify-center mt-10 px-4">
        {products.length > 0 && (
          <ProductGrid title={t("pages.slug.sections.products")} products={products} />
        )}

        {subscriptions.length > 0 && (
          <div className="mt-8 w-full">
            <ProductGrid title={t("pages.slug.sections.subscriptions")} products={subscriptions} />
          </div>
        )}
      </section>
    </main>
  );
}
