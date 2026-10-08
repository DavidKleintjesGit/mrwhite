"use client";

import Link from "next/link";
import { useState } from "react";
import BrutalButton from "@/components/ui/BrutalButton";
import Magnifier from "@/components/ui/Magnifier";
import PoliceTape from "@/components/ui/PoliceTape";
import StickyNote from "@/components/ui/StickyNote";
import type { Dictionary } from "@/lib/i18n";
import { applyTheme, readTheme, type Theme } from "@/lib/theme";

type Props = {
  dict: Dictionary;
  lang: string;
};

export default function HomeScreen({ dict, lang }: Props) {
  const t = dict.home;
  // Starts from the attribute the blocking script already set, so the label
  // matches what is on screen without waiting for an effect.
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document === "undefined" ? "dark" : readTheme(),
  );

  function flipTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }

  return (
    <div className="relative flex flex-1 flex-col justify-center gap-7">
      {/* The tape runs wider than the screen so the tilt never shows an end. */}
      <div className="pointer-events-none relative z-[2] mx-0 -mt-7 -mb-[10px] h-[110px] flex-none">
        <div
          className="absolute left-1/2 h-[150px]"
          style={{ width: "180vw", marginLeft: "-90vw", top: -6 }}
        >
          <PoliceTape
            text={t.tapeTop}
            rotate={-4}
            top={10}
            height={46}
            fontSize={20}
            duration={18}
          />
          <PoliceTape
            text={t.tapeBottom}
            rotate={3}
            top={78}
            height={40}
            fontSize={16}
            duration={24}
            reverse
            opacity={0.95}
          />
        </div>
      </div>

      <div
        className="relative flex flex-col items-center pt-[10px]"
        style={{ animation: "flicker 5s infinite" }}
      >
        <div
          className="font-type text-[14px] text-dim"
          style={{ letterSpacing: ".3em" }}
        >
          {t.caseNumber}
        </div>

        <div className="mt-[10px] flex items-start gap-[10px]">
          <div
            className="font-display border-[3px] border-ink bg-blood px-[10px] py-1 text-[30px] text-ink"
            style={{
              boxShadow: "4px 4px 0 var(--pop)",
              transform: "rotate(-6deg)",
              marginTop: 14,
            }}
          >
            MR.
          </div>
          <div
            className="font-display text-fg"
            style={{
              fontSize: 84,
              lineHeight: 0.95,
              letterSpacing: "-.02em",
              textShadow: "6px 6px 0 #e8322b",
            }}
          >
            WHITE
          </div>
        </div>

        <Magnifier
          size={100}
          className="pointer-events-none absolute left-1/2"
          style={{
            top: 16,
            marginLeft: -45,
            animation: "sweep 6s ease-in-out infinite",
          }}
        />

        <p className="mt-[26px] max-w-[340px] text-center text-[17px] leading-[1.5] text-muted text-pretty">
          {t.taglineOne}
          <br />
          {t.taglineTwo}{" "}
          <span className="bg-evidence px-1 font-bold text-ink">
            {t.taglineHighlight}
          </span>
          .
        </p>
      </div>

      <StickyNote
        rotate={4}
        tapeRotate={-6}
        maxWidth={190}
        delay={0.4}
        className="-mt-[14px] -mb-[6px] mr-[6px] self-end"
      >
        {t.note}
      </StickyNote>

      <div
        className="flex flex-col gap-[18px]"
        style={{ animation: "slideUp .5s .15s ease-out both" }}
      >
        <Link
          href={`/${lang}/play`}
          className="pressable font-display flex h-[68px] items-center justify-center border-[3px] border-ink bg-blood text-[22px] tracking-[.06em] text-ink"
          style={{ boxShadow: "6px 6px 0 var(--pop)" }}
        >
          {t.play}
        </Link>

        <div className="grid grid-cols-2 gap-4">
          <Link
            href={`/${lang}/rules`}
            className="pressable font-display flex h-[60px] items-center justify-center border-[3px] border-[var(--fg)] bg-[var(--bg)] text-[16px] tracking-[.06em] text-fg"
            style={{ boxShadow: "5px 5px 0 #f5d90a" }}
          >
            {t.rules}
          </Link>
          <Link
            href={`/${lang}/settings`}
            className="pressable font-display flex h-[60px] items-center justify-center border-[3px] border-[var(--fg)] bg-[var(--bg)] text-[16px] tracking-[.06em] text-fg"
            style={{ boxShadow: "5px 5px 0 #f5d90a" }}
          >
            {t.settings}
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="font-type text-[12px] text-dim"
          style={{ letterSpacing: ".2em" }}
        >
          {t.imprint}
        </div>
        <BrutalButton
          variant="outline"
          shadow="#e8322b"
          depth={3}
          onClick={flipTheme}
          className="h-9 px-3 text-[12px] tracking-[.1em]"
        >
          {theme === "dark" ? t.themeToLight : t.themeToDark}
        </BrutalButton>
      </div>
    </div>
  );
}
