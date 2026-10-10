"use client";

import { useEffect, useState } from "react";
import Magnifier from "@/components/ui/Magnifier";
import Press from "@/components/ui/Press";
import Screen from "@/components/ui/Screen";
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
            gap: 22,
            padding: "10px 0",
          }}
        >
          <div
            style={{
              fontFamily: ARCHIVO,
              // "Mr. White" is half again as wide as "Burger", and the block
              // ends up rotated, so it needs room to shrink on a phone or it
              // bleeds off both edges.
              fontSize: "clamp(26px, 9.5vw, 58px)",
              textTransform: "uppercase",
              lineHeight: 1,
              color: "#0d0d0d",
              background: ROLE_COLOUR[player.role],
              border: "4px solid #0d0d0d",
              boxShadow: "8px 8px 0 var(--fg)",
              padding: "14px 22px",
              maxWidth: "100%",
              boxSizing: "border-box",
              animation: "stampIn .55s both",
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
                display: "flex",
                flexDirection: "column",
                gap: 6,
                alignItems: "center",
                background: drinkers.length ? "#FF3D3D" : "var(--off)",
                color: drinkers.length ? "#0d0d0d" : "var(--offfg)",
                border: `3px ${
                  drinkers.length ? "solid #0d0d0d" : "dashed var(--offfg)"
                }`,
                padding: "14px 16px",
                maxWidth: 360,
                animation: "screenIn .4s .55s both",
              }}
            >
              <span
                style={{
                  fontFamily: ARCHIVO,
                  fontSize: 18,
                  textTransform: "uppercase",
                }}
              >
                {drinkers.length
                  ? dict.drink.resultDrink
                  : dict.drink.resultDry}
              </span>
              <span style={{ fontSize: 15, lineHeight: 1.4 }}>
                {player.role !== "burger"
                  ? dict.drink.resultInfiltrant
                  : drinkers.length
                  ? dict.drink.resultBurger
                  : dict.drink.resultNobody}
              </span>
              {drinkers.length > 0 && (
                <span style={{ fontSize: 15, fontWeight: 700 }}>
                  {drinkers.join(" · ")}
                </span>
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
