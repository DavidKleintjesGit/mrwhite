import type { Player, Winner, WordPair } from "./game.ts";

/**
 * Which screen the app is on, with the data that screen needs.
 *
 * Each stage carries exactly what it needs, so no screen can be reached
 * without its data and there are no nullable fields to guard. The whole thing
 * is plain JSON, which is what lets a half-played game be written to storage
 * and picked up again.
 */
export type Stage =
  | { name: "home" }
  | { name: "rules" }
  | { name: "settings" }
  | { name: "setup" }
  | { name: "names" }
  | { name: "deal"; players: Player[]; pair: WordPair }
  | { name: "card"; players: Player[]; pair: WordPair; index: number }
  | {
      name: "hint";
      players: Player[];
      pair: WordPair;
      order: number[];
      turn: number;
      round: number;
    }
  | {
      name: "vote";
      players: Player[];
      pair: WordPair;
      order: number[];
      round: number;
    }
  | {
      name: "unmask";
      players: Player[];
      pair: WordPair;
      index: number;
      round: number;
    }
  | {
      name: "guess";
      players: Player[];
      pair: WordPair;
      index: number;
      round: number;
    }
  | { name: "end"; players: Player[]; pair: WordPair; winner: Winner };

export const STAGE_NAMES = [
  "home",
  "rules",
  "settings",
  "setup",
  "names",
  "deal",
  "card",
  "hint",
  "vote",
  "unmask",
  "guess",
  "end",
] as const;

/**
 * Screens worth coming back to after a reload. Landing back on the rules or
 * the settings panel would be odd; landing back mid-round is the point.
 */
const RESUMABLE = new Set([
  "deal",
  "card",
  "hint",
  "vote",
  "unmask",
  "guess",
  "end",
]);

/**
 * Guards against a stored stage from an older build or a mangled write. It
 * checks the shape it is about to render, not every field: a wrong number is
 * survivable, a missing players array is not.
 */
export function isResumable(value: unknown): value is Stage {
  if (!value || typeof value !== "object") return false;
  const stage = value as Partial<Stage> & { players?: unknown; pair?: unknown };
  if (typeof stage.name !== "string" || !RESUMABLE.has(stage.name)) {
    return false;
  }
  if (!Array.isArray(stage.players) || stage.players.length === 0) return false;
  if (!Array.isArray(stage.pair) || stage.pair.length !== 2) return false;
  return true;
}
