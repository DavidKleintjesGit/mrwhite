"use client";

import Press from "@/components/ui/Press";
import Screen, { FooterPair, Header } from "@/components/ui/Screen";
import Stamp from "@/components/ui/Stamp";
import type { Player } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Props = {
  dict: Dictionary;
  players: Player[];
  onBack: () => void;
  onOpen: (index: number) => void;
  onReshuffle: () => void;
  onStart: () => void;
};

export default function DealScreen({
  dict,
  players,
  onBack,
  onOpen,
  onReshuffle,
  onStart,
}: Props) {
  const t = dict.deal;
  const seen = players.filter((player) => player.seen).length;
  const allSeen = players.length > 0 && seen === players.length;
  const percent = players.length
    ? Math.round((seen / players.length) * 100)
    : 0;

  return (
    <Screen
      label={t.title}
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
    >
      <Header
        kicker={t.kicker}
        title={t.title}
        backLabel={dict.common.back}
        onBack={onBack}
      />

      <p
        style={{
          margin: 0,
          fontSize: 16,
          lineHeight: 1.45,
          textWrap: "pretty",
        }}
      >
        {t.instruction}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: "16px 12px",
          paddingTop: 10,
        }}
      >
        {players.map((player, index) => (
          <Press
            key={index}
            onClick={() => onOpen(index)}
            style={{
              position: "relative",
              textAlign: "left",
              fontFamily: "inherit",
              background: "var(--card)",
              color: "#0d0d0d",
              border: "3px solid #0d0d0d",
              padding: "22px 12px 14px",
              minHeight: 96,
              boxShadow: `5px 5px 0 ${player.seen ? "var(--line)" : "#FFD23F"}`,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 6,
              animation: "popIn .35s both",
              transition: "transform .12s",
            }}
            hover={{ transform: "rotate(-1.5deg) translateY(-2px)" }}
            press={{ transform: "scale(.95)" }}
          >
            <span
              style={{
                position: "absolute",
                top: -14,
                left: -3,
                background: "var(--card)",
                border: "3px solid #0d0d0d",
                borderBottom: "none",
                padding: "1px 10px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {format(t.number, { n: String(index + 1).padStart(2, "0") })}
            </span>
            <span
              style={{
                fontFamily: ARCHIVO,
                fontSize: 19,
                textTransform: "uppercase",
                wordBreak: "break-word",
                lineHeight: 1.05,
              }}
            >
              {player.name}
            </span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>
              {player.seen ? "" : t.tapToOpen}
            </span>
            {player.seen && (
              <Stamp
                fontSize={18}
                rotate={-12}
                style={{ position: "absolute", right: 8, top: 26 }}
              >
                {t.seenStamp}
              </Stamp>
            )}
          </Press>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ height: 12, border: "2px solid var(--fg)" }}>
          <div
            style={{
              height: "100%",
              width: `${percent}%`,
              background: "#FFD23F",
              transition: "width .4s cubic-bezier(.3,1.4,.5,1)",
            }}
          />
        </div>
        <div style={{ fontSize: 14 }}>
          {format(t.seenText, { seen, total: players.length })}
        </div>
      </div>

      <FooterPair>
        <Press
          onClick={onReshuffle}
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
          {t.reshuffle}
        </Press>

        {allSeen ? (
          <Press
            onClick={onStart}
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
              animation: "popIn .4s both, pulse 1.8s .4s ease-in-out infinite",
            }}
            press={{
              transform: "translate(5px,5px)",
              boxShadow: "1px 1px 0 var(--fg)",
            }}
          >
            {t.start}
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
            {format(t.remaining, { n: players.length - seen })}
          </button>
        )}
      </FooterPair>
    </Screen>
  );
}
