"use client";

import { useState } from "react";
import BrutalButton from "@/components/ui/BrutalButton";
import type { Game } from "@/lib/game";
import { isCivilianWord } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  game: Game;
  onResolved: (correct: boolean) => void;
};

export default function GuessScreen({ dict, game, onResolved }: Props) {
  const t = dict.guess;
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"right" | "wrong" | null>(null);

  function submit() {
    if (!guess.trim()) return;
    setResult(isCivilianWord(game, guess) ? "right" : "wrong");
  }

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div style={{ animation: "slideUp .35s ease-out both" }}>
        <div
          className="font-type text-[13px] text-blood"
          style={{ letterSpacing: ".18em" }}
        >
          {t.kicker}
        </div>
        <div className="font-display text-[32px] leading-none">{t.title}</div>
      </div>

      <p className="m-0 text-[16px] text-muted text-pretty">{t.instruction}</p>

      {result === null && (
        <>
          <input
            type="text"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && submit()}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            maxLength={40}
            autoComplete="off"
            autoFocus
            className="font-mono h-16 border-[3px] border-ink bg-[var(--card)] px-4 text-[22px] font-bold text-ink outline-none"
            style={{ boxShadow: "6px 6px 0 #e8322b" }}
          />
          <BrutalButton
            onClick={submit}
            disabled={!guess.trim()}
            className="h-16 text-[19px]"
            style={{ opacity: guess.trim() ? 1 : 0.45 }}
          >
            {t.submit}
          </BrutalButton>
        </>
      )}

      {result === "right" && (
        <div
          className="border-[3px] border-ink bg-blood p-[26px] text-center text-ink"
          style={{
            boxShadow: "8px 8px 0 var(--pop)",
            animation: "popIn .5s ease-out both",
          }}
        >
          <div className="font-display text-[40px]">{t.right}</div>
          <div className="text-[17px] font-bold">
            {format(t.rightSub, { word: game.wordA })}
          </div>
        </div>
      )}

      {result === "wrong" && (
        <div
          className="sheet p-[26px] text-center"
          style={{
            boxShadow: "8px 8px 0 var(--soft)",
            animation: "shake .5s ease-out both",
          }}
        >
          <div className="font-display text-[40px]">{t.wrong}</div>
          <div className="text-[17px] font-bold">
            {format(t.wrongSub, { guess })}
          </div>
        </div>
      )}

      {result !== null && (
        <BrutalButton
          onClick={() => onResolved(result === "right")}
          className="mt-auto h-16 text-[19px]"
        >
          {t.continue}
        </BrutalButton>
      )}
    </div>
  );
}
