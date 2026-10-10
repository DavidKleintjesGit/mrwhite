"use client";

import Press from "@/components/ui/Press";
import Screen, { Header } from "@/components/ui/Screen";
import { ruleCategory } from "@/lib/drink";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

/** The design tilts each card a different way so the three read as a stack. */
const TILT = ["-1.2deg", ".8deg", "-.4deg"];

type Props = {
  dict: Dictionary;
  rules: number[];
  rolling: boolean;
  onBack: () => void;
  onReroll: () => void;
  onNext: () => void;
};

export default function DrinkRulesScreen({
  dict,
  rules,
  rolling,
  onBack,
  onReroll,
  onNext,
}: Props) {
  const t = dict.drink;

  const colour: Record<string, string> = {
    A: "#FFD23F",
    B: "#3DD6FF",
    C: "#FF3D3D",
    D: "#B6F03C",
  };
  const short: Record<string, string> = {
    A: t.catAShort,
    B: t.catBShort,
    C: t.catCShort,
    D: t.catDShort,
  };

  return (
    <Screen
      label={t.rulesTitle}
      style={{ display: "flex", flexDirection: "column", gap: 28 }}
    >
      <Header
        kicker={`${dict.modes.drinkTitle} · ${format(t.stepKicker, {
          total: 4,
        })}`}
        title={t.rulesTitle}
        backLabel={dict.common.back}
        onBack={onBack}
      />

      <p
        style={{
          margin: 0,
          maxWidth: 620,
          fontSize: 16,
          lineHeight: 1.55,
          color: "var(--muted)",
        }}
      >
        {t.rulesIntro}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: 18,
        }}
      >
        {rolling
          ? rules.map((_, index) => (
              <div
                key={index}
                style={{
                  background: "var(--off)",
                  color: "var(--offfg)",
                  border: "3px dashed var(--offfg)",
                  padding: 18,
                  minHeight: 148,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: ARCHIVO,
                  fontSize: 15,
                  textTransform: "uppercase",
                }}
              >
                {t.rolling}
              </div>
            ))
          : rules.map((id, index) => {
              const category = ruleCategory(id);
              const rule = t.rules[String(id) as keyof typeof t.rules];
              return (
                <div
                  key={id}
                  style={{
                    background: "var(--card)",
                    color: "#0d0d0d",
                    border: "3px solid #0d0d0d",
                    padding: 18,
                    minHeight: 148,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    boxShadow: `6px 6px 0 ${colour[category]}`,
                    transform: `rotate(${TILT[index % TILT.length]})`,
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 12,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span
                      style={{
                        background: colour[category],
                        padding: "4px 8px",
                        border: "2px solid #0d0d0d",
                      }}
                    >
                      {short[category]}
                    </span>
                  </span>

                  <span
                    style={{
                      fontFamily: ARCHIVO,
                      fontSize: "clamp(17px,3.4vw,21px)",
                      textTransform: "uppercase",
                      lineHeight: 1.15,
                      maxWidth: "100%",
                      overflowWrap: "break-word",
                    }}
                  >
                    {rule.t}
                  </span>

                  <span style={{ fontSize: 15, lineHeight: 1.45 }}>
                    {rule.d}
                  </span>
                </div>
              );
            })}
      </div>

      <div
        style={{
          marginTop: "auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
          gap: 14,
          width: "100%",
          maxWidth: 620,
          alignSelf: "flex-end",
        }}
      >
        <Press
          onClick={onReroll}
          disabled={rolling}
          style={{
            fontFamily: ARCHIVO,
            fontSize: 16,
            textTransform: "uppercase",
            background: "var(--bg)",
            color: "var(--fg)",
            border: "3px solid var(--fg)",
            padding: 16,
            cursor: rolling ? "default" : "pointer",
            opacity: rolling ? 0.5 : 1,
          }}
          press={{ transform: "translate(3px,3px)" }}
        >
          {t.reroll}
        </Press>

        <Press
          onClick={onNext}
          style={{
            fontFamily: ARCHIVO,
            fontSize: 18,
            textTransform: "uppercase",
            background: "#FFD23F",
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            padding: 16,
            boxShadow: "6px 6px 0 var(--fg)",
            cursor: "pointer",
          }}
          press={{
            transform: "translate(5px,5px)",
            boxShadow: "1px 1px 0 var(--fg)",
          }}
        >
          {t.deal}
        </Press>
      </div>
    </Screen>
  );
}
