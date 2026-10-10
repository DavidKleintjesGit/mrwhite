"use client";

import { useState } from "react";
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

/** Lined paper, as the design draws it with a repeating gradient. */
const LINED = {
  backgroundColor: "#FBF8F0",
  backgroundImage:
    "repeating-linear-gradient(0deg, transparent 0 25px, rgba(61,140,214,.18) 25px 26px)",
};

type Props = {
  dict: Dictionary;
  players: Player[];
  rules: number[];
  drink: boolean;
  onChallengeDone: (index: number) => void;
  onQuit: () => void;
  onClose: () => void;
};

/**
 * The case file: a folder pulled down from the top of the screen, with a tab
 * for the agents, one for the house rules and one to walk out of the game.
 *
 * A player's own file hides their challenge behind a redaction bar. Anyone
 * can open the drawer mid-round, so the challenge has to stay covered until
 * its owner deliberately taps it.
 */
export default function CaseFileDrawer({
  dict,
  players,
  rules,
  drink,
  onChallengeDone,
  onQuit,
  onClose,
}: Props) {
  const t = dict.drink;
  // Agents first: opening the file is usually about a person, not the rules.
  const [view, setView] = useState<"agents" | "rules">("agents");
  const [openFile, setOpenFile] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  function showFile(index: number) {
    setOpenFile(index);
    setRevealed(false);
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(13,13,13,.86)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "0 12px",
        animation: "screenIn .25s both",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.sheetOpen}
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 660,
          maxHeight: "calc(100dvh - 24px)",
          display: "flex",
          flexDirection: "column",
          paddingTop: 14,
          animation: "drawerIn .42s cubic-bezier(.2,1,.3,1) both",
        }}
      >
        {/* The folder tabs along the top edge. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            gap: 6,
            paddingLeft: 14,
          }}
        >
          <FolderTab
            label={t.agents}
            active={view === "agents"}
            onClick={() => {
              setView("agents");
              setOpenFile(null);
            }}
          />
          {drink && (
            <FolderTab
              label={t.rulesTab}
              active={view === "rules"}
              onClick={() => {
                setView("rules");
                setOpenFile(null);
              }}
            />
          )}
          <FolderTab label={t.quit} colour="#FF3D3D" onClick={onQuit} />

          <FolderTab
            label={t.sheetClose}
            onClick={onClose}
            atRight
            className="case-close-wide"
          />
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            background: "#E9DDB8",
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            borderRadius: "0 8px 0 0",
            boxShadow: "10px 10px 0 #FFD23F",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "14px 20px",
              borderBottom: "2px dashed rgba(13,13,13,.45)",
              fontSize: 12,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            <span>{t.caseNo}</span>
            <span>
              {drink ? dict.modes.drinkTitle : dict.modes.classicTitle}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
              padding: 20,
            }}
          >
            {openFile !== null ? (
              <FileView
                dict={dict}
                player={players[openFile]}
                number={openFile + 1}
                revealed={revealed}
                onReveal={() => setRevealed(true)}
                onDone={() => onChallengeDone(openFile)}
                onBack={() => setOpenFile(null)}
              />
            ) : view === "rules" ? (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <Heading text={t.houseRules} />
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45 }}>
                  {t.rulesHelp}
                </p>
                {rules.map((id, index) => {
                  const rule = t.rules[String(id) as keyof typeof t.rules];
                  const category = ruleCategory(id);
                  return (
                    <div
                      key={id}
                      style={{
                        position: "relative",
                        ...LINED,
                        border: "2px solid #0d0d0d",
                        boxShadow: "4px 4px 0 rgba(13,13,13,.25)",
                        padding: "14px 14px 14px 56px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 12,
                          top: 14,
                          fontFamily: ARCHIVO,
                          fontSize: 28,
                          lineHeight: 1,
                        }}
                      >
                        {index + 1}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: 42,
                          top: 0,
                          bottom: 0,
                          width: 2,
                          background: "rgba(232,32,42,.45)",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: "6px 10px",
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: ARCHIVO,
                            fontSize: 18,
                            textTransform: "uppercase",
                            lineHeight: 1.1,
                          }}
                        >
                          {rule.t}
                        </span>
                        <span
                          style={{
                            fontFamily: ARCHIVO,
                            fontSize: 10,
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            background: COLOUR[category],
                            border: "2px solid #0d0d0d",
                            padding: "3px 6px",
                          }}
                        >
                          {
                            {
                              A: t.catAShort,
                              B: t.catBShort,
                              C: t.catCShort,
                              D: t.catDShort,
                            }[category]
                          }
                        </span>
                      </div>
                      <span style={{ fontSize: 15, lineHeight: 1.5 }}>
                        {rule.d}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <Heading text={t.agents} />
                {drink && (
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45 }}>
                    {t.challengeCheck}
                  </p>
                )}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(min(100%, 170px), 1fr))",
                    gap: "26px 16px",
                    paddingTop: 14,
                  }}
                >
                  {players.map((player, index) => (
                    <Folder
                      key={`${player.name}-${index}`}
                      dict={dict}
                      player={player}
                      number={index + 1}
                      onOpen={() => showFile(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Press
          className="case-close-narrow"
          onClick={onClose}
          style={{
            alignSelf: "flex-end",
            marginRight: 16,
            position: "relative",
            top: -3,
            fontFamily: ARCHIVO,
            fontSize: 12,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            background: "#E9DDB8",
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          {t.sheetClose}
        </Press>
      </div>
    </div>
  );
}

// --- Pieces ----------------------------------------------------------------

function Heading({ text }: { text: string }) {
  return (
    <h3
      style={{
        margin: 0,
        fontFamily: ARCHIVO,
        fontSize: 26,
        textTransform: "uppercase",
        lineHeight: 1,
      }}
    >
      {text}
    </h3>
  );
}

function FolderTab({
  label,
  active,
  colour,
  atRight,
  className,
  onClick,
}: {
  label: string;
  active?: boolean;
  colour?: string;
  /** Pins the tab to the right-hand end of the row. */
  atRight?: boolean;
  className?: string;
  onClick: () => void;
}) {
  return (
    <Press
      className={className}
      onClick={onClick}
      style={{
        position: "relative",
        top: 3,
        ...(atRight ? { marginLeft: "auto" } : null),
        fontFamily: ARCHIVO,
        fontSize: 13,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        background: colour ?? (active ? "#E9DDB8" : "#D6CCAE"),
        color: "#0d0d0d",
        border: "3px solid #0d0d0d",
        borderBottom: "none",
        borderRadius: "10px 10px 0 0",
        padding: "11px 18px 12px",
        cursor: "pointer",
      }}
      hover={{ top: 0 }}
    >
      {label}
    </Press>
  );
}

