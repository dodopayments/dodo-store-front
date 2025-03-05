export default function LoadingShimmer() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-bg-secondary rounded-lg mb-4"></div>
      <div className="h-4 bg-bg-secondary rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-bg-secondary rounded w-1/2"></div>
    </div>
  );
} 