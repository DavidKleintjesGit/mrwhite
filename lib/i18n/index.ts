import en, { type Dictionary } from "./dictionaries/en";
import nl from "./dictionaries/nl";
import type { Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { en, nl };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
export * from "./config";
