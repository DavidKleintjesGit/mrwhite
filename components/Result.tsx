"use client";

import type { Outcome, Player, Round } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary["play"];
  round: Round;
  outcome: Outcome;
  /** Set when Mr. White was voted out but guessed the word anyway. */
  guessedBy: Player | null;
  onNewGame: () => void;
};

export default function Result({
  dict,
  round,
  outcome,
  guessedBy,
  onNewGame,
}: Props) {
  const t = dict.result;

  return (
    <>
      <div className="text-center">
        <p className="text-3xl font-bold sm:text-4xl">
          {outcome === "civilians" ? t.civiliansWin : t.infiltratorsWin}
        </p>
        {guessedBy && (
          <p className="mt-2 text-muted">
            {format(t.byGuess, { name: guessedBy.name })}
          </p>
        )}
        <p className="mt-4 text-muted">
          {format(t.wordsWere, {
            civilian: round.pair.civilian,
            undercover: round.pair.undercover,
          })}
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">
          {t.lineupHeading}
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {round.players.map((player) => (
            <li
              key={player.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3"
            >
              <span
                className={`min-w-0 flex-1 truncate font-medium ${
                  player.alive ? "" : "text-muted line-through"
                }`}
              >
                {player.name}
              </span>
              <span className="shrink-0 text-sm text-muted">
                {dict.roleNames[player.role]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <button
        type="button"
        onClick={onNewGame}
        className="mt-auto w-full rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
      >
        {t.newGame}
      </button>
    </>
  );
}
