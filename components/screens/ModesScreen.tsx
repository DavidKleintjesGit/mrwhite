"use client";

import Press from "@/components/ui/Press";
import Screen, { Header } from "@/components/ui/Screen";
import type { Mode } from "@/lib/game";
import type { Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Case = {
  title: string;
  desc: string;
  meta: string;
  /** Null for the cases that are not built yet. */
  mode: Mode | null;
  colour: string;
};

type Props = {
  dict: Dictionary;
  onBack: () => void;
  onPick: (mode: Mode) => void;
};

/**
 * The case file each edition is dressed as. The locked ones are not
 * placeholders I invented: they are in the design, and they tell a new group
 * that more is coming without promising a date.
 */
export default function ModesScreen({ dict, onBack, onPick }: Props) {
  const t = dict.modes;

  const cases: Case[] = [
    {
      title: t.classicTitle,
      desc: t.classicDesc,
      meta: t.classicMeta,
      mode: "klassiek",
      colour: "#FFD23F",
    },
    {
      title: t.drinkTitle,
      desc: t.drinkDesc,
      meta: t.drinkMeta,
      mode: "drink",
      colour: "#FF3D3D",
    },
    ...t.soonCases.map((item) => ({
      title: item.title,
      desc: item.desc,
      meta: t.soon,
      mode: null,
      colour: "#8a877f",
    })),
  ];

  return (
    <Screen
      label={t.title}
      style={{ display: "flex", flexDirection: "column", gap: 28 }}
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
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: 16,
        }}
      >
        {cases.map((item, index) => {
          const open = item.mode !== null;
          return (
            <Press
              key={item.title}
              disabled={!open}
              onClick={() => item.mode && onPick(item.mode)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                textAlign: "left",
                background: open ? item.colour : "var(--card)",
                color: "#0d0d0d",
                border: "3px solid #0d0d0d",
                padding: 18,
                boxShadow: `6px 6px 0 ${open ? "var(--fg)" : "var(--line)"}`,
                opacity: open ? 1 : 0.55,
                cursor: open ? "pointer" : "default",
                fontFamily: "inherit",
              }}
              press={
                open
                  ? {
                      transform: "translate(5px,5px)",
                      boxShadow: "1px 1px 0 var(--fg)",
                    }
                  : undefined
              }
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 12,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                }}
              >
                <span>
                  {t.caseLabel} {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    background: "#0d0d0d",
                    color: open ? item.colour : "#8a877f",
                    padding: "4px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.meta}
                </span>
              </span>

              <span
                style={{
                  fontFamily: ARCHIVO,
                  fontSize: "clamp(20px,4vw,26px)",
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                }}
              >
                {item.title}
              </span>

              <span style={{ fontSize: 15, lineHeight: 1.45 }}>
                {item.desc}
              </span>

              {open && (
                <span
                  style={{
                    marginTop: 4,
                    fontFamily: ARCHIVO,
                    fontSize: 13,
                    textTransform: "uppercase",
                  }}
                >
                  {t.open}
                </span>
              )}
            </Press>
          );
        })}
      </div>
    </Screen>
  );
}
