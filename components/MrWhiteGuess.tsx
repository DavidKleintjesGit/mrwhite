"use client";

import { useState } from "react";
import type { Player } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary["play"];
  player: Player;
  onGuess: (guess: string) => void;
};

export default function MrWhiteGuess({ dict, player, onGuess }: Props) {
  const t = dict.mrWhiteGuess;
  const [guess, setGuess] = useState("");

  return (
    <form
      className="flex flex-1 flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (guess.trim()) onGuess(guess);
      }}
    >
      <p className="text-muted">
        {format(t.instruction, { name: player.name })}
      </p>

      <input
        type="text"
        value={guess}
        onChange={(event) => setGuess(event.target.value)}
        placeholder={t.placeholder}
        maxLength={40}
        autoComplete="off"
        autoFocus
        aria-label={t.placeholder}
        className="w-full rounded-2xl border border-border bg-surface px-5 py-4 text-xl outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
      />

      <button
        type="submit"
        disabled={!guess.trim()}
        className="mt-auto w-full rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground transition-colors enabled:hover:bg-accent-hover disabled:opacity-40"
      >
        {t.submit}
      </button>
    </form>
  );
}
