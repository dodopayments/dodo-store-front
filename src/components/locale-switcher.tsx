"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  getUserLocale,
  setUserLocale,
  hasUserLocaleCookie,
  detectUserLanguage,
} from "@/lib/client-i18n-helper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { GlobeSimple } from "@phosphor-icons/react";
import flags from "react-phone-number-input/flags";
import * as RPNInput from "react-phone-number-input";
import { CountryCode } from "libphonenumber-js";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n/config";
import { LANGUAGES } from "@/constants/langauges";
import { useRouter } from "next/navigation";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [...LANGUAGES].sort((a, b) =>
  a.name.localeCompare(b.name)
);

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="w-4 overflow-hidden rounded-[2px]">
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <div className="w-4 h-3 bg-bg-tertiary rounded-sm" />
      )}
    </span>
  );
};

export default function LocaleSwitcher() {
  const [locale, setLocale] = useState<string>("en");
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  const router = useRouter();
  const handleLanguageChange = useCallback(
    (value: string) => {
      if (value !== locale) {
        setUserLocale(value as Locale);
        setLocale(value);
        // Always refresh the page to ensure language change takes effect
        router.refresh();
      }
    },
    [locale, router]
  );

  useEffect(() => {
    const currentLocale = getUserLocale();
    setLocale(currentLocale);
    setHasInitialized(true);
  }, []);

  useEffect(() => {
    if (hasInitialized) {
      const hasCookie = hasUserLocaleCookie();
      if (!hasCookie) {
        const detectedLang = detectUserLanguage();
        if (detectedLang !== "en") {
          handleLanguageChange(detectedLang);
        }
      }
    }
  }, [hasInitialized, handleLanguageChange]);

  return (
    <Select
      value={locale}
      onValueChange={(value: string) => handleLanguageChange(value)}
    >
      <SelectTrigger className={cn("w-fit h-[32px]  p-0")}>
        <div className="flex w-fit font-display text-xs items-center gap-2 h-[32px] pl-2">
          <GlobeSimple className="w-4 h-4" />
        </div>
      </SelectTrigger>
      <SelectContent align="end" className="max-h-[200px]">
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <FlagComponent
                country={language.flag as CountryCode}
                countryName={language.name}
              />
              <div className="text-xs">{language.name}</div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
