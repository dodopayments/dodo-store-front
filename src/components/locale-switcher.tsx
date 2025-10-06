"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  getUserLocale,
  setUserLocale,
  hasUserLocaleCookie,
} from "@/lib/i18n-helper";
import { detectUserLanguage } from "@/lib/client-i18n-helper";
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

export default function LocaleSwitcher({
  refresh = false,
  isOverlay,
}: {
  refresh?: boolean;
  isOverlay?: boolean;
}) {
  const [locale, setLocale] = useState<string>("en");
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);

  const handleLanguageChange = useCallback(
    async (value: string) => {
      if (value !== locale) {
        await setUserLocale(value as Locale);
        setLocale(value);
        if (refresh) {
          window.location.reload();
        }
      }
    },
    [locale, refresh]
  );

  useEffect(() => {
    getUserLocale().then((currentLocale) => {
      setLocale(currentLocale);
      setHasInitialized(true);
    });
  }, []);

  useEffect(() => {
    if (hasInitialized) {
      hasUserLocaleCookie().then((hasCookie) => {
        if (!hasCookie) {
          const detectedLang = detectUserLanguage();
          if (detectedLang !== "en") {
            handleLanguageChange(detectedLang);
          }
        }
      });
    }
  }, [hasInitialized, handleLanguageChange]);

  return (
    <Select
      value={locale}
      onValueChange={(value: string) => handleLanguageChange(value)}
    >
      <SelectTrigger
        className={cn(
          "w-fit h-[32px]  p-0",
          isOverlay ? "border-none shadow-none focus:ring-0 text-white" : ""
        )}
      >
        <div className="flex w-fit font-display text-xs items-center gap-2 h-[32px] pl-2">
          {isOverlay ? (
            <div className="text-white hover:text-white/80 transition-all duration-100">
              {languages.find((lang) => lang.code === locale)?.name}
            </div>
          ) : (
            <GlobeSimple className="w-4 h-4" />
          )}
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
