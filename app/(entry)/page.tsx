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
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 p-6">
      <h1 className="text-center text-4xl font-bold tracking-tight">
        Mr.<span className="text-accent"> White</span>
      </h1>

      <nav className="flex flex-col gap-3">
        {LOCALES.map((locale) => (
          <a
            key={locale}
            href={`/${locale}`}
            lang={locale}
            hrefLang={locale}
            className="rounded-2xl border border-border bg-surface px-6 py-4 text-center font-medium transition-colors hover:bg-surface-hover"
          >
            {LOCALE_NAMES[locale]}
          </a>
        ))}
      </nav>
    </main>
  );
}
