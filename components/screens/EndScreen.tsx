"use client";

import Press from "@/components/ui/Press";
import Screen from "@/components/ui/Screen";
import Stamp from "@/components/ui/Stamp";
import { ruleCategory } from "@/lib/drink";
import type { Player, Role, Winner, WordPair } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

/** The tag behind each player's name. */
const ROLE_COLOUR: Record<Role, string> = {
  burger: "#F3F0E8",
  undercover: "#A8A49A",
  white: "#FF3D3D",
};

const WIN_COLOUR: Record<Winner, string> = {
  burgers: "#FFD23F",
  infiltranten: "#FF3D3D",
  white: "#FF3D3D",
};

const RULE_COLOUR: Record<string, string> = {
  A: "#FFD23F",
  B: "#3DD6FF",
  C: "#FF3D3D",
  D: "#B6F03C",
};

/** The label above every value on the sheet. */
const LABEL = {
  fontSize: 11,
  letterSpacing: ".2em",
  textTransform: "uppercase",
  fontWeight: 700,
  color: "#5a574f",
} as const;

type Props = {
  dict: Dictionary;
  players: Player[];
  pair: WordPair;
  winner: Winner;
  /** How many rounds were played. */
  round: number;
  drink: boolean;
  /** The house rules this game ran under; empty outside the Drinking Edition. */
  rules: number[];
  onMenu: () => void;
  onAgain: () => void;
};

/**
 * The end report, dressed as the case file it is: a manila folder with a
 * sheet of lined paper inside.
 *
 * Unlike every other screen this one is on paper rather than on the dark
 * background, so its colours are written out rather than taken from the
 * theme — the sheet is the same cream whichever theme is on, which is what
 * the design asks for.
 */
