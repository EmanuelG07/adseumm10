"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Locale = "nl" | "en";

const translations: Record<Locale, Record<string, string>> = {
  nl: {
    nav_home: "Home",
    nav_over: "Over",
    nav_galerij: "Galerij",
    nav_team: "Ons team",
    nav_agenda: "Agenda",
    nav_contact: "Contact",
    hero_title: "Adseum",
    hero_sub: "Platform voor homocultuur en fotografie — tentoonstellingen, archief en community.",
    hero_view_gallery: "Bekijk galerij",
    hero_more_about: "Meer over ons",
    over_title: "Over het Adseum",
    over_p1: "Adseum is een plek voor het bewaren, tonen en vieren van homo-erotische cultuur en fotografie. We organiseren tentoonstellingen, publicaties en samenwerkingen met kunstenaars en communityleden.",
    over_p2: "Lees meer over onze missie, geschiedenis en projecten.",
    gallery_title: "Galerij",
    gallery_more: "Meer bekijken",
    gallery_no_photos: "Er zijn op dit moment geen foto's beschikbaar.",
    gallery_search: "Zoek...",
    gallery_results: "Resultaten",
    agenda_title: "Agenda",
    agenda_sub: "Bekijk onze komende evenementen en schrijf je in.",
    team_title: "Ons team",
    contact_title: "Contact",
    contact_prompt: "Vragen of samenwerking? Stuur ons een bericht.",
    contact_name: "Naam",
    contact_email: "E-mail",
    contact_message: "Bericht",
    contact_cancel: "Annuleer",
    contact_send: "Verzenden",
  },
  en: {
    nav_home: "Home",
    nav_over: "About",
    nav_galerij: "Gallery",
    nav_team: "Team",
    nav_agenda: "Events",
    nav_contact: "Contact",
    hero_title: "Adseum",
    hero_sub: "Platform for queer culture and photography — exhibitions, archive and community.",
    hero_view_gallery: "View gallery",
    hero_more_about: "More about us",
    over_title: "About Adseum",
    over_p1: "Adseum is a place for preserving, showing and celebrating queer erotic culture and photography. We organize exhibitions, publications and collaborations with artists and community members.",
    over_p2: "Learn more about our mission, history and projects.",
    gallery_title: "Gallery",
    gallery_more: "View more",
    gallery_no_photos: "There are currently no photos available.",
    gallery_search: "Search...",
    gallery_results: "Results",
    agenda_title: "Events",
    agenda_sub: "Browse our upcoming events and sign up.",
    team_title: "Team",
    contact_title: "Contact",
    contact_prompt: "Questions or collaborations? Send us a message.",
    contact_name: "Name",
    contact_email: "Email",
    contact_message: "Message",
    contact_cancel: "Cancel",
    contact_send: "Send",
  },
};

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
} | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>((typeof window !== "undefined" && (localStorage.getItem("adseum-locale") as Locale)) || "nl");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("adseum-locale") as Locale | null;
      if (saved) setLocale(saved);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("adseum-locale", locale); } catch (e) {}
  }, [locale]);

  const t = (key: string) => {
    return translations[locale][key] ?? translations["nl"][key] ?? key;
  };

  const value = useMemo(() => ({ locale, setLocale, t }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export default I18nContext;
