"use client";

import { useEffect, useState } from "react";
import Press from "@/components/ui/Press";
import { challengeReward, ruleCategory } from "@/lib/drink";
import type { Player } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

const COLOUR: Record<string, string> = {
  A: "#FFD23F",
  B: "#3DD6FF",
  C: "#FF3D3D",
  D: "#B6F03C",
};

type Props = {
  dict: Dictionary;
  players: Player[];
  rules: number[];
  onViolation: (index: number) => void;
  onChallengeDone: (index: number) => void;
  onClose: () => void;
};

/**
 * The running tally for the Drinking Edition: the house rules on one side,
 * who owes what on the other.
 *
 * It only records what the table already decided. Nothing here enforces a
 * rule — the app cannot hear anyone — so every button is somebody tapping
 * "yes, that happened", and the count is explicitly a memory aid rather than
 * a referee.
 */
export default function ChargeSheet({
  dict,
  players,
  rules,
  onViolation,
  onChallengeDone,
  onClose,
}: Props) {
  const t = dict.drink;
  const [tab, setTab] = useState<"sheet" | "rules">("sheet");
  const [flash, setFlash] = useState<{ index: number; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!flash) return;
    const timer = setTimeout(() => setFlash(null), 1400);
    return () => clearTimeout(timer);
  }, [flash]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.sheetTitle}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        background: "rgba(0,0,0,.6)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0 0 env(safe-area-inset-bottom)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 680,
          maxHeight: "86vh",
          display: "flex",
          flexDirection: "column",
          background: "var(--bg)",
          color: "var(--fg)",
          border: "3px solid var(--fg)",
          borderBottom: "none",
          animation: "screenIn .3s cubic-bezier(.2,1.3,.4,1) both",
        }}
      >
        <div
          style={{
            padding: "18px 20px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            borderBottom: "3px solid var(--line)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: ARCHIVO,
                fontSize: 22,
                textTransform: "uppercase",
              }}
            >
              {tab === "sheet" ? t.sheetTitle : t.houseRules}
            </h2>
            <Press
              onClick={onClose}
              style={{
                fontFamily: ARCHIVO,
                fontSize: 13,
                textTransform: "uppercase",
                background: "var(--bg)",
                color: "var(--fg)",
                border: "3px solid var(--fg)",
                padding: "8px 12px",
                cursor: "pointer",
              }}
              press={{ transform: "translate(2px,2px)" }}
            >
              {t.sheetClose}
            </Press>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {(["sheet", "rules"] as const).map((which) => (
              <Press
                key={which}
                onClick={() => setTab(which)}
                style={{
                  flex: 1,
                  fontFamily: ARCHIVO,
                  fontSize: 13,
                  textTransform: "uppercase",
                  background: tab === which ? "#FFD23F" : "var(--off)",
                  color: tab === which ? "#0d0d0d" : "var(--offfg)",
                  border: "3px solid #0d0d0d",
                  padding: "10px 6px",
                  cursor: "pointer",
                }}
                press={{ transform: "translate(2px,2px)" }}
              >
                {which === "sheet" ? t.sheetTitle : t.rulesTab}
              </Press>
            ))}
          </div>

          {tab === "sheet" && (
            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.45,
                color: "var(--muted)",
              }}
            >
              {t.sheetIntro}
            </p>
          )}
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: "16px 20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {tab === "rules"
            ? rules.map((id, index) => {
                const rule = t.rules[String(id) as keyof typeof t.rules];
                return (
                  <div
                    key={id}
                    style={{
                      background: "var(--card)",
                      color: "#0d0d0d",
                      border: "3px solid #0d0d0d",
                      borderLeft: `10px solid ${COLOUR[ruleCategory(id)]}`,
                      padding: 14,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: ARCHIVO,
                        fontSize: 16,
                        textTransform: "uppercase",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")} · {rule.t}
                    </span>
                    <span style={{ fontSize: 14, lineHeight: 1.4 }}>
                      {rule.d}
                    </span>
                  </div>
                );
              })
            : players.map((player, index) => {
                const lit = flash?.index === index;
                return (
                  <div
                    key={`${player.name}-${index}`}
                    style={{
                      position: "relative",
                      background: player.challengeDone
                        ? "#E4F8FF"
                        : "var(--card)",
                      color: "#0d0d0d",
                      border: "3px solid #0d0d0d",
                      padding: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      opacity: player.alive ? 1 : 0.55,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: ARCHIVO,
                          fontSize: 16,
                          textTransform: "uppercase",
                          textDecoration: player.alive
                            ? "none"
                            : "line-through",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {player.name}
                      </span>
                      <span style={{ fontSize: 13 }}>
                        {format(player.sips === 1 ? t.sip : t.sips, {
                          n: player.sips,
                        })}
                        {" · "}
                        {player.challengeDone
                          ? format(t.challengeWon, {
                              n: player.challenge
                                ? challengeReward(player.challenge)
                                : 0,
                            })
                          : player.alive
                          ? t.challengeBusy
                          : t.challengeLost}
                      </span>
                    </div>

                    <Press
                      onClick={() => {
                        onViolation(index);
                        setFlash({ index, text: t.violationFlash });
                      }}
                      style={{
                        flex: "none",
                        fontFamily: ARCHIVO,
                        fontSize: 12,
                        textTransform: "uppercase",
                        background: "#FF3D3D",
                        color: "#0d0d0d",
                        border: "3px solid #0d0d0d",
                        padding: "10px 10px",
                        cursor: "pointer",
                      }}
                      press={{ transform: "translate(2px,2px)" }}
                    >
                      {t.violation}
                    </Press>

                    {player.alive && !player.challengeDone && (
                      <Press
                        onClick={() => {
                          onChallengeDone(index);
                          setFlash({
                            index,
                            text: format(t.challengeHandOut, {
                              n: player.challenge
                                ? challengeReward(player.challenge)
                                : 0,
                            }),
                          });
                        }}
                        style={{
                          flex: "none",
                          fontFamily: ARCHIVO,
                          fontSize: 12,
                          textTransform: "uppercase",
                          background: "#3DD6FF",
                          color: "#0d0d0d",
                          border: "3px solid #0d0d0d",
                          padding: "10px 10px",
                          cursor: "pointer",
                        }}
                        press={{ transform: "translate(2px,2px)" }}
                      >
                        ✓
                      </Press>
                    )}

                    {lit && (
                      <span
                        aria-live="polite"
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "grid",
                          placeItems: "center",
                          background: "rgba(13,13,13,.88)",
                          color: "#FFD23F",
                          fontFamily: ARCHIVO,
                          fontSize: 16,
                          textTransform: "uppercase",
                          pointerEvents: "none",
                        }}
                      >
                        {flash.text}
                      </span>
                    )}
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
