"use client";

import { useState } from "react";
import { livingPlayers, type Round } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary["play"];
  round: Round;
  onEliminate: (playerId: string) => void;
};

export default function Voting({ dict, round, onEliminate }: Props) {
  const t = dict.voting;
  // Picking and confirming are two steps on purpose: voting someone out
  // cannot be undone, and a stray tap should not end their round.
  const [pickedId, setPickedId] = useState<string | null>(null);

  const living = livingPlayers(round);
  const picked = living.find((player) => player.id === pickedId) ?? null;

  return (
    <>
      <p className="text-muted">{t.instruction}</p>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {living.map((player) => {
          const active = player.id === pickedId;
          return (
            <li key={player.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setPickedId(player.id)}
                className={`w-full truncate rounded-2xl border px-4 py-5 text-left font-medium transition-colors ${
                  active
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border bg-surface hover:bg-surface-hover"
                }`}
              >
                {player.name}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => picked && onEliminate(picked.id)}
        disabled={!picked}
        className="mt-auto w-full rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground transition-colors enabled:hover:bg-accent-hover disabled:opacity-40"
      >
        {picked ? format(t.confirm, { name: picked.name }) : t.pickFirst}
      </button>
    </>
  );
}
