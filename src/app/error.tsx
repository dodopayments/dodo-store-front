"use client";
import IconColors from "@/components/custom/icon-colors";
import { SmileySad } from "@phosphor-icons/react";
import { t } from "@/lib/i18n";

const Error = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-bg-primary items-center justify-center">
      <IconColors icon={<SmileySad className="w-6 h-6" />} />
      <h1 className="text-xl mt-4 font-display font-semibold">{t("pages.error.genericTitle")}</h1>
      <p className="text-sm mt-2 max-w-sm text-text-secondary text-center">{t("pages.error.genericDescription")}</p>
    </div>
  );
};

export default Error;
