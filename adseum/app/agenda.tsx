import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda - Adseum",
  description: "Komende evenementen, lezingen en tentoonstellingen van Adseum",
};

const EVENTS = [
  {
    date: "2026-01-15",
    title: "Tentoonstelling: 'Licht en Schaduw'",
    location: "Galerie Adseum",
    description: "Een tentoonstelling met nieuw werk van opkomende homofotografen.",
  },
  {
    date: "2026-02-05",
    title: "Lezing: Archivering en representatie",
    location: "Online / Zoom",
    description: "Paneldiscussie over het bewaren van LGBTQ+ visuele geschiedenis.",
  },
  {
    date: "2026-03-12",
    title: "Workshop: Donkere kamer technieken",
    location: "Studio Adseum",
    description: "Hands-on workshop over klassieke donkere kamer technieken voor analoge fotografie.",
  },
];

export default function AgendaPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-neutral-900/95 border border-neutral-700 rounded-lg p-8 shadow-md">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Agenda</h1>
          <p className="text-gray-300 mt-2">Bekijk onze komende evenementen en schrijf je in.</p>
        </header>

        <div className="space-y-4">
          {EVENTS.map((ev) => (
            <article key={ev.title} className="p-4 bg-neutral-800/50 rounded-md flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="md:flex md:items-center md:gap-6">
                <div className="text-sm text-gray-400 w-28">
                  <div className="font-semibold">{new Date(ev.date).toLocaleDateString('nl-NL', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  <div className="text-xs">{ev.location}</div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{ev.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{ev.description}</p>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <button className="px-4 py-2 bg-white text-black rounded-md font-semibold">Meer info</button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-400">
          <small>Meer evenementen worden binnenkort toegevoegd — houd deze pagina in de gaten.</small>
        </div>
      </div>
    </main>
  );
}
