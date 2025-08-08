import { cache } from 'react';
import { createApiClient, getApiMode } from './api-client';
import { Business } from '@/components/header';
import { ProductCardProps } from '@/components/product/ProductCard';
import {
  OneTimeProductApiResponse,
  RecurringProductApiResponse,
} from '@/type/product';

// Cache the business data for 5 minutes
export const getBusinessData = cache(async (slug: string, mode: 'test' | 'live'): Promise<Business | null> => {
  const api = createApiClient(mode);
  
  try {
    const data = await api.get(`/storefront/${slug}`, {
      revalidate: 300, // Cache for 5 minutes
      tags: [`business-${slug}`, 'business'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching business data:', error);
    return null;
  }
});

// Cache products data for 60 seconds
export const getProducts = cache(async (
  slug: string, 
  mode: 'test' | 'live',
  recurring: boolean = false
): Promise<ProductCardProps[]> => {
  const api = createApiClient(mode);
  
  try {
    const response = await api.get(`/storefront/${slug}/products`, {
      params: { recurring, page_size: 100 },
      revalidate: 60, // Cache for 1 minute
      tags: [`products-${slug}`, recurring ? 'subscriptions' : 'products'],
    });

    if (recurring) {
      return response.items.map((product: RecurringProductApiResponse) => ({
        product_id: product.product_id,
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        currency: product.currency,
        payment_frequency_count: product.price_detail?.payment_frequency_count,
        payment_frequency_interval: product.price_detail?.payment_frequency_interval,
        trial_period_days: product.price_detail?.trial_period_days,
      }));
    } else {
      return response.items.map((product: OneTimeProductApiResponse) => ({
        product_id: product.product_id,
        name: product.name,
        image: product.image,
        price: product.price,
        pay_what_you_want: product.price_detail?.pay_what_you_want,
        description: product.description,
        currency: product.currency,
      }));
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
});

// Fetch all storefront data in parallel
export const getStorefrontData = cache(async (slug: string, host: string) => {
  const mode = getApiMode(host);
  
  // Fetch all data in parallel
  const [business, products, subscriptions] = await Promise.all([
    getBusinessData(slug, mode),
    getProducts(slug, mode, false),
    getProducts(slug, mode, true),
  ]);

  return {
    business,
    products,
    subscriptions,
    mode,
  };
});