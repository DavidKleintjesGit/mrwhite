import nl from "./dictionaries/nl";
import type { Dictionary } from "./dictionary";
import en from "./dictionaries/en";
import de from "./dictionaries/de";
import fr from "./dictionaries/fr";
import es from "./dictionaries/es";
import it from "./dictionaries/it";
import tr from "./dictionaries/tr";
import type { Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { nl, en, de, fr, es, it, tr };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary } from "./dictionary";
export * from "./config";
