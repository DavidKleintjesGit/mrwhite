export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 10;

export type RoleSetup = {
  players: number;
  undercovers: number;
  mrWhites: number;
};

/** Returned instead of a message so the wording stays in the dictionaries. */
export type SetupProblem =
  | "playerRange"
  | "noInfiltrators"
  | "civiliansMinority";

/**
 * Suggested line-up per player count: roughly a third infiltrators.
 * See the table in CONCEPT.md. Players can always override it.
 */
const RECOMMENDED: Record<number, { undercovers: number; mrWhites: number }> = {
  3: { undercovers: 1, mrWhites: 0 },
  4: { undercovers: 1, mrWhites: 0 },
  5: { undercovers: 1, mrWhites: 1 },
  6: { undercovers: 1, mrWhites: 1 },
  7: { undercovers: 2, mrWhites: 1 },
  8: { undercovers: 2, mrWhites: 1 },
  9: { undercovers: 3, mrWhites: 1 },
  10: { undercovers: 3, mrWhites: 1 },
};

export function recommendedFor(players: number): RoleSetup {
  const recommended = RECOMMENDED[players] ?? RECOMMENDED[MIN_PLAYERS];
  return { players, ...recommended };
}

export function civilianCount(setup: RoleSetup): number {
  return setup.players - setup.undercovers - setup.mrWhites;
}

export function infiltratorCount(setup: RoleSetup): number {
  return setup.undercovers + setup.mrWhites;
}

/**
 * Infiltrators win as soon as they equal the civilians in number. Start out
 * equal or ahead and the game is over before anyone has said anything.
 */
export function maxInfiltrators(players: number): number {
  return Math.ceil(players / 2) - 1;
}

/** Null when the line-up is playable. */
export function validate(setup: RoleSetup): SetupProblem | null {
  if (setup.players < MIN_PLAYERS || setup.players > MAX_PLAYERS) {
    return "playerRange";
  }
  if (infiltratorCount(setup) === 0) {
    return "noInfiltrators";
  }
  if (civilianCount(setup) <= infiltratorCount(setup)) {
    return "civiliansMinority";
  }
  return null;
}
