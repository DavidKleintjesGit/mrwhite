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
  /** Paren regels die elkaar in de weg zitten en niet samen gedeeld worden. */
  conflicts: readonly (readonly [number, number])[];
  /**
   * De geheime opdrachten: de tekst, wat ze opleveren, en voor wie ze
   * bedoeld zijn. Staat er geen rol bij, dan is hij voor iedereen.
   */
  challenges: Record<
    string,
    Entry & { reward: number; roles?: readonly string[] }
  >;
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
const ROLES = ["burger", "undercover", "white"];

function isEntry(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<Entry>;
  return (
    typeof entry.t === "string" &&
    typeof entry.d === "string" &&
    entry.t.trim().length > 0
  );
}

export function isLanguagePack(value: unknown): value is LanguagePack {
  if (!value || typeof value !== "object") return false;
  const pack = value as Partial<LanguagePack>;
  if (typeof pack.version !== "number" || !Number.isFinite(pack.version)) {
    return false;
  }
  if (typeof pack.lang !== "string" || pack.lang.length === 0) return false;
  if (!pack.words || typeof pack.words !== "object") return false;

  // De catalogus mag naar niets verwijzen wat geen tekst heeft: dan krijgt
  // iemand een lege regel of een lege opdracht op zijn kaart, en dat is
  // erger dan spelen met de lijst die al in de app zat.
  if (!pack.ruleCategories || typeof pack.ruleCategories !== "object")
    return false;
  if (!Array.isArray(pack.conflicts)) return false;
  if (!pack.rules || typeof pack.rules !== "object") return false;
  if (!pack.challenges || typeof pack.challenges !== "object") return false;

  const ruleIds = Object.values(pack.ruleCategories).flat();
  if (ruleIds.length === 0) return false;
  if (
    !ruleIds.every(
      (id) => typeof id === "number" && isEntry(pack.rules?.[String(id)])
    )
  ) {
    return false;
  }

  const challenges = Object.values(pack.challenges);
  if (challenges.length === 0) return false;
  if (
    !challenges.every((challenge) => {
      if (!isEntry(challenge)) return false;
      const { reward, roles } = challenge as {
        reward?: unknown;
        roles?: unknown;
      };
      if (typeof reward !== "number") return false;
      // Rollen mogen ontbreken — dan is hij voor iedereen — maar als ze er
      // staan moeten het rollen zijn die bestaan. Een opdracht voor een rol
      // die niemand heeft, wordt nooit uitgedeeld en is dus zoek.
      if (roles === undefined) return true;
      return (
        Array.isArray(roles) &&
        roles.length > 0 &&
        roles.every((role) => ROLES.includes(role as string))
      );
    })
  ) {
    return false;
  }

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
      pair[1].trim().length > 0
  );
}
