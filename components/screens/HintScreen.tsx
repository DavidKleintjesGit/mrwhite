"use client";

import BrutalButton from "@/components/ui/BrutalButton";
import ClueTimer from "@/components/ui/ClueTimer";
import type { Game } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  game: Game;
  order: number[];
  index: number;
  /** Seconds per clue, or 0 for no timer. */
  timer: number;
  notes: Record<string, string>;
  onNote: (key: string, value: string) => void;
  onNext: () => void;
  onVote: () => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

export const noteKey = (round: number, player: number) => `${round}-${player}`;

export default function HintScreen({
  dict,
  game,
  order,
  index,
  timer,
  notes,
  onNote,
  onNext,
  onVote,
}: Props) {
  const t = dict.hint;
  const speaker = game.players[order[index]];
  const isLast = index >= order.length - 1;
  const key = noteKey(game.round, order[index]);


  return (
    <div className="flex flex-1 flex-col gap-[18px]">
      <div
        className="flex items-end justify-between"
        style={{ animation: "slideUp .35s ease-out both" }}
      >
        <div>
          <div
            className="font-type text-[13px] text-tag"
            style={{ letterSpacing: ".18em" }}
          >
            {format(t.kicker, { number: game.round })}
          </div>
          <div className="font-display text-[30px] leading-none">{t.title}</div>
        </div>
        <div className="font-display text-[18px] text-dim">
          {index + 1}/{order.length}
        </div>
      </div>

      <div
        className="sheet relative px-5 py-[22px] text-center"
        style={{
          boxShadow: "8px 8px 0 #e8322b",
          animation: "popIn .4s ease-out both",
        }}
        key={index}
      >
        <div
          className="font-type text-[14px] text-[#5d5a53]"
          style={{ letterSpacing: ".25em" }}
        >
          {t.speaking}
        </div>
        <div className="font-display my-[6px] mt-2 text-[46px] leading-[1.05] break-words">
          {speaker.name}
        </div>
        <div className="text-[15px]">{t.instruction}</div>

        {timer > 0 && (
          <ClueTimer key={index} seconds={timer} timeUpLabel={t.timeUp} />
        )}
      </div>

      {/* A notepad page: red margin rule, blue feint lines, written in marker. */}
      <div
        className="relative border-[3px] border-ink pt-[10px] pr-[14px] pb-2 pl-[46px] text-ink"
        style={{
          background: "#fffdf6",
          boxShadow: "5px 5px 0 var(--soft)",
          backgroundImage:
            "linear-gradient(to right,transparent 32px,#e8322b 32px,#e8322b 34px,transparent 34px),repeating-linear-gradient(to bottom,transparent 0 35px,#c7d3e6 35px 36px)",
          transform: "rotate(-.6deg)",
        }}
      >
        <div
          className="font-type text-[12px] text-[#5d5a53]"
          style={{ letterSpacing: ".15em" }}
        >
          {format(t.noteLabel, { name: speaker.name })}
        </div>
        <input
          type="text"
          value={notes[key] ?? ""}
          onChange={(event) => onNote(key, event.target.value)}
          placeholder={t.notePlaceholder}
          aria-label={format(t.noteLabel, { name: speaker.name })}
          className="font-marker h-10 w-full border-none bg-transparent text-[22px] text-marker outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        {order.map((playerIndex, position) => {
          const state =
            position < index ? "done" : position === index ? "current" : "next";
          return (
            <div
              key={playerIndex}
              className="flex items-center gap-3 px-3 py-[10px] text-[17px] font-bold"
              style={{
                border: `2px solid ${state === "current" ? "#0e0e0e" : "var(--soft)"}`,
                background: state === "current" ? "#f5d90a" : "transparent",
                color: state === "current" ? "#0e0e0e" : "var(--fg)",
                opacity: state === "done" ? 0.55 : 1,
              }}
            >
              <div className="font-display w-7">
                {state === "done" ? "✓" : state === "current" ? "▸" : pad(position + 1)}
              </div>
              <div className="min-w-0 flex-1">
                {game.players[playerIndex].name}
              </div>
              <div className="font-marker max-w-[55%] truncate text-[16px] font-normal">
                {notes[noteKey(game.round, playerIndex)] ?? ""}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto grid grid-cols-[1fr_1.4fr] gap-[14px] pt-3">
        <BrutalButton
          variant="outline"
          shadow="var(--soft)"
          depth={5}
          onClick={onVote}
          className="h-16 text-[14px]"
        >
          {t.toVote}
        </BrutalButton>
        <BrutalButton onClick={onNext} className="h-16 text-[17px]">
          {isLast ? t.last : t.next}
        </BrutalButton>
      </div>
    </div>
  );
}
