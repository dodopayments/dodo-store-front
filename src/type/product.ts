import { CurrencyCode } from "@/lib/currency-helper";

export type Currency = CurrencyCode;
export type TimeInterval = 'day' | 'week' | 'month' | 'year';
export type TaxCategory = string;

interface BasePrice {
  currency: Currency;
  discount?: number;
  price: number;
  purchasing_power_parity: boolean;
  tax_inclusive?: boolean;
  type: string;
}

interface OneTimePrice extends BasePrice {
  pay_what_you_want?: boolean;
  suggested_price?: number;
}

interface RecurringPrice extends BasePrice {
  payment_frequency_count: number;
  payment_frequency_interval: TimeInterval;
  subscription_period_count: number;
  subscription_period_interval: TimeInterval;
  trial_period_days?: number;
}



export interface ProductApiResponse {
  business_id: string;
  created_at: string;
  currency: Currency;
  description?: string;
  image: string;
  is_recurring: boolean;
  name: string;
  price: number;
  product_id: string;
  tax_category: TaxCategory;
  tax_inclusive?: boolean;
  updated_at: string;
}

export interface RecurringProductApiResponse extends ProductApiResponse {
  price_detail: RecurringPrice;
}

export interface OneTimeProductApiResponse extends ProductApiResponse {
  price_detail: OneTimePrice;
}
