"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n";

export default function OverPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              ADseum
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              {t("over_subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Origin Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">{t("over_section_title")}</h2>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  {t("over_p1")}
                </p>

                <p>
                  {t("over_p2")}
                </p>

                <p className="pt-2 border-l-4 border-gray-500 pl-4 italic text-gray-400">
                  {t("over_p3")}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full h-80 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center text-gray-400 hover:border-gray-600 transition">
                Afbeelding / Portret
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-neutral-950 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">{t("over_section_2_title")}</h2>

          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
              {t("over_mission")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-gray-600 transition">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-lg"></span> {t("over_feature_1_title")}
                </h3>
                <p className="text-gray-300 text-sm">
                  {t("over_feature_1_desc")}
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-gray-600 transition">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-lg"></span> {t("over_feature_2_title")}
                </h3>
                <p className="text-gray-300 text-sm">
                  {t("over_feature_2_desc")}
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-gray-600 transition">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-lg"></span> {t("over_feature_3_title")}
                </h3>
                <p className="text-gray-300 text-sm">
                  {t("over_feature_3_desc")}
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-gray-600 transition">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-lg"></span> Heritage
                </h3>
                <p className="text-gray-300 text-sm">
                  Management and presentation of artistic legacies of queer artists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Close Connections With</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-gray-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-white mb-2">IHLIA — Amsterdam</h3>
              <p className="text-gray-400 text-sm">
                International Homo Lesbian Information and Archive
              </p>
            </div>

            <div className="border-l-4 border-gray-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-white mb-2">Tom of Finland Foundation — LA</h3>
              <p className="text-gray-400 text-sm">
                Regularly present at TOF Art Fair
              </p>
            </div>
          </div>

          <p className="text-gray-300 text-center mt-12 pt-8 border-t border-neutral-800">
            ADseum is een <span className="font-semibold">non-profit organisatie</span>. Alle steun is welkom.
          </p>
        </div>
      </section>
    </main>
  );
}