"use client";
import Navbar from "./components/Navbar";
import { useI18n } from "./i18n";

export default function Home() {
  const { t } = useI18n();

  return (
    <main className="w-full bg-black text-white min-h-screen pt-20 flex items-center justify-center">
      <Navbar />

      <section className="relative h-screen flex items-center justify-center" aria-label="Hero">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-b from-neutral-900 via-neutral-800 to-black absolute inset-0 -z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 -z-10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-md">
            {t("hero_title")}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">{t("hero_sub")}</p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => window.location.href = "/galerij"}
              className="px-6 py-3 bg-white text-black rounded-md font-semibold shadow cursor-pointer"
            >
              {t("hero_view_gallery")}
            </button>
            <button
              onClick={() => window.location.href = "/over"}
              className="px-6 py-3 border border-white text-white rounded-md font-semibold bg-white/10 cursor-pointer"
            >
              {t("hero_more_about")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
