"use client";

import Press from "@/components/ui/Press";
import Screen, { Header } from "@/components/ui/Screen";
import { RULES_PER_GAME, ruleCategory } from "@/lib/drink";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

/** The design tilts each card a different way so the three read as a stack. */
const TILT = ["-1.2deg", ".8deg", "-.4deg"];

const COLOUR: Record<string, string> = {
  A: "#FFD23F",
  B: "#3DD6FF",
  C: "#FF3D3D",
  D: "#B6F03C",
};

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

  const short: Record<string, string> = {
    A: t.catAShort,
    B: t.catBShort,
    C: t.catCShort,
    D: t.catDShort,
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
    gap: 22,
  } as const;

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
          lineHeight: 1.5,
          textWrap: "pretty",
        }}
      >
        {t.rulesIntro}
      </p>

      {rolling ? (
        <div style={grid}>
          {Array.from({ length: RULES_PER_GAME }, (_, index) => (
            <div
              key={index}
              style={{
                minHeight: 200,
                border: "3px dashed var(--fg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: ARCHIVO,
                fontSize: 20,
                textTransform: "uppercase",
                animation: "wobble .35s ease-in-out infinite",
              }}
            >
              {t.rolling}
            </div>
          ))}
        </div>
      ) : (
        <div style={grid}>
          {rules.map((id, index) => {
            const category = ruleCategory(id);
            const rule = t.rules[String(id) as keyof typeof t.rules];
            return (
              <div
                key={id}
                style={{
                  position: "relative",
                  minHeight: 200,
                  background: "var(--card)",
                  color: "#0d0d0d",
                  border: "3px solid #0d0d0d",
                  boxShadow: `7px 7px 0 ${COLOUR[category]}`,
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  transform: `rotate(${TILT[index % TILT.length]})`,
                  animation: `popIn .45s ${index * 0.12}s both`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <span
                    style={{ fontFamily: ARCHIVO, fontSize: 44, lineHeight: 1 }}
                  >
                    {index + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: ARCHIVO,
                      fontSize: 12,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      background: COLOUR[category],
                      border: "2px solid #0d0d0d",
                      padding: "5px 9px",
                    }}
                  >
                    {short[category]}
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: ARCHIVO,
                    fontSize: 24,
                    textTransform: "uppercase",
                    lineHeight: 1.05,
                    overflowWrap: "anywhere",
                  }}
                >
                  {rule.t}
                </span>

                <span
                  style={{
                    fontSize: 16,
                    lineHeight: 1.45,
                    textWrap: "pretty",
                  }}
                >
                  {rule.d}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div
        style={{
          marginTop: "auto",
          width: "100%",
          maxWidth: 620,
          alignSelf: "flex-end",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
          gap: 18,
          paddingTop: 12,
        }}
      >
        <Press
          onClick={onReroll}
          disabled={rolling}
          style={{
            fontFamily: ARCHIVO,
            fontSize: 15,
            textTransform: "uppercase",
            background: "var(--bg)",
            color: "var(--fg)",
            border: "3px solid var(--fg)",
            padding: "16px 8px",
            boxShadow: "5px 5px 0 var(--line)",
            cursor: rolling ? "default" : "pointer",
            opacity: rolling ? 0.5 : 1,
          }}
          press={{
            transform: "translate(4px,4px)",
            boxShadow: "1px 1px 0 var(--line)",
          }}
        >
          {t.reroll}
        </Press>

        <Press
          onClick={onNext}
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
          {t.deal}
        </Press>
      </div>
    </Screen>
  );
}
