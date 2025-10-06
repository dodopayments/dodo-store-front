import { locales } from "../i18n/config";

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
