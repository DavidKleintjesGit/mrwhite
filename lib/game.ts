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

// --- Playing the round -----------------------------------------------------

export type Outcome = "civilians" | "infiltrators";

export function livingPlayers(round: Round): Player[] {
  return round.players.filter((player) => player.alive);
}

/**
 * Who speaks when: seating order, rotated so the opener goes first, with
 * eliminated players skipped. The seating order is the order names were
 * entered, which is how the group is sat around the table anyway.
 */
export function clueOrder(round: Round): Player[] {
  const start = round.players.findIndex(
    (player) => player.id === round.startPlayerId,
  );
  const from = start === -1 ? 0 : start;
  return [...round.players.slice(from), ...round.players.slice(0, from)].filter(
    (player) => player.alive,
  );
}

export function eliminate(round: Round, playerId: string): Round {
  return {
    ...round,
    players: round.players.map((player) =>
      player.id === playerId ? { ...player, alive: false } : player,
    ),
  };
}

/**
 * Null while the round is still running.
 *
 * Infiltrators win on equal numbers, not on a majority: at that point the
 * civilians can no longer vote one out without risking themselves.
 */
export function outcomeOf(round: Round): Outcome | null {
  const living = livingPlayers(round);
  const infiltrators = living.filter(
    (player) => player.role !== "civilian",
  ).length;
  const civilians = living.length - infiltrators;

  if (infiltrators === 0) return "civilians";
  if (infiltrators >= civilians) return "infiltrators";
  return null;
}

/** Mr. White's one guess. Spacing and capitals should not decide a game. */
export function isCivilianWord(round: Round, guess: string): boolean {
  return (
    guess.trim().toLowerCase() === round.pair.civilian.trim().toLowerCase()
  );
}
