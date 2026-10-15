/**
 * Zet een nieuwe taal klaar.
 *
 *   npm run locale:add -- pt "Português"
 *
 * Een taal bestaat uit twee dingen: de bediening en de woorden. Dit maakt ze
 * allebei aan en meldt de taal overal aan waar dat moet, zodat er niets
 * vergeten wordt. De bediening begint als kopie van het Engels — dat houdt
 * de sleutels compleet, zodat de taaltest blijft werken terwijl er nog
 * vertaald wordt, en je ziet meteen wat er nog in het Engels staat.
 *
 * De taal komt níét meteen in de kiezer. Daarvoor moet hij in
 * VERIFIED_LOCALES, en dat is met opzet een handeling: een bediening die
 * niemand hier kan lezen hoort niet ongezien naar spelers te gaan.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const [code, name] = process.argv.slice(2);

if (!code || !name) {
  console.error('Gebruik: npm run locale:add -- <code> "<naam in eigen taal>"');
  process.exit(1);
}
if (!/^[a-z]{2}$/.test(code)) {
  console.error(`"${code}" is geen taalcode van twee letters.`);
  process.exit(1);
}

const config = "lib/i18n/config.ts";
if (readFileSync(config, "utf8").includes(`"${code}"`)) {
  console.error(`${code} staat er al in.`);
  process.exit(1);
}

// 1. De woorden: leeg, klaar om gevuld te worden.
const wordsFile = `lib/words/${code}.ts`;
if (!existsSync(wordsFile)) {
  writeFileSync(
    wordsFile,
    `import type { CategoryId, Pair } from "../words.ts";

/**
 * De woordparen voor ${name}.
 *
 * Elk paar is [burgerwoord, undercoverwoord, afstand]. Afstand 1 is ver uit
 * elkaar, 2 is dichtbij. Welke van de twee het burgerwoord wordt, bepaalt
 * het spel met een muntworp, dus een paar moet beide kanten op werken.
 */
const words: Record<CategoryId, Pair[]> = {
  eten: [],
  dieren: [],
  plekken: [],
  huis: [],
  beroepen: [],
  sport: [],
  pop: [],
};

export default words;
`,
  );
  console.log(`  ${wordsFile} aangemaakt — nog leeg`);
}

// 2. De bediening: een kopie van het Engels, zodat alles compileert.
const dictFile = `lib/i18n/dictionaries/${code}.ts`;
if (!existsSync(dictFile)) {
  const english = readFileSync("lib/i18n/dictionaries/en.ts", "utf8");
  writeFileSync(
    dictFile,
    `/*
 * NOG NIET VERTAALD — dit is nog het Engels.
 *
 * Elke tekst hieronder moet nagelopen worden door iemand die ${name}
 * spreekt. Zolang dat niet gebeurd is hoort deze taal niet in
 * VERIFIED_LOCALES en komt hij dus niet in de kiezer.
 */
${english}`,
  );
  console.log(`  ${dictFile} aangemaakt — nog Engels`);
}

// 3. Aanmelden waar het moet.
const edits: [string, string, string][] = [
  [config, '"tr"] as const;', `"tr", "${code}"] as const;`],
  [config, '  tr: "Türkçe",', `  tr: "Türkçe",\n  ${code}: "${name}",`],
  [
    "lib/words.ts",
    'import tr from "./words/tr.ts";',
    `import tr from "./words/tr.ts";\nimport ${code} from "./words/${code}.ts";`,
  ],
  ["lib/words.ts", "  tr,", `  tr,\n  ${code},`],
  [
    "lib/i18n/index.ts",
    'import tr from "./dictionaries/tr";',
    `import tr from "./dictionaries/tr";\nimport ${code} from "./dictionaries/${code}";`,
  ],
  ["lib/i18n/index.ts", "it, tr };", `it, tr, ${code} };`],
  [
    "lib/i18n/i18n.test.ts",
    'import tr from "./dictionaries/tr.ts";',
    `import tr from "./dictionaries/tr.ts";\nimport ${code} from "./dictionaries/${code}.ts";`,
  ],
  ["lib/i18n/i18n.test.ts", "it, tr };", `it, tr, ${code} };`],
];

for (const [file, find, replace] of edits) {
  const text = readFileSync(file, "utf8");
  if (!text.includes(find)) {
    console.error(`  kon "${find.slice(0, 30)}…" niet vinden in ${file}`);
    process.exit(1);
  }
  writeFileSync(file, text.replace(find, replace));
}
console.log(`  aangemeld in config, woorden en woordenboeken`);

console.log(`
${name} (${code}) staat klaar. Nog te doen:

  1. Vul lib/words/${code}.ts met minstens 150 woordparen
  2. Laat lib/i18n/dictionaries/${code}.ts vertalen en haal de waarschuwing
     bovenaan weg
  3. Zet "${code}" in VERIFIED_LOCALES in lib/i18n/config.ts
  4. npm test — die bewaakt dat er niets ontbreekt
  5. De taal krijgt pas een eigen adres na een nieuwe build en inzending
`);
