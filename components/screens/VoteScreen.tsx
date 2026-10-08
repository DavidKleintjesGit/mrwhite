"use client";

import ScanLines from "@/components/ui/ScanLines";
import type { Game, Role } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";
import { noteKey } from "@/components/screens/HintScreen";

type Props = {
  dict: Dictionary;
  game: Game;
  notes: Record<string, string>;
  onPick: (index: number) => void;
};

const ROLE_COLOUR: Record<Role, string> = {
  civilian: "#f2efe6",
  undercover: "#f5d90a",
  mrwhite: "#e8322b",
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Every clue noted for this player, oldest round first. */
function notesFor(
  notes: Record<string, string>,
  playerIndex: number,
  rounds: number,
): string {
  return Array.from({ length: rounds }, (_, round) =>
    (notes[noteKey(round + 1, playerIndex)] ?? "").trim(),
  )
    .filter(Boolean)
    .map((note) => `“${note}”`)
    .join(" ");
}

export default function VoteScreen({ dict, game, notes, onPick }: Props) {
  const t = dict.vote;

  return (
    <div className="flex flex-1 flex-col gap-[18px]">
      <div style={{ animation: "slideUp .35s ease-out both" }}>
        <div
          className="font-type text-[13px] text-tag"
          style={{ letterSpacing: ".18em" }}
        >
          {format(t.kicker, { number: game.round })}
        </div>
        <div className="font-display text-[32px] leading-none">{t.title}</div>
      </div>

      <p className="m-0 text-[15px] text-muted text-pretty">{t.instruction}</p>

      <div className="grid grid-cols-2 gap-4">
        {game.players.map((player, index) => (
          <button
            key={index}
            type="button"
            disabled={!player.alive}
            onClick={() => onPick(index)}
            className="sheet relative flex min-h-[120px] flex-col justify-between gap-1 overflow-hidden px-[14px] py-3 text-left"
            style={{
              boxShadow: "5px 5px 0 var(--soft)",
              opacity: player.alive ? 1 : 0.55,
              cursor: player.alive ? "pointer" : "default",
              transition: "transform .12s",
            }}
          >
            <ScanLines spacing={20} opacity={0.1} />
            <div
              className="font-type relative text-[12px] text-[#5d5a53]"
              style={{ letterSpacing: ".15em" }}
            >
              {format(t.suspect, { num: pad(index + 1) })}
            </div>
            <div className="font-display relative truncate text-[21px] leading-[1.05]">
              {player.name}
            </div>
            <div className="font-marker relative min-h-[17px] truncate text-[14px] leading-[1.2] text-marker">
              {notesFor(notes, index, game.round)}
            </div>

            {!player.alive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="font-display border-[3px] border-ink px-[10px] py-1 text-[13px] text-ink"
                  style={{
                    background: ROLE_COLOUR[player.role],
                    letterSpacing: ".1em",
                    transform: "rotate(-12deg)",
                  }}
                >
                  {dict.roleNames[player.role]}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
