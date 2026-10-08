import {
  availablePairs,
  type CategoryId,
  type CustomPair,
  type Difficulty,
  type WordPair,
} from "./words";

/**
 * Every rule of the game lives in this one file, so there is a single place to
 * check when a rule is in doubt. Nothing here touches React or the browser.
 */

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 20;

export type Role = "civilian" | "undercover" | "mrwhite";

/** How many of each role a round is dealt with. */
export type Lineup = {
  players: number;
  undercovers: number;
  mrWhites: number;
};

export type Player = {
  name: string;
  role: Role;
  /** Null for Mr. White, who gets no word at all. */
  word: string | null;
  /** Ticked off on the hand-out screen so the group sees who still has to look. */
  seen: boolean;
  alive: boolean;
};

export type Game = {
  players: Player[];
  /** The civilians' word. */
  wordA: string;
  /** The undercovers' word. */
  wordB: string;
  round: number;
};

export type Outcome = "civilians" | "infiltrators" | "mrwhite";

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// --- Line-up ---------------------------------------------------------------

/**
 * Infiltrators win once a single civilian is left, so they have to start well
 * short of half the table or the game is over before anyone has spoken.
 */
export function maxInfiltrators(players: number): number {
  return Math.floor((players - 1) / 2);
}

export function civilianCount(lineup: Lineup): number {
  return lineup.players - lineup.undercovers - lineup.mrWhites;
}

export function infiltratorCount(lineup: Lineup): number {
  return lineup.undercovers + lineup.mrWhites;
}

/**
 * Changing the player count can leave the old line-up unplayable, so the
 * infiltrators are trimmed back until it fits, keeping at least one.
 */
export function withPlayers(lineup: Lineup, players: number): Lineup {
  const clamped = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, players));
  let { undercovers, mrWhites } = lineup;
  const max = maxInfiltrators(clamped);

  while (undercovers + mrWhites > max) {
    if (mrWhites > undercovers && mrWhites > 0) mrWhites--;
    else if (undercovers > 0) undercovers--;
    else mrWhites--;
  }
  if (undercovers + mrWhites < 1) undercovers = 1;

  return { players: clamped, undercovers, mrWhites };
}

/** Null when the change would break the line-up, so the caller can ignore it. */
export function withRole(
  lineup: Lineup,
  field: "undercovers" | "mrWhites",
  delta: number,
): Lineup | null {
  const next = lineup[field] + delta;
  const other = field === "undercovers" ? lineup.mrWhites : lineup.undercovers;
  if (next < 0) return null;
  if (next + other > maxInfiltrators(lineup.players)) return null;
  if (next + other < 1) return null;
  return { ...lineup, [field]: next };
}

// --- Dealing ---------------------------------------------------------------

export type DealOptions = {
  lineup: Lineup;
  names: readonly string[];
  fallbackName: (index: number) => string;
  categories: readonly CategoryId[];
  difficulty: Difficulty;
  custom: readonly CustomPair[];
  /** Which language the words themselves are in. */
  wordLanguage: "nl" | "en";
};

function pickPair(options: DealOptions): WordPair {
  const pool = availablePairs(
    options.categories,
    options.difficulty,
    options.custom,
  );
  // Turning every category off should not leave the game with nothing to deal.
  const usable = pool.length
    ? pool
    : availablePairs(
        ["eten", "dieren", "plekken", "beroepen", "dingen", "sport"],
        "normal",
        [],
      );
  return usable[Math.floor(Math.random() * usable.length)];
}

export function deal(options: DealOptions): Game {
  const pair = pickPair(options);
  let [wordA, wordB] = pair[options.wordLanguage];
  // Which of the two is the civilians' word is a coin flip, so a pair does
  // not always point the same way.
  if (Math.random() < 0.5) [wordA, wordB] = [wordB, wordA];

  const { lineup } = options;
  const roles = shuffle<Role>([
    ...Array<Role>(civilianCount(lineup)).fill("civilian"),
    ...Array<Role>(lineup.undercovers).fill("undercover"),
    ...Array<Role>(lineup.mrWhites).fill("mrwhite"),
  ]);

  const players: Player[] = roles.map((role, index) => ({
    name: (options.names[index] ?? "").trim() || options.fallbackName(index),
    role,
    word: role === "mrwhite" ? null : role === "undercover" ? wordB : wordA,
    seen: false,
    alive: true,
  }));

  return { players, wordA, wordB, round: 1 };
}

// --- Playing ---------------------------------------------------------------

export function livingIndexes(game: Game): number[] {
  return game.players.flatMap((player, index) => (player.alive ? [index] : []));
}

/**
 * Picks who opens and lays out the speaking order from there.
 *
 * With `mrWhiteNeverFirst` on, a Mr. White is kept out of the opening slot:
 * before anyone has spoken he has nothing at all to go on. Undercovers can
 * open, so the opener still gives nothing away.
 */
export function openingOrder(
  game: Game,
  mrWhiteNeverFirst: boolean,
): { starter: number; order: number[] } {
  const alive = livingIndexes(game);
  const eligible = mrWhiteNeverFirst
    ? alive.filter((index) => game.players[index].role !== "mrwhite")
    : alive;
  const pool = eligible.length ? eligible : alive;

  const starter = pool[Math.floor(Math.random() * pool.length)];
  const at = alive.indexOf(starter);
  return { starter, order: [...alive.slice(at), ...alive.slice(0, at)] };
}

export function eliminate(game: Game, index: number): Game {
  return {
    ...game,
    players: game.players.map((player, i) =>
      i === index ? { ...player, alive: false } : player,
    ),
  };
}

/** Null while the game is still running. */
export function outcomeOf(game: Game): Outcome | null {
  const alive = game.players.filter((player) => player.alive);
  const infiltrators = alive.filter(
    (player) => player.role !== "civilian",
  ).length;
  const civilians = alive.length - infiltrators;

  if (infiltrators === 0) return "civilians";
  if (civilians <= 1) return "infiltrators";
  return null;
}

/** Mr. White's one guess. Spacing and capitals should not decide a game. */
export function isCivilianWord(game: Game, guess: string): boolean {
  return guess.trim().toLowerCase() === game.wordA.trim().toLowerCase();
}