export default function EndScreen({
  dict,
  players,
  pair,
  winner,
  round,
  drink,
  rules,
  onMenu,
  onAgain,
}: Props) {
  const t = dict.end;

  const winTitle = {
    burgers: t.burgersTitle,
    infiltranten: t.infiltrantenTitle,
    white: t.whiteTitle,
  }[winner];
  const winLine = {
    burgers: t.burgersLine,
    infiltranten: t.infiltrantenLine,
    white: t.whiteLine,
  }[winner];

  return (
    <Screen
      label={t.stamp}
      style={{
        maxWidth: 900,
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div style={{ position: "relative", paddingTop: 30 }}>
        <span
          style={{
            position: "absolute",
            top: 3,
            left: 0,
            background: "#E9DDB8",
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            borderBottom: "none",
            borderRadius: "10px 10px 0 0",
            padding: "7px 18px 6px",
            fontFamily: ARCHIVO,
            fontSize: 13,
            letterSpacing: ".12em",
            textTransform: "uppercase",
          }}
        >
          {t.report}
        </span>

        <div
          style={{
            background: "#E9DDB8",
            border: "3px solid #0d0d0d",
            borderRadius: "0 10px 10px 10px",
            boxShadow: "10px 10px 0 #FFD23F",
            padding: "clamp(10px,3vw,18px)",
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#FBF8F0",
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 27px, rgba(13,13,13,.06) 27px 28px)",
              color: "#0d0d0d",
              border: "2px solid #0d0d0d",
              boxShadow: "5px 5px 0 rgba(13,13,13,.25)",
              padding: "clamp(20px,4vw,34px) clamp(16px,4vw,32px)",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* The heading, with the stamp beside it until the sheet narrows. */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "16px 20px",
              }}
            >
              <div
                style={{
                  flex: "1 1 220px",
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <span style={LABEL}>
                  {format(t.caseLine, {
                    mode: drink
                      ? dict.modes.drinkTitle
                      : dict.modes.classicTitle,
                  })}
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: ARCHIVO,
                    fontSize: "clamp(28px,7vw,42px)",
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  {t.report}
                </h2>
              </div>

              <Stamp
                stacked
                fontSize={16}
                rotate={-9}
                delay={0.35}
                style={{
                  flex: "none",
                  alignSelf: "center",
                  margin: "4px 6px 0 0",
                  background: "rgba(251,248,240,.6)",
                }}
              >
                <span
                  style={{
                    fontFamily: ARCHIVO,
                    fontSize: "clamp(16px,4.5vw,24px)",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.stamp}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    borderTop: "2px solid #E8202A",
                    paddingTop: 3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.stampSub}
                </span>
              </Stamp>
            </div>

            {/* The verdict. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                borderTop: "2px solid #0d0d0d",
                paddingTop: 18,
              }}
            >
              <span style={LABEL}>{t.verdict}</span>
              <span
                style={{
                  alignSelf: "flex-start",
                  fontFamily: ARCHIVO,
                  fontSize: "clamp(26px,7vw,40px)",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  background: WIN_COLOUR[winner],
                  border: "3px solid #0d0d0d",
                  padding: "8px 14px",
                  boxShadow: "5px 5px 0 #0d0d0d",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  overflowWrap: "anywhere",
                  animation: "popIn .5s .7s both",
                }}
              >
                {winTitle}
              </span>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 16,
                  lineHeight: 1.5,
                  maxWidth: 520,
                  textWrap: "pretty",
                }}
              >
                {winLine}
              </p>
            </div>

            {/* The facts. */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
                gap: 12,
              }}
            >
              <Fact label={t.civilianWord} value={pair[0]} />
              <Fact label={t.undercoverWord} value={pair[1]} edge="#A8A49A" />
              <Fact label={t.rounds} value={String(round)} plain />
            </div>

            {drink && rules.length > 0 && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <span style={LABEL}>{t.houseRulesTitle}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {rules.map((id) => (
                    <span
                      key={id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        border: "2px solid #0d0d0d",
                        padding: "7px 10px",
                        fontFamily: ARCHIVO,
                        fontSize: 13,
                        textTransform: "uppercase",
                      }}
                    >
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          flex: "none",
                          background: RULE_COLOUR[ruleCategory(id)],
                          border: "2px solid #0d0d0d",
                        }}
                      />
                      {
                        dict.drink.rules[
                          String(id) as keyof typeof dict.drink.rules
                        ].t
                      }
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Who was in it, and what became of them. */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={LABEL}>{t.involved}</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "2px solid #0d0d0d",
                }}
              >
                {players.map((player, index) => {
                  const out = !player.alive;
                  return (
                    <div
                      key={`${player.name}-${index}`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto minmax(0,1fr) auto",
                        alignItems: "center",
                        gap: 12,
                        padding: "11px 2px",
                        borderBottom: "1px dashed rgba(13,13,13,.4)",
                        animation: "screenIn .35s both",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: ".08em",
                        }}
                      >
                        {format(dict.deal.number, {
                          n: String(index + 1).padStart(2, "0"),
                        })}
                      </span>

                      <span
                        style={{
                          minWidth: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: ARCHIVO,
                            fontSize: 16,
                            textTransform: "uppercase",
                            wordBreak: "break-word",
                            textDecoration: out ? "line-through" : "none",
                          }}
                        >
                          {player.name}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: ".06em",
                            textTransform: "uppercase",
                            color: out ? "#C4141C" : "#2f6b12",
                          }}
                        >
                          {out
                            ? format(t.votedOut, { n: player.outRound ?? "?" })
                            : t.survived}
                          {drink && player.challengeDone
                            ? ` · ${t.challengeMet}`
                            : ""}
                        </span>
                      </span>

                      <span
                        style={{
                          fontFamily: ARCHIVO,
                          fontSize: 11,
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          background: ROLE_COLOUR[player.role],
                          border: "2px solid #0d0d0d",
                          padding: "5px 8px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {dict.roles[player.role]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

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
          }}
          press={{
            transform: "translate(5px,5px)",
            boxShadow: "1px 1px 0 var(--fg)",
          }}
        >
          {t.again}
        </Press>
      </div>
    </Screen>
  );
}

function Fact({
  label,
  value,
  edge,
  plain,
}: {
  label: string;
  value: string;
  /** The undercover word carries a thick grey edge, as the design has it. */
  edge?: string;
  /** The round count is a number, so it skips the uppercase word treatment. */
  plain?: boolean;
}) {
  return (
    <div
      style={{
        border: "2px solid #0d0d0d",
        ...(edge ? { borderLeft: `8px solid ${edge}` } : null),
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <span style={LABEL}>{label}</span>
      <span
        style={{
          fontFamily: ARCHIVO,
          fontSize: 20,
          ...(plain
            ? null
            : { textTransform: "uppercase", wordBreak: "break-word" }),
        }}
      >
        {value}
      </span>
    </div>
  );
}
