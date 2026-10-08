"use client";

import { useState } from "react";
import { findDuplicateName, normaliseNames } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary["play"];
  count: number;
  initialNames: readonly string[];
  onBack: () => void;
  onConfirm: (names: string[]) => void;
};

export default function NameEntry({
  dict,
  count,
  initialNames,
  onBack,
  onConfirm,
}: Props) {
  const t = dict.names;

  const [names, setNames] = useState<string[]>(() =>
    Array.from({ length: count }, (_, index) => initialNames[index] ?? ""),
  );

  const fallback = (index: number) =>
    format(t.playerNumber, { number: index + 1 });

  const duplicate = findDuplicateName(names);

  function setName(index: number, value: string) {
    setNames((current) =>
      current.map((name, i) => (i === index ? value : name)),
    );
  }

  function submit() {
    if (duplicate) return;
    onConfirm(normaliseNames(names, fallback));
  }

  return (
    <>
      <p className="text-muted">{t.hint}</p>

      <form
        className="grid gap-3 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        {names.map((name, index) => (
          <label key={index} className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-sm font-semibold tabular-nums text-muted">
              {index + 1}
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(index, event.target.value)}
              placeholder={fallback(index)}
              maxLength={20}
              autoComplete="off"
              autoCapitalize="words"
              aria-label={fallback(index)}
              className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
            />
          </label>
        ))}
        {/* Lets Enter submit the form without showing a second button. */}
        <button type="submit" className="hidden" aria-hidden="true" />
      </form>

      {duplicate && (
        <p className="rounded-xl bg-accent/15 p-3 text-sm text-accent">
          {format(t.duplicate, { name: duplicate })}
        </p>
      )}

      <div className="mt-auto flex flex-col gap-3 sm:flex-row-reverse">
        <button
          type="button"
          onClick={submit}
          disabled={Boolean(duplicate)}
          className="flex-1 rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground transition-colors enabled:hover:bg-accent-hover disabled:opacity-40"
        >
          {t.confirm}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="rounded-2xl border border-border px-6 py-5 font-medium transition-colors hover:bg-surface-hover sm:flex-1"
        >
          {t.back}
        </button>
      </div>
    </>
  );
}
