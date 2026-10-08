"use client";

import type { Round } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary["play"];
  round: Round;
  onContinue: () => void;
};

export default function FirstClue({ dict, round, onContinue }: Props) {
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

      <button
        type="button"
        onClick={onContinue}
        className="w-full rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
      >
        {t.continue}
      </button>
    </>
  );
}
