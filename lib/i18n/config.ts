/**
 * One language drives the whole app: the interface and the secret words.
 * The language lives in the URL (`/nl`, `/en`), so each one is its own page
 * and can be found on its own.
 */
export const LOCALES = ["nl", "en", "de", "fr", "es", "it", "tr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Languages somebody has actually read through, interface and words both.
 * Only these get a page and a place in the picker. The rest are written but
 * unchecked, and shipping a whole interface nobody on the team can read is
 * not a risk worth taking. Moving one across is a one-line change here.
 */
export const VERIFIED_LOCALES: Locale[] = ["nl", "en"];

export function isVerified(locale: Locale): boolean {
  return VERIFIED_LOCALES.includes(locale);
}

/** Remembers a deliberate language choice, so it beats the browser setting. */
export const LOCALE_STORAGE_KEY = "mrwhite.locale";

/** Human-readable names, each written in its own language. */
export const LOCALE_NAMES: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  tr: "Türkçe",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Picks the best supported locale for a browser language tag such as "nl-BE"
 * or "en-GB", ignoring any language that is not ready to be shown.
 */
export function matchLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const base = language.toLowerCase().split("-")[0];
    if (isLocale(base) && isVerified(base)) return base;
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
