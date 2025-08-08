import { cache } from 'react';

// Server-side API configuration
const getApiUrl = (mode: 'test' | 'live') => {
  return mode === 'live' 
    ? process.env.LIVE_API_URL || process.env.NEXT_PUBLIC_LIVE_API_URL
    : process.env.TEST_API_URL || process.env.NEXT_PUBLIC_TEST_API_URL;
};

const getCheckoutUrl = (mode: 'test' | 'live') => {
  return mode === 'live'
    ? process.env.LIVE_CHECKOUT_URL || process.env.NEXT_PUBLIC_LIVE_CHECKOUT_URL
    : process.env.TEST_CHECKOUT_URL || process.env.NEXT_PUBLIC_TEST_CHECKOUT_URL;
};

// Determine the API mode based on the host
export const getApiMode = (host: string): 'test' | 'live' => {
  const subdomain = host.split('.')[0];
  return subdomain === 'store' ? 'live' : 'test';
};

// Server-side API client
export const createApiClient = (mode: 'test' | 'live') => {
  const baseURL = getApiUrl(mode);
  
  const apiRequest = async (
    endpoint: string,
    options?: {
      params?: Record<string, any>;
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      body?: any;
      revalidate?: number | false;
      tags?: string[];
    }
  ) => {
    const url = new URL(`${baseURL}${endpoint}`);
    
    // Add query parameters
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const fetchOptions: RequestInit = {
      method: options?.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': options?.revalidate === false 
          ? 'no-store' 
          : `s-maxage=${options?.revalidate ?? 60}, stale-while-revalidate`,
      },
      // Cache configuration for Next.js
      next: {
        revalidate: options?.revalidate ?? 60, // Default 60 seconds cache
        tags: options?.tags,
      },
    };

    if (options?.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url.toString(), fetchOptions);

      if (!response.ok) {
        const errorData = await response.text();
        const error = new Error(`API Error: ${response.status} ${response.statusText}`);
        (error as any).status = response.status;
        (error as any).statusText = response.statusText;
        (error as any).data = errorData;
        throw error;
      }

      return response.json();
    } catch (error) {
      // Network error or other fetch failures
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        const networkError = new Error('Network error: Unable to reach the server');
        (networkError as any).isNetworkError = true;
        throw networkError;
      }
      throw error;
    }
  };

  return {
    get: (endpoint: string, options?: Omit<Parameters<typeof apiRequest>[1], 'method'>) => 
      apiRequest(endpoint, { ...options, method: 'GET' }),
    post: (endpoint: string, body?: any, options?: Omit<Parameters<typeof apiRequest>[1], 'method' | 'body'>) => 
      apiRequest(endpoint, { ...options, method: 'POST', body }),
    put: (endpoint: string, body?: any, options?: Omit<Parameters<typeof apiRequest>[1], 'method' | 'body'>) => 
      apiRequest(endpoint, { ...options, method: 'PUT', body }),
    delete: (endpoint: string, options?: Omit<Parameters<typeof apiRequest>[1], 'method'>) => 
      apiRequest(endpoint, { ...options, method: 'DELETE' }),
  };
};

// Export mode and checkout URL helpers
export const getStorefrontConfig = (host: string) => {
  const mode = getApiMode(host);
  return {
    mode,
    checkoutUrl: getCheckoutUrl(mode),
    apiUrl: getApiUrl(mode),
  };
};