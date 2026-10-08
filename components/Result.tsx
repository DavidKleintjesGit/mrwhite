"use client";

import type { Outcome, Player, Round, Scores } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary["play"];
  round: Round;
  outcome: Outcome;
  /** Set when Mr. White was voted out but guessed the word anyway. */
  guessedBy: Player | null;
  scores: Scores;
  roundNumber: number;
  onNextRound: () => void;
  onNewGame: () => void;
};

export default function Result({
  dict,
  round,
  outcome,
  guessedBy,
  scores,
  roundNumber,
  onNextRound,
  onNewGame,
}: Props) {
  const t = dict.result;

  // Highest score first; equal scores keep the seating order.
  const standings = [...round.players].sort(
    (a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0),
  );

  return (
    <>
      <div className="text-center">
        <p className="text-sm uppercase tracking-wide text-muted">
          {format(t.roundLabel, { number: roundNumber })}
        </p>
        <p className="mt-1 text-3xl font-bold sm:text-4xl">
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
          {t.standings}
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {standings.map((player) => (
            <li
              key={player.id}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3"
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
              <span className="w-12 shrink-0 text-right font-semibold tabular-nums">
                {scores[player.id] ?? 0}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-auto flex flex-col gap-3 sm:flex-row-reverse">
        <button
          type="button"
          onClick={onNextRound}
          className="flex-1 rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          {t.nextRound}
        </button>
        <button
          type="button"
          onClick={onNewGame}
          className="rounded-2xl border border-border px-6 py-5 font-medium transition-colors hover:bg-surface-hover sm:flex-1"
        >
          {t.newGame}
        </button>
      </div>
    </>
  );
}
