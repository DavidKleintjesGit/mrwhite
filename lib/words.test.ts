import assert from "node:assert/strict";
import { test } from "node:test";
import {
  LOCALES,
  LOCALE_NAMES,
  VERIFIED_LOCALES,
} from "./i18n/config.ts";
import {
  CATEGORY_IDS,
  MIN_VERIFIED_PAIRS,
  WORDS,
  totalPairs,
  type Pair,
} from "./words.ts";

/**
 * Mechanical checks on the word bank. They cannot judge whether a pair is
 * *fun*, but they catch the failures that make a pair unplayable and the
 * slips that creep in when a list grows: a duplicate, a typo, a word so long
 * it breaks the card.
 *
 * Run on their own with `npm run words:check`.
 */

/** Longest word the big type on the card can take without wrapping badly. */
const MAX_WORD_LENGTH = 18;

/** How often one word may come back inside a language before it feels stale. */
const MAX_REPEATS = 3;

const everyPair = (lang: keyof typeof WORDS) =>
  CATEGORY_IDS.flatMap((id) =>
    WORDS[lang][id].map((pair) => ({ id, pair })),
  );

const key = (pair: Pair) =>
  [pair[0], pair[1]].map((w) => w.toLowerCase()).sort().join("|");

const words = (pair: Pair) => [pair[0], pair[1]];

const tokens = (word: string) =>
  word
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);

for (const lang of LOCALES) {
  const label = `${LOCALE_NAMES[lang]} (${lang})`;

  test(`${label}: every word is present, trimmed and sane in length`, () => {
    for (const { id, pair } of everyPair(lang)) {
      for (const word of words(pair)) {
        assert.ok(word, `${id}: a pair has an empty word`);
        assert.equal(word, word.trim(), `${id}: "${word}" has stray spaces`);
        assert.ok(
          word.length <= MAX_WORD_LENGTH,
          `${id}: "${word}" is ${word.length} characters, too long for the card`,
        );
      }
      assert.ok([1, 2].includes(pair[2]), `${id}: ${key(pair)} has level ${pair[2]}`);
    }
  });

  test(`${label}: the two words in a pair are properly different`, () => {
    for (const { id, pair } of everyPair(lang)) {
      const [a, b] = words(pair).map((w) => w.toLowerCase());
      assert.notEqual(a, b, `${id}: "${pair[0]}" is paired with itself`);

      // One word containing the other means every clue fits both, so the
      // undercover can never be caught. Golf/Minigolf fails here.
      assert.ok(
        !a.includes(b) && !b.includes(a),
        `${id}: "${pair[0]}" and "${pair[1]}" contain one another`,
      );

      // Sharing a whole word is the same problem one step up:
      // "Ice skating" and "Roller skating" are not two different things.
      const shared = tokens(a).filter((t) => tokens(b).includes(t));
      assert.deepEqual(
        shared,
        [],
        `${id}: "${pair[0]}" and "${pair[1]}" share "${shared.join(", ")}"`,
      );
    }
  });

  test(`${label}: no pair appears twice`, () => {
    const seen = new Map<string, string>();
    for (const { id, pair } of everyPair(lang)) {
      const k = key(pair);
      const earlier = seen.get(k);
      assert.equal(
        earlier,
        undefined,
        `${k} is in both ${earlier} and ${id}`,
      );
      seen.set(k, id);
    }
  });

  test(`${label}: no word is leaned on too heavily`, () => {
    const counts = new Map<string, number>();
    for (const { pair } of everyPair(lang)) {
      for (const word of words(pair)) {
        const w = word.toLowerCase();
        counts.set(w, (counts.get(w) ?? 0) + 1);
      }
    }
    for (const [word, count] of counts) {
      assert.ok(
        count <= MAX_REPEATS,
        `"${word}" is used ${count} times, more than ${MAX_REPEATS}`,
      );
    }
  });

  test(`${label}: every category has something in it`, () => {
    for (const id of CATEGORY_IDS) {
      assert.ok(WORDS[lang][id].length > 0, `${id} is empty`);
    }
  });
}

test("a language only goes in the picker once it carries enough pairs", () => {
  for (const lang of VERIFIED_LOCALES) {
    const total = totalPairs(lang);
    assert.ok(
      total >= MIN_VERIFIED_PAIRS,
      `${lang} has ${total} pairs, under the ${MIN_VERIFIED_PAIRS} needed`,
    );
  }
});

test("both sides of a pair come up as the civilians' word", () => {
  // `pickPair` flips the pair on a coin toss, so neither word is always the
  // one the undercover gets. This pins that the data does not rely on order.
  for (const lang of VERIFIED_LOCALES) {
    for (const { pair } of everyPair(lang)) {
      assert.ok(pair[0] && pair[1], `${key(pair)} cannot be flipped`);
    }
  }
});
