"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Download,
  BookOpen,
  FileText,
  Presentation,
  ClipboardList,
} from "lucide-react";

const BRAND_PRIMARY = "#1B3A5C";
const BRAND_ACCENT = "#D4A843";

type PdfLang = "en" | "zh";

function buildTabs(pdfLang: PdfLang, weekCount: number) {
  const base = pdfLang === "zh" ? "/pdfs/zh" : "/pdfs";

  return [
    {
      id: "slides",
      icon: Presentation,
      files: Array.from({ length: weekCount }, (_, i) => ({
        week: i + 1,
        href: `${base}/slides/week${String(i + 1).padStart(2, "0")}-slides.pdf`,
      })),
    },
    {
      id: "textbook",
      icon: BookOpen,
      files: [{ week: 0, label: "fullTextbook", href: `${base}/textbook/main.pdf` }],
    },
    {
      id: "supplements",
      icon: FileText,
      files: Array.from({ length: weekCount }, (_, i) => ({
        week: i + 1,
        href: `${base}/supplements/week${String(i + 1).padStart(2, "0")}-supplement.pdf`,
      })),
    },
    {
      id: "exercises",
      icon: ClipboardList,
      files: Array.from({ length: weekCount }, (_, i) => ({
        week: i + 1,
        href: `${base}/exercises/week${String(i + 1).padStart(2, "0")}-exercises.pdf`,
      })),
    },
  ];
}

export default function ResourceDownloadSection() {
  const t = useTranslations("resources");
  const locale = useLocale();
  const [pdfLang, setPdfLang] = useState<PdfLang>(locale === "zh" ? "zh" : "en");
  const [activeTab, setActiveTab] = useState("slides");

  const tabs = buildTabs(pdfLang, 8);
  const currentTab = tabs.find((tab) => tab.id === activeTab)!;

  return (
    <section className="mb-16">
      <h2
        className="text-2xl font-bold text-center mb-2"
        style={{ color: BRAND_PRIMARY }}
      >
        {t("title")}
      </h2>
      <p className="text-center text-gray-500 mb-6">{t("subtitle")}</p>

      {/* Language toggle */}
      <div className="flex justify-center gap-2 mb-6">
        {(["en", "zh"] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setPdfLang(lang)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={
              pdfLang === lang
                ? { backgroundColor: BRAND_PRIMARY, color: "#fff" }
                : { backgroundColor: `${BRAND_PRIMARY}10`, color: BRAND_PRIMARY }
            }
          >
            {t(`lang.${lang}`)}
          </button>
        ))}
      </div>

      {/* Category tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={
              activeTab === tab.id
                ? { backgroundColor: BRAND_ACCENT, color: "#fff" }
                : { backgroundColor: `${BRAND_ACCENT}15`, color: BRAND_PRIMARY }
            }
          >
            <tab.icon className="w-4 h-4" />
            {t(`tabs.${tab.id}`)}
          </button>
        ))}
      </div>

      {/* File grid */}
      <motion.div
        key={`${pdfLang}-${activeTab}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={
          currentTab.id === "textbook"
            ? "flex justify-center"
            : "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-4xl mx-auto"
        }
      >
        {currentTab.files.map((file) => (
          <a
            key={file.href}
            href={file.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-transparent hover:shadow-lg transition-all hover:-translate-y-0.5 bg-white group"
            style={{ borderColor: `${BRAND_ACCENT}40` }}
          >
            <Download
              className="w-5 h-5 transition-colors"
              style={{ color: BRAND_ACCENT }}
            />
            <span
              className="text-xs font-bold"
              style={{ color: BRAND_PRIMARY }}
            >
              {"label" in file
                ? t(file.label as string)
                : `${t("week")} ${file.week}`}
            </span>
          </a>
        ))}
      </motion.div>
    </section>
  );
}
