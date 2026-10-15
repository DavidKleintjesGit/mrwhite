/**
 * Keurt een lijst gegenereerde woordparen, en zet goedgekeurde erin.
 *
 *   npm run words:review -- de kandidaten/de.json
 *   npm run words:review -- de kandidaten/de.json --schrijf
 *
 * Zonder `--schrijf` verandert er niets: dan zegt hij alleen wat er deugt en
 * wat niet, en waarom. Zo kun je een gegenereerde lijst eerst bekijken.
 *
 * De regels staan in lib/words/rules.ts — dezelfde die de tests gebruiken,
 * zodat wat hier doorkomt ook morgen nog door de tests komt.
 *
 * Het bestand ziet eruit als de woordenlijst zelf:
 *
 *   { "eten": [["Pizza", "Hamburger", 1]], "dieren": [] }
 *
 * Wat deze keuring níét kan zien: of een paar leuk is, of er genoeg over te
 * zeggen valt, of iedereen de woorden kent. Dat blijft mensenwerk, en
 * daarom print hij alles wat erdoorheen komt ook uit.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { CATEGORY_IDS, WORDS, type CategoryId, type Pair } from "../lib/words.ts";
import { problemsWith, problemsWithList } from "../lib/words/rules.ts";

const [lang, file, flag] = process.argv.slice(2);
const schrijf = flag === "--schrijf";

if (!lang || !file) {
  console.error("Gebruik: npm run words:review -- <taal> <bestand> [--schrijf]");
  process.exit(1);
}
if (!(lang in WORDS)) {
  console.error(`"${lang}" is geen taal die bestaat.`);
  process.exit(1);
}

const kandidaten = JSON.parse(readFileSync(file, "utf8")) as Partial<
  Record<CategoryId, Pair[]>
>;

const bestaand = WORDS[lang as keyof typeof WORDS];
const goed: Record<string, Pair[]> = {};
let aangenomen = 0;
let afgewezen = 0;

for (const id of CATEGORY_IDS) {
  goed[id] = [...bestaand[id]];
}

for (const id of CATEGORY_IDS) {
  for (const pair of kandidaten[id] ?? []) {
    // Elk paar tegen de regels, en tegen alles wat er al ligt: een paar dat
    // op zichzelf deugt kan nog steeds een dubbele zijn.
    // De regels op het paar zelf, plus het enige wat je alleen ziet naast
    // wat er al ligt: of het er al in staat.
    const problems = [
      ...problemsWith(pair),
      ...problemsWithList([...goed[id], pair])
        .filter((p) => p.startsWith(`${pair[0]}/${pair[1]}: staat er al in`))
        .map(() => "staat er al in"),
    ];
    if (problems.length) {
      afgewezen++;
      console.log(`  ✗ ${pair[0]} / ${pair[1]}`);
      for (const problem of new Set(problems)) console.log(`      ${problem}`);
      continue;
    }
    goed[id].push(pair);
    aangenomen++;
    console.log(`  ✓ ${pair[0]} / ${pair[1]}  (${id}, afstand ${pair[2]})`);
  }
}

// En dan nog één keer de hele lijst, want te vaak terugkerende woorden zie
// je pas als alles er ligt.
const overall = CATEGORY_IDS.flatMap((id) => goed[id]);
const listProblems = problemsWithList(overall).filter((p) =>
  p.includes("komt") && p.includes("keer voor"),
);

console.log(
  `\n  ${aangenomen} aangenomen, ${afgewezen} afgewezen, ${overall.length} in totaal`,
);
for (const problem of listProblems) console.log(`  let op: ${problem}`);

if (!schrijf) {
  console.log("\n  Niets weggeschreven. Zet --schrijf erachter als dit klopt.\n");
  process.exit(listProblems.length ? 1 : 0);
}

const blokken = CATEGORY_IDS.map((id) => {
  const regels = goed[id]
    .map(([a, b, level]) => `    [${JSON.stringify(a)}, ${JSON.stringify(b)}, ${level}],`)
    .join("\n");
  return `  ${id}: [\n${regels}\n  ],`;
}).join("\n");

const doel = `lib/words/${lang}.ts`;
const oud = readFileSync(doel, "utf8");
const kop = oud.slice(0, oud.indexOf("const words: Record<CategoryId, Pair[]> = {"));
writeFileSync(
  doel,
  `${kop}const words: Record<CategoryId, Pair[]> = {\n${blokken}\n};\n\nexport default words;\n`,
);
console.log(`\n  ${doel} bijgewerkt — ${overall.length} paren\n`);
