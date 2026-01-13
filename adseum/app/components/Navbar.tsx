"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useI18n } from "../i18n";

interface NavbarProps {
  active?: string;
}

export default function Navbar({ active }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { locale, setLocale, t } = useI18n();

  const toggleLocale = () => setLocale(locale === "nl" ? "en" : "nl");

  const navActive = active ?? (() => {
    if (!pathname) return "home";
    if (pathname === "/") return "home";
    return pathname.replace("/", "");
  })();

  const items = [
    { id: "home", label: "Home", path: "/" },
    { id: "over", label: "Over", path: "/over" },
    { id: "galerij", label: "Galerij", path: "/galerij" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => router.push("/")}
          className="font-extrabold text-2xl md:text-3xl tracking-tight mr-6 ml-2 cursor-pointer"
          aria-label="Adseum logo"
          title="Adseum — home"
        >
          <span className="inline-block text-red-500">A</span>
          <span className="inline-block text-orange-400">d</span>
          <span className="inline-block text-yellow-400">s</span>
          <span className="inline-block text-green-400">e</span>
          <span className="inline-block text-blue-500">u</span>
          <span className="inline-block text-purple-500">m</span>
        </button>

        <ul className="hidden md:flex gap-4">
          {items.map((it) => (
            <li key={it.id}>
              <button
                onClick={() => router.push(it.path)}
                className={`px-3 py-1 rounded cursor-pointer ${navActive === it.id ? "bg-white text-black" : "text-white/90 hover:text-white"}`}
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <button onClick={toggleLocale} className="px-2 py-1 rounded border border-white/20 text-white cursor-pointer" title="Toggle language">
              {locale === "nl" ? "NL" : "EN"}
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => router.push("/galerij")} className="px-3 py-1 rounded bg-white text-black cursor-pointer">Galerij</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
