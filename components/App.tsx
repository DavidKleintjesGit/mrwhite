"use client";

import {
  useMemo,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import CardScreen from "@/components/screens/CardScreen";
import DealScreen from "@/components/screens/DealScreen";
import {
  CategoryDialog,
  ConfirmDialog,
  LanguageDialog,
} from "@/components/screens/Dialogs";
import EndScreen from "@/components/screens/EndScreen";
import GuessScreen from "@/components/screens/GuessScreen";
import HintScreen from "@/components/screens/HintScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import NamesScreen from "@/components/screens/NamesScreen";
import RulesScreen from "@/components/screens/RulesScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import SetupScreen from "@/components/screens/SetupScreen";
import UnmaskScreen from "@/components/screens/UnmaskScreen";
import VoteScreen from "@/components/screens/VoteScreen";
import {
  clampPlayers,
  deal,
  eliminate,
  fitRoles,
  openingOrder,
  outcomeOf,
  type Player,
  type WordPair,
} from "@/lib/game";
import { format, type Dictionary, type Locale } from "@/lib/i18n";
import {
  THEMES,
  parseStored,
  readStored,
  writeStored,
  type Settings,
  type Stored,
} from "@/lib/settings";
import type { Stage } from "@/lib/stage";
import { LANGS } from "@/lib/words";

type Props = {
  dict: Dictionary;
  lang: Locale;
};

type Dialog = "none" | "categories" | "language" | "confirm";

/** The stored settings do not change behind our back while a page is open. */
const subscribe = () => () => {};

export default function App({ dict, lang }: Props) {
  // Read through useSyncExternalStore so the prerendered HTML and the first
  // client render agree, and the saved settings arrive without an effect.
  const raw = useSyncExternalStore(subscribe, readStored, () => null);
  const saved = useMemo(() => parseStored(raw, lang), [raw, lang]);

  const [edited, setEdited] = useState<Stored | null>(null);
  const stored = edited ?? saved;
  const { settings } = stored;

  const { stage } = stored;
  const [dialog, setDialog] = useState<Dialog>("none");
  const [selected, setSelected] = useState<number | null>(null);

  function save(change: Partial<Stored>) {
    const next = { ...stored, ...change };
    setEdited(next);
    writeStored(next);
  }

  /** Every screen change is written, so a reload lands where you left off. */
  function setStage(next: Stage) {
    save({ stage: next, stageAt: Date.now() });
  }

  function updateSettings(change: Partial<Settings>) {
    save({ settings: { ...settings, ...change } });
  }

  function go(next: Stage) {
    setStage(next);
    setSelected(null);
    try {
      window.scrollTo(0, 0);
    } catch {
      // Scrolling is a nicety; the screen still changes without it.
    }
  }

  // --- Moves ---------------------------------------------------------------

  function startDeal() {
    const { players, pair } = deal({
      players: stored.nPlayers,
      undercovers: stored.nUnder,
      whites: stored.nWhite,
      names: stored.names,
      lang: settings.lang,
      buckets: settings.cats,
      difficulty: settings.diff,
      custom: settings.custom,
      fallbackName: (index) =>
        format(dict.names.placeholder, { n: index + 1 }),
    });
    setDialog("none");
    go({ name: "deal", players, pair });
  }

  function startRound(players: Player[], pair: WordPair, round: number) {
    go({
      name: "hint",
      players,
      pair,
      order: openingOrder(players, settings.mrNotFirst),
      turn: 0,
      round,
    });
  }

  /** Either the case is closed, or the next clue round begins. */
  function resolve(players: Player[], pair: WordPair, round: number) {
    const winner = outcomeOf(players);
    if (winner) go({ name: "end", players, pair, winner });
    else startRound(players, pair, round + 1);
  }

  function setPlayerCount(delta: number) {
    const players = clampPlayers(stored.nPlayers + delta);
    const { undercovers, whites } = fitRoles(
      players,
      stored.nUnder,
      stored.nWhite,
    );
    save({ nPlayers: players, nUnder: undercovers, nWhite: whites });
  }

  // --- Chrome --------------------------------------------------------------

  const theme = THEMES[settings.theme];
  const current = LANGS.find((entry) => entry.id === settings.lang) ?? LANGS[0];

  const root: CSSProperties = {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    "--bg": theme.bg,
    "--fg": theme.fg,
    "--card": theme.card,
    "--muted": theme.muted,
    "--line": theme.line,
    "--off": theme.off,
    "--offfg": theme.offfg,
    "--hl": theme.hl,
    "--cy": theme.cy,
    "--dot": theme.dot,
    backgroundColor: "var(--bg)",
    backgroundImage: "radial-gradient(var(--dot) 1px, transparent 1.6px)",
    backgroundSize: "9px 9px",
    color: "var(--fg)",
    transition: "background-color .35s, color .35s",
    fontFamily: "var(--font-courier-prime), 'Courier New', monospace",
    userSelect: "none",
    WebkitUserSelect: "none",
  } as CSSProperties;

  return (
    <div style={root}>
      {/* The torchlight drifting across the whole page. */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-20%",
          left: "10%",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,250,230,.09) 0%, rgba(255,250,230,0) 60%)",
          pointerEvents: "none",
          animation: "sweep 14s ease-in-out infinite",
        }}
      />

      {renderStage()}

      {dialog === "categories" && (
        <CategoryDialog
          dict={dict}
          settings={settings}
          update={updateSettings}
          onClose={() => setDialog("none")}
        />
      )}
      {dialog === "language" && (
        <LanguageDialog
          dict={dict}
          settings={settings}
          update={updateSettings}
          onClose={() => setDialog("none")}
        />
      )}
      {dialog === "confirm" && (
        <ConfirmDialog
          dict={dict}
          onCancel={() => setDialog("none")}
          onConfirm={startDeal}
        />
      )}
    </div>
  );

  function renderStage() {
    switch (stage.name) {
      case "home":
        return (
          <HomeScreen
            dict={dict}
            langCode={current.id.toUpperCase()}
            langName={current.name}
            themeLabel={
              settings.theme === "licht"
                ? dict.settings.themeLight
                : dict.settings.themeDark
            }
            themeDot={settings.theme === "licht" ? "#F3F0E8" : "#0d0d0d"}
            onLanguage={() => setDialog("language")}
            onTheme={() =>
              updateSettings({
                theme: settings.theme === "licht" ? "donker" : "licht",
              })
            }
            onPlay={() => go({ name: "setup" })}
            onRules={() => go({ name: "rules" })}
            onSettings={() => go({ name: "settings" })}
          />
        );

      case "rules":
        return (
          <RulesScreen
            dict={dict}
            onBack={() => go({ name: "home" })}
            onPlay={() => go({ name: "setup" })}
          />
        );

      case "settings":
        return (
          <SettingsScreen
            dict={dict}
            settings={settings}
            update={updateSettings}
            langCode={current.id.toUpperCase()}
            langName={current.name}
            onBack={() => go({ name: "home" })}
            onOpenCategories={() => setDialog("categories")}
            onOpenLanguage={() => setDialog("language")}
          />
        );

      case "setup":
        return (
          <SetupScreen
            dict={dict}
            players={stored.nPlayers}
            undercovers={stored.nUnder}
            whites={stored.nWhite}
            onPlayers={setPlayerCount}
            onUndercovers={(delta) => save({ nUnder: stored.nUnder + delta })}
            onWhites={(delta) => save({ nWhite: stored.nWhite + delta })}
            onBack={() => go({ name: "home" })}
            onNext={() => go({ name: "names" })}
          />
        );

      case "names":
        return (
          <NamesScreen
            dict={dict}
            players={stored.nPlayers}
            names={stored.names}
            onChange={(names) => save({ names })}
            onBack={() => go({ name: "setup" })}
            onDeal={startDeal}
          />
        );

      case "deal":
        return (
          <DealScreen
            dict={dict}
            players={stage.players}
            onBack={() => go({ name: "names" })}
            onOpen={(index) => go({ ...stage, name: "card", index })}
            onReshuffle={() => setDialog("confirm")}
            onStart={() => startRound(stage.players, stage.pair, 1)}
          />
        );

      case "card":
        return (
          <CardScreen
            dict={dict}
            player={stage.players[stage.index]}
            onSeen={() =>
              setStage({
                ...stage,
                players: stage.players.map((player, i) =>
                  i === stage.index ? { ...player, seen: true } : player,
                ),
              })
            }
            onClose={() =>
              go({ name: "deal", players: stage.players, pair: stage.pair })
            }
          />
        );

      case "hint":
        return (
          <HintScreen
            dict={dict}
            players={stage.players}
            order={stage.order}
            turn={stage.turn}
            round={stage.round}
            timer={settings.timer}
            dark={settings.theme === "donker"}
            onNext={() =>
              stage.turn >= stage.order.length - 1
                ? go({ ...stage, name: "vote" })
                : setStage({ ...stage, turn: stage.turn + 1 })
            }
            onVote={() => go({ ...stage, name: "vote" })}
          />
        );

      case "vote":
        return (
          <VoteScreen
            dict={dict}
            players={stage.players}
            round={stage.round}
            selected={selected}
            onSelect={setSelected}
            onAnotherRound={() =>
              startRound(stage.players, stage.pair, stage.round)
            }
            onUnmask={() => {
              if (selected == null) return;
              go({
                name: "unmask",
                players: eliminate(stage.players, selected),
                pair: stage.pair,
                index: selected,
                round: stage.round,
              });
            }}
          />
        );

      case "unmask":
        return (
          <UnmaskScreen
            dict={dict}
            player={stage.players[stage.index]}
            mrGuess={settings.mrGuess}
            onContinue={() => {
              const player = stage.players[stage.index];
              if (player.role === "white" && settings.mrGuess) {
                go({ ...stage, name: "guess" });
                return;
              }
              resolve(stage.players, stage.pair, stage.round);
            }}
          />
        );

      case "guess":
        return (
          <GuessScreen
            dict={dict}
            name={stage.players[stage.index].name}
            pair={stage.pair}
            onWin={() =>
              go({
                name: "end",
                players: stage.players,
                pair: stage.pair,
                winner: "white",
              })
            }
            onMiss={() => resolve(stage.players, stage.pair, stage.round)}
          />
        );

      case "end":
        return (
          <EndScreen
            dict={dict}
            players={stage.players}
            pair={stage.pair}
            winner={stage.winner}
            onMenu={() => go({ name: "home" })}
            onAgain={startDeal}
          />
        );
    }
  }
}
