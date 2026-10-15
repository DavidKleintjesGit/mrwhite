/**
 * De vorm waarin woorden, regels en challenges de app binnenkomen.
 *
 * Dit is wat er op de server komt te staan en wat de app meelevert. Beide
 * worden uit dezelfde TypeScript-bronnen gemaakt, want twee lijsten die uit
 * elkaar kunnen lopen is precies wat je niet wil als de helft van je spelers
 * net heeft bijgewerkt en de andere helft niet.
 *
 * Het versienummer is een geheel getal dat alleen omhoog gaat. De app
 * vergelijkt het met wat hij heeft en haalt alleen op wat nieuwer is.
 */
import type { CategoryId, Pair } from "@/lib/words";
import type { RuleCategory } from "@/lib/drink";

/** Een tekstje met een titel en een uitleg, zoals een regel of een challenge. */
export type Entry = { t: string; d: string };

export type LanguagePack = {
  version: number;
  lang: string;
  /** Woordparen per categorie: [burgerwoord, undercoverwoord, hoe dicht erbij]. */
  words: Partial<Record<CategoryId, Pair[]>>;
  /** De huisregels van de Drinking Edition, op nummer. */
  rules: Record<string, Entry>;
  /** Welke regel in welke categorie valt; de app trekt er per categorie uit. */
  ruleCategories: Record<RuleCategory, readonly number[]>;
  /** De geheime opdrachten, met het aantal slokken dat ze opleveren. */
  challenges: Record<string, Entry & { reward: number }>;
};

export type ContentIndex = {
  /** De hoogste versie die er in deze uitgave zit. */
  version: number;
  /** Wanneer hij gemaakt is; alleen om naar te kijken. */
  built: string;
  languages: Record<string, { version: number; file: string; pairs: number }>;
};

/**
 * Of iets wat we net binnenkregen er genoeg als een taalpakket uitziet om
 * mee te spelen.
 *
 * Een half binnengekomen bestand of een server die iets anders teruggeeft
 * mag het spel niet breken; dan valt hij terug op wat in de app zit.
 */
export function isLanguagePack(value: unknown): value is LanguagePack {
  if (!value || typeof value !== "object") return false;
  const pack = value as Partial<LanguagePack>;
  if (typeof pack.version !== "number" || !Number.isFinite(pack.version)) {
    return false;
  }
  if (typeof pack.lang !== "string" || pack.lang.length === 0) return false;
  if (!pack.words || typeof pack.words !== "object") return false;

  // Minstens één categorie met minstens één bruikbaar paar erin, anders valt
  // er niets te spelen en is terugvallen beter dan doorgaan.
  const pairs = Object.values(pack.words).flat();
  if (pairs.length === 0) return false;
  return pairs.every(
    (pair) =>
      Array.isArray(pair) &&
      pair.length === 3 &&
      typeof pair[0] === "string" &&
      typeof pair[1] === "string" &&
      typeof pair[2] === "number" &&
      pair[0].trim().length > 0 &&
      pair[1].trim().length > 0,
  );
}
