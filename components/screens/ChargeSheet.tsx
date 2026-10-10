"use client";

import { useEffect, useState } from "react";
import Press from "@/components/ui/Press";
import { challengeReward } from "@/lib/drink";
import type { Player } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";
const MARKER = "var(--font-permanent-marker), cursive";

type Props = {
  dict: Dictionary;
  players: Player[];
  onViolation: (index: number) => void;
  onChallengeDone: (index: number) => void;
  onClose: () => void;
};

/**
 * The charge sheet: who owes what, taken from the design's own markup.
 *
 * It records what the table already decided. Nothing here enforces a rule —
 * the app cannot hear anyone — so every button is somebody tapping "yes,
 * that happened".
 */
export default function ChargeSheet({
  dict,
  players,
  onViolation,
  onChallengeDone,
  onClose,
}: Props) {
  const t = dict.drink;
  const [flash, setFlash] = useState<{ index: number; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!flash) return;
    const timer = setTimeout(() => setFlash(null), 1400);
    return () => clearTimeout(timer);
  }, [flash]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(13,13,13,.82)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "screenIn .25s both",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.sheetAsk}
        onClick={(event) => event.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 640,
          maxHeight: "calc(100dvh - 40px)",
          boxSizing: "border-box",
          background: "#F3F0E8",
          color: "#0d0d0d",
          border: "4px solid #0d0d0d",
          boxShadow: "10px 10px 0 #FF3D3D",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -18,
            left: 18,
            fontFamily: MARKER,
            fontSize: 18,
            background: "#FF3D3D",
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            padding: "1px 12px",
            transform: "rotate(-4deg)",
          }}
        >
          {t.sheetTag}
        </div>

        <div
          style={{
            padding: "34px 24px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            borderBottom: "3px solid #0d0d0d",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: ARCHIVO,
              fontSize: 26,
              textTransform: "uppercase",
              lineHeight: 1.05,
            }}
          >
            {t.sheetAsk}
          </h3>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45 }}>
            {t.sheetIntro}
          </p>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {players.map((player, index) => {
            const reward = player.challenge
              ? challengeReward(player.challenge)
              : 0;
            const challengeText = player.challengeDone
              ? `${
                  player.challenge
                    ? t.challenges[
                        String(player.challenge) as keyof typeof t.challenges
                      ].t
                    : ""
                } ✓`
              : player.alive
              ? t.challengeSecret
              : t.challengeLapsed;

            return (
              <div
                key={`${player.name}-${index}`}
                style={{
                  position: "relative",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px 14px",
                  border: "3px solid #0d0d0d",
                  background: player.challengeDone ? "#E4F8FF" : "#F3F0E8",
                  padding: "12px 14px",
                  opacity: player.alive ? 1 : 0.5,
                }}
              >
                <div
                  style={{
                    flex: "1 1 160px",
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: ARCHIVO,
                      fontSize: 17,
                      textTransform: "uppercase",
                      textDecoration: player.alive ? "none" : "line-through",
                      wordBreak: "break-word",
                    }}
                  >
                    {player.name}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>
                    {format(player.sips === 1 ? t.sip : t.sips, {
                      n: player.sips,
                    })}
                  </span>
                  <span style={{ fontSize: 13 }}>
                    {format(t.challengeLabel, { t: challengeText })}
                  </span>
                </div>

                {player.alive && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Press
                      onClick={() => {
                        onViolation(index);
                        setFlash({ index, text: t.violationFlash });
                      }}
                      style={{
                        fontFamily: ARCHIVO,
                        fontSize: 12,
                        textTransform: "uppercase",
                        background: "#FF3D3D",
                        color: "#0d0d0d",
                        border: "2px solid #0d0d0d",
                        padding: "10px 12px",
                        boxShadow: "3px 3px 0 #0d0d0d",
                        cursor: "pointer",
                      }}
                      press={{
                        transform: "translate(2px,2px)",
                        boxShadow: "1px 1px 0 #0d0d0d",
                      }}
                    >
                      {t.violation}
                    </Press>

                    {!player.challengeDone && (
                      <Press
                        onClick={() => {
                          onChallengeDone(index);
                          setFlash({
                            index,
                            text: format(t.challengeHandOut, { n: reward }),
                          });
                        }}
                        style={{
                          fontFamily: ARCHIVO,
                          fontSize: 12,
                          textTransform: "uppercase",
                          background: "#3DD6FF",
                          color: "#0d0d0d",
                          border: "2px solid #0d0d0d",
                          padding: "10px 12px",
                          boxShadow: "3px 3px 0 #0d0d0d",
                          cursor: "pointer",
                        }}
                        press={{
                          transform: "translate(2px,2px)",
                          boxShadow: "1px 1px 0 #0d0d0d",
                        }}
                      >
                        {t.challengeDone}
                      </Press>
                    )}
                  </div>
                )}

                {flash?.index === index && (
                  <span
                    aria-live="polite"
                    style={{
                      position: "absolute",
                      right: 12,
                      top: -12,
                      display: "inline-block",
                      fontFamily: ARCHIVO,
                      fontSize: 13,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      lineHeight: 1,
                      color: "#E8202A",
                      border: "5px double #E8202A",
                      padding: "6px 10px",
                      background: "#F3F0E8",
                      transform: "rotate(-8deg)",
                      animation: "stampIn .4s both",
                      pointerEvents: "none",
                    }}
                  >
                    {flash.text}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            padding: "16px 24px 20px",
            borderTop: "3px solid #0d0d0d",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Press
            onClick={onClose}
            style={{
              width: "100%",
              maxWidth: 260,
              fontFamily: ARCHIVO,
              fontSize: 17,
              textTransform: "uppercase",
              background: "#FFD23F",
              color: "#0d0d0d",
              border: "3px solid #0d0d0d",
              padding: 14,
              boxShadow: "4px 4px 0 #0d0d0d",
              cursor: "pointer",
            }}
            press={{
              transform: "translate(3px,3px)",
              boxShadow: "1px 1px 0 #0d0d0d",
            }}
          >
            {t.close}
          </Press>
        </div>
      </div>
    </div>
  );
}
