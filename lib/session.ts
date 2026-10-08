import {
  suggestedFor,
  type Lineup,
  type Outcome,
  type Player,
  type PreviousRoles,
  type Round,
  type Scores,
} from "./game";

const STORAGE_KEY = "mrwhite.session";

/** Bumped whenever the shape below changes, so old saves are dropped rather
 *  than half-read into a crash. */
const VERSION = 1;

/** A running round older than this is not the one you walked away from. */
const MAX_AGE_MS = 6 * 60 * 60 * 1000;

/**
 * A round only exists once it has been dealt, and the stages after a vote only
 * exist with the player that was voted out, so both travel with the stage
 * rather than sitting in nullable fields. No screen can then be reached
 * without the data it needs.
 */
export type Stage =
  | { name: "lineup" }
  | { name: "names" }
  | { name: "reveal"; round: Round }
  | { name: "firstClue"; round: Round }
  | { name: "clues"; round: Round }
  | { name: "voting"; round: Round }
  | { name: "elimination"; round: Round; player: Player }
  | { name: "mrWhiteGuess"; round: Round; player: Player }
  | {
      name: "result";
      round: Round;
      outcome: Outcome;
      guessedBy: Player | null;
    };

/** Everything the play screen needs. One object, so saving is one write. */
export type Session = {
  lineup: Lineup;
  names: string[];
  scores: Scores;
  previousRoles: PreviousRoles;
  roundNumber: number;
  stage: Stage;
};

export function freshSession(): Session {
  return {
    lineup: suggestedFor(6),
    names: [],
    scores: {},
    previousRoles: {},
    roundNumber: 0,
    stage: { name: "lineup" },
  };
}

/** The group, without the game: keeps names after a finished or stale game. */
export function resetGame(session: Session): Session {
  return {
    ...session,
    scores: {},
    previousRoles: {},
    roundNumber: 0,
    stage: { name: "lineup" },
  };
}

type Stored = Session & { version: number; savedAt: number };

/**
 * Returns the raw string rather than a parsed object on purpose: the value is
 * read through `useSyncExternalStore`, which compares snapshots by identity,
 * and a fresh object every call would loop.
 */
export function readStoredSession(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private browsing or blocked storage: start fresh, nothing breaks.
    return null;
  }
}

export function parseSession(raw: string | null): Session | null {
  if (!raw) return null;

  let stored: Stored;
  try {
    stored = JSON.parse(raw) as Stored;
  } catch {
    return null;
  }

  if (stored?.version !== VERSION) return null;
  if (!Array.isArray(stored.names) || typeof stored.stage?.name !== "string") {
    return null;
  }

  const session: Session = {
    lineup: stored.lineup,
    names: stored.names,
    scores: stored.scores ?? {},
    previousRoles: stored.previousRoles ?? {},
    roundNumber: stored.roundNumber ?? 0,
    stage: stored.stage,
  };

  // Keep the group, drop a game nobody is still playing.
  const stale = Date.now() - (stored.savedAt ?? 0) > MAX_AGE_MS;
  return stale ? resetGame(session) : session;
}

export function writeSession(session: Session): void {
  try {
    const stored: Stored = { ...session, version: VERSION, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Losing the save is a nuisance, not a failure. Play continues.
  }
}
