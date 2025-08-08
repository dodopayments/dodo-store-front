'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from '@phosphor-icons/react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-bg-primary flex flex-col items-center justify-center">
      <div className="rounded-full bg-bg-secondary w-fit p-4">
        <AlertCircle className="w-6 h-6 text-text-warning" />
      </div>
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-semibold font-display mb-2">
          Something went wrong
        </h1>
        <p className="text-text-secondary mb-6">
          We encountered an error while loading this storefront. Please try again.
        </p>
        <Button onClick={() => reset()} variant="secondary">
          Try again
        </Button>
      </div>
    </main>
  );
}