"use client";

import { useState } from "react";
import Scherm from "@/components/Scherm";
import Stepper from "@/components/Stepper";
import {
  MAX_SPELERS,
  MIN_SPELERS,
  aantalBurgers,
  aantalInfiltranten,
  adviesVoor,
  controleer,
  maxInfiltranten,
  type Rolverdeling,
} from "@/lib/rollen";

export default function SpelenPage() {
  const [verdeling, setVerdeling] = useState<Rolverdeling>(() => adviesVoor(6));

  const burgers = aantalBurgers(verdeling);
  const infiltranten = aantalInfiltranten(verdeling);
  const fout = controleer(verdeling);
  const ruimte = maxInfiltranten(verdeling.spelers) - infiltranten;
  const advies = adviesVoor(verdeling.spelers);
  const volgtAdvies =
    verdeling.undercovers === advies.undercovers &&
    verdeling.mrWhites === advies.mrWhites;

  function zetSpelers(spelers: number) {
    // Bij een ander spelersaantal is de oude verdeling vaak niet meer
    // speelbaar, dus val terug op het advies voor dat aantal.
    setVerdeling(adviesVoor(spelers));
  }

  return (
    <Scherm titel="Nieuw spel">
      <div className="flex flex-col gap-3">
        <Stepper
          label="Spelers"
          waarde={verdeling.spelers}
          min={MIN_SPELERS}
          max={MAX_SPELERS}
          onChange={zetSpelers}
        />
        <Stepper
          label="Undercovers"
          toelichting="Krijgen een woord dat lijkt op dat van de burgers"
          waarde={verdeling.undercovers}
          min={0}
          max={verdeling.undercovers + Math.max(ruimte, 0)}
          onChange={(undercovers) => setVerdeling({ ...verdeling, undercovers })}
        />
        <Stepper
          label="Mr. Whites"
          toelichting="Krijgen geen woord en moeten meebluffen"
          waarde={verdeling.mrWhites}
          min={0}
          max={verdeling.mrWhites + Math.max(ruimte, 0)}
          onChange={(mrWhites) => setVerdeling({ ...verdeling, mrWhites })}
        />
      </div>

      <section className="rounded-2xl border border-border bg-surface p-4">
        <h2 className="text-sm font-medium text-muted">Verdeling</h2>
        <dl className="mt-3 flex justify-between gap-2 text-center">
          <Vakje term="Burgers" aantal={burgers} />
          <Vakje term="Undercover" aantal={verdeling.undercovers} />
          <Vakje term="Mr. White" aantal={verdeling.mrWhites} />
        </dl>

        {fout ? (
          <p className="mt-4 rounded-xl bg-accent/15 p-3 text-sm text-accent">
            {fout}
          </p>
        ) : (
          !volgtAdvies && (
            <button
              type="button"
              onClick={() => setVerdeling(advies)}
              className="mt-4 w-full rounded-xl border border-border px-4 py-3 text-sm transition-colors hover:bg-surface-hover"
            >
              Terug naar het advies voor {verdeling.spelers} spelers (
              {advies.undercovers} undercover, {advies.mrWhites} Mr. White)
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
          Volgende: namen invoeren
        </button>
        <p className="text-center text-sm text-muted">
          Namen invoeren en woorden uitdelen volgen hierna.
        </p>
      </div>
    </Scherm>
  );
}

function Vakje({ term, aantal }: { term: string; aantal: number }) {
  return (
    <div className="flex-1">
      <dd className="text-3xl font-semibold tabular-nums">{aantal}</dd>
      <dt className="mt-1 text-xs text-muted">{term}</dt>
    </div>
  );
}
