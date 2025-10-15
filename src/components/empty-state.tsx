import IconColors from "@/components/custom/icon-colors";
import { Package } from "@phosphor-icons/react/dist/ssr";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title = "No products available",
  description = "This storefront doesn't have any products yet. Check back soon!",
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <IconColors icon={icon || <Package className="w-12 h-12" />} />
      <h3 className="text-xl font-display font-semibold text-text-primary mt-6">
        {title}
      </h3>
      <p className="text-sm text-text-secondary text-center max-w-md mt-2">
        {description}
      </p>
    </div>
  );
}

