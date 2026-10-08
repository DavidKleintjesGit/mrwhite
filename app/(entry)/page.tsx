"use client";

import { useEffect } from "react";
import {
  LOCALES,
  LOCALE_NAMES,
  LOCALE_STORAGE_KEY,
  isLocale,
  matchLocale,
} from "@/lib/i18n";

/**
 * There is no server to redirect for us — the app is a static export — so `/`
 * picks a language in the browser. A remembered choice wins, otherwise the
 * browser's own language preference decides.
 *
 * `/` and `/[lang]` have separate root layouts, which Next.js can only cross
 * with a full page load, so this replaces the document rather than using the
 * client router.
 *
 * The links below are the fallback: they keep the page usable without
 * JavaScript and give crawlers a way into both languages.
 */
export default function EntryPage() {
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      // Blocked storage is fine, we fall back to the browser language.
    }

    const locale =
      stored && isLocale(stored)
        ? stored
        : matchLocale(navigator.languages ?? [navigator.language]);

    window.location.replace(`/${locale}`);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        padding: 24,
        background: "#0d0d0d",
        backgroundImage:
          "radial-gradient(rgba(243,240,232,.08) 1px, transparent 1.6px)",
        backgroundSize: "9px 9px",
        color: "#F3F0E8",
        fontFamily: "var(--font-courier-prime), 'Courier New', monospace",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-archivo-black), sans-serif",
          fontSize: 56,
          lineHeight: 1,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Mr.{" "}
        <span
          style={{
            display: "inline-block",
            background: "#FFD23F",
            color: "#0d0d0d",
            padding: "2px 12px 5px",
            transform: "rotate(-2deg)",
            boxShadow: "6px 6px 0 #F3F0E8",
          }}
        >
          White
        </span>
      </h1>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
          maxWidth: 320,
        }}
      >
        {LOCALES.map((locale) => (
          <a
            key={locale}
            href={`/${locale}`}
            lang={locale}
            hrefLang={locale}
            style={{
              fontFamily: "var(--font-archivo-black), sans-serif",
              display: "flex",
              height: 56,
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #F3F0E8",
              background: "#0d0d0d",
              color: "#F3F0E8",
              fontSize: 16,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "5px 5px 0 #FFD23F",
            }}
          >
            {LOCALE_NAMES[locale]}
          </a>
        ))}
      </nav>
    </main>
  );
}
