"use client";
import React, { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect naar Laravel login pagina
    window.location.href = "http://127.0.0.1:8000/login";
  };

  const handleRegisterClick = () => {
    // Redirect naar Laravel register pagina
    window.location.href = "http://127.0.0.1:8000/register";
  };

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0e1118] shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative grid">
          {/* Form panel only */}
          <div className="p-8 md:p-10 bg-[#0e1118] flex flex-col rounded-3xl border border-white/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Start</p>
                <h3 className="text-2xl font-bold text-white">Inloggen</h3>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors text-2xl leading-none"
                aria-label="Sluiten"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                  E-mailadres
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/12 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="jouw@email.nl"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                  Wachtwoord
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/12 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-white/70 cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded" />
                  Onthoud mij
                </label>
                <button type="button" className="text-purple-300 hover:text-purple-200 transition-colors">
                  Wachtwoord vergeten?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black font-semibold py-3 px-6 rounded-full transition-all shadow-lg shadow-black/20 hover:-translate-y-0.5"
              >
                Inloggen
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">Of</span>
              </div>
            </div>

            <div className="text-center mt-auto">
              <p className="text-white/75">
                Nog geen account?{" "}
                <button
                  type="button"
                  onClick={handleRegisterClick}
                  className="text-amber-300 hover:text-amber-200 transition-colors font-semibold"
                >
                  Registreer nu
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
