import { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Header from "@/components/header";
import { ProductGrid } from "@/components/product/ProductGrid";
import Banner from "@/components/ui/dodoui/banner";
import { getStorefrontData } from "@/lib/storefront";
import { getStorefrontConfig } from "@/lib/api-client";
import { StorefrontProvider } from "@/context/storefront-context";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  const { business } = await getStorefrontData(slug, host);
  
  if (!business) {
    return {
      title: "Storefront Not Found - Dodo Payments",
    };
  }

  return {
    title: business.name,
    description: business.description || `Shop at ${business.name}`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  // Fetch all data server-side
  const { business, products, subscriptions, mode } = await getStorefrontData(slug, host);
  const { checkoutUrl } = getStorefrontConfig(host);

  if (!business) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      <Banner mode={mode} />
      <Header business={business} />
      <StorefrontProvider checkoutUrl={checkoutUrl || ""} mode={mode} slug={slug}>
        <section className="flex flex-col pb-20 items-center max-w-[1145px] mx-auto justify-center mt-10 px-4">
          {products.length > 0 && (
            <ProductGrid title="Products" products={products} />
          )}

          {subscriptions.length > 0 && (
            <div className="mt-8 w-full">
              <ProductGrid title="Subscriptions" products={subscriptions} />
            </div>
          )}
        </section>
      </StorefrontProvider>
    </main>
  );
}