export type Locale = (typeof locales)[number];

export const locales = [
  "en", "de", "ar", "ca", "zh", "es", "fr", "he", "it", "ja", "nl", "pl", "pt", "sv", "tr"
] as const;
export const defaultLocale: Locale = "en";
