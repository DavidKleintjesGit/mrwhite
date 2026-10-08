/**
 * Word pairs, straight from the design. Each pair carries both languages and
 * a closeness level: 1 is far apart (cat/dog), 3 is nearly the same thing
 * (camel/llama).
 */
export type WordPair = {
  nl: [string, string];
  en: [string, string];
  level: 1 | 2 | 3;
};

export type CategoryId =
  | "eten"
  | "dieren"
  | "plekken"
  | "beroepen"
  | "dingen"
  | "sport";

export type Category = {
  id: CategoryId;
  pairs: WordPair[];
};

const pair = (
  nlA: string,
  nlB: string,
  enA: string,
  enB: string,
  level: 1 | 2 | 3,
): WordPair => ({ nl: [nlA, nlB], en: [enA, enB], level });

export const CATEGORIES: Category[] = [
  {
    id: "eten",
    pairs: [
      pair("pizza", "lasagne", "pizza", "lasagna", 1),
      pair("koffie", "thee", "coffee", "tea", 1),
      pair("friet", "chips", "fries", "crisps", 2),
      pair("pannenkoek", "poffertjes", "pancake", "waffle", 2),
      pair("sushi", "ceviche", "sushi", "ceviche", 3),
    ],
  },
  {
    id: "dieren",
    pairs: [
      pair("kat", "hond", "cat", "dog", 1),
      pair("leeuw", "tijger", "lion", "tiger", 1),
      pair("dolfijn", "haai", "dolphin", "shark", 2),
      pair("uil", "vleermuis", "owl", "bat", 2),
      pair("kameel", "lama", "camel", "llama", 3),
    ],
  },
  {
    id: "plekken",
    pairs: [
      pair("strand", "zwembad", "beach", "pool", 1),
      pair("bioscoop", "theater", "cinema", "theatre", 2),
      pair("ziekenhuis", "apotheek", "hospital", "pharmacy", 2),
      pair("bibliotheek", "boekwinkel", "library", "bookshop", 2),
      pair("vuurtoren", "molen", "lighthouse", "windmill", 3),
    ],
  },
  {
    id: "beroepen",
    pairs: [
      pair("dokter", "verpleger", "doctor", "nurse", 1),
      pair("piloot", "stewardess", "pilot", "flight attendant", 1),
      pair("bakker", "slager", "baker", "butcher", 2),
      pair("detective", "spion", "detective", "spy", 2),
      pair("architect", "aannemer", "architect", "builder", 3),
    ],
  },
  {
    id: "dingen",
    pairs: [
      pair("kaars", "lamp", "candle", "lamp", 1),
      pair("paraplu", "regenjas", "umbrella", "raincoat", 1),
      pair("spiegel", "raam", "mirror", "window", 2),
      pair("sleutel", "slot", "key", "lock", 2),
      pair("kompas", "landkaart", "compass", "map", 3),
    ],
  },
  {
    id: "sport",
    pairs: [
      pair("voetbal", "hockey", "football", "hockey", 1),
      pair("tennis", "padel", "tennis", "padel", 2),
      pair("zwemmen", "duiken", "swimming", "diving", 2),
      pair("boksen", "worstelen", "boxing", "wrestling", 2),
      pair("schaken", "dammen", "chess", "checkers", 3),
    ],
  },
];

export const CATEGORY_IDS = CATEGORIES.map((category) => category.id);

export type Difficulty = "easy" | "normal" | "hard";

/** A player-written pair. Both languages get the same two words. */
export type CustomPair = { a: string; b: string };

/**
 * Easy keeps only the obvious pairs, hard drops them, and normal leaves out
 * the near-identical ones.
 */
export function matchesDifficulty(
  pair: WordPair,
  difficulty: Difficulty,
): boolean {
  if (difficulty === "easy") return pair.level === 1;
  if (difficulty === "hard") return pair.level >= 2;
  return pair.level <= 2;
}

export function availablePairs(
  categories: readonly CategoryId[],
  difficulty: Difficulty,
  custom: readonly CustomPair[],
): WordPair[] {
  const fromCategories = CATEGORIES.filter((category) =>
    categories.includes(category.id),
  )
    .flatMap((category) => category.pairs)
    .filter((pair) => matchesDifficulty(pair, difficulty));

  const fromCustom: WordPair[] = custom.map((entry) => ({
    nl: [entry.a, entry.b],
    en: [entry.a, entry.b],
    level: 2,
  }));

  return [...fromCategories, ...fromCustom];
}

export function countPairs(
  categories: readonly CategoryId[],
  difficulty: Difficulty,
  custom: readonly CustomPair[],
): number {
  return availablePairs(categories, difficulty, custom).length;
}
