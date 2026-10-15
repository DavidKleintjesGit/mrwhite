import assert from "node:assert/strict";
import { test } from "node:test";
import { MAX_REPEATS, problemsWith, problemsWithList } from "./rules.ts";
import type { Pair } from "../words.ts";

/**
 * De regels zelf getest. Dit is geen dubbel werk naast de test op de
 * woordenlijst: die controleert wat er ligt, dit controleert dat de regel
 * doet wat hij zegt. Een regel die alles goedkeurt haalt de andere test ook
 * en valt daar nooit op.
 */

const ok = (pair: Pair) => assert.deepEqual(problemsWith(pair), []);
const fails = (pair: Pair, because: string) => {
  const problems = problemsWith(pair);
  assert.ok(
    problems.some((problem) => problem.includes(because)),
    `verwachtte iets over "${because}", kreeg: ${problems.join(" / ") || "niets"}`,
  );
};

test("een gewoon paar komt er zonder opmerkingen door", () => {
  ok(["Koffie", "Thee", 1]);
  ok(["Pizza", "Hamburger", 2]);
  ok(["Mr. Bean", "Charlie Chaplin", 1] as unknown as Pair);
});

test("een woord mag niet in het andere zitten", () => {
  fails(["Golf", "Minigolf", 2], "zitten in elkaar");
});

test("een heel woord delen mag ook niet", () => {
  fails(["Schaatsen", "Rolschaatsen rood", 2], "zitten in elkaar");
  fails(["Rode wijn", "Witte wijn", 2], "delen");
});

test("hetzelfde woord tegenover zichzelf valt af", () => {
  fails(["Thee", "thee", 1], "tegenover zichzelf");
});

test("een woord dat niet op de kaart past valt af", () => {
  fails(["Kopje", "Onvoorstelbaarheidsgraad", 1], "past niet op de kaart");
});

test("cijfers en vreemde tekens vallen af", () => {
  fails(["Formule 1", "Rally", 1], "iets anders dan letters");
  fails(["Thee", "Koffie!", 1], "iets anders dan letters");
});

test("een omschrijving is geen woord", () => {
  fails(["Thee", "Een kopje warme koffie", 1], "omschrijving");
});

test("een afstand die niet bestaat valt af", () => {
  fails(["Koffie", "Thee", 3] as unknown as Pair, "afstand 3 bestaat niet");
});

test("spaties aan de rand vallen af", () => {
  fails([" Koffie", "Thee", 1], "spaties aan de rand");
});

test("hetzelfde paar twee keer valt op in de lijst", () => {
  const problems = problemsWithList([
    ["Koffie", "Thee", 1],
    ["Thee", "Koffie", 2],
  ]);
  assert.ok(problems.some((p) => p.includes("staat er al in")));
});

test("een woord dat te vaak terugkomt valt op in de lijst", () => {
  const pairs: Pair[] = [
    ["Koffie", "Thee", 1],
    ["Koffie", "Melk", 1],
    ["Koffie", "Water", 1],
    ["Koffie", "Sap", 1],
  ];
  const problems = problemsWithList(pairs);
  assert.ok(
    problems.some((p) => p.includes(`meer dan ${MAX_REPEATS}`)),
    problems.join(" / "),
  );
});

test("een goede lijst geeft geen opmerkingen", () => {
  assert.deepEqual(
    problemsWithList([
      ["Koffie", "Thee", 1],
      ["Pizza", "Hamburger", 2],
      ["Hond", "Kat", 1],
    ]),
    [],
  );
});
