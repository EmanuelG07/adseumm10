"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n";

// Ik importeer GalleryGrid 'dynamisch' met SSR: false.
// Dit betekent dat hij pas in de browser wordt geladen, wat fouten met 'window' voorkomt.
// Let op: Ik importeer nu ook het 'GalleryItem' type zodat we de state goed kunnen typeren.
import type { GalleryItem } from "../components/GalleryGrid";
const GalleryGrid = dynamic(() => import("../components/GalleryGrid"), { ssr: false });

export default function GalerijPage() {
  const { t } = useI18n();
  // State om de opgehaalde foto's in op te slaan
  // Ik vertel React nu expliciet dat dit een lijst van 'GalleryItem's is.
  const [items, setItems] = useState<GalleryItem[]>([]);
  // State om eventuele foutmeldingen te tonen
  const [error, setError] = useState("");

  // useEffect die direct bij het laden van de pagina de foto's ophaalt van de backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/photos")
      .then((r) => {
        // Controleer of het antwoord van de server goed is (status 200-299)
        if (!r.ok) throw new Error("Backend error: " + r.status);
        return r.json();
      })
      .then((data) => {
        // Als we data hebben, zetten we die om naar het formaat dat onze GalleryGrid verwacht
        const mapped = Array.isArray(data)
          ? data.map((p) => ({
            src: p.url,                          // De URL van de afbeelding
            title: p.title || "",                // De titel (of leeg als die er niet is)
            caption: p.alt || "",                // De omschrijving (alt tekst)
            // year: 2026,                        // (Optioneel: kan later toegevoegd worden)
          }))
          : [];
        setItems(mapped); // Sla de omgezette items op in de state
      })
      .catch((e) => setError(e.message)); // Vang fouten op en sla ze op
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
      <Navbar />

      <section className="w-full py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">{t("gallery_title")}</h1>
          </div>

          {/* Als er een error is, toon die, anders toon het grid */}
          {error ? (
            <p className="text-red-400">Kan foto’s niet laden: {error}</p>
          ) : (
            // Ik geef de items door aan de GalleryGrid component zodat ze getoond worden
            <GalleryGrid previewCount={0} items={items} />
          )}
        </div>
      </section>
    </main>
  );
}
