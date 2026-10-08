"use client";

import Link from "next/link";
import BrutalButton from "@/components/ui/BrutalButton";
import type { Game, Outcome, Role } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  game: Game;
  outcome: Outcome;
  lang: string;
  onNewCase: () => void;
};

const ROLE_COLOUR: Record<Role, string> = {
  civilian: "#f2efe6",
  undercover: "#f5d90a",
  mrwhite: "#e8322b",
};

export default function EndScreen({
  dict,
  game,
  outcome,
  lang,
  onNewCase,
}: Props) {
  const t = dict.end;

  const banner = {
    civilians: { title: t.civiliansTitle, sub: t.civiliansSub, bg: "#f2efe6" },
    infiltrators: {
      title: t.infiltratorsTitle,
      sub: t.infiltratorsSub,
      bg: "#f5d90a",
    },
    mrwhite: { title: t.mrWhiteTitle, sub: t.mrWhiteSub, bg: "#e8322b" },
  }[outcome];

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="relative pt-[10px] text-center">
        <div
          className="font-type text-[14px] text-dim"
          style={{ letterSpacing: ".3em" }}
        >
          {format(t.after, { number: game.round })}
        </div>
        <div
          className="font-display mt-3 inline-block border-[5px] border-blood px-4 py-1 text-[40px] text-blood"
          style={{
            letterSpacing: ".06em",
            animation: "stamp .6s .1s cubic-bezier(.3,1.4,.5,1) both",
          }}
        >
          {t.closed}
        </div>
      </div>

      <div
        className="border-[3px] border-ink p-5 text-center text-ink"
        style={{
          background: banner.bg,
          boxShadow: "8px 8px 0 var(--pop)",
          animation: "popIn .5s .6s ease-out both",
        }}
      >
        <div className="font-display text-[32px] leading-[1.05]">
          {banner.title}
        </div>
        <div className="mt-[6px] text-[16px] font-bold">{banner.sub}</div>
      </div>

      <div
        className="grid grid-cols-2 gap-[14px]"
        style={{ animation: "slideUp .4s .8s ease-out both" }}
      >
        <div className="border-[3px] border-[var(--fg)] p-3 text-center">
          <div
            className="font-type text-[12px] text-dim"
            style={{ letterSpacing: ".15em" }}
          >
            {t.civilianWord}
          </div>
          <div className="font-display mt-1 text-[22px]">{game.wordA}</div>
        </div>
        <div className="border-[3px] border-tag p-3 text-center">
          <div
            className="font-type text-[12px] text-tag"
            style={{ letterSpacing: ".15em" }}
          >
            {t.undercoverWord}
          </div>
          <div className="font-display mt-1 text-[22px]">{game.wordB}</div>
        </div>
      </div>

      <ul
        className="flex flex-col gap-2"
        style={{ animation: "slideUp .4s .95s ease-out both" }}
      >
        {game.players.map((player, index) => (
          <li
            key={index}
            className="flex items-center gap-3 border-b-2 border-dashed border-[var(--soft)] px-3 py-2"
          >
            <div
              className="flex-1 text-[17px] font-bold"
              style={{ opacity: player.alive ? 1 : 0.5 }}
            >
              {player.name}
            </div>
            <div
              className="font-display border-2 border-[var(--fg)] px-2 py-[3px] text-[12px]"
              style={{
                background:
                  player.role === "civilian" ? "#0e0e0e" : ROLE_COLOUR[player.role],
                color: player.role === "civilian" ? "#f2efe6" : "#0e0e0e",
                letterSpacing: ".08em",
              }}
            >
              {dict.roleNames[player.role]}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-auto grid grid-cols-[1fr_1.4fr] gap-[14px] pt-3">
        <Link
          href={`/${lang}`}
          className="pressable font-display flex h-16 items-center justify-center border-[3px] border-[var(--fg)] bg-[var(--bg)] text-[14px] text-fg"
          style={{ boxShadow: "5px 5px 0 var(--soft)" }}
        >
          {t.menu}
        </Link>
        <BrutalButton onClick={onNewCase} className="h-16 text-[16px]">
          {t.again}
        </BrutalButton>
      </div>
    </div>
  );
}
