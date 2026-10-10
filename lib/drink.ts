/**
 * The Drinking Edition's rule cards and secret challenges.
 *
 * Only the structure lives here — which rules exist, what category each one
 * belongs to, and which pairs may not be dealt together. The texts are in the
 * dictionaries, because they need translating like everything else.
 *
 * Taken from design v3. The numbering is the design's: rules are identified
 * by a 1-based id and the conflict pairs below refer to those ids, so
 * renumbering anything here silently changes which rules exclude each other.
 */
import { shuffle } from "./game.ts";

export type RuleCategory = "A" | "B" | "C" | "D";

export const RULE_CATEGORIES: readonly RuleCategory[] = ["A", "B", "C", "D"];

/**
 * The rules of each category, by id. Contiguous ranges are a coincidence of
 * how the design happens to be ordered, not something to rely on; look the
 * category up rather than doing arithmetic on the id.
 */
export const RULES_BY_CATEGORY: Record<RuleCategory, readonly number[]> = {
  A: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  B: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  C: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
  D: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
};

export const RULE_IDS: readonly number[] = RULE_CATEGORIES.flatMap(
  (category) => RULES_BY_CATEGORY[category],
);

/**
 * Pairs that contradict each other, so they are never dealt in the same game.
 * "Only questions" and "no questions at all" would leave a player with
 * nothing they are allowed to say.
 */
export const CONFLICTS: readonly (readonly [number, number])[] = [
  [26, 27],
  [26, 43],
  [32, 40],
  [28, 35],
  [44, 45],
  [29, 34],
  [37, 43],
  [36, 40],
];

/** How many rules a game runs under. */
export const RULES_PER_GAME = 3;

export const CHALLENGE_IDS: readonly number[] = [1, 2, 3, 4, 5, 6];

/** What finishing a secret challenge is worth, in sips to hand out. */
export const CHALLENGE_REWARD = 3;

export const MIN_DRINK_PLAYERS = 4;

export function ruleCategory(id: number): RuleCategory {
  const found = RULE_CATEGORIES.find((category) =>
    RULES_BY_CATEGORY[category].includes(id),
  );
  if (!found) throw new Error(`unknown rule id: ${id}`);
  return found;
}

function conflicts(id: number, chosen: readonly number[]): boolean {
  return CONFLICTS.some(
    ([a, b]) =>
      (a === id && chosen.includes(b)) || (b === id && chosen.includes(a)),
  );
}

/**
 * Three rules for a game, one from each enabled category in turn.
 *
 * Spreading them over categories is deliberate: three forbidden words at once
 * is a different, duller game than one forbidden word, one gesture and one
 * speaking rule. When a category runs dry — because everything left in it
 * conflicts with what is already chosen — it falls back to any enabled
 * category rather than dealing fewer than three.
 */
export function drawRules(
  enabled: Partial<Record<RuleCategory, boolean>> = {},
): number[] {
  let categories = shuffle(
    RULE_CATEGORIES.filter((category) => enabled[category] !== false),
  );
  if (!categories.length) categories = [...RULE_CATEGORIES];

  const chosen: number[] = [];
  for (let k = 0; k < RULES_PER_GAME; k++) {
    const allowed = (id: number) =>
      !chosen.includes(id) && !conflicts(id, chosen);

    const category = categories[k % categories.length];
    let pool = RULES_BY_CATEGORY[category].filter(allowed);
    if (!pool.length) {
      pool = RULE_IDS.filter(
        (id) => categories.includes(ruleCategory(id)) && allowed(id),
      );
    }
    if (!pool.length) break;

    chosen.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  return chosen;
}

/**
 * One secret challenge per player. With more players than challenges the
 * list simply comes round again, so two people can be working on the same
 * one without knowing it — which is fine, and occasionally very funny.
 */
export function dealChallenges(players: number): number[] {
  const order = shuffle(CHALLENGE_IDS);
  return Array.from({ length: players }, (_, i) => order[i % order.length]);
}
