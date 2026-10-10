import {
  ALIASES,
  CATEGORY_IDS,
  WORDS,
  type BucketId,
  type LangId,
  type Pair,
} from "./words.ts";

/**
 * Every rule of the game lives here, so there is one place to check when a
 * rule is in doubt. Nothing in this file touches React or the browser.
 */

/**
 * The two ways to play. Classic is the game on its own; the Drinking Edition
 * adds rule cards, secret challenges and a secret vote on top of it, and
 * changes the arithmetic below.
 */
export type Mode = "klassiek" | "drink";

export const MIN_PLAYERS = 3;
/** The Drinking Edition needs a fourth player for its secret vote to work. */
export const MIN_DRINK_PLAYERS = 4;
export const MAX_PLAYERS = 20;

export function minPlayers(mode: Mode): number {
  return mode === "drink" ? MIN_DRINK_PLAYERS : MIN_PLAYERS;
}

export type Role = "burger" | "undercover" | "white";

export type Player = {
  name: string;
  role: Role;
  /** Null for Mr. White, who gets no word at all. */
  word: string | null;
  seen: boolean;
  alive: boolean;
  /** Sips taken. Drinking Edition only; the group keeps itself honest. */
  sips: number;
  /** The player's secret challenge, by id. Null outside the Drinking Edition. */
  challenge: number | null;
  challengeDone: boolean;
};

/** [civilian word, undercover word] */
export type WordPair = [string, string];

export type Winner = "burgers" | "infiltranten" | "white";

export type Difficulty = "makkelijk" | "mix" | "moeilijk";

export type CustomPair = { a: string; b: string };

