"use client";

import { useEffect, useState } from "react";
import Magnifier from "@/components/ui/Magnifier";
import Press from "@/components/ui/Press";
import Screen from "@/components/ui/Screen";
import Stamp from "@/components/ui/Stamp";
import type { Player, Role } from "@/lib/game";
import type { Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

/** How long the magnifier scans before the role stamps down. */
const INVESTIGATION_MS = 1600;

const ROLE_COLOUR: Record<Role, string> = {
  burger: "#F3F0E8",
  undercover: "#3DD6FF",
  white: "#FF3D3D",
};

type Props = {
  dict: Dictionary;
  player: Player;
  mrGuess: boolean;
  /**
   * Who drinks for this vote, by name. Empty in the classic game, and also
   * empty when the table got it right — an infiltrator costs nobody a sip.
   */
  drinkers?: string[];
  /** True only in the Drinking Edition, where the verdict is worth spelling out. */
  showDrinks?: boolean;
  onContinue: () => void;
};

export default function UnmaskScreen({
  dict,
  player,
  mrGuess,
  drinkers = [],
  showDrinks = false,
  onContinue,
}: Props) {
  const t = dict.unmask;
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => setDone(true), INVESTIGATION_MS);
    return () => clearTimeout(handle);
  }, []);

  const line =
    player.role === "burger"
      ? t.lineBurger
      : player.role === "undercover"
      ? t.lineUndercover
      : t.lineWhite;

  return (
    <Screen
      label={t.kicker}
      narrow
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 22,
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 13,
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
          fontSize: "clamp(32px, 13vw, 66px)",
          textTransform: "uppercase",
          lineHeight: 1,
          wordBreak: "break-word",
        }}
      >
        {player.name}
      </h2>

      {done ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            gap: 28,
            padding: "18px 0 0",
          }}
        >
          <div
            style={{
              fontFamily: ARCHIVO,
              // v3 shrank this itself: "Mr. White" is half again as wide as
              // "Burger" and the block is rotated, so on a phone the old
              // size bled off both edges.
              fontSize: "clamp(24px, 7.5vw, 54px)",
              textTransform: "uppercase",
              lineHeight: 1,
              color: "#0d0d0d",
              background: ROLE_COLOUR[player.role],
              border: "4px solid #0d0d0d",
              boxShadow: "6px 6px 0 var(--fg)",
              padding: "clamp(10px,2.5vw,14px) clamp(14px,4vw,22px)",
              overflowWrap: "anywhere",
              maxWidth: "100%",
              boxSizing: "border-box",
              transform: "rotate(-3deg)",
              animation: "stampSlam .55s cubic-bezier(.2,1.5,.35,1) both",
            }}
          >
            {dict.roles[player.role]}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              maxWidth: 320,
              lineHeight: 1.45,
              textWrap: "pretty",
              animation: "screenIn .4s .45s both",
            }}
          >
            {line}
          </p>

          {showDrinks && (
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "var(--card)",
                color: "#0d0d0d",
                border: "3px solid #0d0d0d",
                boxShadow: `6px 6px 0 ${
                  drinkers.length ? "#FF3D3D" : "var(--line)"
                }`,
                padding: 18,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                textAlign: "left",
                animation: "popIn .4s .5s both",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: ARCHIVO,
                    fontSize: 24,
                    textTransform: "uppercase",
                  }}
                >
                  {drinkers.length
                    ? dict.drink.resultDrink
                    : dict.drink.resultDry}
                </span>
                {drinkers.length > 0 && (
                  <Stamp fontSize={14} rotate={-8} delay={null}>
                    {dict.drink.cheers}
                  </Stamp>
                )}
              </div>

              <span style={{ fontSize: 15, lineHeight: 1.4 }}>
                {player.role !== "burger"
                  ? dict.drink.resultInfiltrant
                  : drinkers.length
                  ? dict.drink.resultBurger
                  : dict.drink.resultNobody}
              </span>

              {drinkers.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {drinkers.map((name) => (
                    <span
                      key={name}
                      style={{
                        fontFamily: ARCHIVO,
                        fontSize: 15,
                        textTransform: "uppercase",
                        background: "#FF3D3D",
                        border: "2px solid #0d0d0d",
                        padding: "6px 10px",
                      }}
                    >
                      {name} +1
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <Press
            onClick={onContinue}
            style={{
              width: "100%",
              fontFamily: ARCHIVO,
              fontSize: 19,
              textTransform: "uppercase",
              background: "#FFD23F",
              color: "#0d0d0d",
              border: "3px solid #0d0d0d",
              padding: 17,
              boxShadow: "6px 6px 0 var(--fg)",
              cursor: "pointer",
              animation: "screenIn .4s .7s both",
            }}
            press={{
              transform: "translate(5px,5px)",
              boxShadow: "1px 1px 0 var(--fg)",
            }}
          >
            {player.role === "white" && mrGuess ? t.toGuess : t.next}
          </Press>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            padding: "30px 0",
          }}
        >
          <Magnifier
            variant="outline"
            style={{ animation: "scan 1.3s ease-in-out infinite" }}
          />
          <div style={{ fontSize: 18, fontWeight: 700 }}>{t.investigating}</div>
        </div>
      )}
    </Screen>
  );
}
