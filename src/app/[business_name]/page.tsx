import Header from "@/components/header";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Suspense } from "react";
import { ProductCardProps } from "@/components/product/ProductCard";

async function getProducts(): Promise<ProductCardProps[]> {
  return [
    {
      id: "1",
      name: "Product 1",
      price: 100,
      discount_price: 80,
      description: "This is test description for the product 1.",
    },
    {
      id: "2",
      name: "Product 2",
      price: 100,
      description: "This is test description for the product 2.",
    },
    {
      id: "3",
      name: "Product 3",
      price: 100,
      discount_price: 80,
      description: "This is test description for the product 3.",
    },
    {
      id: "4",
      name: "Product 4",
      price: 100,
      description: "This is test description for the product 4.",
    },
    {
      id: "5",
      name: "Product 5",
      price: 100,
      description: "This is test description for the product 5.",
    },
  ];
}

async function getSubscriptions(): Promise<ProductCardProps[]> {
  return [
    {
      id: "1",
      name: "Product 1",
      price: 100,
      discount_price: 80,
      description: "This is test description for the product 1.",
    },
    {
      id: "2",
      name: "Product 1",
      price: 100,
      discount_price: 80,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: "3",
      name: "Product 1",
      price: 100,
      discount_price: 80,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: "4",
      name: "Product 1",
      price: 100,
      discount_price: 80,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];
}

export default async function Page() {
  const [products, subscriptions] = await Promise.all([
    getProducts(),
    getSubscriptions(),
  ]);

  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />
      <section className="flex flex-col pb-20 items-center max-w-[1145px] mx-auto justify-center mt-10 px-4">
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid title="Products" products={products} />
        </Suspense>

        <div className="mt-8 w-full">
          <Suspense fallback={<div>Loading subscriptions...</div>}>
            <ProductGrid title="Subscriptions" products={subscriptions} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
