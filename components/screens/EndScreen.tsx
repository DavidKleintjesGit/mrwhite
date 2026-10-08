"use client";

import Press from "@/components/ui/Press";
import Screen, { FooterPair } from "@/components/ui/Screen";
import Stamp from "@/components/ui/Stamp";
import type { Player, Role, Winner, WordPair } from "@/lib/game";
import type { Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

const ROLE_COLOUR: Record<Role, string> = {
  burger: "#F3F0E8",
  undercover: "#3DD6FF",
  white: "#FF3D3D",
};

type Props = {
  dict: Dictionary;
  players: Player[];
  pair: WordPair;
  winner: Winner;
  onMenu: () => void;
  onAgain: () => void;
};

export default function EndScreen({
  dict,
  players,
  pair,
  winner,
  onMenu,
  onAgain,
}: Props) {
  const t = dict.end;

  const banner = {
    burgers: { title: t.burgersTitle, line: t.burgersLine, colour: "#FFD23F" },
    infiltranten: {
      title: t.infiltrantenTitle,
      line: t.infiltrantenLine,
      colour: "#3DD6FF",
    },
    white: { title: t.whiteTitle, line: t.whiteLine, colour: "#FF3D3D" },
  }[winner];

  return (
    <Screen
      label={t.stamp}
      style={{ display: "flex", flexDirection: "column", gap: 22 }}
    >
      <Stamp
        fontSize={30}
        rotate={-6}
        delay={0.1}
        style={{ alignSelf: "center" }}
      >
        {t.stamp}
      </Stamp>

      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: ARCHIVO,
            fontSize: "clamp(38px, 11vw, 56px)",
            textTransform: "uppercase",
            lineHeight: 0.95,
            background: banner.colour,
            color: "#0d0d0d",
            padding: "10px 18px",
            transform: "rotate(-2deg)",
            boxShadow: "8px 8px 0 var(--fg)",
            animation: "popIn .5s .5s both",
          }}
        >
          {banner.title}
        </h2>
        <p
          style={{
            margin: "14px 0 0",
            fontSize: 17,
            maxWidth: 330,
            lineHeight: 1.45,
          }}
        >
          {banner.line}
        </p>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
      >
        <div style={{ border: "3px solid var(--fg)", padding: "10px 12px" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {t.civilianWord}
          </div>
          <div
            style={{
              fontFamily: ARCHIVO,
              fontSize: 20,
              textTransform: "uppercase",
            }}
          >
            {pair[0]}
          </div>
        </div>
        <div style={{ border: "3px solid #3DD6FF", padding: "10px 12px" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "var(--cy)",
            }}
          >
            {t.undercoverWord}
          </div>
          <div
            style={{
              fontFamily: ARCHIVO,
              fontSize: 20,
              textTransform: "uppercase",
            }}
          >
            {pair[1]}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: 10,
        }}
      >
        {players.map((player, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--card)",
              color: "#0d0d0d",
              border: "3px solid #0d0d0d",
              padding: "10px 12px",
              animation: "screenIn .35s both",
            }}
          >
            <span
              style={{
                width: 14,
                height: 28,
                flex: "none",
                background: ROLE_COLOUR[player.role],
                border: "2px solid #0d0d0d",
              }}
            />
            <span
              style={{
                flex: 1,
                fontFamily: ARCHIVO,
                fontSize: 16,
                textTransform: "uppercase",
                textDecoration: player.alive ? "none" : "line-through",
              }}
            >
              {player.name}
            </span>
            <span
              style={{ fontSize: 14, fontWeight: 700, textAlign: "right" }}
            >
              {dict.roles[player.role]}
              {player.alive ? "" : ` · ${t.out}`}
            </span>
          </div>
        ))}
      </div>

      <FooterPair>
        <Press
          onClick={onMenu}
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
          {t.menu}
        </Press>
        <Press
          onClick={onAgain}
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
            animation: "pulse 1.8s ease-in-out infinite",
          }}
          press={{
            transform: "translate(5px,5px)",
            boxShadow: "1px 1px 0 var(--fg)",
          }}
        >
          {t.again}
        </Press>
      </FooterPair>
    </Screen>
  );
}
