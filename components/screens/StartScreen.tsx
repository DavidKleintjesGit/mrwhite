"use client";

import { useEffect, useRef, useState } from "react";
import BrutalButton from "@/components/ui/BrutalButton";
import Magnifier from "@/components/ui/Magnifier";
import type { Game } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  game: Game;
  /** Indexes still in the game, in speaking order from the opener. */
  order: number[];
  onBegin: () => void;
};

const TICKS = 20;
const TICK_MS = 90;

/**
 * Rolls through the names before landing on whoever opens. The opener is
 * already decided — this is suspense, not a draw — so the roll is purely a
 * display concern and lives here rather than in the game state.
 */
export default function StartScreen({ dict, game, order, onBegin }: Props) {
  const t = dict.start;
  const starter = game.players[order[0]];
  const [rolled, setRolled] = useState(false);
  const [name, setName] = useState(() => game.players[order[0]].name);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const names = order.map((index) => game.players[index].name);
    let tick = 0;

    timer.current = setInterval(() => {
      tick += 1;
      if (tick >= TICKS) {
        if (timer.current) clearInterval(timer.current);
        setRolled(true);
        setName(starter.name);
        return;
      }
      setName(names[tick % names.length]);
    }, TICK_MS);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [game, order, starter.name]);

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div
        className="text-center"
        style={{ animation: "slideUp .35s ease-out both" }}
      >
        <div
          className="font-display inline-block border-[3px] border-ink bg-evidence px-[14px] py-[6px] text-[16px] text-ink"
          style={{ letterSpacing: ".15em", transform: "rotate(-3deg)" }}
        >
          {format(t.round, { number: game.round })}
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-7">
        <Magnifier
          size={150}
          style={{
            animation: rolled
              ? "pulse 1.6s ease-in-out infinite"
              : "spin .6s linear infinite",
          }}
        />

        <div
          className="font-type text-[15px] text-dim"
          style={{ letterSpacing: ".25em" }}
        >
          {rolled ? t.rolled : t.rolling}
        </div>

        <div
          className="sheet font-display max-w-full px-7 py-[18px] text-center text-[44px] leading-none break-words"
          style={{ boxShadow: "8px 8px 0 #e8322b" }}
          aria-live="polite"
        >
          {name}
        </div>

        {rolled && (
          <div
            className="font-display text-[28px]"
            style={{
              letterSpacing: ".06em",
              animation: "popIn .45s ease-out both",
            }}
          >
            {t.begins}
          </div>
        )}
      </div>

      {rolled && (
        <BrutalButton
          onClick={onBegin}
          className="h-[66px] text-[19px] tracking-[.05em]"
          style={{ animation: "slideUp .35s ease-out both" }}
        >
          {t.begin}
        </BrutalButton>
      )}
    </div>
  );
}
