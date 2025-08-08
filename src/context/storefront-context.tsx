'use client';

import React, { createContext, useContext } from 'react';

interface StorefrontContextType {
  checkoutUrl: string;
  mode: 'test' | 'live';
  slug: string;
}

const StorefrontContext = createContext<StorefrontContextType | undefined>(undefined);

export function StorefrontProvider({ 
  children, 
  checkoutUrl, 
  mode, 
  slug 
}: {
  children: React.ReactNode;
  checkoutUrl: string;
  mode: 'test' | 'live';
  slug: string;
}) {
  return (
    <StorefrontContext.Provider value={{ checkoutUrl, mode, slug }}>
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefrontContext() {
  const context = useContext(StorefrontContext);
  if (!context) {
    throw new Error('useStorefrontContext must be used within StorefrontProvider');
  }
  return context;
}