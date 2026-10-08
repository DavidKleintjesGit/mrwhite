import { CATEGORY_IDS, type CategoryId, type CustomPair, type Difficulty } from "./words";

const STORAGE_KEY = "mrwhite.settings";
const VERSION = 1;

export type Settings = {
  /** Seconds per clue, or 0 for no timer. */
  timer: number;
  difficulty: Difficulty;
  categories: CategoryId[];
  custom: CustomPair[];
  /** The language of the word pairs, independent of the interface language. */
  wordLanguage: "nl" | "en";
  /** Mr. White gets one guess at the word when he is voted out. */
  mrWhiteGuess: boolean;
  /** Keeps Mr. White out of the opening slot. */
  mrWhiteNeverFirst: boolean;
};

export const TIMER_CHOICES = [0, 30, 45, 60] as const;
export const DIFFICULTY_CHOICES: Difficulty[] = ["easy", "normal", "hard"];

export function defaultSettings(wordLanguage: "nl" | "en"): Settings {
  return {
    timer: 0,
    difficulty: "normal",
    categories: [...CATEGORY_IDS],
    custom: [],
    wordLanguage,
    mrWhiteGuess: true,
    mrWhiteNeverFirst: true,
  };
}

type Stored = Settings & { version: number };

/**
 * Returns the raw string rather than a parsed object: it is read through
 * `useSyncExternalStore`, which compares snapshots by identity, and a fresh
 * object every call would loop.
 */
export function readStoredSettings(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function parseSettings(
  raw: string | null,
  wordLanguage: "nl" | "en",
): Settings {
  const fallback = defaultSettings(wordLanguage);
  if (!raw) return fallback;

  let stored: Stored;
  try {
    stored = JSON.parse(raw) as Stored;
  } catch {
    return fallback;
  }
  if (stored?.version !== VERSION) return fallback;

  return {
    timer: typeof stored.timer === "number" ? stored.timer : fallback.timer,
    difficulty: stored.difficulty ?? fallback.difficulty,
    categories: Array.isArray(stored.categories)
      ? stored.categories.filter((id) => CATEGORY_IDS.includes(id))
      : fallback.categories,
    custom: Array.isArray(stored.custom) ? stored.custom : [],
    wordLanguage: stored.wordLanguage ?? fallback.wordLanguage,
    mrWhiteGuess: stored.mrWhiteGuess ?? fallback.mrWhiteGuess,
    mrWhiteNeverFirst: stored.mrWhiteNeverFirst ?? fallback.mrWhiteNeverFirst,
  };
}

export function writeSettings(settings: Settings): void {
  try {
    const stored: Stored = { ...settings, version: VERSION };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Losing the settings is a nuisance, not a failure.
  }
}
