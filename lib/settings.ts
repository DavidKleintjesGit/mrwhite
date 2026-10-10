import type { RuleCategory } from "./drink.ts";
import type { CustomPair, Difficulty, Mode } from "./game.ts";
import { isResumable, type Stage } from "./stage.ts";
import { CATEGORY_IDS } from "./words.ts";

/** Same key as the design uses, so a saved game carries over. */
const STORAGE_KEY = "mrwhite-noir-v1";

/**
 * A round older than this is not the one you walked away from, so the group
 * and the settings are kept but the game is dropped.
 */
const MAX_GAME_AGE_MS = 6 * 60 * 60 * 1000;

/**
 * Names are worth keeping for longer than a round — the same group plays
 * again next week and should not have to retype itself — but not forever.
 * A phone that was lent out once should not still be carrying a guest list
 * months later.
 */
const MAX_NAMES_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export type Theme = "donker" | "licht";

export type Settings = {
  /** Which word buckets are switched on, including "eigen" for custom pairs. */
  cats: Record<string, boolean>;
  custom: CustomPair[];
  /** Seconds per clue, or 0 for no timer. */
  timer: number;
  mrGuess: boolean;
  mrNotFirst: boolean;
  diff: Difficulty;
  theme: Theme;
  /** Which kinds of house rule the Drinking Edition may draw from. */
  drinkCats: Record<RuleCategory, boolean>;
};

export type Stored = {
  settings: Settings;
  names: string[];
  nPlayers: number;
  nUnder: number;
  nWhite: number;
  /**
   * Which edition is being played. Game-wide rather than per-stage: every
   * screen from the setup onwards reads it, and threading it through each
   * stage would mean every transition could get it wrong.
   */
  mode: Mode;
  /** The three house rules this game runs under; empty outside the Drinking Edition. */
  rules: number[];
  /** The screen the group was on, so a reload does not lose the round. */
  stage: Stage;
  /** When the stage was last written, used to drop a stale game. */
  stageAt: number;
  /** When the names were last touched, used to let them lapse. */
  namesAt: number;
};

export function defaultSettings(): Settings {
  const cats: Record<string, boolean> = { eigen: true };
  for (const id of CATEGORY_IDS) cats[id] = true;
  return {
    cats,
    custom: [],
    timer: 30,
    mrGuess: true,
    mrNotFirst: true,
    diff: "mix",
    theme: "donker",
    drinkCats: { A: true, B: true, C: true, D: true },
  };
}

export function defaultStored(): Stored {
  return {
    settings: defaultSettings(),
    names: [],
    nPlayers: 6,
    nUnder: 1,
    nWhite: 1,
    mode: "klassiek",
    rules: [],
    stage: { name: "home" },
    stageAt: 0,
    namesAt: 0,
  };
}

/**
 * Returns the raw string rather than a parsed object: it is read through
 * `useSyncExternalStore`, which compares snapshots by identity, and a fresh
 * object every call would loop.
 */
export function readStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function parseStored(raw: string | null): Stored {
  const fallback = defaultStored();
  if (!raw) return fallback;

  let saved: Partial<Stored>;
  try {
    saved = JSON.parse(raw) as Partial<Stored>;
  } catch {
    return fallback;
  }

  // A game is only picked up again if it is recent and still looks like one.
  const fresh = Date.now() - (saved.stageAt ?? 0) < MAX_GAME_AGE_MS;
  const stage =
    fresh && isResumable(saved.stage) ? saved.stage : fallback.stage;

  return {
    settings: {
      ...fallback.settings,
      ...(saved.settings ?? {}),
      // Nested, so a saved object from before this setting existed would
      // otherwise arrive with categories missing rather than defaulted.
      drinkCats: {
        ...fallback.settings.drinkCats,
        ...(saved.settings?.drinkCats ?? {}),
      },
    },
    names: namesAreFresh(saved) ? (saved.names as string[]) : [],
    nPlayers: saved.nPlayers ?? fallback.nPlayers,
    nUnder: saved.nUnder ?? fallback.nUnder,
    nWhite: saved.nWhite ?? fallback.nWhite,
    // The mode and its rules only mean anything alongside a resumed game.
    mode: fresh && saved.mode === "drink" ? "drink" : fallback.mode,
    rules: fresh && Array.isArray(saved.rules) ? saved.rules.slice(0, 3) : [],
    stage,
    stageAt: saved.stageAt ?? 0,
    namesAt: namesAreFresh(saved) ? saved.namesAt ?? 0 : 0,
  };
}

/**
 * Whether the stored names are recent enough to offer back.
 *
 * Anything written before this field existed has no date, so it lapses on
 * first read rather than being treated as brand new — which is the safer way
 * round for a list of people's names.
 */
function namesAreFresh(saved: Partial<Stored>): boolean {
  if (!Array.isArray(saved.names) || saved.names.length === 0) return false;
  if (typeof saved.namesAt !== "number" || saved.namesAt <= 0) return false;
  return Date.now() - saved.namesAt < MAX_NAMES_AGE_MS;
}

export { MAX_NAMES_AGE_MS };

/**
 * Wipes everything this app put on the device: the names, the settings and
 * any game in progress. Used by the clear button, which is the only way to
 * get rid of it all at once — handy before lending the phone on.
 */
export function clearStored(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear if storage is blocked in the first place.
  }
}

export function writeStored(stored: Stored): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Losing the settings is a nuisance, not a failure.
  }
}

export const THEMES: Record<
  Theme,
  {
    bg: string;
    fg: string;
    card: string;
    muted: string;
    line: string;
    off: string;
    offfg: string;
    hl: string;
    cy: string;
    dot: string;
  }
> = {
  licht: {
    bg: "#F3F0E8",
    fg: "#0d0d0d",
    card: "#ffffff",
    muted: "#5a574f",
    line: "#bdb9ae",
    off: "#e2ded3",
    offfg: "#6a675f",
    hl: "#0d0d0d",
    cy: "#0a7fa3",
    dot: "rgba(13,13,13,.09)",
  },
  donker: {
    bg: "#0d0d0d",
    fg: "#F3F0E8",
    card: "#F3F0E8",
    muted: "#b9b5aa",
    line: "#3a3935",
    off: "#2a2926",
    offfg: "#8a877f",
    hl: "#FFD23F",
    cy: "#3DD6FF",
    dot: "rgba(243,240,232,.08)",
  },
};
