"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { useI18n } from "./i18n";

export default function Home() {
  const { t } = useI18n();
  const [phrases, setPhrases] = useState<string[]>([
    t("hero_tagline_1"),
    t("hero_tagline_2"),
    t("hero_tagline_3"),
  ]);

  useEffect(() => {
    setPhrases([
      t("hero_tagline_1"),
      t("hero_tagline_2"),
      t("hero_tagline_3"),
    ]);
  }, [t]);

  const phrasesRef = useRef(phrases);

  useEffect(() => {
    phrasesRef.current = phrases;
  }, [phrases]);

  const [typedTagline, setTypedTagline] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let active = true;
    const typeSpeed = 85;
    const deleteSpeed = 45;
    const holdTime = 1200;

    const typeLoop = (phraseIndex: number, charIndex: number, deleting: boolean) => {
      if (!active) return;
      const current = phrasesRef.current[phraseIndex];
      const nextText = current.slice(0, Math.max(0, charIndex));
      setTypedTagline(nextText);

      const isComplete = charIndex >= current.length;
      const isEmpty = charIndex <= 0;

      if (!deleting && isComplete) {
        timeoutId = setTimeout(() => typeLoop(phraseIndex, current.length - 1, true), holdTime);
        return;
      }

      if (deleting && isEmpty) {
        const nextIndex = (phraseIndex + 1) % phrasesRef.current.length;
        timeoutId = setTimeout(() => typeLoop(nextIndex, 1, false), 260);
        return;
      }

      const delta = deleting ? deleteSpeed : typeSpeed;
      timeoutId = setTimeout(
        () => typeLoop(phraseIndex, deleting ? charIndex - 1 : charIndex + 1, deleting),
        delta,
      );
    };

    timeoutId = setTimeout(() => typeLoop(0, 1, false), 200);

    return () => {
      active = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="w-full bg-black text-white min-h-screen pt-20 flex items-center justify-center">
      <Navbar />

      <section className="relative h-screen flex items-center justify-center" aria-label="Hero">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-b from-neutral-900 via-neutral-800 to-black absolute inset-0 -z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 -z-10" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <div className="absolute -inset-12 bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-3xl -z-10" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-md">
            {t("hero_title")}
          </h1>
          <p
            className="mt-3 text-lg md:text-xl text-white/80 tracking-wide uppercase min-h-[1.6em] flex items-center justify-center"
            aria-live="polite"
          >
            {typedTagline ?? phrases[0]}
          </p>

          <div className="mt-10 mx-auto max-w-4xl flex flex-col items-center gap-6">
            <div className="h-1 w-24 bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-300 rounded-full" />

            <div className="flex flex-col gap-4 text-base md:text-lg leading-relaxed text-white/90 text-left w-full">
              <p>
                <span className="font-semibold text-white">ADseum</span> {t("hero_description_short")}
              </p>
              <p>
                {t("hero_description_2")}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm uppercase tracking-[0.18em] text-white/80">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400/70 via-orange-500/70 to-amber-500/70 border border-white/15 shadow-lg shadow-amber-500/25">{t("hero_badge_1")}</div>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-400/70 via-red-500/70 to-pink-500/70 border border-white/15 shadow-lg shadow-rose-500/25">{t("hero_badge_2")}</div>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400/70 via-teal-500/70 to-cyan-500/70 border border-white/15 shadow-lg shadow-emerald-500/25">{t("hero_badge_3")}</div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => window.location.href = "/galerij"}
              className="px-7 py-3 bg-white text-black rounded-full font-semibold shadow-lg shadow-cyan-400/30 hover:-translate-y-0.5 transition-transform"
            >
              {t("hero_view_gallery")}
            </button>
            <button
              onClick={() => window.location.href = "/over"}
              className="px-7 py-3 border border-white text-white rounded-full font-semibold bg-white/10 hover:bg-white/15 hover:-translate-y-0.5 transition-transform"
            >
              {t("hero_more_about")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
