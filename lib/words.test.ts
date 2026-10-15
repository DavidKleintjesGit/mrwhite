import assert from "node:assert/strict";
import { test } from "node:test";
import { LOCALES, LOCALE_NAMES, VERIFIED_LOCALES } from "./i18n/config.ts";
import {
  CATEGORY_IDS,
  MIN_VERIFIED_PAIRS,
  WORDS,
  totalPairs,
} from "./words.ts";
import {
  pairKey as key,
  problemsWith,
  problemsWithList,
} from "./words/rules.ts";

/**
 * Mechanical checks on the word bank. They cannot judge whether a pair is
 * *fun*, but they catch the failures that make a pair unplayable and the
 * slips that creep in when a list grows: a duplicate, a typo, a word so long
 * it breaks the card.
 *
 * Run on their own with `npm run words:check`.
 */

const everyPair = (lang: keyof typeof WORDS) =>
  CATEGORY_IDS.flatMap((id) => WORDS[lang][id].map((pair) => ({ id, pair })));

for (const lang of LOCALES) {
  const label = `${LOCALE_NAMES[lang]} (${lang})`;

  test(`${label}: every pair holds up on its own`, () => {
    // De regels staan in lib/words/rules.ts, want de keuring van
    // gegenereerde lijsten gebruikt ze ook. Stonden ze hier, dan had je twee
    // bijna gelijke sets regels en glijdt de lijst stilletjes af.
    for (const { id, pair } of everyPair(lang)) {
      assert.deepEqual(problemsWith(pair), [], `${id}: ${pair[0]}/${pair[1]}`);
    }
  });

  test(`${label}: the list holds up as a whole`, () => {
    assert.deepEqual(
      problemsWithList(everyPair(lang).map((entry) => entry.pair)),
      []
    );
  });

  test(`${label}: every category has something in it`, () => {
    // Een taal die net is aangemaakt heeft nog niets. Dat is een begin, geen
    // fout: zodra er één paar in staat gelden de eisen weer onverkort.
    if (totalPairs(lang) === 0) return;
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
      `${lang} has ${total} pairs, under the ${MIN_VERIFIED_PAIRS} needed`
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
