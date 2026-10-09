import assert from "node:assert/strict";
import { test } from "node:test";
import { LOCALES, LOCALE_NAMES, VERIFIED_LOCALES, format } from "./config.ts";
import nl from "./dictionaries/nl.ts";
import en from "./dictionaries/en.ts";
import de from "./dictionaries/de.ts";
import fr from "./dictionaries/fr.ts";
import es from "./dictionaries/es.ts";
import it from "./dictionaries/it.ts";
import tr from "./dictionaries/tr.ts";

/**
 * The whole interface is translated, not just the words. TypeScript already
 * refuses a dictionary with a missing key, but it cannot see an empty string
 * or a placeholder that was dropped in translation. These checks can.
 */

const DICTIONARIES: Record<string, unknown> = { nl, en, de, fr, es, it, tr };

type Entry = { path: string; value: string };

/** Flattens a dictionary into path/value pairs, arrays included. */
function entries(value: unknown, path = ""): Entry[] {
  if (typeof value === "string") return [{ path, value }];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => entries(item, `${path}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      entries(child, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

/** The `{name}` slots a string expects the app to fill in. */
const placeholders = (text: string) =>
  (text.match(/\{(\w+)\}/g) ?? []).sort();

const reference = entries(nl);

test("every language is accounted for", () => {
  assert.deepEqual(Object.keys(DICTIONARIES).sort(), [...LOCALES].sort());
  for (const locale of LOCALES) {
    assert.ok(LOCALE_NAMES[locale], `${locale} has no name`);
  }
});

for (const locale of LOCALES) {
  test(`${locale}: every string is filled in`, () => {
    for (const { path, value } of entries(DICTIONARIES[locale])) {
      assert.ok(value.trim(), `${locale}.${path} is empty`);
      // One string is half a sentence that continues in bold, so its
      // trailing space is deliberate.
      if (path === "confirm.bodyStart") continue;
      assert.equal(value, value.trim(), `${locale}.${path} has stray spaces`);
    }
  });

  test(`${locale}: the same strings exist as in the reference`, () => {
    const paths = entries(DICTIONARIES[locale]).map((e) => e.path);
    assert.deepEqual(
      paths.sort(),
      reference.map((e) => e.path).sort(),
      `${locale} does not line up with the Dutch original`,
    );
  });

  test(`${locale}: no placeholder was lost in translation`, () => {
    const translated = new Map(
      entries(DICTIONARIES[locale]).map((e) => [e.path, e.value]),
    );
    for (const { path, value } of reference) {
      assert.deepEqual(
        placeholders(translated.get(path) ?? ""),
        placeholders(value),
        `${locale}.${path} does not carry the same {placeholders}`,
      );
    }
  });

  test(`${locale}: the file was actually translated`, () => {
    if (locale === "nl") return;

    // Plenty of strings coincide on purpose — "Mr. White", "Undercover",
    // "Agent {n}" are the same in several languages. What this guards
    // against is someone copying nl.ts and shipping it untranslated, so it
    // looks at the share rather than at any single string.
    const translated = entries(DICTIONARIES[locale]);
    const same = translated.filter((entry) => {
      const original = reference.find((r) => r.path === entry.path);
      return original && original.value === entry.value;
    });

    const share = same.length / translated.length;
    assert.ok(
      share < 0.15,
      `${Math.round(share * 100)}% of ${locale} is still identical to Dutch`,
    );
  });
}

test("a language is only offered once its interface is translated", () => {
  for (const locale of VERIFIED_LOCALES) {
    const paths = entries(DICTIONARIES[locale]).length;
    assert.equal(
      paths,
      reference.length,
      `${locale} is in the picker but incomplete`,
    );
  }
});

test("placeholders are filled, and unknown ones are left alone", () => {
  assert.equal(format("Ronde {n}", { n: 3 }), "Ronde 3");
  assert.equal(format("{a} en {b}", { a: "x", b: "y" }), "x en y");
  assert.equal(format("Hallo {naam}", {}), "Hallo {naam}");
});
