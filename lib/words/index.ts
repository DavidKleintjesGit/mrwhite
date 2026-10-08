import type { Locale } from "@/lib/i18n";
import en from "./en";
import nl from "./nl";

export type WordPair = {
  /** The word the civilians get. */
  civilian: string;
  /** The word the undercovers get: close enough to hide behind. */
  undercover: string;
  /** Language-neutral slug, so themes can be translated later. */
  theme: string;
  /** 1 = far apart (dog/cat), 3 = nearly identical (clock/watch). */
  difficulty: 1 | 2 | 3;
};

/**
 * Word pairs are content, not translations: each language gets pairs that work
 * in that language rather than translated ones. Dutch has snackbar food and
 * Sinterklaas; English does not.
 */
const WORDS: Record<Locale, readonly WordPair[]> = { en, nl };

export function getWordPairs(locale: Locale): readonly WordPair[] {
  return WORDS[locale];
}

export function randomWordPair(locale: Locale): WordPair {
  const pairs = getWordPairs(locale);
  return pairs[Math.floor(Math.random() * pairs.length)];
}
