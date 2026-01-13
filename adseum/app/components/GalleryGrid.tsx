"use client";
import React, { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import Lightbox from "./Lightbox";

const SAMPLE_IMAGES: { src: string; title?: string; caption?: string; year?: number }[] = [];

export default function GalleryGrid({ previewCount = 8 }: { previewCount?: number }) {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<number | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { t } = useI18n();

  const years = useMemo(() => {
    const s = new Set<number>();
    SAMPLE_IMAGES.forEach((img) => img.year && s.add(img.year));
    return Array.from(s).sort( (a, b) => b - a);
  }, []);

  const filtered = SAMPLE_IMAGES.filter((img) => {
    if (yearFilter !== "all" && img.year !== yearFilter) return false;
    if (!query) return true;

const q = query.toLowerCase();

if (
  !img.title?.toLowerCase().includes(q) &&
  !img.caption?.toLowerCase().includes(q)
) {
  return false;
}
    return true;
  });

  const images = (previewCount && previewCount > 0) ? filtered.slice(0, previewCount) : filtered;
  const placeholdersCount = previewCount && previewCount > 0 ? previewCount : 12;

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("gallery_search")}
            className="px-3 py-2 rounded bg-neutral-900 text-white border border-gray-700"
          />

          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value === "all" ? "all" : Number(e.target.value))} className="px-3 py-2 rounded bg-neutral-900 text-white border border-gray-700">
            <option value="all">Alle jaren</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-400">{t("gallery_results")}: {filtered.length}</div>
      </div>

      {images.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: placeholdersCount }).map((_, idx) => (
            <div key={idx} className="relative">
              <div className="rounded-lg overflow-hidden bg-gradient-to-r from-transparent to-transparent p-[2px] group hover:from-red-400 hover:via-yellow-300 hover:to-purple-500 transition">
                <div className="bg-neutral-800 border border-dashed border-neutral-700 h-56 flex items-center justify-center rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-neutral-600">
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" />
                    <path d="M8 7h.01" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="group relative p-[2px] rounded-lg transform hover:scale-[1.02] transition"
              aria-label={img.title || `image-${i}`}
            >
              <div className="bg-gradient-to-r from-transparent to-transparent group-hover:from-red-500 group-hover:via-yellow-400 group-hover:to-purple-500 rounded-lg p-[2px] transition-shadow duration-300">
                <div className="overflow-hidden rounded-lg bg-neutral-800">
                  <img src={img.src} alt={img.title} className="w-full h-56 object-cover transition duration-300 transform group-hover:scale-105 group-hover:brightness-90" loading="lazy" />
                </div>
              </div>

              <div className="absolute inset-0 flex items-end pointer-events-none">
                <div className="w-full p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <div className="font-semibold">{img.title}</div>
                  <div className="text-xs mt-1 text-white/80">{img.caption}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex!}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))}
          onNext={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))}
        />
      )}
    </div>
  );
}
