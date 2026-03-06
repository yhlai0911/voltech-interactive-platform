"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="text-xs bg-white/10 text-white border border-white/20 rounded-md px-2 py-1 cursor-pointer hover:bg-white/20 transition-colors"
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc} className="text-gray-900">
          {t(loc)}
        </option>
      ))}
    </select>
  );
}
