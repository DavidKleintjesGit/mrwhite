import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mr. White",
  description:
    "Word game for 3 to 10 players. Everyone gets the same secret word — except the infiltrators.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b10",
  maximumScale: 1,
};

/**
 * Root layout for `/` only. Every real page lives under `app/[lang]`, which
 * carries its own root layout with the right `lang` attribute.
 */
export default function EntryLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
