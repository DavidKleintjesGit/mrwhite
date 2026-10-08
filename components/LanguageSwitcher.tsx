"use client";

import { usePathname } from "next/navigation";
import {
  LOCALES,
  LOCALE_NAMES,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n";

type Props = {
  current: Locale;
};

function remember(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Private browsing or blocked storage: switching still works, the choice
    // just is not remembered.
  }
}

export default function LanguageSwitcher({ current }: Props) {
  const pathname = usePathname();

  /**
   * Every route lives under `app/[lang]`, which is the root layout, so
   * swapping the language means crossing root layouts. Next.js requires a
   * full page load for that — hence plain anchors instead of <Link>.
   */
  function hrefFor(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  }

  return (
    <div className="flex gap-2">
      {LOCALES.map((locale) => {
        const active = locale === current;
        return (
          <a
            key={locale}
            href={hrefFor(locale)}
            lang={locale}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            onClick={() => remember(locale)}
            className={
              active
                ? "flex-1 rounded-xl border border-accent bg-accent/15 px-4 py-3 text-center text-sm font-medium text-accent"
                : "flex-1 rounded-xl border border-border px-4 py-3 text-center text-sm transition-colors hover:bg-surface-hover"
            }
          >
            {LOCALE_NAMES[locale]}
          </a>
        );
      })}
    </div>
  );
}
