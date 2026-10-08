export const LOCALES = ["en", "nl"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Remembers a deliberate language choice, so it beats the browser setting. */
export const LOCALE_STORAGE_KEY = "mrwhite.locale";

/** Human-readable names, each written in its own language. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Picks the best supported locale for a browser language tag such as
 * "nl-BE" or "en-GB". Falls back to the default locale.
 */
export function matchLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const base = language.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

/** Replaces `{name}` placeholders, so translators keep control of word order. */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
