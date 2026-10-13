"use client";

import {
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
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
  /** Hoeveel pixel de lade uit staat. */
  at: number;
  /** De breedte van de bak, in pixels: zo ver schuift hij dicht. */
  width: number;
  /** Of er op dit moment aan getrokken wordt. */
  dragging: boolean;
  /** Wat de greep aan de voorkant van de lade met de aanwijzer moet doen. */
  grip: {
    label: string;
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) => void;
    onPointerMove: (event: PointerEvent<HTMLButtonElement>) => void;
    onPointerUp: (event: PointerEvent<HTMLButtonElement>) => void;
    onPointerCancel: () => void;
  };
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
  at,
  width,
  dragging,
  grip,
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
    <>
      {/*
        Vangt tikken naast de lade op, maar verft niets. Zonder dit druk je
        tijdens een ronde zo op de knop die achter de lade langs nog
        zichtbaar is, en dat kost een potje. Met kleur zou het een venster
        worden, en dit is geen venster.
      */}
      {at > 0 && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, zIndex: 49 }}
        />
      )}

      {/*
        Hendel en bak staan náást elkaar in één rij, en die rij schuift als
        geheel. Daarom kan de greep niet van de lade af lopen: hij staat
        ernaast, hij wordt niet op zijn plek gerekend.

        Dicht is de rij `width` naar rechts geschoven — precies de breedte
        van de bak — zodat de bak buiten beeld staat en de greep op de rand
        blijft hangen.
      */}
      <div
        style={{
          position: "fixed",
          right: 0,
          top: "50%",
          zIndex: 50,
          display: "flex",
          alignItems: "stretch",
          height: "56dvh",
          transform: `translateY(-50%) translateX(${Math.max(
            0,
            width - at
          )}px)`,
          transition: dragging
            ? "none"
            : "transform .34s cubic-bezier(.22,.9,.3,1)",
        }}
      >
        <button
          type="button"
          aria-label={grip.label}
          onKeyDown={grip.onKeyDown}
          onPointerDown={grip.onPointerDown}
          onPointerMove={grip.onPointerMove}
          onPointerUp={grip.onPointerUp}
          onPointerCancel={grip.onPointerCancel}
          style={{
            position: "relative",
            width: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "grab",
            touchAction: "none",
          }}
        >
          {/*
            Rekt op waar een duim komt, zonder de rij breder te maken: dit
            ligt erbuiten en telt dus niet mee voor de opmaak, maar vangt
            wel aan.
          */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: -18,
              right: -6,
              top: 0,
              bottom: 0,
            }}
          />
          {/* Het front van de lade, met de metalen beugel erop. */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 104,
              background: "#1b1a14",
              border: "3px solid #0d0d0d",
              borderRight: "none",
              borderRadius: "12px 0 0 12px",
              boxShadow:
                "inset 0 2px 0 rgba(243,240,232,.14), -7px 0 20px rgba(13,13,13,.45)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 11,
                height: 62,
                borderRadius: 6,
                background:
                  "linear-gradient(90deg,#6f6a5c,#efece0 38%,#c3bdac 62%,#6f6a5c)",
                boxShadow:
                  "0 0 0 2px #0d0d0d, 3px 0 7px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.25)",
              }}
            />
          </span>
        </button>

        <div
          role="dialog"
          aria-modal={at > 0}
          aria-label={t.sheetOpen}
          onClick={(event) => event.stopPropagation()}
          style={{
            width,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            background: "#16150f",
            border: "3px solid #0d0d0d",
            borderRight: "none",
            padding: "12px 10px 14px 12px",
            boxShadow:
              "inset -14px 0 22px rgba(0,0,0,.55), inset 0 2px 0 rgba(243,240,232,.12), -14px 0 44px rgba(0,0,0,.6)",
          }}
        >
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              paddingTop: 14,
            }}
          >
            {/* The folder tabs along the top edge. */}
            <div
              className="case-tabs"
              style={{
                display: "flex",
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
              <FolderTab
                label={t.quit}
                colour="#FF3D3D"
                onClick={onQuit}
                className="case-bottom-wide"
              />

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

              {/*
            De inhoud ligt op een witte bladzijde in de map, niet direct op
            het karton. Daaronder steekt een tweede vel net uit, scheef,
            zodat het een stapel wordt in plaats van één blad.
          */}
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  padding: "18px 18px 20px 16px",
                }}
              >
                {/*
                De stapel onder het blad waar je op leest: drie vellen die
                er aan verschillende kanten net onderuit steken, elk een
                graadje anders. En daartussen de briefjes die iemand erin
                heeft gestopt, met hun hoekje buiten het papier.
              */}
                {SLIPS.map((slip) => (
                  <span
                    key={slip.top}
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      right: slip.right,
                      top: slip.top,
                      width: slip.width,
                      height: 13,
                      background: slip.colour,
                      border: "2px solid rgba(13,13,13,.55)",
                      borderRadius: "2px 0 0 2px",
                      transform: `rotate(${slip.tilt}deg)`,
                    }}
                  />
                ))}

                {/*
                Het hechtmechaniek: een metalen strip langs de linkerrand met
                twee tongen die over de bladen heen zijn omgeslagen. Dit waren
                drie losse ringen, maar die lagen als rondjes op het papier
                zonder er iets mee te doen — een clip laat zien dát hij
                vasthoudt.
              */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 14,
                    bottom: 14,
                    width: 11,
                    borderRadius: 3,
                    background:
                      "linear-gradient(90deg,#6c6759,#e4e0d2 42%,#b5afa0 64%,#6c6759)",
                    boxShadow: "0 0 0 1px rgba(13,13,13,.55)",
                    zIndex: 3,
                  }}
                />
                {[0.26, 0.74].map((y) => (
                  <span
                    key={y}
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 8,
                      top: `calc(${y * 100}% - 6px)`,
                      width: 46,
                      height: 12,
                      borderRadius: "3px 6px 6px 3px",
                      background:
                        "linear-gradient(180deg,#f1eee2,#bdb7a7 55%,#7d7769)",
                      boxShadow:
                        "0 0 0 1px rgba(13,13,13,.55), 2px 3px 6px rgba(13,13,13,.4)",
                      zIndex: 4,
                    }}
                  />
                ))}

                {SHEETS.map((sheet) => (
                  <span
                    key={sheet.tilt}
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: sheet.top,
                      left: sheet.left,
                      right: sheet.right,
                      bottom: sheet.bottom,
                      background: sheet.tone,
                      border: "2px solid rgba(13,13,13,.3)",
                      transform: `rotate(${sheet.tilt}deg)`,
                    }}
                  />
                ))}
                <div
                  style={{
                    position: "relative",
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    overflowX: "hidden",
                    background: "#FDFBF3",
                    border: "2px solid rgba(13,13,13,.55)",
                    boxShadow: "0 3px 10px rgba(13,13,13,.22)",
                    padding: 18,
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
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 18,
                      }}
                    >
                      <Heading text={t.houseRules} />
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45 }}>
                        {t.rulesHelp}
                      </p>
                      {rules.map((id, index) => {
                        const rule =
                          t.rules[String(id) as keyof typeof t.rules];
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
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 18,
                      }}
                    >
                      <Heading text={t.agents} />
                      {drink && (
                        <p
                          style={{ margin: 0, fontSize: 15, lineHeight: 1.45 }}
                        >
                          {t.challengeCheck}
                        </p>
                      )}
                      <div className="case-folders">
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
            </div>

            {/*
          The tabs that hang under the folder on a narrow screen, where the
          row above has no width left for them. Both look closed: neither is
          a section you can stand on, so they keep every edge and the darker
          card stock.
        */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 6,
                marginRight: 16,
              }}
            >
              <Press
                className="case-bottom-narrow"
                onClick={onQuit}
                style={{ ...UNDER_TAB, background: "#FF3D3D" }}
              >
                {t.quit}
              </Press>
              <Press
                className="case-close-narrow"
                onClick={onClose}
                style={UNDER_TAB}
              >
                {t.sheetClose}
              </Press>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** A tab hanging under the folder rather than over it. */
