"use client";

import { useState } from "react";
import ClueRound from "@/components/ClueRound";
import Elimination from "@/components/Elimination";
import FirstClue from "@/components/FirstClue";
import LineupPicker from "@/components/LineupPicker";
import MrWhiteGuess from "@/components/MrWhiteGuess";
import NameEntry from "@/components/NameEntry";
import Result from "@/components/Result";
import Screen from "@/components/Screen";
import Voting from "@/components/Voting";
import WordReveal from "@/components/WordReveal";
import {
  dealRound,
  eliminate,
  isCivilianWord,
  outcomeOf,
  suggestedFor,
  type Lineup,
  type Outcome,
  type Player,
  type Round,
} from "@/lib/game";
import type { Dictionary, Locale } from "@/lib/i18n";
import { randomWordPair } from "@/lib/words";

/** Only the names are kept between games; a half-played round is not. */
const NAMES_STORAGE_KEY = "mrwhite.names";

/**
 * A round only exists once it has been dealt, and the stages after a vote only
 * exist with the player that was voted out, so both travel with the stage
 * rather than sitting in nullable fields. No screen can then be reached
 * without the data it needs.
 */
type Stage =
  | { name: "lineup" }
  | { name: "names" }
  | { name: "reveal"; round: Round }
  | { name: "firstClue"; round: Round }
  | { name: "clues"; round: Round }
  | { name: "voting"; round: Round }
  | { name: "elimination"; round: Round; player: Player }
  | { name: "mrWhiteGuess"; round: Round; player: Player }
  | {
      name: "result";
      round: Round;
      outcome: Outcome;
      guessedBy: Player | null;
    };

type Props = {
  dict: Dictionary;
  lang: Locale;
  homeHref: string;
};

function readStoredNames(): string[] {
  try {
    const raw = localStorage.getItem(NAMES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((name): name is string => typeof name === "string");
  } catch {
    // Unreadable or blocked storage just means starting with empty fields.
    return [];
  }
}

function storeNames(names: readonly string[]) {
  try {
    localStorage.setItem(NAMES_STORAGE_KEY, JSON.stringify(names));
  } catch {
    // Not remembering the names is a nuisance, not a failure.
  }
}

export default function PlayFlow({ dict, lang, homeHref }: Props) {
  const [stage, setStage] = useState<Stage>({ name: "lineup" });
  const [lineup, setLineup] = useState<Lineup>(() => suggestedFor(6));
  const [names, setNames] = useState<string[]>([]);

  function goToNames() {
    // Read here rather than on mount: the page is prerendered, so touching
    // localStorage during render would not match the server-rendered HTML.
    if (names.length === 0) setNames(readStoredNames());
    setStage({ name: "names" });
  }

  function deal(forNames: readonly string[]) {
    setStage({
      name: "reveal",
      round: dealRound(lineup, forNames, randomWordPair(lang)),
    });
  }

  function confirmNames(confirmed: string[]) {
    setNames(confirmed);
    storeNames(confirmed);
    deal(confirmed);
  }

  function markSeen(playerId: string) {
    setStage((current) => {
      if (current.name !== "reveal") return current;
      return {
        ...current,
        round: {
          ...current.round,
          players: current.round.players.map((player) =>
            player.id === playerId ? { ...player, seenWord: true } : player,
          ),
        },
      };
    });
  }

  function voteOut(round: Round, playerId: string) {
    const player = round.players.find((candidate) => candidate.id === playerId);
    if (!player) return;
    setStage({
      name: "elimination",
      round: eliminate(round, playerId),
      player,
    });
  }

  /** Either the game is over, or another clue round starts. */
  function settle(round: Round, guessedBy: Player | null) {
    const outcome = outcomeOf(round);
    setStage(
      outcome
        ? { name: "result", round, outcome, guessedBy }
        : { name: "clues", round },
    );
  }

  function afterElimination(round: Round, player: Player) {
    // A voted-out Mr. White still gets his one guess at the civilians' word.
    if (player.role === "mrwhite") {
      setStage({ name: "mrWhiteGuess", round, player });
      return;
    }
    settle(round, null);
  }

  function submitGuess(round: Round, player: Player, guess: string) {
    if (isCivilianWord(round, guess)) {
      setStage({
        name: "result",
        round,
        outcome: "infiltrators",
        guessedBy: player,
      });
      return;
    }
    settle(round, null);
  }

  const back = dict.common.back;

  switch (stage.name) {
    case "lineup":
      return (
        <Screen title={dict.play.title} backLabel={back} backHref={homeHref}>
          <LineupPicker
            dict={dict.play}
            lineup={lineup}
            onChange={setLineup}
            onConfirm={goToNames}
          />
        </Screen>
      );

    case "names":
      return (
        <Screen
          title={dict.play.names.title}
          backLabel={back}
          onBack={() => setStage({ name: "lineup" })}
          wide
        >
          <NameEntry
            dict={dict.play}
            count={lineup.players}
            initialNames={names}
            onBack={() => setStage({ name: "lineup" })}
            onConfirm={confirmNames}
          />
        </Screen>
      );

    case "reveal":
      return (
        <Screen
          title={dict.play.reveal.title}
          backLabel={back}
          onBack={() => setStage({ name: "names" })}
          wide
        >
          <WordReveal
            dict={dict.play}
            round={stage.round}
            onSeen={markSeen}
            onReDeal={() => deal(names)}
            onStart={() => setStage({ name: "firstClue", round: stage.round })}
          />
        </Screen>
      );

    // From here on there is no way back: the words are out of reach and a vote
    // cannot be undone. See CONCEPT.md.
    case "firstClue":
      return (
        <Screen title={dict.play.firstClue.title}>
          <FirstClue
            dict={dict.play}
            round={stage.round}
            onContinue={() => setStage({ name: "clues", round: stage.round })}
          />
        </Screen>
      );

    case "clues":
      return (
        <Screen title={dict.play.clues.title} wide>
          <ClueRound
            dict={dict.play}
            round={stage.round}
            onDone={() => setStage({ name: "voting", round: stage.round })}
          />
        </Screen>
      );

    case "voting":
      return (
        <Screen title={dict.play.voting.title} wide>
          <Voting
            dict={dict.play}
            round={stage.round}
            onEliminate={(playerId) => voteOut(stage.round, playerId)}
          />
        </Screen>
      );

    case "elimination":
      return (
        <Screen title={dict.play.elimination.title}>
          <Elimination
            dict={dict.play}
            player={stage.player}
            onContinue={() => afterElimination(stage.round, stage.player)}
          />
        </Screen>
      );

    case "mrWhiteGuess":
      return (
        <Screen title={dict.play.mrWhiteGuess.title}>
          <MrWhiteGuess
            dict={dict.play}
            player={stage.player}
            onGuess={(guess) => submitGuess(stage.round, stage.player, guess)}
          />
        </Screen>
      );

    case "result":
      return (
        <Screen title={dict.play.result.title} wide>
          <Result
            dict={dict.play}
            round={stage.round}
            outcome={stage.outcome}
            guessedBy={stage.guessedBy}
            onNewGame={() => setStage({ name: "lineup" })}
          />
        </Screen>
      );
  }
}
