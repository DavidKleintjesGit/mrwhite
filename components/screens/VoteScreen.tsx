"use client";

import Press from "@/components/ui/Press";
import Screen, { FooterPair } from "@/components/ui/Screen";
import Stamp from "@/components/ui/Stamp";
import type { Player } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Props = {
  dict: Dictionary;
  players: Player[];
  round: number;
  selected: number | null;
  onSelect: (index: number | null) => void;
  onAnotherRound: () => void;
  onUnmask: () => void;
};

export default function VoteScreen({
  dict,
  players,
  round,
  selected,
  onSelect,
  onAnotherRound,
  onUnmask,
}: Props) {
  const t = dict.vote;
  const alive = players.flatMap((player, index) =>
    player.alive ? [{ player, index }] : []
  );

  return (
    <Screen
      label={t.title}
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
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
          {format(t.kicker, { n: round })}
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
          {t.title}
        </h2>
      </div>

      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.4 }}>
        {t.instruction}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: 14,
        }}
      >
        {alive.map(({ player, index }) => {
          const on = selected === index;
          return (
            <Press
              key={index}
              onClick={() => onSelect(on ? null : index)}
              style={{
                position: "relative",
                fontFamily: "inherit",
                background: "var(--card)",
                color: "#0d0d0d",
                border: `4px solid ${on ? "#FF3D3D" : "#0d0d0d"}`,
                padding: 0,
                cursor: "pointer",
                boxShadow: `5px 5px 0 ${on ? "#FF3D3D" : "var(--line)"}`,
                transform: on ? "rotate(-2deg) scale(1.04)" : "none",
                transition:
                  "transform .2s cubic-bezier(.3,1.6,.5,1), box-shadow .2s",
                animation: "popIn .35s both",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: 104,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#d9d5ca",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent 0 19px, rgba(13,13,13,.25) 19px 20px)",
                }}
              >
                <span
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "var(--bg)",
                    color: "var(--fg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: ARCHIVO,
                    fontSize: 30,
                  }}
                >
                  {player.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div
                style={{
                  padding: "10px 8px",
                  fontFamily: ARCHIVO,
                  fontSize: 16,
                  textTransform: "uppercase",
                  wordBreak: "break-word",
                  borderTop: "3px solid #0d0d0d",
                }}
              >
                {player.name}
              </div>
              {on && (
                <Stamp
                  fontSize={17}
                  rotate={-11}
                  background="rgba(243,240,232,.75)"
                  style={{
                    position: "absolute",
                    top: 34,
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                    width: "max-content",
                  }}
                >
                  {t.stamp}
                </Stamp>
              )}
            </Press>
          );
        })}
      </div>

      <FooterPair>
        <Press
          onClick={onAnotherRound}
          style={{
            fontFamily: ARCHIVO,
            fontSize: 15,
            textTransform: "uppercase",
            background: "var(--bg)",
            color: "var(--fg)",
            border: "3px solid var(--fg)",
            padding: "16px 8px",
            boxShadow: "5px 5px 0 var(--line)",
            cursor: "pointer",
          }}
          press={{
            transform: "translate(4px,4px)",
            boxShadow: "1px 1px 0 var(--line)",
          }}
        >
          {t.anotherRound}
        </Press>

        {selected != null ? (
          <Press
            onClick={onUnmask}
            style={{
              fontFamily: ARCHIVO,
              fontSize: 16,
              textTransform: "uppercase",
              background: "#FF3D3D",
              color: "#0d0d0d",
              border: "3px solid #0d0d0d",
              padding: "16px 8px",
              boxShadow: "6px 6px 0 var(--fg)",
              cursor: "pointer",
              animation: "popIn .3s both",
            }}
            press={{
              transform: "translate(5px,5px)",
              boxShadow: "1px 1px 0 var(--fg)",
            }}
          >
            {format(t.unmask, { name: players[selected].name })}
          </Press>
        ) : (
          <button
            type="button"
            disabled
            style={{
              fontFamily: ARCHIVO,
              fontSize: 15,
              textTransform: "uppercase",
              background: "var(--off)",
              color: "var(--offfg)",
              border: "3px dashed var(--offfg)",
              padding: "16px 8px",
            }}
          >
            {t.pickFirst}
          </button>
        )}
      </FooterPair>
    </Screen>
  );
}
