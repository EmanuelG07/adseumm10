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
    setErrorMsg("Server-backend verwijderd — formulier is gedeactiveerd.");
  };

  const isInvalid = !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{t("contact_title")}</h1>
            <p className="text-gray-200 mb-6">{t("contact_prompt")}</p>

            <div className="w-full h-56 bg-neutral-800 rounded flex items-center justify-center text-gray-400">Kaart placeholder</div>
          </div>

          <form className="space-y-4" onSubmit={submit}>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-700 bg-neutral-900 text-white rounded px-3 py-2 placeholder-gray-400" placeholder={t("contact_name")} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border border-gray-700 bg-neutral-900 text-white rounded px-3 py-2 placeholder-gray-400" placeholder={t("contact_email")} />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border border-gray-700 bg-neutral-900 text-white rounded px-3 py-2 h-32 placeholder-gray-400" placeholder={t("contact_message")} />

            <div className="flex gap-2">
              <button type="button" onClick={() => { setName(""); setEmail(""); setMessage(""); setStatus("idle"); }} className="px-4 py-2 bg-neutral-700 text-white rounded">{t("contact_cancel")}</button>

              <button type="submit" disabled={status === "sending" || isInvalid} className="px-4 py-2 bg-white text-black rounded">
                {status === "sending" ? "Verzenden..." : t("contact_send")}
              </button>
            </div>

            {isInvalid && <div className="text-yellow-300">Vul een geldig e-mailadres en een bericht in.</div>}
            {status === "success" && <div className="text-green-400">Bedankt — je bericht is verzonden.</div>}
            {status === "error" && <div className="text-red-400">Fout: {errorMsg}</div>}
          </form>
        </div>
      </section>
    </main>
  );
}
