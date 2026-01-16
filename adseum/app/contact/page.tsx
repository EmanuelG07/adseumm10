"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n";

export default function ContactPage() {
  const { t } = useI18n();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("error");
    setErrorMsg(t("contact_error"));
  };

  const isInvalid = !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />

      <section className="py-16 min-h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="max-w-5xl xl:max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 place-items-center lg:place-items-stretch">
          <div className="space-y-6 w-full">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
              {t("contact_title")}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {t("contact_prompt")}
            </h1>
            <p className="text-white/75 text-base leading-relaxed max-w-2xl">
              {t("contact_description")}
            </p>

            <div className="w-full h-52 sm:h-56 rounded-2xl border border-white/8 bg-neutral-900/70 flex items-center justify-center text-white/50 text-sm uppercase tracking-[0.16em] transition-transform duration-500 ease-out hover:scale-[1.02] cursor-pointer">
              Kaart placeholder
            </div>
          </div>

          <div className="w-full rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-6 sm:p-8 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">{t("contact_form_label")}</p>
              <h2 className="text-2xl font-bold text-white">{t("contact_form_title")}</h2>
              <p className="text-white/65 text-sm mt-1">{t("contact_form_note")}</p>
            </div>

            <form className="space-y-4" onSubmit={submit}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-white/85">{t("contact_name")}</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder={t("contact_name")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-white/85">{t("contact_email")}</label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder={t("contact_email")}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-white/85">{t("contact_message")}</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-32"
                  placeholder={t("contact_message")}
                  required
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => { setName(""); setEmail(""); setMessage(""); setStatus("idle"); }}
                  className="px-4 py-2 rounded-lg border border-white/12 text-white bg-white/5 hover:bg-white/10 transition"
                >
                  {t("contact_cancel")}
                </button>

                <button
                  type="submit"
                  disabled={status === "sending" || isInvalid}
                  className="px-6 py-3 rounded-full bg-white text-black font-semibold shadow-lg shadow-black/20 hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? t("contact_sending") : t("contact_send")}
                </button>
              </div>

              <div className="space-y-2 text-sm">
                {isInvalid && <div className="text-amber-300">{t("contact_validation_error")}</div>}
                {status === "success" && <div className="text-emerald-300">{t("contact_success")}</div>}
                {status === "error" && <div className="text-rose-300">{t("contact_error_prefix")}{errorMsg}</div>}
              </div>
            </form>

            <div className="pt-2 text-xs text-white/60">
              {t("contact_local_note")}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