function Folder({
  dict,
  player,
  number,
  onOpen,
}: {
  dict: Dictionary;
  player: Player;
  number: number;
  onOpen: () => void;
}) {
  const t = dict.drink;
  const background = player.alive ? "#FFFFFF" : "#D6CCAE";

  return (
    <Press
      onClick={onOpen}
      style={{
        position: "relative",
        textAlign: "left",
        fontFamily: "inherit",
        background,
        color: "#0d0d0d",
        border: "2px solid #0d0d0d",
        borderRadius: "0 6px 6px 6px",
        padding: "18px 14px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        cursor: "pointer",
        opacity: player.alive ? 1 : 0.6,
      }}
      hover={{ transform: "translateY(-3px) rotate(-1deg)" }}
      press={{ transform: "translate(2px,2px)" }}
    >
      <span
        style={{
          position: "absolute",
          top: -16,
          left: -2,
          background,
          border: "2px solid #0d0d0d",
          borderBottom: "none",
          borderRadius: "6px 6px 0 0",
          padding: "2px 12px",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".14em",
          textTransform: "uppercase",
        }}
      >
        {number.toString().padStart(2, "0")}
      </span>

      <span
        style={{
          fontFamily: ARCHIVO,
          fontSize: 19,
          textTransform: "uppercase",
          lineHeight: 1.05,
          wordBreak: "break-word",
          textDecoration: player.alive ? "none" : "line-through",
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
        }}
      >
        {player.alive ? t.active : t.eliminated}
      </span>

      {player.challengeDone && (
        <span
          style={{
            position: "absolute",
            right: 8,
            top: 10,
            display: "inline-block",
            fontFamily: ARCHIVO,
            fontSize: 12,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            lineHeight: 1,
            color: "#E8202A",
            border: "3px double #E8202A",
            padding: "4px 6px",
            transform: "rotate(-10deg)",
          }}
        >
          {t.achieved}
        </span>
      )}
    </Press>
  );
}

