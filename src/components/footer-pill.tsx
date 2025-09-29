"use client";
/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

import Link from "next/link";
import React from "react";

const FooterPill = ({
  align = "center",
}: {
  align?: "center" | "start" | "end";
}) => {
  return (
    <footer
      className={cn(
        "fixed bottom-4 md:bottom-8 left-0 w-full flex items-center px-2 sm:px-10",
        {
          "justify-center": align === "center",
          "justify-start": align === "start",
          "justify-end": align === "end",
        }
      )}
      style={{
        zIndex: 100,
      }}
    >
      <Link href="https://dodopayments.com" target="_blank" passHref>
        <div className="flex items-center justify-center bg-bg-secondary  border-border-secondary rounded-lg py-[10px] px-[12px] gap-[6px]">
          <img
            src="/images/brand-assets/logo/logo.svg"
            alt="logo"
            width={20}
            height={20}
            className="object-cover object-center"
          />
          <p className="text-sm w-full text-nowrap font-light tracking-[-0.22px] font-display">
            {t("app.poweredBy", { brand: "Dodo Payments" })}
          </p>
        </div>
      </Link>
    </footer>
  );
};

export default FooterPill;
