import { ProductCard, ProductCardProps } from "./ProductCard";

interface ProductGridProps {
  title: string;
  products: ProductCardProps[];
}

export function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <>
      <h2 className="text-text-primary w-full mb-6 text-left font-display text-lg font-medium">
        {title}
      </h2>
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-start gap-6">
        {products.map((product, index) => (
          <ProductCard  key={`${product.name}-${index}`} {...product} />
        ))}
      </div>
    </>
  );
} 