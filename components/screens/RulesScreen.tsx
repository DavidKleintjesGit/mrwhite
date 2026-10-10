"use client";

import Press from "@/components/ui/Press";
import Screen, { Header } from "@/components/ui/Screen";
import type { Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

/** Paper, cyan and red: the three roles in the order the design lists them. */
const CARD_BACKGROUNDS = ["var(--card)", "#3DD6FF", "#FF3D3D"];

type Props = {
  dict: Dictionary;
  onBack: () => void;
  onPlay: () => void;
};

export default function RulesScreen({ dict, onBack, onPlay }: Props) {
  const t = dict.rules;

  return (
    <Screen
      label={t.title}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      <Header
        kicker={t.kicker}
        title={t.title}
        backLabel={dict.common.back}
        onBack={onBack}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0,1fr))",
          gap: 12,
        }}
      >
        {t.cards.map((card, index) => (
          <div
            key={card.name}
            style={{
              background: CARD_BACKGROUNDS[index],
              color: "#0d0d0d",
              border: "3px solid #0d0d0d",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: ARCHIVO,
                fontSize: 15,
                textTransform: "uppercase",
              }}
            >
              {card.name}
            </span>
            <span style={{ fontSize: 13, lineHeight: 1.3 }}>{card.body}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "22px 36px",
        }}
      >
        {t.items.map((text, index) => (
          <div
            key={text}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              borderBottom: "2px dashed var(--line)",
              paddingBottom: 18,
            }}
          >
            <span
              style={{
                flex: "none",
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFD23F",
                color: "#0d0d0d",
                fontFamily: ARCHIVO,
                fontSize: 18,
                transform: "rotate(-4deg)",
              }}
            >
              {index + 1}
            </span>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 16,
                lineHeight: 1.45,
                textWrap: "pretty",
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          fontFamily: "var(--font-permanent-marker), cursive",
          fontSize: 19,
          color: "var(--hl)",
          transform: "rotate(-1.5deg)",
          lineHeight: 1.35,
        }}
      >
        {t.note}
      </div>

      <Press
        onClick={onPlay}
        style={{
          alignSelf: "flex-end",
          width: "100%",
          maxWidth: 380,
          marginTop: "auto",
          fontFamily: ARCHIVO,
          fontSize: 20,
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
        {t.cta}
      </Press>
    </Screen>
  );
}
