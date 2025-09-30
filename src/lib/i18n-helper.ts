'use server';

import { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { cookies } from "next/headers";

// lingo.dev Compiler reads the `lingo-locale` cookie
const COOKIE_NAME = "lingo-locale";

export async function getUserLocale() {
  const cookieStore = await cookies();
  let locale = cookieStore.get(COOKIE_NAME)?.value;
  if (!locale) {
    const oldLocale = cookieStore.get("NEXT_LOCALE")?.value;
    if (oldLocale) {
      cookieStore.set(COOKIE_NAME, oldLocale);
      locale = oldLocale;
    }
  }
  return locale || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}