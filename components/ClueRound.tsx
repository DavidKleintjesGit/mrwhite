"use client";

import { clueOrder, type Round } from "@/lib/game";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary["play"];
  round: Round;
  onDone: () => void;
};

/**
 * Deliberately not a step-by-step walkthrough. During the clues the phone sits
 * on the table and people talk; tapping through every player would add work
 * without telling anyone anything the list does not already show.
 */
export default function ClueRound({ dict, round, onDone }: Props) {
  const t = dict.clues;
  const order = clueOrder(round);

  return (
    <>
      <p className="text-muted">{t.instruction}</p>

      <ol className="flex flex-col gap-2">
        {order.map((player, index) => (
          <li
            key={player.id}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-4"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-background text-sm font-semibold tabular-nums text-muted">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 truncate font-medium">
              {player.name}
            </span>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={onDone}
        className="mt-auto w-full rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
      >
        {t.toVoting}
      </button>
    </>
  );
}
