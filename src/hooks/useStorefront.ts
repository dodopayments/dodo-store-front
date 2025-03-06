'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const testApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TEST_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const liveApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LIVE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useStorefront = () => {
  const [mode, setMode] = useState<'test' | 'live'>('test');
  const [slug, setSlug] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const host = window.location.host;
    const subdomain = host.split('.')[0];
    const pathSlug = window.location.pathname.split('/')[1];

    setSlug(pathSlug);
    setMode(subdomain === 'store' ? 'live' : 'test');
    setIsLoading(false);
  }, []);

  const api = mode === 'live' ? liveApi : testApi;
  const url = mode === 'live' 
    ? process.env.NEXT_PUBLIC_LIVE_API_URL 
    : process.env.NEXT_PUBLIC_TEST_API_URL;
  const checkoutUrl = mode === 'live'
    ? process.env.NEXT_PUBLIC_LIVE_CHECKOUT_URL
    : process.env.NEXT_PUBLIC_TEST_CHECKOUT_URL;

  return {
    api,
    mode,
    slug,
    checkoutUrl,
    url,
    isLoading
  };
}; 