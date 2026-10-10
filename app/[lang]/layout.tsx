import type { Metadata, Viewport } from "next";
import {
  Archivo_Black,
  Courier_Prime,
  Permanent_Marker,
} from "next/font/google";
import { notFound } from "next/navigation";
import {
  VERIFIED_LOCALES,
  getDictionary,
  isLocale,
  isVerified,
} from "@/lib/i18n";
import "../globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  weight: "400",
  subsets: ["latin"],
});

const FONTS = [archivoBlack, courierPrime, permanentMarker]
  .map((font) => font.variable)
  .join(" ");

export const dynamicParams = false;

// Only languages that have been read through get a page.
export function generateStaticParams() {
  return VERIFIED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang) || !isVerified(lang)) notFound();

  const { meta } = getDictionary(lang);
  return { title: meta.title, description: meta.description };
}

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  maximumScale: 1,
  // Draw behind the notch and the home indicator, then keep the content
  // clear of them with env(safe-area-inset-*). Without this the page simply
  // stops at the notch and the dark background shows a band at the top.
  viewportFit: "cover",
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang) || !isVerified(lang)) notFound();

  return (
    <html lang={lang} className={FONTS}>
      <body>{children}</body>
    </html>
  );
}
