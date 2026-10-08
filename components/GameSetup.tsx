"use client";

import { useState } from "react";
import Stepper from "@/components/Stepper";
import { format, type Dictionary } from "@/lib/i18n";
import {
  MAX_PLAYERS,
  MIN_PLAYERS,
  civilianCount,
  infiltratorCount,
  maxInfiltrators,
  recommendedFor,
  validate,
  type RoleSetup,
} from "@/lib/roles";

type Props = {
  dict: Dictionary["play"];
};

export default function GameSetup({ dict }: Props) {
  const [setup, setSetup] = useState<RoleSetup>(() => recommendedFor(6));

  const civilians = civilianCount(setup);
  const infiltrators = infiltratorCount(setup);
  const problem = validate(setup);
  const headroom = Math.max(maxInfiltrators(setup.players) - infiltrators, 0);
  const recommended = recommendedFor(setup.players);
  const followsRecommendation =
    setup.undercovers === recommended.undercovers &&
    setup.mrWhites === recommended.mrWhites;

  const problemMessage =
    problem === "playerRange"
      ? format(dict.errors.playerRange, {
          min: MIN_PLAYERS,
          max: MAX_PLAYERS,
        })
      : problem
        ? dict.errors[problem]
        : null;

  function setPlayers(players: number) {
    // A different player count usually makes the old line-up unplayable,
    // so fall back to the suggestion for that count.
    setSetup(recommendedFor(players));
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <Stepper
          label={dict.players}
          value={setup.players}
          min={MIN_PLAYERS}
          max={MAX_PLAYERS}
          decreaseLabel={`${dict.players} −`}
          increaseLabel={`${dict.players} +`}
          onChange={setPlayers}
        />
        <Stepper
          label={dict.undercovers}
          hint={dict.undercoversHint}
          value={setup.undercovers}
          min={0}
          max={setup.undercovers + headroom}
          decreaseLabel={`${dict.undercovers} −`}
          increaseLabel={`${dict.undercovers} +`}
          onChange={(undercovers) => setSetup({ ...setup, undercovers })}
        />
        <Stepper
          label={dict.mrWhites}
          hint={dict.mrWhitesHint}
          value={setup.mrWhites}
          min={0}
          max={setup.mrWhites + headroom}
          decreaseLabel={`${dict.mrWhites} −`}
          increaseLabel={`${dict.mrWhites} +`}
          onChange={(mrWhites) => setSetup({ ...setup, mrWhites })}
        />
      </div>

      <section className="rounded-2xl border border-border bg-surface p-4">
        <h2 className="text-sm font-medium text-muted">{dict.distribution}</h2>
        <dl className="mt-3 flex justify-between gap-2 text-center">
          <Tally term={dict.civilians} count={civilians} />
          <Tally term={dict.undercover} count={setup.undercovers} />
          <Tally term={dict.mrWhite} count={setup.mrWhites} />
        </dl>

        {problemMessage ? (
          <p className="mt-4 rounded-xl bg-accent/15 p-3 text-sm text-accent">
            {problemMessage}
          </p>
        ) : (
          !followsRecommendation && (
            <button
              type="button"
              onClick={() => setSetup(recommended)}
              className="mt-4 w-full rounded-xl border border-border px-4 py-3 text-sm transition-colors hover:bg-surface-hover"
            >
              {format(dict.useRecommended, {
                players: setup.players,
                undercovers: recommended.undercovers,
                mrWhites: recommended.mrWhites,
              })}
            </button>
          )
        )}
      </section>

      <div className="mt-auto flex flex-col gap-2">
        <button
          type="button"
          disabled
          className="w-full rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground disabled:opacity-40"
        >
          {dict.next}
        </button>
        <p className="text-center text-sm text-muted">{dict.nextNote}</p>
      </div>
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
