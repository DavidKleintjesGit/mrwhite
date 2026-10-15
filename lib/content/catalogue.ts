/**
 * Maakt van een opgehaald pakket de catalogus waar het spel mee werkt.
 *
 * Zolang dit uit de app kwam, kon er geen regel bij zonder nieuwe uitgave.
 * Nu bepaalt het pakket hoeveel regels er zijn, in welke categorie ze
 * vallen, welke elkaar in de weg zitten en wat een opdracht oplevert.
 */
import { BUILT_IN, type Catalogue } from "../drink.ts";
import type { Role } from "../game.ts";
import type { LanguagePack } from "./schema.ts";

export function catalogueOf(pack: LanguagePack | null): Catalogue {
  if (!pack) return BUILT_IN;
  return {
    rulesByCategory: pack.ruleCategories,
    conflicts: pack.conflicts,
    challenges: Object.entries(pack.challenges).map(([id, challenge]) => ({
      id: Number(id),
      reward: challenge.reward,
      roles: challenge.roles as readonly Role[] | undefined,
    })),
  };
}
