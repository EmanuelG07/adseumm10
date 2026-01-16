"use client";
import React, { useEffect } from "react";

interface LightboxProps {
  images: { src: string; title?: string; caption?: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const img = images[index];

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white bg-black/40 rounded-full p-2"
        aria-label="Sluiten"
      >
        ✕
      </button>

      <button
        onClick={onPrev}
        className="absolute left-6 text-white bg-black/40 rounded-full p-3"
        aria-label="Vorige"
      >
        ‹
      </button>

      <div className="max-w-[90%] max-h-[90%] flex items-center">
        <img
          src={img.src}
          alt={img.title ?? `Image ${index + 1}`}
          className="max-w-full max-h-full object-contain rounded"
        />
      </div>

      <button
        onClick={onNext}
        className="absolute right-6 text-white bg-black/40 rounded-full p-3"
        aria-label="Volgende"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-6 right-6 text-center text-white/90">
        <div className="font-semibold">{img.title}</div>
        <div className="text-sm mt-1">{img.caption}</div>
      </div>
    </div>
  );
}
