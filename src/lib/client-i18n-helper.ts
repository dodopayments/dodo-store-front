import { locales, Locale, defaultLocale } from "../i18n/config";

// lingo.dev Compiler reads the `lingo-locale` cookie
const COOKIE_NAME = "lingo-locale";

export function getBrowserLanguages(): string[] {
  if (typeof navigator === "undefined") return [];

  const languages = navigator.languages || [navigator.language];
  return languages.map((lang) => lang.split("-")[0]);
}

export function detectUserLanguage(): string {
  const browserLanguages = getBrowserLanguages();
  const supportedBrowserLang = browserLanguages.find((lang) =>
    locales.some((l) => l === lang)
  );

  return supportedBrowserLang || "en";
}

// Client-safe cookie helpers
export function getUserLocale(): string {
  if (typeof document === "undefined") return defaultLocale;
  
  const cookies = document.cookie.split(';');
  const localeCookie = cookies.find(cookie => 
    cookie.trim().startsWith(`${COOKIE_NAME}=`)
  );
  
  if (localeCookie) {
    const value = localeCookie.split('=')[1];
    return locales.includes(value as Locale) ? value : defaultLocale;
  }
  
  return defaultLocale;
}

export function setUserLocale(locale: Locale): void {
  if (typeof document === "undefined") return;
  
  // Set cookie with 1 year expiration
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  
  document.cookie = `${COOKIE_NAME}=${locale}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
}

export function hasUserLocaleCookie(): boolean {
  if (typeof document === "undefined") return false;
  
  return document.cookie.includes(`${COOKIE_NAME}=`);
}
