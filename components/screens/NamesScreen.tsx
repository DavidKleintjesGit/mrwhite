"use client";

import Press from "@/components/ui/Press";
import Screen, { FooterPair, Header } from "@/components/ui/Screen";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Props = {
  dict: Dictionary;
  steps: number;
  /** The Drinking Edition goes to its house rules, not straight to the deal. */
  dealLabel: string;
  players: number;
  names: string[];
  onChange: (names: string[]) => void;
  onBack: () => void;
  onDeal: () => void;
};

export default function NamesScreen({
  dict,
  steps,
  dealLabel,
  players,
  names,
  onChange,
  onBack,
  onDeal,
}: Props) {
  const t = dict.names;
  const fields = Array.from({ length: players }, (_, i) => names[i] ?? "");

  return (
    <Screen
      label={t.title}
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
    >
      <Header
        kicker={format(t.kicker, { total: steps })}
        title={t.title}
        backLabel={dict.common.back}
        onBack={onBack}
      />

      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.4 }}>{t.hint}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 12,
        }}
      >
        {fields.map((value, index) => {
          const placeholder = format(t.placeholder, { n: index + 1 });
          return (
            <label
              key={index}
              style={{
                display: "flex",
                alignItems: "stretch",
                border: "3px solid var(--fg)",
                background: "var(--card)",
                animation: "popIn .3s both",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0d0d0d",
                  color: "#FFD23F",
                  fontFamily: ARCHIVO,
                  fontSize: 16,
                }}
              >
                {index + 1}
              </span>
              <input
                value={value}
                placeholder={placeholder}
                aria-label={placeholder}
                autoComplete="off"
                onChange={(event) => {
                  const next = fields.slice();
                  next[index] = event.target.value;
                  onChange(next);
                }}
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: 17,
                  padding: "13px 12px",
                  background: "var(--card)",
                  color: "#0d0d0d",
                  border: "none",
                  outline: "none",
                }}
              />
            </label>
          );
        })}
      </div>

      <FooterPair>
        <Press
          onClick={onBack}
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
          {t.back}
        </Press>
        <Press
          onClick={onDeal}
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
          {dealLabel}
        </Press>
      </FooterPair>
    </Screen>
  );
}
