"use client";

import BrutalButton from "@/components/ui/BrutalButton";
import ScanLines from "@/components/ui/ScanLines";
import type { Player, Role } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  player: Player;
  index: number;
  /** Whether a voted-out Mr. White still gets his guess. */
  mrWhiteGuesses: boolean;
  onContinue: () => void;
};

const ROLE_COLOUR: Record<Role, string> = {
  civilian: "#f2efe6",
  undercover: "#f5d90a",
  mrwhite: "#e8322b",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function ElimScreen({
  dict,
  player,
  index,
  mrWhiteGuesses,
  onContinue,
}: Props) {
  const t = dict.elim;
  const toGuess = player.role === "mrwhite" && mrWhiteGuesses;

  const verdict =
    player.role === "civilian"
      ? t.verdictCivilian
      : player.role === "undercover"
        ? format(t.verdictUndercover, { word: player.word ?? "" })
        : t.verdictMrWhite;

  return (
    <div className="flex flex-1 flex-col gap-[22px]">
      {/* The camera flash. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] bg-white"
        style={{ animation: "flash .7s ease-out both" }}
      />

      <div
        className="font-type text-center text-[14px] text-tag"
        style={{ letterSpacing: ".25em" }}
      >
        {t.banner}
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div
          className="sheet relative w-full overflow-hidden px-5 pt-10 pb-[70px] text-center"
          style={{ boxShadow: "10px 10px 0 var(--pop)" }}
        >
          <ScanLines spacing={30} opacity={0.13} />

          <div
            className="font-type relative text-[14px]"
            style={{ letterSpacing: ".2em" }}
          >
            {format(t.suspect, { num: pad(index + 1) })}
          </div>
          <div className="font-display relative mt-[10px] mb-10 text-[50px] leading-[1.05] break-words">
            {player.name}
          </div>

          <div className="relative flex justify-center">
            <div
              className="font-display border-[5px] border-ink px-5 py-2 text-[34px] text-ink"
              style={{
                background: ROLE_COLOUR[player.role],
                letterSpacing: ".06em",
                boxShadow: "5px 5px 0 #0e0e0e",
                animation: "stamp .55s .45s cubic-bezier(.3,1.4,.5,1) both",
              }}
            >
              {dict.roleNames[player.role]}
            </div>
          </div>

          <div
            className="relative mt-[30px] text-[16px] font-bold"
            style={{ animation: "slideUp .4s 1s ease-out both" }}
          >
            {verdict}
          </div>
        </div>
      </div>

      <BrutalButton
        onClick={onContinue}
        className="h-[66px] text-[19px] tracking-[.05em]"
        style={{ animation: "slideUp .35s 1.1s ease-out both" }}
      >
        {toGuess ? t.mrWhiteGuesses : t.continue}
      </BrutalButton>
    </div>
  );
}
