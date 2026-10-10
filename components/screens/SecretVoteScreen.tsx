"use client";

import Press from "@/components/ui/Press";
import Screen from "@/components/ui/Screen";
import Stamp from "@/components/ui/Stamp";
import type { Player } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Props = {
  dict: Dictionary;
  players: Player[];
  round: number;
  votes: Record<number, number>;
  voter: number | null;
  pick: number | null;
  phase: "grid" | "pick" | "tie";
  candidates: number[];
  tie: number[] | null;
  revote: boolean;
  onOpen: (voter: number) => void;
  onPick: (target: number) => void;
  onConfirm: () => void;
  onBackToGrid: () => void;
  onTally: () => void;
  onRevote: () => void;
};

/**
 * The Drinking Edition's vote. Everyone votes alone on the phone and passes
 * it on, the same ritual as reading your own word.
 *
 * The order people vote in is deliberately not enforced: a table that has to
 * be told whose turn it is loses the rhythm, and the tally only needs every
 * living player to have been through once.
 */
export default function SecretVoteScreen({
  dict,
  players,
  round,
  votes,
  voter,
  pick,
  phase,
  candidates,
  tie,
  revote,
  onOpen,
  onPick,
  onConfirm,
  onBackToGrid,
  onTally,
  onRevote,
}: Props) {
  const t = dict.pvote;

  const alive = players.flatMap((player, index) =>
    player.alive ? [index] : []
  );
  const cast = alive.filter((index) => votes[index] !== undefined);
  const everyoneVoted = alive.length > 0 && cast.length === alive.length;

  const title =
    phase === "tie" ? t.resultTitle : revote ? t.revoteTitle : t.title;

  return (
    <Screen
      label={t.title}
      narrow
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 4,
            }}
          >
            {format(t.kicker, { n: round })}
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: ARCHIVO,
              fontSize: 30,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* One bar per voter, filling in as the phone goes round. */}
      <div style={{ display: "flex", gap: 6 }}>
        {alive.map((index) => (
          <span
            key={index}
            style={{
              flex: 1,
              height: 10,
              border: "2px solid var(--fg)",
              background:
                votes[index] !== undefined ? "#FFD23F" : "transparent",
              transition: "background .3s",
            }}
          />
        ))}
      </div>

      {phase === "tie" && tie ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            textAlign: "center",
            paddingTop: "clamp(20px,8vh,80px)",
          }}
        >
          <Stamp fontSize={28} rotate={-6}>
            {t.tieTitle}
          </Stamp>

          <p
            style={{ margin: 0, fontSize: 17, maxWidth: 340, lineHeight: 1.45 }}
          >
            {t.tieBody}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {tie.map((index) => (
              <span
                key={index}
                style={{
                  fontFamily: ARCHIVO,
                  fontSize: 18,
                  textTransform: "uppercase",
                  background: "var(--card)",
                  color: "#0d0d0d",
                  border: "3px solid #0d0d0d",
                  padding: "10px 14px",
                  boxShadow: "4px 4px 0 #FF3D3D",
                  animation: "popIn .35s both",
                }}
              >
                {players[index].name}
              </span>
            ))}
          </div>

          <Press
            onClick={onRevote}
            style={{
              marginTop: "auto",
              width: "100%",
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
            {t.revote}
          </Press>
        </div>
      ) : phase === "pick" && voter !== null ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Press
              title={dict.common.back}
              onClick={onBackToGrid}
              style={{
                width: 44,
                height: 44,
                flex: "none",
                background: "var(--card)",
                color: "#0d0d0d",
                border: "3px solid #0d0d0d",
                fontSize: 20,
                fontWeight: 700,
                boxShadow: "3px 3px 0 #FFD23F",
                cursor: "pointer",
              }}
              press={{
                transform: "translate(2px,2px)",
                boxShadow: "1px 1px 0 #FFD23F",
              }}
            >
              ←
            </Press>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.4 }}>
              {format(t.ask, { name: players[voter].name })}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 18,
            }}
          >
            {candidates
              .filter((index) => index !== voter)
              .map((index) => {
                const chosen = pick === index;
                return (
                  <Press
                    key={index}
                    onClick={() => onPick(index)}
                    style={{
                      position: "relative",
                      fontFamily: "inherit",
                      background: "var(--card)",
                      color: "#0d0d0d",
                      border: `4px solid ${chosen ? "#E8202A" : "#0d0d0d"}`,
                      padding: 0,
                      cursor: "pointer",
                      boxShadow: `5px 5px 0 ${
                        chosen ? "#E8202A" : "var(--line)"
                      }`,
                      transform: chosen ? "rotate(-2deg) scale(1.04)" : "none",
                      transition:
                        "transform .2s cubic-bezier(.3,1.6,.5,1), box-shadow .2s",
                      animation: "popIn .35s both",
                      overflow: "hidden",
                    }}
                  >
                    {/* The mugshot slot: lined card stock with an initial. */}
                    <span
                      style={{
                        height: 90,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#d9d5ca",
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent 0 19px, rgba(13,13,13,.25) 19px 20px)",
                      }}
                    >
                      <span
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: "#0d0d0d",
                          color: "#F3F0E8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: ARCHIVO,
                          fontSize: 26,
                        }}
                      >
                        {players[index].name.charAt(0).toUpperCase()}
                      </span>
                    </span>

                    <span
                      style={{
                        display: "block",
                        padding: "10px 8px",
                        fontFamily: ARCHIVO,
                        fontSize: 15,
                        textTransform: "uppercase",
                        wordBreak: "break-word",
                        borderTop: "3px solid #0d0d0d",
                      }}
                    >
                      {players[index].name}
                    </span>

                    {chosen && (
                      <span
                        style={{
                          position: "absolute",
                          top: 28,
                          left: 0,
                          right: 0,
                          margin: "0 auto",
                          width: "max-content",
                        }}
                      >
                        <Stamp fontSize={15} rotate={-11} delay={null}>
                          {t.myVote}
                        </Stamp>
                      </span>
                    )}
                  </Press>
                );
              })}
          </div>

          {pick === null ? (
            <Disabled label={t.pickFirst} />
          ) : (
            <Press
              onClick={onConfirm}
              style={{
                marginTop: "auto",
                fontFamily: ARCHIVO,
                fontSize: 17,
                textTransform: "uppercase",
                background: "#FF3D3D",
                color: "#0d0d0d",
                border: "3px solid #0d0d0d",
                padding: "17px 8px",
                boxShadow: "6px 6px 0 var(--fg)",
                cursor: "pointer",
                animation: "popIn .4s both",
              }}
              press={{
                transform: "translate(5px,5px)",
                boxShadow: "1px 1px 0 var(--fg)",
              }}
            >
              {format(t.confirm, { name: players[pick].name })}
            </Press>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            flex: 1,
          }}
        >
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
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "28px 18px",
              paddingTop: 16,
            }}
          >
            {alive.map((index) => {
              const done = votes[index] !== undefined;
              return (
                <Press
                  key={index}
                  disabled={done}
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
                    boxShadow: `5px 5px 0 ${done ? "var(--line)" : "#FF3D3D"}`,
                    cursor: done ? "default" : "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                  press={
                    done
                      ? undefined
                      : {
                          transform: "translate(4px,4px)",
                          boxShadow: "1px 1px 0 #FF3D3D",
                        }
                  }
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
                    {format(t.number, {
                      n: String(index + 1).padStart(2, "0"),
                    })}
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
                    {players[index].name}
                  </span>

                  <span style={{ fontSize: 13, fontWeight: 700 }}>
                    {done ? "" : t.tapToVote}
                  </span>

                  {done && (
                    <span style={{ position: "absolute", right: 8, top: 26 }}>
                      <Stamp fontSize={17} rotate={-12} delay={null}>
                        {t.voted}
                      </Stamp>
                    </span>
                  )}
                </Press>
              );
            })}
          </div>

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {everyoneVoted ? (
              <Press
                onClick={onTally}
                style={{
                  fontFamily: ARCHIVO,
                  fontSize: 19,
                  textTransform: "uppercase",
                  background: "#FF3D3D",
                  color: "#0d0d0d",
                  border: "3px solid #0d0d0d",
                  padding: 17,
                  boxShadow: "6px 6px 0 var(--fg)",
                  cursor: "pointer",
                  animation:
                    "popIn .4s both, pulse 1.8s .4s ease-in-out infinite",
                }}
                press={{
                  transform: "translate(5px,5px)",
                  boxShadow: "1px 1px 0 var(--fg)",
                }}
              >
                {t.tally}
              </Press>
            ) : (
              <Disabled
                label={format(dict.deal.remaining, {
                  n: alive.length - cast.length,
                })}
              />
            )}
          </div>
        </div>
      )}
    </Screen>
  );
}

function Disabled({ label }: { label: string }) {
  return (
    <div
      style={{
        marginTop: "auto",
        textAlign: "center",
        fontFamily: ARCHIVO,
        fontSize: 15,
        textTransform: "uppercase",
        background: "var(--off)",
        color: "var(--offfg)",
        border: "3px dashed var(--offfg)",
        padding: "16px 8px",
      }}
    >
      {label}
    </div>
  );
}
