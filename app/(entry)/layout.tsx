import type { Metadata, Viewport } from "next";
import { Archivo_Black, Courier_Prime } from "next/font/google";
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
  title: "Mr. White",
  description:
    "Word game for 3 to 20 players. Everyone gets the same secret word — except the infiltrators.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  maximumScale: 1,
};

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
      <body>{children}</body>
    </html>
  );
}
