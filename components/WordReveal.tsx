"use client";

import { useState } from "react";
import type { Player, Round } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary["play"];
  round: Round;
  onSeen: (playerId: string) => void;
  onReDeal: () => void;
  onStart: () => void;
};

export default function WordReveal({
  dict,
  round,
  onSeen,
  onReDeal,
  onStart,
}: Props) {
  const t = dict.reveal;
  const [openPlayerId, setOpenPlayerId] = useState<string | null>(null);

  const openPlayer =
    round.players.find((player) => player.id === openPlayerId) ?? null;
  const seenCount = round.players.filter((player) => player.seenWord).length;

  return (
    <>
      <div>
        <p className="text-muted">{t.instruction}</p>
        <p className="mt-2 text-sm text-muted">{t.stillOpen}</p>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {round.players.map((player) => (
          <li key={player.id}>
            <button
              type="button"
              onClick={() => setOpenPlayerId(player.id)}
              className="flex w-full items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-5 text-left transition-colors hover:bg-surface-hover"
            >
              <span className="min-w-0 flex-1 truncate font-medium">
                {player.name}
              </span>
              {player.seenWord && (
                <span aria-hidden="true" className="shrink-0 text-muted">
                  ✓
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* A plain counter, never styled as a warning: starting before everyone
          has looked is allowed, and the accent colour means "something is
          wrong" everywhere else in the app. */}
      <p aria-live="polite" className="text-sm text-muted">
        {format(t.progress, { seen: seenCount, total: round.players.length })}
      </p>

      <div className="mt-auto flex flex-col gap-3 sm:flex-row-reverse">
        <button
          type="button"
          onClick={onStart}
          className="flex-1 rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          {t.start}
        </button>
        <button
          type="button"
          onClick={onReDeal}
          className="rounded-2xl border border-border px-6 py-5 font-medium transition-colors hover:bg-surface-hover sm:flex-1"
        >
          {t.reDeal}
        </button>
      </div>

      {openPlayer && (
        <WordSheet
          dict={dict}
          player={openPlayer}
          onHeld={() => onSeen(openPlayer.id)}
          onClose={() => setOpenPlayerId(null)}
        />
      )}
    </>
  );
}

function WordSheet({
  dict,
  player,
  onHeld,
  onClose,
}: {
  dict: Dictionary["play"];
  player: Player;
  onHeld: () => void;
  onClose: () => void;
}) {
  const t = dict.reveal;
  const [holding, setHolding] = useState(false);

  return (
    <div className="fixed inset-0 z-10 flex flex-col bg-background p-6 sm:p-8">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6">
        <h2 className="text-center text-2xl font-semibold">{player.name}</h2>

        <button
          type="button"
          // Pointer events cover both a finger and a mouse, so holding works
          // the same on a phone and on a desktop.
          onPointerDown={() => {
            setHolding(true);
            onHeld();
          }}
          onPointerUp={() => setHolding(false)}
          onPointerLeave={() => setHolding(false)}
          onPointerCancel={() => setHolding(false)}
          onContextMenu={(event) => event.preventDefault()}
          className="flex flex-1 touch-none select-none flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-surface p-6 text-center"
        >
          {holding ? (
            <>
              <span className="text-sm uppercase tracking-wide text-muted">
                {dict.roleNames[player.role]}
              </span>
              {player.word ? (
                <>
                  <span className="text-4xl font-bold break-words">
                    {player.word}
                  </span>
                  <span className="text-sm text-muted">{t.yourWord}</span>
                </>
              ) : (
                <>
                  <span className="text-5xl font-bold">???</span>
                  <span className="max-w-xs text-sm text-muted">
                    {t.noWord}
                  </span>
                </>
              )}
            </>
          ) : (
            <span className="text-lg font-medium text-muted">{t.hold}</span>
          )}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl bg-accent px-6 py-5 text-lg font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}
