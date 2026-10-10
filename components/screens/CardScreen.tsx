"use client";

import { useState } from "react";
import Magnifier from "@/components/ui/Magnifier";
import Press from "@/components/ui/Press";
import Screen from "@/components/ui/Screen";
import Stamp from "@/components/ui/Stamp";
import { challengeReward } from "@/lib/drink";
import type { Player } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Props = {
  dict: Dictionary;
  player: Player;
  onSeen: () => void;
  onClose: () => void;
};

/**
 * The file card. Holding it down opens a circle of light under your finger;
 * letting go snaps it shut. The civilian and the undercover see exactly the
 * same screen with a different word — only Mr. White is told his role.
 */
export default function CardScreen({ dict, player, onSeen, onClose }: Props) {
  const t = dict.card;
  const [holding, setHolding] = useState(false);
  const [at, setAt] = useState({ x: 0, y: 0 });

  function down(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is a nicety; without it the hold still works.
    }
    const box = event.currentTarget.getBoundingClientRect();
    setAt({ x: event.clientX - box.left, y: event.clientY - box.top });
    setHolding(true);
  }

  function up() {
    if (!holding) return;
    setHolding(false);
    onSeen();
  }

  return (
    <Screen
      label={t.kicker}
      narrow
      duration={0.4}
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
    >
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
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
            fontSize: 34,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {player.name}
        </h2>
      </div>

      <div
        onPointerDown={down}
        onPointerUp={up}
        onPointerLeave={up}
        onPointerCancel={up}
        onContextMenu={(event) => event.preventDefault()}
        style={{
          flex: 1,
          minHeight: 440,
          position: "relative",
          border: "3px solid #0d0d0d",
          background: "var(--card)",
          color: "#0d0d0d",
          boxShadow: "8px 8px 0 #FFD23F",
          touchAction: "none",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 31px, rgba(13,13,13,.09) 31px 32px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 26,
            padding: 24,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <Magnifier
            variant="lens"
            style={{ animation: "wobble 2.6s ease-in-out infinite" }}
          />
          <div
            style={{
              fontFamily: ARCHIVO,
              fontSize: 26,
              textTransform: "uppercase",
              lineHeight: 1.05,
            }}
          >
            {t.hold}
          </div>
          <div style={{ fontSize: 15, maxWidth: 240, lineHeight: 1.4 }}>
            {format(t.holdSub, { name: player.name })}
          </div>
          <Stamp fontSize={22} rotate={-8} delay={null}>
            {t.topSecret}
          </Stamp>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `circle(${holding ? 1100 : 0}px at ${at.x}px ${at.y}px)`,
            transition: `clip-path ${
              holding ? ".55s" : ".18s"
            } cubic-bezier(.3,.9,.4,1)`,
            background: player.role === "white" ? "#FF3D3D" : "#FFD23F",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            padding: 24,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {player.role === "white" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {t.youAre}
              </div>
              <div
                style={{
                  fontFamily: ARCHIVO,
                  fontSize: "clamp(46px, 13vw, 66px)",
                  lineHeight: 0.95,
                  textTransform: "uppercase",
                }}
              >
                {t.whiteTop}
                <br />
                {t.whiteBottom}
              </div>
              <div
                style={{
                  fontSize: 17,
                  maxWidth: 260,
                  lineHeight: 1.4,
                  fontWeight: 700,
                }}
              >
                {t.whiteNote}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {t.yourWord}
              </div>
              <div
                style={{
                  fontFamily: ARCHIVO,
                  fontSize: "clamp(30px, 11vw, 64px)",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  wordBreak: "break-word",
                  background: "var(--bg)",
                  color: "var(--fg)",
                  padding: "10px 18px",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  transform: "rotate(-2deg)",
                }}
              >
                {player.word}
              </div>
              <div
                style={{
                  fontSize: 15,
                  maxWidth: 260,
                  lineHeight: 1.4,
                  fontWeight: 700,
                }}
              >
                {t.wordNote}
              </div>
            </div>
          )}

          {/*
            Inside the torchlight with the word, as the design has it. A
            challenge everyone can read is not a challenge: the whole thing
            rests on nobody knowing what you are steering towards.
          */}
          {player.challenge !== null && (
            <div
              style={{
                marginTop: 10,
                width: "100%",
                maxWidth: 320,
                boxSizing: "border-box",
                background: "#0d0d0d",
                color: "#F3F0E8",
                padding: "14px 16px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                transform: "rotate(1deg)",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#FFD23F",
                  fontWeight: 700,
                }}
              >
                {dict.drink.challengeKicker}
              </span>
              <span
                style={{
                  fontFamily: ARCHIVO,
                  fontSize: 19,
                  textTransform: "uppercase",
                }}
              >
                {
                  dict.drink.challenges[
                    String(
                      player.challenge
                    ) as keyof typeof dict.drink.challenges
                  ].t
                }
              </span>
              <span style={{ fontSize: 14, lineHeight: 1.4 }}>
                {
                  dict.drink.challenges[
                    String(
                      player.challenge
                    ) as keyof typeof dict.drink.challenges
                  ].d
                }
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#FFD23F" }}>
                {format(dict.drink.challengeHint, {
                  n: challengeReward(player.challenge),
                })}
              </span>
            </div>
          )}
        </div>
      </div>

      <Press
        onClick={onClose}
        style={{
          fontFamily: ARCHIVO,
          fontSize: 19,
          textTransform: "uppercase",
          background: "#FFD23F",
          color: "#0d0d0d",
          border: "3px solid #0d0d0d",
          padding: 17,
          boxShadow: "6px 6px 0 var(--fg)",
          cursor: "pointer",
        }}
        press={{
          transform: "translate(5px,5px)",
          boxShadow: "1px 1px 0 var(--fg)",
        }}
      >
        {t.close}
      </Press>
    </Screen>
  );
}
