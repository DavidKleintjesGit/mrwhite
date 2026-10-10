"use client";

import Press from "@/components/ui/Press";
import Screen from "@/components/ui/Screen";
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
 * it on, the same ritual as reading your own word, which is why the grid
 * looks like the deal screen rather than like the classic vote.
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
  const everyoneVoted = cast.length === alive.length;

  const title =
    phase === "tie" ? t.resultTitle : revote ? t.revoteTitle : t.title;

  // --- Tie: nobody is out, and the table votes again on a shortlist --------

  if (phase === "tie" && tie) {
    return (
      <Screen
        label={t.resultTitle}
        narrow
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        <Kicker text={format(t.kicker, { n: round })} />
        <Title text={t.tieTitle} />

        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55 }}>{t.tieBody}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {tie.map((index) => (
            <span
              key={index}
              style={{
                fontFamily: ARCHIVO,
                fontSize: 16,
                textTransform: "uppercase",
                background: "var(--card)",
                color: "#0d0d0d",
                border: "3px solid #0d0d0d",
                padding: "10px 14px",
                boxShadow: "4px 4px 0 #FF3D3D",
              }}
            >
              {players[index].name}
            </span>
          ))}
        </div>

        <Primary label={t.revote} onClick={onRevote} />
      </Screen>
    );
  }

  // --- One player voting, alone -------------------------------------------

  if (phase === "pick" && voter !== null) {
    return (
      <Screen
        label={t.title}
        narrow
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        <Press
          title={dict.common.back}
          onClick={onBackToGrid}
          style={{
            alignSelf: "flex-start",
            width: 48,
            height: 48,
            background: "var(--card)",
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            fontSize: 22,
            fontWeight: 700,
            boxShadow: "4px 4px 0 #FFD23F",
            cursor: "pointer",
          }}
          press={{
            transform: "translate(3px,3px)",
            boxShadow: "1px 1px 0 #FFD23F",
          }}
        >
          ←
        </Press>

        <Title text={format(t.ask, { name: players[voter].name })} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 150px), 1fr))",
            gap: 12,
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
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    textAlign: "left",
                    background: chosen ? "#FF3D3D" : "var(--card)",
                    color: "#0d0d0d",
                    border: "3px solid #0d0d0d",
                    padding: 12,
                    boxShadow: `4px 4px 0 ${
                      chosen ? "var(--fg)" : "var(--line)"
                    }`,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                  press={{
                    transform: "translate(3px,3px)",
                    boxShadow: "1px 1px 0 var(--fg)",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: 30,
                      height: 30,
                      display: "grid",
                      placeItems: "center",
                      background: "#0d0d0d",
                      color: "#F3F0E8",
                      fontFamily: ARCHIVO,
                      fontSize: 14,
                    }}
                  >
                    {players[index].name.slice(0, 1).toUpperCase()}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      minWidth: 0,
                      fontWeight: 700,
                      fontSize: 15,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {players[index].name}
                  </span>
                </Press>
              );
            })}
        </div>

        {pick === null ? (
          <Disabled label={t.pickFirst} />
        ) : (
          <Primary
            label={format(t.confirm, { name: players[pick].name })}
            onClick={onConfirm}
          />
        )}
      </Screen>
    );
  }

  // --- The grid everyone passes through ------------------------------------

  return (
    <Screen
      label={t.title}
      narrow
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      <Kicker text={format(t.kicker, { n: round })} />
      <Title text={title} />

      <p
        style={{
          margin: 0,
          fontSize: 16,
          lineHeight: 1.55,
          color: "var(--muted)",
        }}
      >
        {t.instruction}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 170px), 1fr))",
          gap: 12,
        }}
      >
        {alive.map((index, position) => {
          const done = votes[index] !== undefined;
          return (
            <Press
              key={index}
              disabled={done}
              onClick={() => onOpen(index)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                textAlign: "left",
                background: done ? "var(--off)" : "var(--card)",
                color: done ? "var(--offfg)" : "#0d0d0d",
                border: `3px ${done ? "dashed var(--offfg)" : "solid #0d0d0d"}`,
                padding: 14,
                boxShadow: done ? "none" : "5px 5px 0 #3DD6FF",
                cursor: done ? "default" : "pointer",
                fontFamily: "inherit",
              }}
              press={
                done
                  ? undefined
                  : {
                      transform: "translate(4px,4px)",
                      boxShadow: "1px 1px 0 #3DD6FF",
                    }
              }
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                }}
              >
                {format(t.number, { n: position + 1 })}
              </span>
              <span
                style={{
                  fontFamily: ARCHIVO,
                  fontSize: 17,
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                }}
              >
                {players[index].name}
              </span>
              <span style={{ fontSize: 13 }}>{done ? t.voted : t.waiting}</span>
            </Press>
          );
        })}
      </div>

      {everyoneVoted ? (
        <Primary label={t.tally} onClick={onTally} red />
      ) : (
        <Disabled
          label={format(t.progress, { n: cast.length, total: alive.length })}
        />
      )}
    </Screen>
  );
}

// --- Small shared pieces ---------------------------------------------------

function Kicker({ text }: { text: string }) {
  return (
    <div
      style={{
        fontSize: 12,
        letterSpacing: ".2em",
        textTransform: "uppercase",
        color: "var(--muted)",
      }}
    >
      {text}
    </div>
  );
}

function Title({ text }: { text: string }) {
  return (
    <h2
      style={{
        margin: 0,
        fontFamily: ARCHIVO,
        fontSize: "clamp(24px,5vw,34px)",
        textTransform: "uppercase",
        lineHeight: 1.05,
        maxWidth: "100%",
        overflowWrap: "break-word",
      }}
    >
      {text}
    </h2>
  );
}

function Primary({
  label,
  onClick,
  red,
}: {
  label: string;
  onClick: () => void;
  red?: boolean;
}) {
  return (
    <Press
      onClick={onClick}
      style={{
        marginTop: "auto",
        fontFamily: ARCHIVO,
        fontSize: 18,
        textTransform: "uppercase",
        background: red ? "#FF3D3D" : "#FFD23F",
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
      {label}
    </Press>
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
        padding: 16,
      }}
    >
      {label}
    </div>
  );
}
