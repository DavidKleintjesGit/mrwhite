/**
 * Schrijft de inhoud weg als JSON, zodat de server hem kan uitserveren.
 *
 *   npx tsx scripts/content.ts
 *
 * De bron blijft TypeScript: daar staan de woorden, de regels en de
 * challenges, en daar zitten de tests op. Dit bestand maakt daar een kopie
 * van die over de lijn kan. Zo kan er nooit een pakket op de server staan
 * dat de app niet zou aanvaarden, en kan de app nooit iets meeleveren wat
 * anders is dan wat er wordt uitgeserveerd.
 *
 * Draait mee met `npm run build`, dus er is geen moment waarop ze uit elkaar
 * kunnen lopen.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CHALLENGES, CONFLICTS, RULES_BY_CATEGORY } from "../lib/drink.ts";
// De woordenboeken komen hier rechtstreeks binnen en niet via de index van
// i18n: die gebruikt importpaden zonder extensie, wat Next oplost maar Node
// niet. Dezelfde reden waarom de taaltest ze ook stuk voor stuk haalt.
import { VERIFIED_LOCALES } from "../lib/i18n/config.ts";
import nl from "../lib/i18n/dictionaries/nl.ts";
import en from "../lib/i18n/dictionaries/en.ts";
import { CONTENT_VERSION } from "../lib/content/version.ts";
import type { ContentIndex, LanguagePack } from "../lib/content/schema.ts";
import { CATEGORY_IDS, WORDS, totalPairs } from "../lib/words.ts";

const OUT = join(process.cwd(), "public", "content", "v1");
mkdirSync(OUT, { recursive: true });

const index: ContentIndex = {
  version: CONTENT_VERSION,
  built: new Date().toISOString().slice(0, 10),
  languages: {},
};

const DICTS = { nl, en } as const;

for (const lang of VERIFIED_LOCALES) {
  const dict = DICTS[lang as keyof typeof DICTS];
  if (!dict) throw new Error("geen woordenboek voor " + lang);

  const words: LanguagePack["words"] = {};
  for (const id of CATEGORY_IDS) words[id] = WORDS[lang][id];

  const challenges: LanguagePack["challenges"] = {};
  for (const { id, reward } of CHALLENGES) {
    const entry =
      dict.drink.challenges[String(id) as keyof typeof dict.drink.challenges];
    challenges[String(id)] = { ...entry, reward };
  }

  const pack: LanguagePack = {
    version: CONTENT_VERSION,
    lang,
    words,
    rules: dict.drink.rules,
    ruleCategories: RULES_BY_CATEGORY,
    conflicts: CONFLICTS,
    challenges,
  };

  const file = `${lang}.json`;
  writeFileSync(join(OUT, file), JSON.stringify(pack));
  index.languages[lang] = {
    version: CONTENT_VERSION,
    file,
    pairs: totalPairs(lang),
  };
  console.log(`  ${file} — ${totalPairs(lang)} woordparen`);
}

writeFileSync(join(OUT, "index.json"), JSON.stringify(index, null, 2));
console.log(`  index.json — versie ${CONTENT_VERSION}`);
