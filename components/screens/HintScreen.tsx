"use client";

import { useEffect, useRef, useState } from "react";
import Press from "@/components/ui/Press";
import Screen, { FooterPair } from "@/components/ui/Screen";
import type { Player } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Props = {
  dict: Dictionary;
  players: Player[];
  order: number[];
  turn: number;
  round: number;
  /** Seconds per clue, or 0 for no timer. */
  timer: number;
  dark: boolean;
  onNext: () => void;
  onVote: () => void;
};

export default function HintScreen({
  dict,
  players,
  order,
  turn,
  round,
  timer,
  dark,
  onNext,
  onVote,
}: Props) {
  const t = dict.hint;
  const speaker = players[order[turn]];
  const last = turn >= order.length - 1;

  return (
    <Screen
      label={format(t.title, { n: round })}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {t.kicker}
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: ARCHIVO,
              fontSize: 30,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {format(t.title, { n: round })}
          </h2>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>
          {turn + 1} / {order.length}
        </div>
      </div>

      {/* A one-item list keyed on the turn, so each speaker pops in afresh.
          A bare key on a static child leaves the previous card in the DOM. */}
      {[turn].map((current) => (
      <div
        key={current}
        style={{
          position: "relative",
          background: "var(--card)",
          color: "#0d0d0d",
          border: "3px solid #0d0d0d",
          boxShadow: "8px 8px 0 #FFD23F",
          padding: "30px 20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
          animation: "popIn .45s both",
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          {t.speaking}
        </div>
        <div
          style={{
            fontFamily: ARCHIVO,
            fontSize: "clamp(32px, 13vw, 64px)",
            lineHeight: 1,
            textTransform: "uppercase",
            wordBreak: "break-word",
            maxWidth: "100%",
          }}
        >
          {speaker.name}
        </div>
        <div style={{ fontSize: 16, maxWidth: 280, lineHeight: 1.4 }}>
          {t.instruction}
        </div>
        {current === 0 && (
          <div
            style={{
              position: "absolute",
              top: -16,
              right: -8,
              fontFamily: "var(--font-permanent-marker), cursive",
              background: "#FF3D3D",
              color: "#0d0d0d",
              border: "3px solid #0d0d0d",
              padding: "2px 10px",
              transform: "rotate(8deg)",
              fontSize: 16,
            }}
          >
            {t.begins}
          </div>
        )}
      </div>
      ))}

      {timer > 0 && <ClueTimer key={turn} seconds={timer} dark={dark} />}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {order.map((playerIndex, position) => {
          const done = position < turn;
          const now = position === turn;
          return (
            <span
              key={playerIndex}
              style={{
                padding: "6px 10px",
                border: "2px solid var(--fg)",
                fontSize: 14,
                fontWeight: 700,
                background: now ? "#FFD23F" : done ? "transparent" : "var(--bg)",
                color: now ? "#0d0d0d" : done ? "var(--muted)" : "var(--fg)",
                textDecoration: done ? "line-through" : "none",
              }}
            >
              {players[playerIndex].name}
            </span>
          );
        })}
      </div>

      <FooterPair>
        <Press
          onClick={onVote}
          style={{
            fontFamily: ARCHIVO,
            fontSize: 15,
            textTransform: "uppercase",
            background: "var(--bg)",
            color: "var(--fg)",
            border: "3px solid var(--fg)",
            padding: "16px 8px",
            boxShadow: "5px 5px 0 #FF3D3D",
            cursor: "pointer",
          }}
          press={{
            transform: "translate(4px,4px)",
            boxShadow: "1px 1px 0 #FF3D3D",
          }}
        >
          {t.voteNow}
        </Press>
        <Press
          onClick={onNext}
          style={{
            fontFamily: ARCHIVO,
            fontSize: 17,
            textTransform: "uppercase",
            background: "#FFD23F",
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            padding: "16px 8px",
            boxShadow: "6px 6px 0 var(--fg)",
            cursor: "pointer",
          }}
          press={{
            transform: "translate(5px,5px)",
            boxShadow: "1px 1px 0 var(--fg)",
          }}
        >
          {last ? t.toVote : t.next}
        </Press>
      </FooterPair>
    </Screen>
  );
}

/**
 * Counts one clue down. The parent gives it a fresh key per speaker, so the
 * clock resets by remounting rather than by writing state from an effect.
 */
function ClueTimer({ seconds, dark }: { seconds: number; dark: boolean }) {
  const [left, setLeft] = useState(seconds);
  const handle = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    handle.current = setInterval(() => {
      setLeft((current) => {
        if (current <= 1) {
          if (handle.current) clearInterval(handle.current);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => {
      if (handle.current) clearInterval(handle.current);
    };
  }, []);

  const colour = left <= 5 ? "#FF3D3D" : dark ? "#FFD23F" : "#0d0d0d";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 18, border: "3px solid var(--fg)" }}>
        <div
          style={{
            height: "100%",
            width: `${Math.round((left / seconds) * 100)}%`,
            background: colour,
            transition: "width 1s linear, background .3s",
          }}
        />
      </div>
      <div
        style={{
          width: 56,
          textAlign: "right",
          fontFamily: ARCHIVO,
          fontSize: 26,
          color: colour,
        }}
      >
        {left}
      </div>
    </div>
  );
}
