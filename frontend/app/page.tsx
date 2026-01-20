// Dit is de Homepage component (de voorkant van mijn website).
// 'use client' zorgt ervoor dat ik React hooks zoals useState en useEffect mag gebruiken.
"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { useI18n } from "./i18n";

export default function Home() {
  // Hier haal ik de vertaalfunctie 't' op om teksten in verschillende talen te kunnen tonen.
  const { t } = useI18n();

  // Dit zijn de zinnen die bovenaan de pagina rouleren (het type-effect).
  // Ik sla ze op in de 'state' zodat de pagina weet wat er getoond moet worden.
  const [phrases, setPhrases] = useState<string[]>([
    t("hero_tagline_1"),
    t("hero_tagline_2"),
    t("hero_tagline_3"),
  ]);

  // Deze useEffect zorgt ervoor dat als de taal verandert (t verandert),
  // de zinnen opnieuw worden ingeladen met de juiste vertaling.
  useEffect(() => {
    setPhrases([
      t("hero_tagline_1"),
      t("hero_tagline_2"),
      t("hero_tagline_3"),
    ]);
  }, [t]);

  // Ik gebruik een 'ref' om altijd de allerlaatste versie van de zinnen te hebben,
  // handig voor binnen de complexe timer functies hieronder.
  const phrasesRef = useRef(phrases);

  useEffect(() => {
    phrasesRef.current = phrases;
  }, [phrases]);

  // Hier houd ik bij welk stukje tekst er momenteel 'getypt' is op het scherm.
  const [typedTagline, setTypedTagline] = useState<string | null>(null);

  // Dit is het complexe type-effect logica.
  // Het zorgt ervoor dat letters één voor één verschijnen en weer verdwijnen.
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let active = true; // Om te voorkomen dat we iets doen als de component al weg is.

    // Snelheden instellen voor typen en verwijderen
    const typeSpeed = 85;
    const deleteSpeed = 45;
    const holdTime = 1200; // Hoe lang de tekst blijft staan voordat hij weggaat

    // De recursieve functie die zichzelf blijft aanroepen om te typen/wissen
    const typeLoop = (phraseIndex: number, charIndex: number, deleting: boolean) => {
      if (!active) return;
      const current = phrasesRef.current[phraseIndex];
      const nextText = current.slice(0, Math.max(0, charIndex));
      setTypedTagline(nextText);

      const isComplete = charIndex >= current.length;
      const isEmpty = charIndex <= 0;

      // Als we klaar zijn met typen, wachten we even (holdTime) en gaan dan wissen (deleting=true)
      if (!deleting && isComplete) {
        timeoutId = setTimeout(() => typeLoop(phraseIndex, current.length - 1, true), holdTime);
        return;
      }

      // Als we klaar zijn met wissen, gaan we naar de volgende zin en beginnen weer met typen
      if (deleting && isEmpty) {
        const nextIndex = (phraseIndex + 1) % phrasesRef.current.length;
        timeoutId = setTimeout(() => typeLoop(nextIndex, 1, false), 260); // Korte pauze voor volgende zin
        return;
      }

      // De volgende stap plannen (volgende letter typen of vorige wissen)
      const delta = deleting ? deleteSpeed : typeSpeed;
      timeoutId = setTimeout(
        () => typeLoop(phraseIndex, deleting ? charIndex - 1 : charIndex + 1, deleting),
        delta,
      );
    };

    // Start het effect
    timeoutId = setTimeout(() => typeLoop(0, 1, false), 200);

    // Opruimfunctie: stopt de timers als je de pagina verlaat
    return () => {
      active = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    // De 'main' wrapper voor de hele pagina inhoud.
    <main className="w-full bg-black text-white min-h-screen pt-20 flex items-center justify-center">
      <Navbar />

      {/* Dit is de Hero sectie (de grote banner bovenaan) */}
      <section className="relative h-screen flex items-center justify-center" aria-label="Hero">
        <div className="absolute inset-0">
          {/* Achtergrond gradients voor sfeer */}
          <div className="w-full h-full bg-gradient-to-b from-neutral-900 via-neutral-800 to-black absolute inset-0 -z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 -z-10" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <div className="absolute -inset-12 bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-3xl -z-10" />

          {/* De grote hoofdtitel */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-md">
            {t("hero_title")}
          </h1>

          {/* De tekst die automatisch typt en verandert */}
          <p
            className="mt-3 text-lg md:text-xl text-white/80 tracking-wide uppercase min-h-[1.6em] flex items-center justify-center"
            aria-live="polite"
          >
            {typedTagline ?? phrases[0]}
          </p>

          <div className="mt-10 mx-auto max-w-4xl flex flex-col items-center gap-6">
            <div className="h-1 w-24 bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-300 rounded-full" />

            {/* Beschrijvende teksten over ADseum */}
            <div className="flex flex-col gap-4 text-base md:text-lg leading-relaxed text-white/90 text-left w-full">
              <p>
                <span className="font-semibold text-white">ADseum</span> {t("hero_description_short")}
              </p>
              <p>
                {t("hero_description_2")}
              </p>
            </div>

            {/* De drie badges/skills die worden getoond */}
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
