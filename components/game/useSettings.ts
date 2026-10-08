"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  parseSettings,
  readStoredSettings,
  writeSettings,
  type Settings,
} from "@/lib/settings";
import type { Locale } from "@/lib/i18n";

/** Settings do not change behind our back while a page is open. */
const subscribe = () => () => {};

/**
 * Reads the stored settings through `useSyncExternalStore` so the prerendered
 * HTML and the first client render agree, without needing an effect.
 */
export function useSettings(lang: Locale) {
  const stored = useSyncExternalStore(subscribe, readStoredSettings, () => null);
  const saved = useMemo(() => parseSettings(stored, lang), [stored, lang]);

  const [edited, setEdited] = useState<Settings | null>(null);
  const settings = edited ?? saved;

  function update(change: Partial<Settings>) {
    const next = { ...settings, ...change };
    setEdited(next);
    writeSettings(next);
  }

  return [settings, update] as const;
}
