"use client";

/**
 * Het opgehaalde pakket, en de knop om er zelf om te vragen.
 *
 * Bij het opstarten kijkt hij één keer of er nieuwere woorden klaarstaan.
 * Dat gebeurt naast het spel: er wordt niet op gewacht, en als het misgaat
 * merk je er niets van. In de instellingen zit dezelfde controle als knop.
 *
 * Wat er in de opslag staat wordt gelezen via `useSyncExternalStore`, net als
 * de spelstand. Dat is hier geen stijlkwestie: de opslag is iets buiten React
 * en in een effect state zetten om hem binnen te halen, geeft een extra
 * renderronde bij elke start.
 */
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { checkForContent, type CheckResult } from "./fetch.ts";
import { isLanguagePack, type LanguagePack } from "./schema.ts";
import { CONTENT_VERSION } from "./version.ts";

export type CheckState = "idle" | "checking" | CheckResult;

const KEY = (lang: string) => `mrwhite.content.${lang}`;

/** Wie er meeluistert of de opslag veranderd is. */
const listeners = new Set<() => void>();

function announce() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** De ruwe tekst, niet een geparseerd object: snapshots worden op identiteit vergeleken. */
function read(lang: string): string | null {
  try {
    return localStorage.getItem(KEY(lang));
  } catch {
    return null;
  }
}

export function useContent(lang: string) {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(lang),
    () => null
  );

  const pack = useMemo((): LanguagePack | null => {
    if (!raw) return null;
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!isLanguagePack(parsed)) return null;
      // Alleen nieuwer dan wat de app meedraagt is een verbetering.
      return parsed.version > CONTENT_VERSION ? parsed : null;
    } catch {
      return null;
    }
  }, [raw]);

  const [state, setState] = useState<CheckState>("idle");

  const check = useCallback(async (): Promise<CheckResult> => {
    setState("checking");
    const result = await checkForContent(lang);
    announce();
    setState(result);
    return result;
  }, [lang]);

  useEffect(() => {
    let alive = true;
    // Zonder "checking" te tonen: dit loopt naast het spel en hoeft nergens
    // in beeld te komen. De uitslag telt alleen voor de regel in de
    // instellingen, mocht je daar kijken.
    void checkForContent(lang).then((result) => {
      if (!alive) return;
      announce();
      setState(result);
    });
    return () => {
      alive = false;
    };
  }, [lang]);

  return {
    pack,
    state,
    check,
    version: pack?.version ?? CONTENT_VERSION,
  };
}
