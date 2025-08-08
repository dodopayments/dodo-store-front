'use client';

import { useEffect } from 'react';

export function WebVitals() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'web-vital' in window) {
      // Log Core Web Vitals
      const logVital = (metric: any) => {
        console.log(`${metric.name}: ${metric.value}`);
        // You can send these to your analytics service
      };

      // @ts-ignore
      window.webVitals.getCLS(logVital);
      // @ts-ignore
      window.webVitals.getFID(logVital);
      // @ts-ignore
      window.webVitals.getLCP(logVital);
    }
  }, []);

  return null;
}