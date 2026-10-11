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
  themeColor: "#f3f0e8",
  maximumScale: 1,
  // Draw behind the notch and the home indicator, then keep the content
  // clear of them with env(safe-area-inset-*). Without this the page simply
  // stops at the notch and the dark background shows a band at the top.
  viewportFit: "cover",
};

/**
 * Runs before the first paint, and before React.
 *
 * Two jobs. It paints the page in the saved theme straight away: the colours
 * are inline custom properties the app writes on render, so until React is up
 * the page showed the stylesheet's own background and the app opened on a
 * black frame that snapped to light a moment later.
 *
 * And it sets the open round aside. Opening the app, or reloading it, should
 * land on the start screen; it used to drop you straight back into the round
 * it was in, which is not what starting an app means. The round is not thrown
 * away: the start screen offers it back.
 */
const BOOT = `(function(){try{
var k="mrwhite-noir-v1";
var raw=localStorage.getItem(k),saved=null;
try{saved=raw?JSON.parse(raw):null}catch(e){}
if(saved&&saved.stage&&saved.stage.name!=="home"){
  saved.resume=saved.stage;saved.resumeAt=saved.stageAt||Date.now();
  saved.stage={name:"home"};saved.stageAt=0;
  localStorage.setItem(k,JSON.stringify(saved));
}
var dark=!!(saved&&saved.settings&&saved.settings.theme==="donker");
var root=document.documentElement;
root.style.background=dark?"#0d0d0d":"#f3f0e8";
root.style.colorScheme=dark?"dark":"light";
}catch(e){}})()`;

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang) || !isVerified(lang)) notFound();

  return (
    <html lang={lang} className={FONTS}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
