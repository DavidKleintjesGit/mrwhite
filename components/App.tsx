"use client";

import {
  useMemo,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import CardScreen from "@/components/screens/CardScreen";
import CaseFileDrawer from "@/components/screens/CaseFileDrawer";
import ChargeSheet from "@/components/screens/ChargeSheet";
import DealScreen from "@/components/screens/DealScreen";
import DrinkRulesScreen from "@/components/screens/DrinkRulesScreen";
import {
  CategoryDialog,
  ConfirmDialog,
  LanguageDialog,
} from "@/components/screens/Dialogs";
import EndScreen from "@/components/screens/EndScreen";
import GuessScreen from "@/components/screens/GuessScreen";
import HintScreen from "@/components/screens/HintScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import ModesScreen from "@/components/screens/ModesScreen";
import NamesScreen from "@/components/screens/NamesScreen";
import RulesScreen from "@/components/screens/RulesScreen";
import SecretVoteScreen from "@/components/screens/SecretVoteScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import Press from "@/components/ui/Press";
import SetupScreen from "@/components/screens/SetupScreen";
import UnmaskScreen from "@/components/screens/UnmaskScreen";
import VoteScreen from "@/components/screens/VoteScreen";
import { dealChallenges, drawRules } from "@/lib/drink";
import {
  clampPlayers,
  deal,
  drinkersFor,
  eliminate,
  fitRoles,
  openingOrder,
  outcomeOf,
  tallyVotes,
  type Mode,
  type Player,
  type WordPair,
} from "@/lib/game";
import {
  LOCALE_NAMES,
  LOCALE_STORAGE_KEY,
  format,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";
import {
  THEMES,
  parseStored,
  readStored,
  writeStored,
  type Settings,
  type Stored,
} from "@/lib/settings";
import type { Stage } from "@/lib/stage";

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
  const saved = useMemo(() => parseStored(raw), [raw]);

  const [edited, setEdited] = useState<Stored | null>(null);
  const stored = edited ?? saved;
  const { settings } = stored;

  const { stage } = stored;
  const [dialog, setDialog] = useState<Dialog>("none");
  const [selected, setSelected] = useState<number | null>(null);
  /** The rule cards reshuffling; a flourish, so it stays out of storage. */
  const [rolling, setRolling] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drink = stored.mode === "drink";
  /** The Drinking Edition deals its house rules as a step of its own. */
  const steps = drink ? 4 : 3;

  function save(change: Partial<Stored>) {
    const next = { ...stored, ...change };
    setEdited(next);
    writeStored(next);
  }

  /**
   * Every screen change is written, so a reload lands where you left off.
   *
   * Anything that has to change along with the screen goes in the same call.
   * `save` builds from the `stored` of this render, so two calls in a row
   * would have the second quietly undo the first.
   */
  function setStage(next: Stage, also: Partial<Stored> = {}) {
    save({ ...also, stage: next, stageAt: Date.now() });
  }

  function updateSettings(change: Partial<Settings>) {
    save({ settings: { ...settings, ...change } });
  }

  function go(next: Stage, also: Partial<Stored> = {}) {
    setStage(next, also);
    setSelected(null);
    try {
      window.scrollTo(0, 0);
    } catch {
      // Scrolling is a nicety; the screen still changes without it.
    }
  }

  // --- Moves ---------------------------------------------------------------

  function startDeal() {
    const rules = drink ? drawRules(settings.drinkCats) : [];
    const { players, pair } = deal({
      players: stored.nPlayers,
      undercovers: stored.nUnder,
      whites: stored.nWhite,
      names: stored.names,
      lang,
      buckets: settings.cats,
      difficulty: settings.diff,
      custom: settings.custom,
      fallbackName: (index) => format(dict.names.placeholder, { n: index + 1 }),
      challenges: drink ? dealChallenges(stored.nPlayers) : undefined,
    });
    setDialog("none");
    // The Drinking Edition reads its house rules before anyone gets a role:
    // the rules change how you phrase a clue, so seeing them afterwards
    // would mean rethinking a clue you had already settled on.
    go(
      drink
        ? { name: "drules", players, pair, rules }
        : { name: "deal", players, pair },
      { rules }
    );
  }

  function pickMode(mode: Mode) {
    const players = clampPlayers(stored.nPlayers, mode);
    const { undercovers, whites } = fitRoles(
      players,
      stored.nUnder,
      stored.nWhite,
      mode
    );
    go(
      { name: "setup" },
      { mode, nPlayers: players, nUnder: undercovers, nWhite: whites }
    );
  }

  function reroll() {
    setRolling(true);
    setTimeout(() => {
      const rules = drawRules(settings.drinkCats);
      setRolling(false);
      if (stored.stage.name === "drules") {
        setStage({ ...stored.stage, rules }, { rules });
      } else {
        save({ rules });
      }
    }, 650);
  }

  /** The table says a rule was broken; the app only writes it down. */
  function recordOnPlayers(change: (players: Player[]) => Player[]) {
    const current = stored.stage;
    if (!("players" in current)) return;
    setStage({ ...current, players: change(current.players) });
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

  /** Classic votes out loud in one tap; the Drinking Edition votes alone. */
  function toVote(from: Extract<Stage, { name: "hint" }>): Stage {
    if (!drink) return { ...from, name: "vote" };
    return {
      name: "pvote",
      players: from.players,
      pair: from.pair,
      order: from.order,
      round: from.round,
      votes: {},
      voter: null,
      pick: null,
      phase: "grid",
      candidates: from.players.flatMap((player, i) =>
        player.alive ? [i] : []
      ),
      tie: null,
      revote: false,
    };
  }

  /**
   * Counts the secret vote. A tie sends the table back for a second round
   * between whoever was level, and nobody drinks for it — losing a sip to an
   * outcome that did not happen would be the one unfair thing in a game
   * built on the group policing itself.
   */
  function tally(from: Extract<Stage, { name: "pvote" }>) {
    const result = tallyVotes(from.votes);
    if (!result) return;

    if ("tie" in result) {
      setStage({
        ...from,
        phase: "tie",
        tie: result.tie,
        voter: null,
        pick: null,
      });
      return;
    }

    go({
      name: "unmask",
      players: eliminate(from.players, result.out, from.votes),
      pair: from.pair,
      index: result.out,
      round: from.round,
      drinkers: drinkersFor(from.players, result.out, from.votes),
    });
  }

  /** Either the case is closed, or the next clue round begins. */
  function resolve(players: Player[], pair: WordPair, round: number) {
    const winner = outcomeOf(players, stored.mode);
    if (winner) go({ name: "end", players, pair, winner });
    else startRound(players, pair, round + 1);
  }

  function setPlayerCount(delta: number) {
    const players = clampPlayers(stored.nPlayers + delta, stored.mode);
    const { undercovers, whites } = fitRoles(
      players,
      stored.nUnder,
      stored.nWhite,
      stored.mode
    );
    save({ nPlayers: players, nUnder: undercovers, nWhite: whites });
  }

  // --- Chrome --------------------------------------------------------------

  const theme = THEMES[settings.theme];
  /**
   * Switching language means loading the other language's page. That is a
   * full page load, which is fine: the game is saved on every move, so the
   * round comes straight back on the other side.
   */
  function switchLanguage(next: Locale) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Not remembering the choice is a nuisance, not a failure.
    }
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- each language is its own root layout, which the client router cannot cross
    window.location.assign(`/${next}/`);
  }

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
    // Room for the case-file tab hanging off the top edge, so no screen
    // tucks its first line underneath it. Zero everywhere else.
    "--toppad": "players" in stage && stage.name !== "card" ? "38px" : "0px",
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

      {/*
        The case file hangs off the top edge during a round, exactly where
        the design puts it: a rule gets broken mid-sentence and the moment
        passes if you have to navigate for it.
      */}
      {"players" in stage && stage.name !== "card" && !drawerOpen && (
        <Press
          onClick={() => setDrawerOpen(true)}
          style={{
            position: "absolute",
            top: 0,
            right: "max(16px, calc((100% - 1240px) / 2 + 20px))",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-archivo-black), sans-serif",
            fontSize: 12,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            background: "#E9DDB8",
            color: "#0d0d0d",
            border: "2px solid #0d0d0d",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            padding: "9px 14px 10px",
            boxShadow: "3px 3px 0 #FFD23F",
            cursor: "pointer",
            transition: "padding .15s",
          }}
          hover={{ paddingTop: 13 }}
          press={{ paddingTop: 15 }}
        >
          {dict.drink.sheetOpen}
        </Press>
      )}

      {drawerOpen && "players" in stage && (
        <CaseFileDrawer
          dict={dict}
          players={stage.players}
          rules={stored.rules}
          drink={drink}
          onChallengeDone={(index) =>
            recordOnPlayers((players) =>
              players.map((player, i) =>
                i === index ? { ...player, challengeDone: true } : player
              )
            )
          }
          onOpenSheet={() => {
            setDrawerOpen(false);
            setSheetOpen(true);
          }}
          onQuit={() => {
            setDrawerOpen(false);
            go({ name: "home" });
          }}
          onClose={() => setDrawerOpen(false)}
        />
      )}

      {sheetOpen && "players" in stage && (
        <ChargeSheet
          dict={dict}
          players={stage.players}
          onViolation={(index) =>
            recordOnPlayers((players) =>
              players.map((player, i) =>
                i === index ? { ...player, sips: player.sips + 1 } : player
              )
            )
          }
          onChallengeDone={(index) =>
            recordOnPlayers((players) =>
              players.map((player, i) =>
                i === index ? { ...player, challengeDone: true } : player
              )
            )
          }
          onClose={() => setSheetOpen(false)}
        />
      )}

      {dialog === "categories" && (
        <CategoryDialog
          dict={dict}
          lang={lang}
          settings={settings}
          update={updateSettings}
          onClose={() => setDialog("none")}
        />
      )}
      {dialog === "language" && (
        <LanguageDialog
          dict={dict}
          current={lang}
          onPick={switchLanguage}
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
            langCode={lang.toUpperCase()}
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
            onPlay={() => go({ name: "modes" })}
            onRules={() => go({ name: "rules" })}
            onSettings={() => go({ name: "settings" })}
          />
        );

      case "rules":
        return (
          <RulesScreen
            dict={dict}
            onBack={() => go({ name: "home" })}
            onPlay={() => go({ name: "modes" })}
          />
        );

      case "modes":
        return (
          <ModesScreen
            dict={dict}
            onBack={() => go({ name: "home" })}
            onPick={pickMode}
          />
        );

      case "settings":
        return (
          <SettingsScreen
            dict={dict}
            settings={settings}
            update={updateSettings}
            langCode={lang.toUpperCase()}
            langName={LOCALE_NAMES[lang]}
            onBack={() => go({ name: "home" })}
            onOpenCategories={() => setDialog("categories")}
            onOpenLanguage={() => setDialog("language")}
          />
        );

      case "setup":
        return (
          <SetupScreen
            dict={dict}
            steps={steps}
            modeName={drink ? dict.modes.drinkTitle : dict.modes.classicTitle}
            players={stored.nPlayers}
            undercovers={stored.nUnder}
            whites={stored.nWhite}
            onPlayers={setPlayerCount}
            onUndercovers={(delta) => save({ nUnder: stored.nUnder + delta })}
            onWhites={(delta) => save({ nWhite: stored.nWhite + delta })}
            onBack={() => go({ name: "modes" })}
            onNext={() => go({ name: "names" })}
          />
        );

      case "names":
        return (
          <NamesScreen
            dict={dict}
            steps={steps}
            dealLabel={drink ? dict.drink.namesCta : dict.names.deal}
            players={stored.nPlayers}
            names={stored.names}
            onChange={(names) => save({ names })}
            onBack={() => go({ name: "setup" })}
            onDeal={startDeal}
          />
        );

      case "drules":
        return (
          <DrinkRulesScreen
            dict={dict}
            rules={stage.rules}
            rolling={rolling}
            onBack={() => go({ name: "names" })}
            onReroll={reroll}
            onNext={() =>
              go({ name: "deal", players: stage.players, pair: stage.pair })
            }
          />
        );

      case "deal":
        return (
          <DealScreen
            dict={dict}
            step={steps}
            steps={steps}
            players={stage.players}
            onBack={() =>
              go(
                drink
                  ? {
                      name: "drules",
                      players: stage.players,
                      pair: stage.pair,
                      rules: stored.rules,
                    }
                  : { name: "names" }
              )
            }
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
                  i === stage.index ? { ...player, seen: true } : player
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
                ? go(toVote(stage))
                : setStage({ ...stage, turn: stage.turn + 1 })
            }
            onVote={() => go(toVote(stage))}
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

      case "pvote":
        return (
          <SecretVoteScreen
            dict={dict}
            players={stage.players}
            round={stage.round}
            votes={stage.votes}
            voter={stage.voter}
            pick={stage.pick}
            phase={stage.phase}
            candidates={stage.candidates}
            tie={stage.tie}
            revote={stage.revote}
            onOpen={(voter) =>
              setStage({ ...stage, phase: "pick", voter, pick: null })
            }
            onPick={(pick) => setStage({ ...stage, pick })}
            onConfirm={() => {
              if (stage.voter === null || stage.pick === null) return;
              setStage({
                ...stage,
                votes: { ...stage.votes, [stage.voter]: stage.pick },
                phase: "grid",
                voter: null,
                pick: null,
              });
            }}
            onBackToGrid={() =>
              setStage({ ...stage, phase: "grid", voter: null, pick: null })
            }
            onTally={() => tally(stage)}
            onRevote={() =>
              go({
                ...stage,
                votes: {},
                phase: "grid",
                voter: null,
                pick: null,
                candidates: stage.tie ?? stage.candidates,
                tie: null,
                revote: true,
              })
            }
          />
        );

      case "unmask":
        return (
          <UnmaskScreen
            dict={dict}
            player={stage.players[stage.index]}
            mrGuess={settings.mrGuess}
            showDrinks={drink}
            drinkers={(stage.drinkers ?? []).map(
              (index) => stage.players[index].name
            )}
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
            drink={drink}
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