export function shuffle<T>(items: readonly T[]): T[] {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Most infiltrators a table of this size can take. Infiltrators win once a
 * single civilian is left, so they have to start well short of half.
 */
export function cap(players: number, mode: Mode = "klassiek"): number {
  return mode === "drink"
    ? Math.max(1, Math.floor(players / 2))
    : Math.max(1, Math.floor((players - 1) / 2));
}

/**
 * Trims the infiltrators back until the new player count can carry them,
 * dropping whichever side is ahead first.
 */
export function fitRoles(
  players: number,
  undercovers: number,
  whites: number,
  mode: Mode = "klassiek",
): { undercovers: number; whites: number } {
  const limit = cap(players, mode);
  let u = undercovers;
  let w = whites;
  while (u + w > limit) {
    if (u > 0 && u >= w) u--;
    else w--;
  }
  return { undercovers: u, whites: w };
}

export function clampPlayers(players: number, mode: Mode = "klassiek"): number {
  return Math.min(MAX_PLAYERS, Math.max(minPlayers(mode), players));
}

// --- Dealing ---------------------------------------------------------------

export type DealOptions = {
  players: number;
  undercovers: number;
  whites: number;
  names: readonly string[];
  lang: LangId;
  buckets: Record<string, boolean>;
  difficulty: Difficulty;
  custom: readonly CustomPair[];
  /** Used when every name is blank and the aliases run out. */
  fallbackName: (index: number) => string;
  /** One challenge id per player; left out outside the Drinking Edition. */
  challenges?: readonly number[];
};

export function pickPair(options: DealOptions): WordPair {
  const table = WORDS[options.lang] ?? WORDS.nl;
  let pool: Pair[] = [];
  for (const id of CATEGORY_IDS) {
    if (options.buckets[id]) pool = pool.concat(table[id]);
  }

  if (options.difficulty === "makkelijk") pool = pool.filter((p) => p[2] === 1);
  if (options.difficulty === "moeilijk") pool = pool.filter((p) => p[2] === 2);

  if (options.buckets.eigen) {
    pool = pool.concat(
      options.custom.map((c): Pair => [c.a, c.b, 0]),
    );
  }

  // Switching everything off should not leave the game with nothing to deal.
  if (!pool.length) pool = CATEGORY_IDS.flatMap((id) => WORDS.nl[id]);

  const picked = pool[Math.floor(Math.random() * pool.length)];
  // Which of the two is the civilians' word is a coin flip, so a pair does not
  // always point the same way.
  return Math.random() < 0.5 ? [picked[0], picked[1]] : [picked[1], picked[0]];
}

/** Blank fields get a detective alias, never a duplicate of a typed name. */
export function fillNames(
  names: readonly string[],
  players: number,
  fallbackName: (index: number) => string,
): string[] {
  const taken = new Set(
    names
      .slice(0, players)
      .map((name) => (name || "").trim())
      .filter(Boolean),
  );
  const free = shuffle(ALIASES.filter((alias) => !taken.has(alias)));
  return Array.from(
    { length: players },
    (_, index) =>
      (names[index] || "").trim() || free.shift() || fallbackName(index),
  );
}

export function deal(options: DealOptions): {
  players: Player[];
  pair: WordPair;
} {
  const pair = pickPair(options);
  const names = fillNames(options.names, options.players, options.fallbackName);

  const roles = shuffle<Role>([
    ...Array<Role>(options.whites).fill("white"),
    ...Array<Role>(options.undercovers).fill("undercover"),
    ...Array<Role>(
      options.players - options.whites - options.undercovers,
    ).fill("burger"),
  ]);

  const players = names.map((name, index) => ({
    name,
    role: roles[index],
    word:
      roles[index] === "burger"
        ? pair[0]
        : roles[index] === "undercover"
          ? pair[1]
          : null,
    seen: false,
    alive: true,
    sips: 0,
    challenge: options.challenges?.[index] ?? null,
    challengeDone: false,
  }));

  return { players, pair };
}

// --- Playing ---------------------------------------------------------------

/**
 * Picks who opens and lays out the speaking order from there.
 *
 * With `mrNotFirst` on, a Mr. White is kept out of the opening slot: before
 * anyone has spoken he has nothing at all to go on. Undercovers can open, so
 * the opener still gives nothing away.
 */
export function openingOrder(
  players: readonly Player[],
  mrNotFirst: boolean,
): number[] {
  const alive = players.flatMap((player, index) => (player.alive ? [index] : []));
  const eligible = mrNotFirst
    ? alive.filter((index) => players[index].role !== "white")
    : alive;
  const pool = eligible.length ? eligible : alive;

  const starter = pool[Math.floor(Math.random() * pool.length)];
  const at = alive.indexOf(starter);
  return [...alive.slice(at), ...alive.slice(0, at)];
}

/**
 * Votes someone out, and in the Drinking Edition makes whoever got it wrong
 * drink: if the table eliminated a civilian, everyone who voted for them
 * takes a sip. Getting an infiltrator out costs nobody anything.
 */
export function eliminate(
  players: readonly Player[],
  index: number,
  votes: Readonly<Record<number, number>> = {},
): Player[] {
  const wrong = players[index]?.role === "burger";
  const drinkers = wrong
    ? Object.keys(votes)
        .map(Number)
        .filter((voter) => votes[voter] === index)
    : [];

  return players.map((player, i) => {
    if (i === index) return { ...player, alive: false };
    if (drinkers.includes(i)) return { ...player, sips: player.sips + 1 };
    return player;
  });
}

/** Who has to drink for the vote that just happened, by player index. */
export function drinkersFor(
  players: readonly Player[],
  index: number,
  votes: Readonly<Record<number, number>>,
): number[] {
  if (players[index]?.role !== "burger") return [];
  return Object.keys(votes)
    .map(Number)
    .filter((voter) => votes[voter] === index);
}

/**
 * Null while the game is still running.
 *
 * The Drinking Edition ends sooner: infiltrators win the moment they match
 * the civilians rather than having to whittle them down to one. Rounds are
 * slower there, and a long endgame with the rule cards running is a slog.
 */
export function outcomeOf(
  players: readonly Player[],
  mode: Mode = "klassiek",
): Winner | null {
  const infiltrators = players.filter(
    (player) => player.alive && player.role !== "burger",
  ).length;
  const civilians = players.filter(
    (player) => player.alive && player.role === "burger",
  ).length;

  if (infiltrators === 0) return "burgers";
  if (mode === "drink" ? civilians <= infiltrators : civilians <= 1) {
    return "infiltranten";
  }
  return null;
}

/**
 * Mr. White's one guess. Accents, punctuation, spacing and capitals should
 * never decide a game, so they are all stripped before comparing.
 */
export function normaliseGuess(value: string): string {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

export function isCivilianWord(pair: WordPair, guess: string): boolean {
  return normaliseGuess(guess) === normaliseGuess(pair[0]);
}

export type { BucketId };
