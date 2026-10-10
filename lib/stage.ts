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
  | { name: "modes" }
  | { name: "setup" }
  | { name: "names" }
  /** The Drinking Edition's house rules, drawn before the roles go out. */
  | { name: "drules"; players: Player[]; pair: WordPair; rules: number[] }
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
  /**
   * The Drinking Edition's secret vote. Everything the screen needs is here
   * rather than in component state, so passing the phone around survives a
   * reload — which matters more here than anywhere else, since a lost vote
   * means starting the round again.
   */
  | {
      name: "pvote";
      players: Player[];
      pair: WordPair;
      order: number[];
      round: number;
      /** Voter index to the index they voted for. */
      votes: Record<number, number>;
      /** Who has the phone open, or null while the grid is showing. */
      voter: number | null;
      pick: number | null;
      phase: "grid" | "pick" | "tie";
      /** Who may be voted for; narrows to the tied players on a re-vote. */
      candidates: number[];
      tie: number[] | null;
      revote: boolean;
    }
  | {
      name: "unmask";
      players: Player[];
      pair: WordPair;
      index: number;
      round: number;
      /**
       * Who drank for this vote, by player index. Recorded here because the
       * sips on a player accumulate all game: by the time this screen
       * renders there is no way to tell a sip taken just now from one taken
       * for breaking a rule two rounds ago.
       */
      drinkers?: number[];
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
  "modes",
  "setup",
  "names",
  "drules",
  "deal",
  "card",
  "hint",
  "pvote",
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
  "drules",
  "deal",
  "card",
  "hint",
  "vote",
  "pvote",
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
