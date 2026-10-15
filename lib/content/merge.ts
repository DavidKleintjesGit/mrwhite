/**
 * Zet een opgehaald pakket over het woordenboek heen.
 *
 * De schermen lezen hun teksten uit `dict`, dus door de regels en challenges
 * daar te vervangen werkt elk scherm zonder dat het ervan weet. De woorden
 * gaan apart, want die komen niet uit het woordenboek maar uit de speltafel.
 *
 * Alleen de teksten worden overgenomen, niet welke regels er bestaan: hoeveel
 * regels er zijn en wat ze opleveren zit nog in de code. Een nieuwe regel
 * erbij vraagt dus nog wel een uitgave van de app.
 */
import type { Dictionary } from "@/lib/i18n";
import type { Entry, LanguagePack } from "./schema.ts";

function overwrite<T extends Record<string, Entry>>(
  built: T,
  fetched: Record<string, Entry> | undefined,
): T {
  if (!fetched) return built;
  const merged = { ...built } as Record<string, Entry>;
  for (const key of Object.keys(built)) {
    const entry = fetched[key];
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
