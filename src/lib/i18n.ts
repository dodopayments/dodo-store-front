import en from "@/locales/en.json";
import de from "@/locales/de.json";
import es from "@/locales/es.json";
import fr from "@/locales/fr.json";

export type Locale = "en" | "de" | "es" | "fr";

type TranslationDict = Record<string, unknown>;

const messages: Record<Locale, TranslationDict> = { en, de, es, fr };

export function getLocale(): Locale {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const param = (params.get("locale") || params.get("lang") || "").toLowerCase();
    if (param === "en" || param === "de" || param === "es" || param === "fr") return param as Locale;
  }
  return "en";
}

function getByPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (typeof current === "object" && current !== null && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

export function t(key: string, params?: Record<string, string | number>): string {
  const locale = getLocale();
  const dict = messages[locale] ?? messages.en;
  const value = getByPath(dict, key) ?? getByPath(messages.en, key);
  const text = typeof value === "string" ? value : key;
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
}
