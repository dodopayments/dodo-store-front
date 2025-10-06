'use server';

import { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { cookies } from "next/headers";

// lingo.dev Compiler reads the `lingo-locale` cookie
const COOKIE_NAME = "lingo-locale";

export async function getUserLocale() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}

export async function hasUserLocaleCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has(COOKIE_NAME);
}