function FileView({
  dict,
  player,
  number,
  revealed,
  onReveal,
  onDone,
  onBack,
}: {
  dict: Dictionary;
  player: Player;
  number: number;
  revealed: boolean;
  onReveal: () => void;
  onDone: () => void;
  onBack: () => void;
}) {
  const t = dict.drink;
  const challenge = player.challenge
    ? t.challenges[String(player.challenge) as keyof typeof t.challenges]
    : null;
  const reward = player.challenge ? challengeReward(player.challenge) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Press
        onClick={onBack}
        style={{
          alignSelf: "flex-start",
          fontFamily: ARCHIVO,
          fontSize: 12,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          background: "transparent",
          color: "#0d0d0d",
          border: "2px solid #0d0d0d",
          padding: "8px 12px",
          cursor: "pointer",
        }}
        press={{ transform: "translate(2px,2px)" }}
      >
        ← {t.agents}
      </Press>

      <div
        style={{
          position: "relative",
          backgroundColor: "#FBF8F0",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 27px, rgba(13,13,13,.07) 27px 28px)",
          border: "2px solid #0d0d0d",
          boxShadow: "6px 6px 0 rgba(13,13,13,.25)",
          padding: "16px 18px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* The paperclip. */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -12,
            right: 28,
            width: 16,
            height: 40,
            border: "3px solid #6a675f",
            borderRadius: 9,
            background: "transparent",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            paddingTop: 18,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {format(t.fileLabel, { n: number })}
            </span>
            <span
              style={{
                fontFamily: ARCHIVO,
                fontSize: "clamp(30px, 9vw, 44px)",
                textTransform: "uppercase",
                lineHeight: 1,
                wordBreak: "break-word",
              }}
            >
              {player.name}
            </span>
          </div>

          {!player.alive && (
            <span
              style={{
                display: "inline-block",
                fontFamily: ARCHIVO,
                fontSize: 14,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                lineHeight: 1,
                color: "#E8202A",
                border: "4px double #E8202A",
                padding: "6px 10px",
                transform: "rotate(8deg)",
              }}
            >
              {t.eliminated}
            </span>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto minmax(0,1fr)",
            gap: "10px 16px",
            fontSize: 15,
            borderTop: "2px solid #0d0d0d",
            paddingTop: 14,
          }}
        >
          <span style={LABEL}>{t.status}</span>
          <span>{player.alive ? t.active : t.eliminated}</span>
          <span style={LABEL}>{t.role}</span>
          {/* Blacked out: the role is the one thing this drawer must not leak. */}
          <span
            style={{
              display: "inline-block",
              justifySelf: "start",
              background: "#0d0d0d",
              color: "#0d0d0d",
              padding: "0 6px",
              userSelect: "none",
            }}
          >
            {t.roleHidden}
          </span>
        </div>

        {challenge && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={LABEL}>{t.challengeKicker}</span>

            {/*
              A player who is out has nothing left to steer, so their
              challenge is no longer worth hiding — only a living one stays
              behind the bar.
            */}
            {revealed || player.challengeDone || !player.alive ? (
              <div
                style={{
                  borderLeft: "4px solid #0d0d0d",
                  padding: "4px 0 4px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  animation: "popIn .3s both",
                }}
              >
                <span
                  style={{
                    fontFamily: ARCHIVO,
                    fontSize: 20,
                    textTransform: "uppercase",
                  }}
                >
                  {challenge.t}
                </span>
                <span style={{ fontSize: 15, lineHeight: 1.5 }}>
                  {challenge.d}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>
                  {format(t.challengeReward, { n: reward })}
                </span>
              </div>
            ) : (
              <Press
                onClick={onReveal}
                style={{
                  textAlign: "left",
                  fontFamily: "inherit",
                  background: "#0d0d0d",
                  color: "#F3F0E8",
                  border: "none",
                  padding: 16,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ height: 12, width: "70%", background: "#2a2926" }}
                />
                <span
                  aria-hidden="true"
                  style={{ height: 12, width: "90%", background: "#2a2926" }}
                />
                <span
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#FFD23F",
                    textAlign: "center",
                  }}
                >
                  {t.reveal}
                </span>
              </Press>
            )}
          </div>
        )}

        {challenge && player.alive && !player.challengeDone && (
          <Press
            onClick={onDone}
            style={{
              fontFamily: ARCHIVO,
              fontSize: 15,
              textTransform: "uppercase",
              background: "#3DD6FF",
              color: "#0d0d0d",
              border: "3px solid #0d0d0d",
              padding: 15,
              boxShadow: "4px 4px 0 #0d0d0d",
              cursor: "pointer",
            }}
            press={{
              transform: "translate(3px,3px)",
              boxShadow: "1px 1px 0 #0d0d0d",
            }}
          >
            {t.challengeDone}
          </Press>
        )}

        {player.challengeDone && (
          <div
            style={{
              alignSelf: "flex-end",
              margin: "4px 6px 0 0",
              transform: "rotate(-9deg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "10px 16px 9px",
              color: "#E8202A",
              border: "5px double #E8202A",
            }}
          >
            <span
              style={{
                fontFamily: ARCHIVO,
                fontSize: 22,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              {t.achieved}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                borderTop: "2px solid #E8202A",
                paddingTop: 3,
              }}
            >
              {format(t.challengeHandOut, { n: reward })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const LABEL = {
  fontWeight: 700,
  textTransform: "uppercase",
  fontSize: 12,
  letterSpacing: ".14em",
  paddingTop: 2,
} as const;
