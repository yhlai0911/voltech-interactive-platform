"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ClassroomPage() {
  const t = useTranslations("classroom");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md text-center p-8">
        <h1 className="text-2xl font-bold text-[#1B3A5C] mb-4">
          {t("moved")}
        </h1>
        <p className="text-gray-600 mb-6">{t("movedDesc")}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B3A5C] text-white rounded-xl hover:bg-[#2a4f7a] transition-colors"
        >
          {t("goHome")}
        </Link>
      </div>
    </div>
  );
}
