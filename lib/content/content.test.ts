import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { isLanguagePack } from "./schema.ts";
import { CONTENT_VERSION } from "./version.ts";
import { VERIFIED_LOCALES } from "../i18n/config.ts";
import { CATEGORY_IDS, WORDS, totalPairs } from "../words.ts";

/**
 * De bestanden die de server uitserveert worden bij elke build opnieuw uit
 * de TypeScript-bronnen gemaakt. Deze tests bewaken de afspraak die dat
 * mogelijk maakt: wat er wordt weggeschreven moet hetzelfde zijn als wat de
 * app meedraagt, en het moet door de controle komen die de app erop loslaat
 * voordat hij een gedownload pakket vertrouwt.
 */

function pack(lang: string) {
  return JSON.parse(
    readFileSync(`public/content/v1/${lang}.json`, "utf8"),
  ) as Record<string, unknown>;
}

for (const lang of VERIFIED_LOCALES) {
  test(`${lang}: het uitgeserveerde pakket komt door de controle`, () => {
    assert.ok(isLanguagePack(pack(lang)));
  });

  test(`${lang}: de woorden zijn dezelfde als die in de app`, () => {
    const served = pack(lang) as { words: Record<string, unknown> };
    for (const id of CATEGORY_IDS) {
      assert.deepEqual(
        served.words[id],
        WORDS[lang][id],
        `categorie ${id} loopt uit de pas`,
      );
    }
  });

  test(`${lang}: de index telt hetzelfde aantal paren`, () => {
    const index = JSON.parse(
      readFileSync("public/content/v1/index.json", "utf8"),
    ) as { version: number; languages: Record<string, { pairs: number }> };
    assert.equal(index.version, CONTENT_VERSION);
    assert.equal(index.languages[lang].pairs, totalPairs(lang));
  });
}

test("een pakket zonder woorden wordt geweigerd", () => {
  assert.equal(isLanguagePack({ version: 2, lang: "nl", words: {} }), false);
});

test("een half binnengekomen paar wordt geweigerd", () => {
  assert.equal(
    isLanguagePack({ version: 2, lang: "nl", words: { eten: [["Pizza"]] } }),
    false,
  );
});

test("een leeg woord wordt geweigerd", () => {
  assert.equal(
    isLanguagePack({ version: 2, lang: "nl", words: { eten: [["Pizza", " ", 1]] } }),
    false,
  );
});

test("iets anders dan een pakket wordt geweigerd", () => {
  for (const nonsense of [null, "nee", 42, [], { version: "1" }]) {
    assert.equal(isLanguagePack(nonsense), false);
  }
});

test("een pakket dat naar een regel zonder tekst verwijst wordt geweigerd", () => {
  const pack = JSON.parse(readFileSync("public/content/v1/nl.json", "utf8"));
  pack.ruleCategories.A = [...pack.ruleCategories.A, 9999];
  assert.equal(isLanguagePack(pack), false);
});

test("een pakket zonder botsingen wordt geweigerd", () => {
  const pack = JSON.parse(readFileSync("public/content/v1/nl.json", "utf8"));
  delete pack.conflicts;
  assert.equal(isLanguagePack(pack), false);
});

test("een opdracht zonder beloning wordt geweigerd", () => {
  const pack = JSON.parse(readFileSync("public/content/v1/nl.json", "utf8"));
  delete pack.challenges["1"].reward;
  assert.equal(isLanguagePack(pack), false);
});

test("de catalogus uit een pakket is dezelfde als die in de app", async () => {
  const { catalogueOf } = await import("./catalogue.ts");
  const { BUILT_IN } = await import("../drink.ts");
  const pack = JSON.parse(readFileSync("public/content/v1/nl.json", "utf8"));
  const made = catalogueOf(pack);
  assert.deepEqual(made.rulesByCategory, BUILT_IN.rulesByCategory);
  assert.deepEqual(made.conflicts, BUILT_IN.conflicts);
  assert.deepEqual(
    [...made.challenges].sort((a, b) => a.id - b.id),
    [...BUILT_IN.challenges].sort((a, b) => a.id - b.id),
  );
});
