"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useI18n } from "../i18n";

interface NavbarProps {
  active?: string;
}

export default function Navbar({ active }: NavbarProps) {
  const router = useRouter(); // Om te kunnen navigeren
  const pathname = usePathname(); // Om te weten op welke pagina we nu zijn
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State voor mobiel menu

  const { locale, setLocale, t } = useI18n();

  // Wissel tussen Nederlands en Engels
  const toggleLocale = () => setLocale(locale === "nl" ? "en" : "nl");

  // Bepaal welke knop in het menu 'actief' (wit) moet zijn
  const navActive = active ?? (() => {
    if (!pathname) return "home";
    if (pathname === "/") return "home";
    return pathname.replace("/", ""); // Bijv. "/galerij" wordt "galerij"
  })();

  // De links die in het menu staan
  const items = [
    { id: "home", label: "Home", path: "/" },
    { id: "over", label: "Over", path: "/over" },
    { id: "galerij", label: "Galerij", path: "/galerij" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  // Functie om naar link te gaan en menu te sluiten
  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => handleNavigation("/")}
          className="mr-6 ml-2 cursor-pointer flex-shrink-0"
          aria-label="Adseum logo"
          title="Adseum — home"
        >
          <div className="relative w-28 h-8 md:w-40 md:h-12">
            <Image
              src="/img/witteadseumlogo.png"
              alt="Adseum - Empowering Queer Art"
              fill
              className="object-contain scale-110 md:scale-125 origin-left"
              priority
            />
          </div>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4">
          {items.map((it) => (
            <li key={it.id}>
              <button
                onClick={() => handleNavigation(it.path)}
                className={`px-3 py-1 rounded cursor-pointer transition-colors ${navActive === it.id ? "bg-white text-black" : "text-white/90 hover:text-white"}`}
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Desktop Language Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={toggleLocale} 
              className="px-3 py-1 rounded border border-white/20 text-white/90 hover:text-white cursor-pointer transition-colors" 
              title="Toggle language"
            >
              {locale === "nl" ? "EN" : "NL"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/90 hover:text-white transition-colors"
            aria-label="Toggle menu"
            title="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => handleNavigation(it.path)}
                className={`px-4 py-3 rounded text-left transition-colors ${
                  navActive === it.id 
                    ? "bg-white text-black font-semibold" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {it.label}
              </button>
            ))}
            <button
              onClick={() => {
                toggleLocale();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-3 rounded text-left text-white/90 hover:text-white hover:bg-white/10 transition-colors border-t border-white/10 mt-2"
            >
              {locale === "nl" ? "Switch to English" : "Wissel naar Nederlands"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
