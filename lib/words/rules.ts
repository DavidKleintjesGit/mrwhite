import type { Pair } from "../words.ts";

/**
 * De regels waar een woordpaar aan moet voldoen.
 *
 * Ze stonden in de testbestanden, waar ze alleen bestaande lijsten konden
 * bewaken. Nu staan ze hier, zodat de keuring van gegenereerde kandidaten
 * en de test op wat er al ligt precies dezelfde regels gebruiken. Twee
 * plekken met bijna dezelfde regels is hoe een lijst stilletjes afglijdt.
 *
 * Wat hier staat is mechanisch controleerbaar. Of een paar ook *leuk* is —
 * of er genoeg over te zeggen valt, of iedereen het woord kent — kan hier
 * niet gemeten worden; dat blijft mensenwerk.
 */

/** Langste woord dat de grote letters op de kaart aankunnen. */
export const MAX_WORD_LENGTH = 18;

/** Hoe vaak één woord binnen een taal mag terugkomen voordat het sleets wordt. */
export const MAX_REPEATS = 3;

/**
 * Meer dan drie woorden is geen woord meer maar een omschrijving. Drie en
 * niet twee, want "Jeu de boules" is één ding met een naam van drie woorden
 * en dat hoort gewoon te mogen.
 */
export const MAX_TOKENS = 3;

/**
 * Letters, spaties, koppeltekens, apostrofs en punten. Geen cijfers, want
 * "Formule 1" leest op een kaart als een fout; wel punten, want "Mr. Bean"
 * is hoe die man heet.
 */
const ALLOWED = /^[\p{L}][\p{L}\p{M} '’.-]*$/u;

export const tokens = (word: string) =>
  word
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);

/** De sleutel waarop twee paren hetzelfde zijn, welke kant ze ook op staan. */
export const pairKey = (pair: Pair) =>
  [pair[0], pair[1]]
    .map((word) => word.toLowerCase())
    .sort()
    .join("|");

/**
 * Wat er mis is met dit paar, als regels in gewone taal. Een lege lijst
 * betekent dat het paar erdoor is.
 */
export function problemsWith(pair: Pair): string[] {
  const problems: string[] = [];
  const [first, second, level] = pair;

  for (const word of [first, second]) {
    if (!word) {
      problems.push("een van de twee woorden is leeg");
      continue;
    }
    if (word !== word.trim())
      problems.push(`"${word}" heeft spaties aan de rand`);
    if (word.length > MAX_WORD_LENGTH) {
      problems.push(
        `"${word}" is ${word.length} tekens en past niet op de kaart`
      );
    }
    if (!ALLOWED.test(word)) {
      problems.push(`"${word}" bevat iets anders dan letters`);
    }
    if (tokens(word).length > MAX_TOKENS) {
      problems.push(`"${word}" is een omschrijving, geen woord`);
    }
  }
  if (!first || !second) return problems;

  if (![1, 2].includes(level)) {
    problems.push(`afstand ${level} bestaat niet; het is 1 of 2`);
  }

  const a = first.toLowerCase();
  const b = second.toLowerCase();

  if (a === b) problems.push(`"${first}" staat tegenover zichzelf`);

  // Het ene woord in het andere betekent dat elke hint op allebei past, en
  // dan kan de undercover nooit gepakt worden. Golf/Minigolf valt hierop af.
  if (a !== b && (a.includes(b) || b.includes(a))) {
    problems.push(`"${first}" en "${second}" zitten in elkaar`);
  }

  // Een heel woord delen is hetzelfde probleem een trap hoger:
  // "Schaatsen" en "Rolschaatsen" zijn geen twee verschillende dingen.
  const shared = tokens(a).filter((token) => tokens(b).includes(token));
  if (shared.length) {
    problems.push(`"${first}" en "${second}" delen "${shared.join(", ")}"`);
  }

  return problems;
}

/**
 * Wat er mis is met een hele lijst: de paren zelf, plus de dingen die je
 * alleen ziet als je ze naast elkaar legt.
 */
export function problemsWithList(pairs: readonly Pair[]): string[] {
  const problems: string[] = [];

  for (const pair of pairs) {
    for (const problem of problemsWith(pair)) {
      problems.push(`${pair[0]}/${pair[1]}: ${problem}`);
    }
  }

  const seen = new Set<string>();
  for (const pair of pairs) {
    const key = pairKey(pair);
    if (seen.has(key)) problems.push(`${pair[0]}/${pair[1]}: staat er al in`);
    seen.add(key);
  }

  const counts = new Map<string, number>();
  for (const pair of pairs) {
    for (const word of [pair[0], pair[1]]) {
      const lower = word.toLowerCase();
      counts.set(lower, (counts.get(lower) ?? 0) + 1);
    }
  }
  for (const [word, count] of counts) {
    if (count > MAX_REPEATS) {
      problems.push(
        `"${word}" komt ${count} keer voor, meer dan ${MAX_REPEATS}`
      );
    }
  }

  return problems;
}
