import type { WordPair } from "./words";

/**
 * Every rule of the game lives in this one file, so there is a single place to
 * check when a rule is in doubt. Nothing here touches React or the browser.
 */

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 10;

export type Role = "civilian" | "undercover" | "mrwhite";

/** How many of each role a round is dealt with. */
export type Lineup = {
  players: number;
  undercovers: number;
  mrWhites: number;
};

export type Player = {
  id: string;
  name: string;
  role: Role;
  /** Null for Mr. White, who gets no word at all. */
  word: string | null;
  /** Ticked off on the reveal screen so the group sees who still has to look. */
  seenWord: boolean;
  alive: boolean;
  score: number;
};

export type Round = {
  players: Player[];
  /** Never a Mr. White. See `dealRound`. */
  startPlayerId: string;
  pair: WordPair;
};

// --- Line-up ---------------------------------------------------------------

/**
 * Suggested line-up per player count: roughly a third infiltrators.
 * See the table in CONCEPT.md. Players can always override it.
 */
const SUGGESTED: Record<number, { undercovers: number; mrWhites: number }> = {
  3: { undercovers: 1, mrWhites: 0 },
  4: { undercovers: 1, mrWhites: 0 },
  5: { undercovers: 1, mrWhites: 1 },
  6: { undercovers: 1, mrWhites: 1 },
  7: { undercovers: 2, mrWhites: 1 },
  8: { undercovers: 2, mrWhites: 1 },
  9: { undercovers: 3, mrWhites: 1 },
  10: { undercovers: 3, mrWhites: 1 },
};

export function suggestedFor(players: number): Lineup {
  return { players, ...(SUGGESTED[players] ?? SUGGESTED[MIN_PLAYERS]) };
}

export function civilianCount(lineup: Lineup): number {
  return lineup.players - lineup.undercovers - lineup.mrWhites;
}

export function infiltratorCount(lineup: Lineup): number {
  return lineup.undercovers + lineup.mrWhites;
}

/**
 * Infiltrators win as soon as they equal the civilians in number. Start out
 * equal or ahead and the game is over before anyone has said anything.
 */
export function maxInfiltrators(players: number): number {
  return Math.ceil(players / 2) - 1;
}

/**
 * Highest value one infiltrator count can take, given the other one. Keeps the
 * arithmetic out of the interface, where it is easy to get subtly wrong.
 */
export function maxFor(
  lineup: Lineup,
  field: "undercovers" | "mrWhites",
): number {
  const other = field === "undercovers" ? lineup.mrWhites : lineup.undercovers;
  return Math.max(maxInfiltrators(lineup.players) - other, 0);
}

/** Returned instead of a message so the wording stays in the dictionaries. */
export type LineupProblem =
  | "playerRange"
  | "noInfiltrators"
  | "civiliansMinority";

/** Null when the line-up is playable. */
export function checkLineup(lineup: Lineup): LineupProblem | null {
  if (lineup.players < MIN_PLAYERS || lineup.players > MAX_PLAYERS) {
    return "playerRange";
  }
  if (infiltratorCount(lineup) === 0) {
    return "noInfiltrators";
  }
  if (civilianCount(lineup) <= infiltratorCount(lineup)) {
    return "civiliansMinority";
  }
  return null;
}

// --- Names -----------------------------------------------------------------

/** Fills in blanks so nobody ends up as an unnamed tile on the reveal screen. */
export function fillInBlankNames(
  names: readonly string[],
  fallback: (index: number) => string,
): string[] {
  return names.map((name, index) => name.trim() || fallback(index));
}

/** Case-insensitive, because "Sam" and "sam" are the same person in a room. */
export function findDuplicateName(names: readonly string[]): string | null {
  const seen = new Set<string>();
  for (const name of names) {
    const key = name.trim().toLowerCase();
    if (!key) continue;
    if (seen.has(key)) return name.trim();
    seen.add(key);
  }
  return null;
}

// --- Dealing ---------------------------------------------------------------

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function wordFor(role: Role, pair: WordPair): string | null {
  if (role === "mrwhite") return null;
  return role === "undercover" ? pair.undercover : pair.civilian;
}

/**
 * Hands out roles and words, and picks who gives the first clue.
 *
 * The opener is never a Mr. White: he has nothing to go on before anyone has
 * spoken, so opening would make the round unplayable for him. Undercovers can
 * open — narrowing it further to civilians would quietly clear that player of
 * two roles instead of one, and the table would work that out.
 *
 * This is deliberately never stated in the interface. See CONCEPT.md.
 */
export function dealRound(
  lineup: Lineup,
  names: readonly string[],
  pair: WordPair,
): Round {
  const roles = shuffle([
    ...Array<Role>(lineup.undercovers).fill("undercover"),
    ...Array<Role>(lineup.mrWhites).fill("mrwhite"),
    ...Array<Role>(civilianCount(lineup)).fill("civilian"),
  ]);

  const players: Player[] = names.map((name, index) => ({
    id: `p${index}`,
    name,
    role: roles[index],
    word: wordFor(roles[index], pair),
    seenWord: false,
    alive: true,
    score: 0,
  }));

  // `checkLineup` keeps civilians in the majority, so this is never empty.
  const canOpen = players.filter((player) => player.role !== "mrwhite");
  const starter = canOpen[Math.floor(Math.random() * canOpen.length)];

  return { players, startPlayerId: starter.id, pair };
}
