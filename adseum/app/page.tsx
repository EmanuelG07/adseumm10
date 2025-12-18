"use client";
import { useRef, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useI18n } from "./i18n";
import dynamic from "next/dynamic";

const GalleryGrid = dynamic(() => import("./components/GalleryGrid"), { ssr: false });

export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null);
  const overRef = useRef<HTMLDivElement>(null);
  const galerijRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState("home");
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  useEffect(() => {
    if (showGalleryModal) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [showGalleryModal]);

  useEffect(() => {
    if (showAgendaModal) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [showAgendaModal]);

  useEffect(() => {
    const sections = [
      { id: "home", ref: homeRef },
      { id: "over", ref: overRef },
      { id: "galerij", ref: galerijRef },
      { id: "team", ref: teamRef },
      { id: "agenda", ref: agendaRef },
      { id: "contact", ref: contactRef },
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const el = section.ref.current;
        if (!el) continue;

        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          setActive(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section
  const scrollTo = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { t } = useI18n();

  return (
    <main className="w-full bg-black text-white">
      <Navbar
        active={active}
        scrollTo={{
          home: () => scrollTo(homeRef),
          over: () => scrollTo(overRef),
          galerij: () => scrollTo(galerijRef),
          team: () => scrollTo(teamRef),
          agenda: () => setShowAgendaModal(true),
          contact: () => scrollTo(contactRef),
        }}
      />

      <section
        ref={homeRef}
        className="relative h-screen flex items-center"
        aria-label="Hero"
      >
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-b from-neutral-900 via-neutral-800 to-black" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-md">
           {t("hero_title")}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            {t("hero_sub")}
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => scrollTo(galerijRef)}
              className="px-6 py-3 bg-white text-black rounded-md font-semibold shadow cursor-pointer"
            >
              {t("hero_view_gallery")}
            </button>
            <button
              onClick={() => scrollTo(overRef)}
              className="px-6 py-3 border border-white text-white rounded-md font-semibold bg-white/10 cursor-pointer"
            >
              {t("hero_more_about")}
            </button>
          </div>
        </div>
      </section>

      <section ref={overRef} className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="w-full rounded shadow-lg bg-neutral-800 h-64 md:h-80 flex items-center justify-center text-gray-400">
              Afbeelding
            </div>
          </div>

          <div>
              <h2 className="text-3xl font-bold mb-4">{t("over_title")}</h2>
              <p className="text-gray-200 mb-4">{t("over_p1")}</p>
              <p className="text-gray-300">{t("over_p2")}</p>
          </div>
        </div>
      </section>

      <section ref={galerijRef} className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">{t("gallery_title")}</h2>
              <button onClick={() => setShowGalleryModal(true)} className="text-sm underline text-white/90 cursor-pointer">
                {t("gallery_more")}
              </button>
          </div>

          <div>
            <GalleryGrid previewCount={12} />
          </div>
        </div>
      </section>

      {showGalleryModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowGalleryModal(false); }}
          className="fixed inset-0 z-70 bg-black/70 flex items-center justify-center p-6"
        >
          <div className="relative w-full max-w-5xl max-h-[80vh] overflow-auto bg-neutral-900/95 border border-neutral-700 rounded-lg p-6 shadow-lg animate-modal-in">
            <button
              onClick={() => setShowGalleryModal(false)}
              className="absolute top-4 right-4 z-80 bg-white text-black rounded-full px-3 py-1"
            >
              Sluiten
            </button>

            <div className="pt-2">
              <GalleryGrid previewCount={0} />
            </div>
          </div>
        </div>
      )}

      {showAgendaModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowAgendaModal(false); }}
          className="fixed inset-0 z-70 bg-black/70 flex items-center justify-center p-6"
        >
          <div className="relative w-full max-w-3xl max-h-[80vh] overflow-auto bg-neutral-900/95 border border-neutral-700 rounded-lg p-6 shadow-lg animate-modal-in">
            <button
              onClick={() => setShowAgendaModal(false)}
              className="absolute top-4 right-4 z-80 bg-white text-black rounded-full px-3 py-1"
            >
              Sluiten
            </button>

            <div className="pt-2">
                <header className="mb-4">
                <h2 className="text-2xl font-bold">{t("agenda_title")}</h2>
                <p className="text-gray-300 mt-1">{t("agenda_sub")}</p>
              </header>

              <div className="space-y-4">
                <article className="p-4 bg-neutral-800/50 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">15 jan 2026</div>
                      <div className="text-xs text-gray-400">Galerie Adseum</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Tentoonstelling: 'Licht en Schaduw'</h3>
                      <p className="text-sm text-gray-300 mt-1">Een tentoonstelling met nieuw werk van opkomende homofotografen.</p>
                    </div>
                  </div>
                </article>

                <article className="p-4 bg-neutral-800/50 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">05 feb 2026</div>
                      <div className="text-xs text-gray-400">Online / Zoom</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Lezing: Archivering en representatie</h3>
                      <p className="text-sm text-gray-300 mt-1">Paneldiscussie over het bewaren van LGBTQ+ visuele geschiedenis.</p>
                    </div>
                  </div>
                </article>

                <article className="p-4 bg-neutral-800/50 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">12 mrt 2026</div>
                      <div className="text-xs text-gray-400">Studio Adseum</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Workshop: Donkere kamer technieken</h3>
                      <p className="text-sm text-gray-300 mt-1">Hands-on workshop over klassieke donkere kamer technieken voor analoge fotografie.</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      )}

      <section ref={teamRef} className="py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">{t("team_title")}</h3>
          <div className="flex items-center justify-center gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
                <span className="text-sm text-gray-300">PIJ</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={contactRef} className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t("contact_title")}</h2>
              <p className="text-gray-200 mb-6">{t("contact_prompt")}</p>

            <div className="w-full h-56 bg-neutral-800 rounded flex items-center justify-center text-gray-400">
              Kaart placeholder
            </div>
          </div>

          <form className="space-y-4">
            <input className="w-full border border-gray-700 bg-neutral-900 text-white rounded px-3 py-2 placeholder-gray-400" placeholder={t("contact_name")} />
            <input className="w-full border border-gray-700 bg-neutral-900 text-white rounded px-3 py-2 placeholder-gray-400" placeholder={t("contact_email")} />
            <textarea className="w-full border border-gray-700 bg-neutral-900 text-white rounded px-3 py-2 h-32 placeholder-gray-400" placeholder={t("contact_message")} />
            <div className="flex gap-2">
              <button type="button" className="px-4 py-2 bg-neutral-700 text-white rounded cursor-pointer">{t("contact_cancel")}</button>
              <button type="submit" className="px-4 py-2 bg-white text-black rounded cursor-pointer">{t("contact_send")}</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
