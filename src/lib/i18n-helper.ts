'use server';

import { cookies } from "next/headers";

const COOKIE_NAME = "NEXT_LOCALE";
const DEFAULT_LOCALE = "en";

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: string) {
  (await cookies()).set(COOKIE_NAME, locale);
}