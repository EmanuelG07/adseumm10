"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function BackgroundBlobs() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "" || pathname === undefined;

  const blobs = [
    { color: "rgba(255,0,102,0.95)", size: "50vmax", top: "-10%", left: "-20%", duration: "22s", delay: "0s" }, // Red / pink
    { color: "rgba(255,94,0,0.95)", size: "44vmax", top: "5%", left: "55%", duration: "24s", delay: "-3s" }, // Orange
    { color: "rgba(255,212,0,0.95)", size: "38vmax", top: "55%", left: "10%", duration: "26s", delay: "-6s" }, // Yellow
    { color: "rgba(0,200,83,0.95)", size: "42vmax", top: "30%", left: "30%", duration: "28s", delay: "-9s" }, // Green
    { color: "rgba(0,122,255,0.95)", size: "46vmax", top: "-15%", left: "70%", duration: "30s", delay: "-12s" }, // Blue
    { color: "rgba(88,24,255,0.95)", size: "36vmax", top: "60%", left: "60%", duration: "20s", delay: "-5s" }, // Indigo
    { color: "rgba(218,0,255,0.95)", size: "32vmax", top: "15%", left: "25%", duration: "34s", delay: "-15s" }, // Violet
  ];

  const variantClass = isHome ? "blobs--strong" : "blobs--subtle";

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${variantClass}`}>
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`blob ${isHome ? "blob--strong" : "blob--subtle"}`}
          style={{
            background: `radial-gradient(circle at 30% 30%, ${b.color} 0%, ${b.color} 35%, rgba(0,0,0,0) 60%)`,
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            animationDuration: b.duration,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
