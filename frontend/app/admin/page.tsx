"use client";
import React, { useState } from "react";

// Dit is de admin inlogpagina.
// Hier kunnen beheerders inloggen om toegang te krijgen tot het CMS.
export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Voor nu sturen we de gebruiker direct door naar de Laravel backend login route.
        // In de toekomst kan ik hier een API call maken als we dat liever hebben.
        // De 'timeout' is puur voor het visuele effect, zodat de gebruiker ziet dat er iets gebeurt.
        setTimeout(() => {
            window.location.href = "http://127.0.0.1:8000/login";
        }, 800);
    };

    return (
        <main className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden">

            {/* Achtergrond effecten (subtiele gloed) */}
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-[#0f0f10] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">

                    {/* Header van het inlogvenster */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
                            Admin Portal
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Log in om het platform te beheren
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                E-mailadres
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                placeholder="admin@adseum.nl"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                                Wachtwoord
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black font-semibold py-3.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Bezig met inloggen...
                                </>
                            ) : (
                                "Inloggen"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                            ← Terug naar website
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
