import nl from "./words/nl.ts";
import en from "./words/en.ts";
import de from "./words/de.ts";
import fr from "./words/fr.ts";
import es from "./words/es.ts";
import it from "./words/it.ts";
import tr from "./words/tr.ts";
/**
 * The word bank.
 *
 * A pair is [civilian word, undercover word, level]; level 1 is far apart,
 * 2 is close. Custom pairs come in at level 0.
 *
 * WHAT MAKES A PAIR GOOD. This is the whole game, so it is worth stating:
 * a pair works when you can think of a clue that fits both words AND a clue
 * that tells them apart. Two failures to watch for:
 *
 *   - Too close: one word is a kind of the other, or they share a word, so
 *     every clue fits both and the undercover can never be caught. Hond/Puppy
 *     and Golf/Minigolf fail this way. `words.test.ts` catches the mechanical
 *     cases; the rest is judgement.
 *   - Too far: no clue fits both, so the undercover is out in round one.
 *     Pizza/Fiets fails this way.
 *
 * Pairs are written per language, not translated. Dutch gets frikandel and
 * Sinterklaas because that is what a Dutch table knows; a translated list
 * feels Dutch in every language.
 */
import type { Locale } from "./i18n/config.ts";

export type Pair = [string, string, number];

export type CategoryId =
  | "eten"
  | "dieren"
  | "plekken"
  | "huis"
  | "beroepen"
  | "sport"
  | "pop";

/** The custom-words bucket is a category too, so it can be switched off. */
export type BucketId = CategoryId | "eigen";

/** The word language is the app language; there is only one. */
export type LangId = Locale;

export const CATEGORY_IDS: CategoryId[] = [
  "eten",
  "dieren",
  "plekken",
  "huis",
  "beroepen",
  "sport",
  "pop",
];

/** Minimum a verified language has to carry before it goes in the picker. */
export const MIN_VERIFIED_PAIRS = 150;
/**
 * De woordparen, één bestand per taal.
 *
 * Stonden hier allemaal bij elkaar, wat bij zeven talen al zeshonderd regels
 * was en bij twintig niet meer te overzien is. Nu staat elke taal apart en
 * kan een gegenereerde lijst er in één keer overheen zonder dat er iets van
 * een andere taal in de buurt komt.
 */
export const WORDS: Record<LangId, Record<CategoryId, Pair[]>> = {
  nl,
  en,
  de,
  fr,
  es,
  it,
  tr,
};

/**
 * Stand-in names for anyone who leaves their field blank.
 *
 * Invented surnames rather than real detectives. The first draft used
 * Sherlock, Poirot, Columbo, Bond and Tintin, which carries the same
 * trademark exposure as naming them in the word bank — and for a name that
 * only fills an empty field, that is a risk with nothing on the other side
 * of the scale. These keep the register without borrowing anyone's.
 */
export const ALIASES = [
  "Falk",
  "Mercer",
  "Vance",
  "Crane",
  "Driscoll",
  "Holloway",
  "Rourke",
  "Sable",
  "Thorne",
  "Quinn",
  "Ward",
  "Ellis",
  "Vega",
  "Marsh",
  "Finch",
  "Keller",
  "Novak",
  "Rivas",
  "Dane",
  "Orlov",
];

export function pairCount(lang: LangId, id: CategoryId): number {
  return WORDS[lang][id].length;
}

export function totalPairs(lang: LangId): number {
  return CATEGORY_IDS.reduce((sum, id) => sum + pairCount(lang, id), 0);
}
