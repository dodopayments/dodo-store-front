import { LinkBreak } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
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