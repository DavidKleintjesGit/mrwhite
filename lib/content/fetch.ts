/**
 * Kijkt of er nieuwere woorden klaarstaan, en haalt ze op.
 *
 * Alles aan dit bestand gaat ervan uit dat het misgaat. Geen verbinding, een
 * server die iets anders teruggeeft, een half binnengekomen bestand: in alle
 * gevallen blijft het spel spelen met wat in de app zit. Er wordt nooit op
 * gewacht en er wordt nooit iets afgebroken.
 */
import { CONTENT_VERSION } from "./version.ts";
import { isLanguagePack, type ContentIndex, type LanguagePack } from "./schema.ts";
import { readPack, writePack } from "./store.ts";

/** Hoe lang we hoogstens wachten. Daarna is het spel belangrijker. */
const TIMEOUT_MS = 6000;

/**
 * Waar de pakketten vandaan komen.
 *
 * Op het web is dat dezelfde site, dus een pad volstaat. In de app is de
 * herkomst `capacitor://localhost` of `https://localhost` en wijst een pad
 * naar de kopie die meegeleverd is — die is per definitie nooit nieuwer.
 * Daar moet het dus het volledige adres zijn.
 */
function base(): string {
  if (typeof window === "undefined") return "/content/v1";
  const { protocol, hostname } = window.location;
  const native =
    hostname === "localhost" &&
    (protocol === "https:" || protocol === "capacitor:" || protocol === "ionic:");
  return native ? "https://misterwhite.online/content/v1" : "/content/v1";
}

export type CheckResult = "updated" | "current" | "failed";

async function getJSON(url: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal, cache: "no-store" });
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
}

/** De versie waar we nu mee spelen: het hoogste van meegeleverd en opgehaald. */
export function currentVersion(lang: string): number {
  const stored = readPack(lang);
  return Math.max(CONTENT_VERSION, stored?.version ?? 0);
}

export async function checkForContent(lang: string): Promise<CheckResult> {
  if (typeof window === "undefined" || !("fetch" in window)) return "failed";

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const index = (await getJSON(
      `${base()}/index.json`,
      controller.signal,
    )) as ContentIndex;

    const entry = index?.languages?.[lang];
    if (!entry || typeof entry.version !== "number") return "failed";
    if (entry.version <= currentVersion(lang)) return "current";

    const pack = (await getJSON(
      `${base()}/${entry.file}`,
      controller.signal,
    )) as LanguagePack;

    // Pas vertrouwen als het er ook werkelijk als een pakket uitziet, en als
    // het de taal is waar we om vroegen.
    if (!isLanguagePack(pack) || pack.lang !== lang) return "failed";
    if (pack.version <= currentVersion(lang)) return "current";

    writePack(pack);
    return "updated";
  } catch {
    return "failed";
  } finally {
    clearTimeout(timer);
  }
}
