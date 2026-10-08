"use client";

import type { Round } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary["play"];
  round: Round;
  onNewGame: () => void;
};

export default function FirstClue({ dict, round, onNewGame }: Props) {
  const t = dict.firstClue;
  const starter = round.players.find(
    (player) => player.id === round.startPlayerId,
  );

  return (
    <>
      <div className="flex flex-1 items-center justify-center text-center">
        {/* Only the name. Explaining how the opener is picked would tell the
            table which role that player cannot have. */}
        <p className="text-3xl font-bold sm:text-4xl">
          {format(t.startsWith, { name: starter?.name ?? "" })}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-center text-sm text-muted">{t.note}</p>
        <button
          type="button"
          onClick={onNewGame}
          className="rounded-2xl border border-border px-6 py-5 font-medium transition-colors hover:bg-surface-hover"
        >
          {t.newGame}
        </button>
      </div>
    </>
  );
}