const UNDER_TAB: CSSProperties = {
  position: "relative",
  top: -3,
  fontFamily: ARCHIVO,
  fontSize: 12,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  background: "#C9B987",
  color: "#0d0d0d",
  border: "3px solid #0d0d0d",
  borderRadius: "0 0 10px 10px",
  padding: "10px 16px",
  cursor: "pointer",
};

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
      className={["case-tab", className].filter(Boolean).join(" ")}
      onClick={onClick}
      style={{
        position: "relative",
        zIndex: 1,
        top: 3,
        ...(atRight ? { marginLeft: "auto" } : null),
        fontFamily: ARCHIVO,
        fontSize: 13,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        background: colour ?? (active ? "#E9DDB8" : "#C9B987"),
        color: "#0d0d0d",
        border: "3px solid #0d0d0d",
        // Only the open tab loses its bottom edge, so it runs into the folder
        // and reads as the page you are standing on. The others keep theirs,
        // and so do the ones that are not pages at all — closing and leaving
        // take you somewhere else rather than opening a section.
        borderBottom: active ? "none" : "3px solid #0d0d0d",
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
            // In the card rather than over it. The design stamps it across
            // the corner, which works on its 170px folders; at the 130px two
            // columns need on a phone there is no corner left to cross
            // without landing on the name or the status.
            alignSelf: "flex-end",
            marginTop: 2,
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

/**
 * De vellen onder het blad waar je op leest. Ze steken elk aan een andere
 * kant uit en staan een graadje scheef; precies gestapeld papier bestaat
 * niet en leest als een drukfout.
 */
const SHEETS = [
  { top: 26, left: 26, right: 4, bottom: 6, tilt: 1.6, tone: "#EBE5D2" },
  { top: 22, left: 22, right: 8, bottom: 11, tilt: -0.9, tone: "#F1EDDE" },
  { top: 19, left: 19, right: 12, bottom: 15, tilt: 0.5, tone: "#F7F3E8" },
];

/** De briefjes die tussen de bladen uitsteken. */
const SLIPS = [
  { top: "17%", right: 2, width: 27, tilt: -2, colour: "#FFD23F" },
  { top: "39%", right: 5, width: 20, tilt: 1.5, colour: "#FF3D3D" },
  { top: "62%", right: 1, width: 24, tilt: -1, colour: "#3DD6FF" },
  { top: "80%", right: 6, width: 17, tilt: 2.5, colour: "#E9DDB8" },
];
