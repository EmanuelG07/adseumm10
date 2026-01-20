"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Locale = "nl" | "en";
// Hier staan alle vertalingen. 'nl' voor Nederlands, 'en' voor Engels.
const translations: Record<Locale, Record<string, string>> = {
  nl: {
    nav_home: "Home",
    nav_over: "Over",
    nav_galerij: "Galerij",
    nav_login: "Inloggen",
    nav_contact: "Contact",
    hero_title: "Adseum",
    hero_sub: "Platform voor homocultuur en fotografie — tentoonstellingen, archief en community.",
    hero_view_gallery: "Bekijk galerij",
    hero_more_about: "Meer over ons",
    hero_tagline_1: "Kunst. Erfgoed. Vrijheid.",
    hero_tagline_2: "Vrijheid. Kunst. Erfgoed.",
    hero_tagline_3: "Erfgoed. Vrijheid. Kunst.",
    hero_description: "ADseum is een non-profit stichting die zich inzet voor het behoud en de zichtbaarheid van gay- en queer kunst en cultuur. De stichting komt voort uit het Homo Webmuseum, opgericht in 2005 door Ad Schuring. Ter nagedachtenis aan hem werd in 2024 de naam ADseum.",
    hero_description_short: "is een non-profit stichting die zich inzet voor het behoud en de zichtbaarheid van gay- en queer kunst en cultuur. De stichting komt voort uit het Homo Webmuseum, opgericht in 2005 door Ad Schuring. Ter nagedachtenis aan hem werd in 2024 de naam ADseum.",
    hero_description_2: "Met een nieuw bestuur werkt ADseum aan de heropening van een virtueel museum en ondersteunt zij kunstenaars, nalatenschappen en culturele initiatieven. De stichting organiseert en ondersteunt tentoonstellingen, publicaties en samenwerkingen met nationale en internationale partners.",
    hero_badge_1: "Virtueel Museum",
    hero_badge_2: "Tentoonstellingen",
    hero_badge_3: "Samenwerkingen",
    over_title: "Over het Adseum",
    over_subtitle: "Stichting voor de bevordering en zichtbaarheid van queer kunstcultuur",
    over_section_title: "Ons Verhaal",
    over_p1: "ADseum komt voort uit de stichting \"Homo webmuseum\", opgericht in 2005 door Ad Schuring en Martin van der Lugt. Gedurende twee decennia heeft Ad een dagelijks blog onderhouden waarin alle facetten van de gay cultuur werden belicht: kunst, muziek, toneel, exposities, film, boeken, politiek en protest.",
    over_p2: "Het Homo webmuseum presenteerde gay en queer kunstenaars van vroeger en nu. In 2026 openen we dit virtuele museum opnieuw in een vernieuwde vorm.",
    over_p3: "In 2024, na het overlijden van Ad Schuring, veranderde de naam in ADseum ter nagedachtenis aan onze oprichter. Met een nieuw, fris en enthousiast bestuur zetten we zijn werk voort.",
    over_section_2_title: "Wat We Doen",
    over_mission: "Ons doel: het bevorderen van queer cultuur door het stimuleren, ondersteunen en zichtbaar maken van erotische kunst, beeldende kunst en de gay/queer cultuur in al haar uitingsvormen.",
    over_feature_1_title: "Cultuurbevordering",
    over_feature_1_desc: "Organiseren en ondersteunen van festivals, tentoonstellingen, lezingen en andere culturele manifestaties.",
    over_feature_2_title: "Uitgeverij",
    over_feature_2_desc: "Het uitgeven van boeken en publicaties op papier en middels andere communicatieve uitingen.",
    over_feature_3_title: "Samenwerking",
    over_feature_3_desc: "Partnerschap met organisaties en instellingen die vergelijkbare doelen nastreven.",
    gallery_title: "Galerij",
    gallery_more: "Meer bekijken",
    gallery_no_photos: "Er zijn op dit moment geen foto's beschikbaar.",
    gallery_search: "Zoek...",
    gallery_results: "Resultaten",
    team_title: "Team",

    contact_title: "Contact",
    contact_prompt: "Vragen of samenwerking? Stuur ons een bericht.",
    contact_description: "Bereik het team voor samenwerkingen, pers, of creatieve ideeën. We reageren snel en helpen je graag verder.",
    contact_form_label: "Formulier",
    contact_form_title: "Stuur ons een bericht",
    contact_form_note: "We lezen alles.",
    contact_name: "Naam",
    contact_email: "E-mail",
    contact_message: "Bericht",
    contact_cancel: "Annuleer",
    contact_send: "Verzenden",
    contact_error: "Server-backend verwijderd — formulier is gedeactiveerd.",
    contact_validation_error: "Vul een geldig e-mailadres en een bericht in.",
    contact_success: "Bedankt — je bericht is verzonden.",
    contact_error_prefix: "Fout: ",
    contact_sending: "Verzenden...",
    contact_local_note: "Je bericht wordt lokaal verwerkt; servermail staat tijdelijk uitgeschakeld.",
  },
  en: {
    nav_home: "Home",
    nav_over: "About",
    nav_galerij: "Gallery",
    nav_login: "Login",
    nav_contact: "Contact",
    hero_title: "Adseum",
    hero_sub: "Platform for queer culture and photography — exhibitions, archive and community.",
    hero_view_gallery: "View gallery",
    hero_more_about: "More about us",
    hero_tagline_1: "Art. Heritage. Freedom.",
    hero_tagline_2: "Freedom. Art. Heritage.",
    hero_tagline_3: "Heritage. Freedom. Art.",
    hero_description: "ADseum is a non-profit foundation dedicated to preserving and promoting gay and queer art and culture. The foundation stems from the Homo Webmuseum, founded in 2005 by Ad Schuring. In 2024, in memory of him, the name was changed to ADseum.",
    hero_description_short: "is a non-profit foundation dedicated to preserving and promoting gay and queer art and culture. The foundation stems from the Homo Webmuseum, founded in 2005 by Ad Schuring. In 2024, in memory of him, the name was changed to ADseum.",
    hero_description_2: "With a new board, ADseum is working on reopening a virtual museum and supports artists, legacies and cultural initiatives. The foundation organizes and supports exhibitions, publications and collaborations with national and international partners.",
    hero_badge_1: "Virtual Museum",
    hero_badge_2: "Exhibitions",
    hero_badge_3: "Collaborations",
    over_title: "About Adseum",
    over_subtitle: "Foundation for the promotion and visibility of queer art culture",
    over_section_title: "Our Story",
    over_p1: "ADseum stems from the foundation \"Homo webmuseum\", founded in 2005 by Ad Schuring and Martin van der Lugt. For two decades, Ad maintained a daily blog covering all facets of gay culture: art, music, theater, exhibitions, film, books, politics and protest.",
    over_p2: "The Homo webmuseum presented gay and queer artists from past and present. In 2026 we are reopening this virtual museum in a renewed form.",
    over_p3: "In 2024, following the death of Ad Schuring, the name changed to ADseum in memory of our founder. With a new, fresh and enthusiastic board, we continue his work.",
    over_section_2_title: "What We Do",
    over_mission: "Our goal: to promote queer culture by stimulating, supporting and showcasing erotic art, visual art and gay/queer culture in all its forms.",
    over_feature_1_title: "Cultural Promotion",
    over_feature_1_desc: "Organizing and supporting festivals, exhibitions, lectures and other cultural events.",
    over_feature_2_title: "Publishing",
    over_feature_2_desc: "Publishing books and publications in print and through other forms of communication.",
    over_feature_3_title: "Collaboration",
    over_feature_3_desc: "Partnerships with organizations and institutions pursuing similar goals.",
    gallery_title: "Gallery",
    gallery_more: "View more",
    gallery_no_photos: "There are currently no photos available.",
    gallery_search: "Search...",
    gallery_results: "Results",
    team_title: "Team",

    contact_title: "Contact",
    contact_prompt: "Questions or collaboration? Send us a message.",
    contact_description: "Reach out to the team for collaborations, press inquiries, or creative ideas. We respond quickly and are happy to help.",
    contact_form_label: "Form",
    contact_form_title: "Send us a message",
    contact_form_note: "We read everything.",
    contact_name: "Name",
    contact_email: "Email",
    contact_message: "Message",
    contact_cancel: "Cancel",
    contact_send: "Send",
    contact_error: "Server backend removed — form is deactivated.",
    contact_validation_error: "Please enter a valid email address and message.",
    contact_success: "Thank you — your message has been sent.",
    contact_error_prefix: "Error: ",
    contact_sending: "Sending...",
    contact_local_note: "Your message is processed locally; server mail is temporarily disabled.",
  },
};

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
} | null>(null);

// De Provider component die om de hele app heen zit (zie layout.tsx)
export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Probeer de taalinstelling uit de browser (localStorage) te halen, anders standaard 'nl'
  const [locale, setLocale] = useState<Locale>((typeof window !== "undefined" && (localStorage.getItem("adseum-locale") as Locale)) || "nl");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("adseum-locale") as Locale | null;
      if (saved) setLocale(saved);
    } catch (e) { }
  }, []);

  // Als de taal verandert, sla dit op in de browser voor de volgende keer
  useEffect(() => {
    try { localStorage.setItem("adseum-locale", locale); } catch (e) { }
  }, [locale]);

  // De functie 't' zoekt de juiste tekst op bij de sleutel (key)
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
