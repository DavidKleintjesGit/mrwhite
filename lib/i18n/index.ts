import nl, { type Dictionary } from "./dictionaries/nl";
import en from "./dictionaries/en";
import type { Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { nl, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
export * from "./config";
