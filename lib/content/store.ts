/**
 * Waar een opgehaald taalpakket blijft staan.
 *
 * Per taal een eigen sleutel, los van de spelstand: wat je downloadt gaat
 * niet weg als een potje wordt gewist, en een kapotte spelstand sleept je
 * woorden niet mee. Alles staat op dit toestel en nergens anders.
 */
import { isLanguagePack, type LanguagePack } from "./schema.ts";

const KEY = (lang: string) => `mrwhite.content.${lang}`;

export function readPack(lang: string): LanguagePack | null {
  try {
    const raw = localStorage.getItem(KEY(lang));
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    // Ook wat we zelf hebben weggeschreven gaat langs de controle: het kan
    // van een oudere versie van de app komen, of met de hand zijn aangepast.
    return isLanguagePack(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writePack(pack: LanguagePack): void {
  try {
    localStorage.setItem(KEY(pack.lang), JSON.stringify(pack));
  } catch {
    // Vol of geweigerd: dan speelt hij gewoon met wat in de app zit.
  }
}

export function clearPacks(langs: readonly string[]): void {
  for (const lang of langs) {
    try {
      localStorage.removeItem(KEY(lang));
    } catch {
      // Niets aan te doen, en niets wat het spel in de weg zit.
    }
  }
}
