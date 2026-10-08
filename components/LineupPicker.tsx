"use client";

import Stepper from "@/components/Stepper";
import { format, type Dictionary } from "@/lib/i18n";
import {
  MAX_PLAYERS,
  MIN_PLAYERS,
  checkLineup,
  civilianCount,
  maxFor,
  suggestedFor,
  type Lineup,
} from "@/lib/game";

type Props = {
  dict: Dictionary["play"];
  lineup: Lineup;
  onChange: (lineup: Lineup) => void;
  onConfirm: () => void;
};

export default function LineupPicker({
  dict,
  lineup,
  onChange,
  onConfirm,
}: Props) {
  const problem = checkLineup(lineup);
  const suggested = suggestedFor(lineup.players);
  const followsSuggestion =
    lineup.undercovers === suggested.undercovers &&
    lineup.mrWhites === suggested.mrWhites;

  const problemMessage =
    problem === "playerRange"
      ? format(dict.errors.playerRange, { min: MIN_PLAYERS, max: MAX_PLAYERS })
      : problem
        ? dict.errors[problem]
        : null;

  return (
    <>
      <div className="flex flex-col gap-3">
        <Stepper
          label={dict.players}
          value={lineup.players}
          min={MIN_PLAYERS}
          max={MAX_PLAYERS}
          decreaseLabel={`${dict.players} −`}
          increaseLabel={`${dict.players} +`}
          // A different player count usually makes the old line-up
          // unplayable, so fall back to the suggestion for that count.
          onChange={(players) => onChange(suggestedFor(players))}
        />
        <Stepper
          label={dict.undercovers}
          hint={dict.undercoversHint}
          value={lineup.undercovers}
          min={0}
          max={maxFor(lineup, "undercovers")}
          decreaseLabel={`${dict.undercovers} −`}
          increaseLabel={`${dict.undercovers} +`}
          onChange={(undercovers) => onChange({ ...lineup, undercovers })}
        />
        <Stepper
          label={dict.mrWhites}
          hint={dict.mrWhitesHint}
          value={lineup.mrWhites}
          min={0}
          max={maxFor(lineup, "mrWhites")}
          decreaseLabel={`${dict.mrWhites} −`}
          increaseLabel={`${dict.mrWhites} +`}
          onChange={(mrWhites) => onChange({ ...lineup, mrWhites })}
        />
      </div>

      <section className="rounded-2xl border border-border bg-surface p-4">
        <h2 className="text-sm font-medium text-muted">{dict.distribution}</h2>
        <dl className="mt-3 flex justify-between gap-2 text-center">
          <Tally term={dict.civilians} count={civilianCount(lineup)} />
          <Tally term={dict.undercover} count={lineup.undercovers} />
          <Tally term={dict.mrWhite} count={lineup.mrWhites} />
        </dl>

        {problemMessage ? (
          <p className="mt-4 rounded-xl bg-accent/15 p-3 text-sm text-accent">
            {problemMessage}
          </p>
        ) : (
          !followsSuggestion && (
            <button
              type="button"
              onClick={() => onChange(suggested)}
              className="mt-4 w-full rounded-xl border border-border px-4 py-3 text-sm transition-colors hover:bg-surface-hover"
            >
              {format(dict.useRecommended, {
                players: lineup.players,
                undercovers: suggested.undercovers,
                mrWhites: suggested.mrWhites,
              })}
            </button>
          )
        )}
      </section>

      <button
        type="button"
        onClick={onConfirm}
        disabled={problem !== null}
        className="mt-auto w-full rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground transition-colors enabled:hover:bg-accent-hover disabled:opacity-40"
      >
        {dict.next}
      </button>
    </>
  );
}

function Tally({ term, count }: { term: string; count: number }) {
  return (
    <div className="flex-1">
      <dd className="text-3xl font-semibold tabular-nums">{count}</dd>
      <dt className="mt-1 text-xs text-muted">{term}</dt>
    </div>
  );
}
