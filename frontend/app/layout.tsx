import type { Metadata } from "next";
import { Quicksand } from "next/font/google"; // Ik importeer het Quicksand font van Google
import "./globals.css"; // Hier worden de globale stijlen (zoals Tailwind) ingeladen
import { I18nProvider } from "./i18n"; // Dit zorgt ervoor dat vertalingen overal beschikbaar zijn
import BackgroundBlobs from "./components/BackgroundBlobs"; // De geanimeerde achtergrond die op elke pagina te zien is

// Instellingen voor het Quicksand font
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

// Metadata voor SEO (titel en beschrijving van de site)
export const metadata: Metadata = {
  title: "Adseum",
  description: "Portfolio website van Adseum",
};

// Dit is de hoofd-layout die om IEDERE pagina heen zit.
// Alles wat je hier zet, is zichtbaar op de hele website.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Ik voeg de font variabele toe aan de body zodat ik die in CSS kan gebruiken */}
      <body className={`${quicksand.variable} antialiased`}>
        {/* De I18nProvider zorgt dat alle componenten hierbinnen teksten kunnen vertalen */}
        <I18nProvider>
          <div className="relative min-h-screen">
            {/* De achtergrond blobs staan hier zodat ze achter alles zweven */}
            <BackgroundBlobs />
            {/* {children} is de plek waar de specifieke pagina-inhoud wordt getoond (bv. de homepage of galerij) */}
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
