"use client";

import { useState } from "react";
import DealScreen from "@/components/screens/DealScreen";
import ElimScreen from "@/components/screens/ElimScreen";
import EndScreen from "@/components/screens/EndScreen";
import GuessScreen from "@/components/screens/GuessScreen";
import HintScreen from "@/components/screens/HintScreen";
import NamesScreen from "@/components/screens/NamesScreen";
import RevealScreen from "@/components/screens/RevealScreen";
import SetupScreen from "@/components/screens/SetupScreen";
import StartScreen from "@/components/screens/StartScreen";
import VoteScreen from "@/components/screens/VoteScreen";
import { useSettings } from "@/components/game/useSettings";
import {
  deal,
  eliminate,
  openingOrder,
  outcomeOf,
  withPlayers,
  type Game,
  type Lineup,
  type Outcome,
} from "@/lib/game";
import { format, type Dictionary, type Locale } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  lang: Locale;
};

/**
 * Each stage carries exactly what its screen needs, so no screen can be
 * reached without its data and there are no nullable fields to guard.
 */
type Stage =
  | { name: "setup" }
  | { name: "names" }
  | { name: "deal"; game: Game }
  | { name: "reveal"; game: Game; index: number }
  | { name: "start"; game: Game; order: number[] }
  | { name: "hint"; game: Game; order: number[]; index: number }
  | { name: "vote"; game: Game; order: number[] }
  | { name: "elim"; game: Game; order: number[]; index: number }
  | { name: "guess"; game: Game; order: number[]; index: number }
  | { name: "end"; game: Game; outcome: Outcome };

export default function PlayFlow({ dict, lang }: Props) {
  const [settings] = useSettings(lang);
  const [stage, setStage] = useState<Stage>({ name: "setup" });
  const [lineup, setLineup] = useState<Lineup>(() =>
    withPlayers({ players: 6, undercovers: 1, mrWhites: 1 }, 6),
  );
  const [names, setNames] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  function dealGame() {
    setNotes({});
    setStage({
      name: "deal",
      game: deal({
        lineup,
        names,
        fallbackName: (index) =>
          format(dict.names.placeholder, { number: index + 1 }),
        categories: settings.categories,
        difficulty: settings.difficulty,
        custom: settings.custom,
        wordLanguage: settings.wordLanguage,
      }),
    });
  }

  function markSeen(game: Game, index: number): Game {
    return {
      ...game,
      players: game.players.map((player, i) =>
        i === index ? { ...player, seen: true } : player,
      ),
    };
  }

  function openRound(game: Game) {
    const { order } = openingOrder(game, settings.mrWhiteNeverFirst);
    setStage({ name: "start", game, order });
  }

  /** Either the case is closed, or the next clue round begins. */
  function settle(game: Game, mrWhiteGuessed: boolean) {
    if (mrWhiteGuessed) {
      setStage({ name: "end", game, outcome: "mrwhite" });
      return;
    }

    const outcome = outcomeOf(game);
    if (outcome) {
      setStage({ name: "end", game, outcome });
      return;
    }

    openRound({ ...game, round: game.round + 1 });
  }

  switch (stage.name) {
    case "setup":
      return (
        <SetupScreen
          dict={dict}
          lang={lang}
          lineup={lineup}
          onChange={setLineup}
          onNext={() => setStage({ name: "names" })}
        />
      );

    case "names":
      return (
        <NamesScreen
          dict={dict}
          count={lineup.players}
          names={names}
          onChange={setNames}
          onBack={() => setStage({ name: "setup" })}
          onDeal={dealGame}
        />
      );

    case "deal":
      return (
        <DealScreen
          dict={dict}
          game={stage.game}
          onBack={() => setStage({ name: "names" })}
          onOpen={(index) =>
            setStage({ name: "reveal", game: stage.game, index })
          }
          onDealAgain={dealGame}
          onStart={() => openRound(stage.game)}
        />
      );

    case "reveal":
      return (
        <RevealScreen
          dict={dict}
          player={stage.game.players[stage.index]}
          index={stage.index}
          onHeld={() =>
            setStage({
              name: "reveal",
              game: markSeen(stage.game, stage.index),
              index: stage.index,
            })
          }
          onDone={() => setStage({ name: "deal", game: stage.game })}
        />
      );

    case "start":
      return (
        <StartScreen
          dict={dict}
          game={stage.game}
          order={stage.order}
          onBegin={() =>
            setStage({
              name: "hint",
              game: stage.game,
              order: stage.order,
              index: 0,
            })
          }
        />
      );

    case "hint":
      return (
        <HintScreen
          dict={dict}
          game={stage.game}
          order={stage.order}
          index={stage.index}
          timer={settings.timer}
          notes={notes}
          onNote={(key, value) =>
            setNotes((current) => ({ ...current, [key]: value }))
          }
          onNext={() =>
            stage.index < stage.order.length - 1
              ? setStage({ ...stage, index: stage.index + 1 })
              : setStage({ name: "vote", game: stage.game, order: stage.order })
          }
          onVote={() =>
            setStage({ name: "vote", game: stage.game, order: stage.order })
          }
        />
      );

    case "vote":
      return (
        <VoteScreen
          dict={dict}
          game={stage.game}
          notes={notes}
          onPick={(index) =>
            setStage({
              name: "elim",
              game: eliminate(stage.game, index),
              order: stage.order,
              index,
            })
          }
        />
      );

    case "elim":
      return (
        <ElimScreen
          dict={dict}
          player={stage.game.players[stage.index]}
          index={stage.index}
          mrWhiteGuesses={settings.mrWhiteGuess}
          onContinue={() => {
            const player = stage.game.players[stage.index];
            if (player.role === "mrwhite" && settings.mrWhiteGuess) {
              setStage({ ...stage, name: "guess" });
              return;
            }
            settle(stage.game, false);
          }}
        />
      );

    case "guess":
      return (
        <GuessScreen
          dict={dict}
          game={stage.game}
          onResolved={(correct) => settle(stage.game, correct)}
        />
      );

    case "end":
      return (
        <EndScreen
          dict={dict}
          game={stage.game}
          outcome={stage.outcome}
          lang={lang}
          onNewCase={dealGame}
        />
      );
  }
}
