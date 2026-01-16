"use client";
import React from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n";

const GalleryGrid = dynamic(() => import("../components/GalleryGrid"), { ssr: false });

export default function GalerijPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
      <Navbar />

      <section className="w-full py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">{t("gallery_title")}</h1>
          </div>

          <GalleryGrid previewCount={0} />
        </div>
      </section>
    </main>
  );
}
