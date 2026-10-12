import type { Metadata, Viewport } from "next";
import { Archivo_Black, Courier_Prime } from "next/font/google";
import { LOCALE_STORAGE_KEY, VERIFIED_LOCALES } from "@/lib/i18n";
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

export const metadata: Metadata = {
  title: "Mister White",
  description:
    "Word game for 3 to 20 players. Everyone gets the same secret word — except the infiltrators.",
};

export const viewport: Viewport = {
  themeColor: "#f3f0e8",
  maximumScale: 1,
};

/**
 * Picks a language and leaves, before anything else runs.
 *
 * This deliberately does not wait for React. The redirect used to live in an
 * effect, which meant it only fired once the page had hydrated — fine on a
 * desktop, but in a slow WebView the language picker sat there for seconds,
 * and if hydration never finished it sat there for good. A plain script in
 * the head runs before the first paint and needs nothing else to work.
 *
 * The picker underneath stays as the fallback: it is what you get with no
 * script at all, and it is what a crawler reads.
 */
const REDIRECT = `(function(){try{
var ok=${JSON.stringify(VERIFIED_LOCALES)};
var want=null;
try{want=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)})}catch(e){}
if(ok.indexOf(want)<0){
  want=null;
  var langs=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""]);
  for(var i=0;i<langs.length&&!want;i++){
    var tag=String(langs[i]).toLowerCase().split("-")[0];
    if(ok.indexOf(tag)>=0)want=tag;
  }
}
var to="/"+(want||ok[0])+"/";
// Capacitor serveert geen mappaden bij paginanavigatie; zie DocLink.
// Android draait op https, iOS op capacitor: — beide moeten hier langs.
var s=location.protocol;
if(location.hostname==="localhost"&&(s==="https:"||s==="capacitor:"||s==="ionic:"))to+="index.html";
location.replace(to);
}catch(e){}})()`;

/**
 * Root layout for `/` only. Every real page lives under `app/[lang]`, which
 * carries its own root layout with the right `lang` attribute. Only the two
 * fonts this page actually shows are loaded here.
 */
export default function EntryLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${courierPrime.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
