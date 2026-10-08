import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mr. White",
  description:
    "Nederlands woordspel voor 3 tot 10 spelers. Iedereen krijgt hetzelfde geheime woord — behalve de infiltranten.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b10",
  // Het spel is een telefoon-app: inzoomen helpt niet en verpest de layout.
  maximumScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
