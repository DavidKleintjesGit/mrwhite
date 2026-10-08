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
      className="flex min-h-screen flex-col items-center justify-center gap-8 p-6 text-fg"
      style={{
        backgroundColor: "var(--bg)",
        backgroundImage: "radial-gradient(var(--dot) 1px,transparent 1.3px)",
        backgroundSize: "6px 6px",
      }}
    >
      <h1
        className="font-display text-center text-[56px] leading-none"
        style={{ textShadow: "5px 5px 0 #e8322b" }}
      >
        MR. WHITE
      </h1>

      <nav className="flex w-full max-w-xs flex-col gap-3">
        {LOCALES.map((locale) => (
          <a
            key={locale}
            href={`/${locale}`}
            lang={locale}
            hrefLang={locale}
            className="font-display flex h-14 items-center justify-center border-[3px] border-[var(--fg)] bg-[var(--bg)] text-[16px] tracking-[.06em]"
            style={{ boxShadow: "5px 5px 0 #f5d90a" }}
          >
            {LOCALE_NAMES[locale]}
          </a>
        ))}
      </nav>
    </main>
  );
}
