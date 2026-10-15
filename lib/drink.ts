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
  (category) => RULES_BY_CATEGORY[category]
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

/**
 * Welke regels en challenges er bestaan, en wat ze waard zijn.
 *
 * Dit stond als losse constanten in dit bestand, waardoor er een uitgave van
 * de app nodig was om er een regel bij te doen. Nu is het één ding dat je
 * kunt meegeven: de app draagt er een mee, en een opgehaald pakket kan er
 * een ander voor in de plaats zetten.
 */
export type Catalogue = {
  rulesByCategory: Record<RuleCategory, readonly number[]>;
  conflicts: readonly (readonly [number, number])[];
  challenges: readonly { id: number; reward: number }[];
};

/**
 * The secret challenges, and what finishing one is worth in sips to hand
 * out. The reward is the difficulty: a challenge that only needs the table
 * to behave normally pays three, one that needs two other players to turn on
 * each other pays eight.
 *
 * Nobody picks their own — the whole point is that an easy one and a brutal
 * one look identical until you read it. The payout is the only hint, and the
 * player sees it alone.
 */
export const CHALLENGES: readonly { id: number; reward: number }[] = [
  { id: 1, reward: 5 }, // De Uitlokker — steer someone into a forbidden word
  { id: 2, reward: 4 }, // De Papegaai — get your hint repeated
  { id: 3, reward: 3 }, // De Beschermer — get defended, which happens anyway
  { id: 4, reward: 6 }, // De Manipulator — visibly turn someone's suspicion
  { id: 5, reward: 7 }, // De Lokvogel — be accused and survive the vote
  { id: 6, reward: 8 }, // De Stoorzender — make two others accuse each other
];

export const CHALLENGE_IDS: readonly number[] = CHALLENGES.map((c) => c.id);

export const MIN_REWARD = 3;
export const MAX_REWARD = 8;

/** Wat er in de app zit; het vangnet als er niets is opgehaald. */
export const BUILT_IN: Catalogue = {
  rulesByCategory: RULES_BY_CATEGORY,
  conflicts: CONFLICTS,
  challenges: CHALLENGES,
};

export function challengeReward(
  id: number,
  catalogue: Catalogue = BUILT_IN
): number {
  const found = catalogue.challenges.find((challenge) => challenge.id === id);
  if (!found) throw new Error(`unknown challenge id: ${id}`);
  return found.reward;
}

export const MIN_DRINK_PLAYERS = 4;

export function ruleCategory(
  id: number,
  catalogue: Catalogue = BUILT_IN
): RuleCategory {
  const found = RULE_CATEGORIES.find((category) =>
    catalogue.rulesByCategory[category].includes(id)
  );
  if (!found) throw new Error(`unknown rule id: ${id}`);
  return found;
}

function conflicts(
  id: number,
  chosen: readonly number[],
  catalogue: Catalogue
): boolean {
  return catalogue.conflicts.some(
    ([a, b]) =>
      (a === id && chosen.includes(b)) || (b === id && chosen.includes(a))
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
  catalogue: Catalogue = BUILT_IN
): number[] {
  // Alleen categorieën waar ook werkelijk iets in zit: een catalogus uit
  // een pakket hoeft ze niet alle vier te vullen.
  const stocked = RULE_CATEGORIES.filter(
    (category) => catalogue.rulesByCategory[category].length > 0
  );
  let categories = shuffle(
    stocked.filter((category) => enabled[category] !== false)
  );
  if (!categories.length) categories = [...stocked];
  if (!categories.length) return [];

  const everything = stocked.flatMap(
    (category) => catalogue.rulesByCategory[category]
  );

  const chosen: number[] = [];
  for (let k = 0; k < RULES_PER_GAME; k++) {
    const allowed = (id: number) =>
      !chosen.includes(id) && !conflicts(id, chosen, catalogue);

    const category = categories[k % categories.length];
    let pool = catalogue.rulesByCategory[category].filter(allowed);
    if (!pool.length) {
      pool = everything.filter(
        (id) => categories.includes(ruleCategory(id, catalogue)) && allowed(id)
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
export function dealChallenges(
  players: number,
  catalogue: Catalogue = BUILT_IN
): number[] {
  const order = shuffle(catalogue.challenges.map((challenge) => challenge.id));
  return Array.from({ length: players }, (_, i) => order[i % order.length]);
}
