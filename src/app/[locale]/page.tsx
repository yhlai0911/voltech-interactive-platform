"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WEEKS } from "@/types";
import ResourceDownloadSection from "@/components/ResourceDownloadSection";

export default function HomePage() {
  const t = useTranslations();

  const characters = [
    { id: "drLin", nameKey: "characters.drLin.name", roleKey: "characters.drLin.role", color: "#1B3A5C", descKey: "characters.drLin.desc" },
    { id: "alex", nameKey: "characters.alex.name", roleKey: "characters.alex.role", color: "#2D7D5E", descKey: "characters.alex.desc" },
    { id: "kenji", nameKey: "characters.kenji.name", roleKey: "characters.kenji.role", color: "#C0392B", descKey: "characters.kenji.desc" },
    { id: "priya", nameKey: "characters.priya.name", roleKey: "characters.priya.role", color: "#8E44AD", descKey: "characters.priya.desc" },
    { id: "david", nameKey: "characters.david.name", roleKey: "characters.david.role", color: "#E67E22", descKey: "characters.david.desc" },
    { id: "narrator", nameKey: "characters.narrator.name", roleKey: "characters.narrator.role", color: "#6B7280", descKey: "characters.narrator.desc" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B3A5C] mb-4">
          {t("home.title")}
        </h1>
        <p className="text-xl md:text-2xl text-[#D4A843] font-semibold mb-2">
          {t("home.subtitle")}
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("home.description")}
        </p>
        <p className="text-sm text-gray-400 mt-4">
          {t("home.author")}
        </p>
      </section>

      {/* Characters Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#1B3A5C] text-center mb-8">
          {t("home.meetCharacters")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {characters.map((char) => (
            <div
              key={char.id}
              className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3"
                style={{ backgroundColor: char.color }}
              >
                {t(char.nameKey).charAt(0)}
              </div>
              <h3 className="font-bold text-sm" style={{ color: char.color }}>
                {t(char.nameKey)}
              </h3>
              {t(char.roleKey) && (
                <p className="text-xs text-gray-500">{t(char.roleKey)}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">{t(char.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Week Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#1B3A5C] text-center mb-8">
          {t("home.courseWeeks")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WEEKS.map((week) => {
            const weekId = String(week.weekNumber).padStart(2, "0");
            return (
              <Link
                key={week.weekNumber}
                href={`/week/${weekId}`}
                className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: week.color }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-bold px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${week.color}15`,
                        color: week.color,
                      }}
                    >
                      {t("common.week")} {week.weekNumber}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1B3A5C] mb-1 group-hover:text-[#D4A843] transition-colors">
                    {t(`weeks.${week.weekNumber}.title`)}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {t(`weeks.${week.weekNumber}.subtitle`)}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {week.keyConcepts.slice(0, 3).map((concept) => (
                      <span
                        key={concept}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* PDF Downloads */}
      <ResourceDownloadSection />

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {(["lessons", "formulas", "quiz", "tutor"] as const).map(
          (featureKey) => (
            <div key={featureKey} className="text-center p-6">
              <div className="text-4xl mb-3">
                {t(`home.features.${featureKey}.icon`)}
              </div>
              <h3 className="font-bold text-[#1B3A5C] mb-2">
                {t(`home.features.${featureKey}.title`)}
              </h3>
              <p className="text-sm text-gray-600">
                {t(`home.features.${featureKey}.desc`)}
              </p>
            </div>
          )
        )}
      </section>
    </div>
  );
}
