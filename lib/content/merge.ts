/**
 * Zet een opgehaald pakket over het woordenboek heen.
 *
 * De schermen lezen hun teksten uit `dict`, dus door de regels en challenges
 * daar te vervangen werkt elk scherm zonder dat het ervan weet. De woorden
 * gaan apart, want die komen niet uit het woordenboek maar uit de speltafel.
 *
 * Teksten uit het pakket winnen, en teksten die er nog niet waren komen
 * erbij: een pakket mag regels en opdrachten meebrengen die deze uitgave van
 * de app niet kent.
 */
import type { Dictionary } from "@/lib/i18n";
import type { Entry, LanguagePack } from "./schema.ts";

function overwrite<T extends Record<string, Entry>>(
  built: T,
  fetched: Record<string, Entry> | undefined,
): T {
  if (!fetched) return built;
  const merged = { ...built } as Record<string, Entry>;
  for (const [key, entry] of Object.entries(fetched)) {
    if (entry && typeof entry.t === "string" && typeof entry.d === "string") {
      merged[key] = { t: entry.t, d: entry.d };
    }
  }
  return merged as T;
}

export function withPack(dict: Dictionary, pack: LanguagePack | null): Dictionary {
  if (!pack) return dict;
  return {
    ...dict,
    drink: {
      ...dict.drink,
      rules: overwrite(dict.drink.rules, pack.rules),
      challenges: overwrite(dict.drink.challenges, pack.challenges),
    },
  };
}
