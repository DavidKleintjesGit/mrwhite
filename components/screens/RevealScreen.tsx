"use client";

import { useState } from "react";
import BrutalButton from "@/components/ui/BrutalButton";
import Magnifier from "@/components/ui/Magnifier";
import ScanLines from "@/components/ui/ScanLines";
import type { Player } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  player: Player;
  index: number;
  onHeld: () => void;
  onDone: () => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The file card. Holding it down slides the confidential cover up and out of
 * the way; letting go drops it straight back.
 *
 * Note that only Mr. White is told his role. A civilian and an undercover see
 * the same screen with a different word, which is the point: the undercover
 * does not know they are the odd one out either.
 */
export default function RevealScreen({
  dict,
  player,
  index,
  onHeld,
  onDone,
}: Props) {
  const t = dict.reveal;
  const [holding, setHolding] = useState(false);

  return (
    <div className="flex flex-1 flex-col gap-[18px]">
      <div
        className="text-center"
        style={{ animation: "slideUp .35s ease-out both" }}
      >
        <div
          className="font-type text-[13px] text-tag"
          style={{ letterSpacing: ".18em" }}
        >
          {format(t.kicker, { num: pad(index + 1) })}
        </div>
        <div className="font-display text-[34px] leading-[1.05]">
          {player.name}
        </div>
      </div>

      <div
        onPointerDown={(event) => {
          event.preventDefault();
          setHolding(true);
        }}
        onPointerUp={() => {
          if (!holding) return;
          setHolding(false);
          onHeld();
        }}
        onPointerLeave={() => {
          if (!holding) return;
          setHolding(false);
          onHeld();
        }}
        onPointerCancel={() => setHolding(false)}
        onContextMenu={(event) => event.preventDefault()}
        className="sheet relative min-h-[400px] flex-1 touch-none overflow-hidden select-none"
        style={{ boxShadow: "8px 8px 0 var(--pop)", cursor: "pointer" }}
      >
        <ScanLines />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          {player.word === null ? (
            <>
              <div
                className="font-type text-[15px]"
                style={{ letterSpacing: ".25em" }}
              >
                {t.youAre}
              </div>
              <div
                className="font-display text-[52px] leading-none text-blood"
                style={{ textShadow: "4px 4px 0 #0e0e0e" }}
              >
                {t.mrWhite}
              </div>
              <div className="max-w-[260px] text-[16px] text-pretty">
                {t.mrWhiteNote}
              </div>
            </>
          ) : (
            <>
              <div
                className="font-type text-[15px]"
                style={{ letterSpacing: ".25em" }}
              >
                {t.yourWord}
              </div>
              <div
                className="font-display border-[3px] border-ink bg-evidence px-4 py-[6px] text-[54px] leading-none break-words"
                style={{ transform: "rotate(-2deg)" }}
              >
                {player.word}
              </div>
              <div className="max-w-[260px] text-[15px] text-[#4a4842] text-pretty">
                {t.wordNote}
              </div>
            </>
          )}
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-[26px] text-paper"
          style={{
            background: "#161616",
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.09) 1.2px,transparent 1.5px)",
            backgroundSize: "7px 7px",
            borderBottom: "6px solid #e8322b",
            transform: holding ? "translateY(-92%)" : "translateY(0)",
            transition: "transform .38s cubic-bezier(.2,1.4,.4,1)",
          }}
        >
          <div
            className="font-display absolute text-center text-[30px] text-blood opacity-90"
            style={{
              top: 26,
              left: -10,
              right: -10,
              letterSpacing: ".12em",
              borderTop: "4px solid #e8322b",
              borderBottom: "4px solid #e8322b",
              transform: "rotate(-8deg)",
              padding: "4px 0",
            }}
          >
            {t.confidential}
          </div>

          <Magnifier
            size={120}
            rim="#f2efe6"
            style={{ animation: "wobble 2.4s ease-in-out infinite" }}
          />

          <div
            className="font-display text-[20px]"
            style={{ letterSpacing: ".12em", animation: "blink 1.1s infinite" }}
          >
            {t.hold}
          </div>

          <div
            className="font-type absolute bottom-[18px] text-[12px] text-dim"
            style={{ letterSpacing: ".2em" }}
          >
            {t.personal}
          </div>
        </div>
      </div>

      <BrutalButton
        onClick={onDone}
        className="h-16 text-[20px] tracking-[.06em]"
      >
        {t.done}
      </BrutalButton>
    </div>
  );
}
