"use client";

import BrutalButton from "@/components/ui/BrutalButton";
import ScreenHeader from "@/components/ui/ScreenHeader";
import type { Game } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  game: Game;
  onBack: () => void;
  onOpen: (index: number) => void;
  onDealAgain: () => void;
  onStart: () => void;
};

/** The files lie on the desk at slightly different angles. */
const TILTS = [-1.5, 1.2, -0.6, 1.8];

const pad = (n: number) => String(n).padStart(2, "0");

export default function DealScreen({
  dict,
  game,
  onBack,
  onOpen,
  onDealAgain,
  onStart,
}: Props) {
  const t = dict.deal;
  const seen = game.players.filter((player) => player.seen).length;
  const everyoneLooked = seen === game.players.length;

  return (
    <div className="flex flex-1 flex-col gap-[18px]">
      <ScreenHeader
        kicker={t.kicker}
        title={t.title}
        onBack={onBack}
        backLabel={dict.common.back}
      />

      <p className="m-0 text-[15px] leading-[1.45] text-muted text-pretty">
        {t.instructionBefore}{" "}
        <b className="text-paper">{t.instructionBold}</b> {t.instructionAfter}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {game.players.map((player, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onOpen(index)}
            className="sheet relative flex h-24 flex-col justify-between overflow-hidden px-[14px] py-3 text-left"
            style={{
              boxShadow: "5px 5px 0 var(--soft)",
              transform: `rotate(${TILTS[index % TILTS.length]}deg)`,
              transition: "transform .15s",
              cursor: "pointer",
            }}
          >
            <div
              className="font-type text-[12px] text-[#5d5a53]"
              style={{ letterSpacing: ".15em" }}
            >
              {format(t.dossier, { num: pad(index + 1) })}
            </div>
            <div className="font-display truncate text-[20px] leading-[1.05]">
              {player.name}
            </div>
            {player.seen && (
              <div
                className="font-display absolute bg-evidence px-[30px] py-[3px] text-[11px]"
                style={{
                  right: -26,
                  top: 14,
                  transform: "rotate(28deg)",
                  borderTop: "2px solid #0e0e0e",
                  borderBottom: "2px solid #0e0e0e",
                  letterSpacing: ".15em",
                  animation: "popIn .3s ease-out both",
                }}
              >
                {t.seen}
              </div>
            )}
          </button>
        ))}
      </div>

      <div
        className="font-type text-[14px] text-dim"
        style={{ letterSpacing: ".06em" }}
        aria-live="polite"
      >
        {format(t.progress, { seen, total: game.players.length })}
      </div>

      <div className="mt-auto grid grid-cols-[1fr_1.4fr] gap-[14px] pt-3">
        <BrutalButton
          variant="outline"
          shadow="var(--soft)"
          depth={5}
          onClick={onDealAgain}
          className="h-16 text-[14px]"
        >
          {t.again}
        </BrutalButton>
        <BrutalButton
          onClick={onStart}
          disabled={!everyoneLooked}
          className="h-16 text-[17px]"
          style={{ opacity: everyoneLooked ? 1 : 0.45 }}
        >
          {t.start}
        </BrutalButton>
      </div>
    </div>
  );
}
