"use client";

import type { Player } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary["play"];
  player: Player;
  onUndo: () => void;
  onContinue: () => void;
};

/**
 * Shows the role and nothing else. Showing the eliminated player's word would
 * hand Mr. White the answer he is still trying to work out.
 */
export default function Elimination({
  dict,
  player,
  onUndo,
  onContinue,
}: Props) {
  const t = dict.elimination;
  const isMrWhite = player.role === "mrwhite";

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
        <p className="text-muted">{format(t.was, { name: player.name })}</p>
        <p className="text-4xl font-bold">{dict.roleNames[player.role]}</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          {isMrWhite ? t.mrWhiteGuesses : t.continue}
        </button>

        {/* The last chance to fix a misfire. After this the round moves on. */}
        <button
          type="button"
          onClick={onUndo}
          className="w-full rounded-2xl border border-border px-6 py-4 text-sm text-muted transition-colors hover:bg-surface-hover"
        >
          {t.undo}
        </button>
      </div>
    </>
  );
}
