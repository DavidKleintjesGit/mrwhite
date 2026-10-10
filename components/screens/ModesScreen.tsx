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
 * Every edition dressed as a case file. The locked ones come from the design
 * and tell a new group that more is coming without promising a date.
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
      colour: "var(--card)",
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
            "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
          gap: 22,
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
                position: "relative",
                textAlign: "left",
                fontFamily: "inherit",
                background: item.colour,
                color: "#0d0d0d",
                border: "3px solid #0d0d0d",
                padding: 0,
                boxShadow: `6px 6px 0 ${open ? "var(--fg)" : "var(--line)"}`,
                cursor: open ? "pointer" : "default",
                display: "flex",
                flexDirection: "column",
                minHeight: 240,
              }}
              hover={
                open
                  ? { transform: "rotate(-1deg) translateY(-3px)" }
                  : undefined
              }
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
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "10px 14px",
                  background: "#0d0d0d",
                  color: open ? item.colour : "#8a877f",
                }}
              >
                <span
                  style={{
                    fontFamily: ARCHIVO,
                    fontSize: 13,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                  }}
                >
                  {t.caseLabel} {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#F3F0E8" }}
                >
                  {item.meta}
                </span>
              </span>

              <span
                style={{
                  padding: "18px 16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  opacity: open ? 1 : 0.55,
                }}
              >
                <span
                  style={{
                    fontFamily: ARCHIVO,
                    fontSize: 24,
                    textTransform: "uppercase",
                    lineHeight: 1.05,
                    overflowWrap: "break-word",
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontSize: 15,
                    lineHeight: 1.45,
                    textWrap: "pretty",
                  }}
                >
                  {item.desc}
                </span>
              </span>

              {open ? (
                <span
                  style={{
                    margin: "auto 16px 18px",
                    alignSelf: "flex-start",
                    fontFamily: ARCHIVO,
                    fontSize: 14,
                    textTransform: "uppercase",
                    background: "#0d0d0d",
                    color: "#FFD23F",
                    padding: "10px 14px",
                  }}
                >
                  {t.open}
                </span>
              ) : (
                <span
                  style={{
                    margin: "auto 18px 20px",
                    alignSelf: "flex-end",
                    display: "inline-block",
                    fontFamily: ARCHIVO,
                    fontSize: 15,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    color: "#E8202A",
                    border: "5px double #E8202A",
                    padding: "8px 12px",
                    transform: "rotate(-9deg)",
                  }}
                >
                  {t.soon}
                </span>
              )}
            </Press>
          );
        })}
      </div>
    </Screen>
  );
}
