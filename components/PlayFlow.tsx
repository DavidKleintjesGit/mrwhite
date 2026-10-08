"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
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
  addScores,
  dealRound,
  eliminate,
  isCivilianWord,
  outcomeOf,
  reinstate,
  rolesOf,
  roundPoints,
  type Lineup,
  type Player,
  type Round,
} from "@/lib/game";
import type { Dictionary, Locale } from "@/lib/i18n";
import {
  freshSession,
  parseSession,
  readStoredSession,
  resetGame,
  writeSession,
  type Session,
  type Stage,
} from "@/lib/session";
import { randomWordPair } from "@/lib/words";

type Props = {
  dict: Dictionary;
  lang: Locale;
  homeHref: string;
};

/** The stored game never changes behind our back while this page is open. */
const subscribe = () => () => {};

export default function PlayFlow({ dict, lang, homeHref }: Props) {
  // Read through useSyncExternalStore so the prerendered HTML and the first
  // client render agree, and the saved game arrives without an effect.
  const stored = useSyncExternalStore(subscribe, readStoredSession, () => null);
  const restored = useMemo(() => parseSession(stored), [stored]);

  // Null until the first move; from then on this is the live game.
  const [edited, setEdited] = useState<Session | null>(null);
  const session = edited ?? restored ?? freshSession();

  function commit(next: Session) {
    setEdited(next);
    writeSession(next);
  }

  function goTo(stage: Stage) {
    commit({ ...session, stage });
  }

  function deal(forNames: readonly string[], session: Session) {
    commit({
      ...session,
      roundNumber: session.roundNumber + 1,
      stage: {
        name: "reveal",
        round: dealRound(
          session.lineup,
          forNames,
          randomWordPair(lang),
          session.previousRoles,
        ),
      },
    });
  }

  function confirmNames(names: string[]) {
    deal(names, { ...session, names });
  }

  function markSeen(playerId: string) {
    if (session.stage.name !== "reveal") return;
    const round = session.stage.round;
    goTo({
      name: "reveal",
      round: {
        ...round,
        players: round.players.map((player) =>
          player.id === playerId ? { ...player, seenWord: true } : player,
        ),
      },
    });
  }

  function voteOut(round: Round, playerId: string) {
    const player = round.players.find((candidate) => candidate.id === playerId);
    if (!player) return;
    goTo({ name: "elimination", round: eliminate(round, playerId), player });
  }

  /** Either the game is over, or another clue round starts. */
  function settle(round: Round, guessedBy: Player | null) {
    const outcome = outcomeOf(round);
    if (!outcome) {
      goTo({ name: "clues", round });
      return;
    }

    commit({
      ...session,
      scores: addScores(
        session.scores,
        roundPoints(round, outcome, guessedBy),
      ),
      previousRoles: rolesOf(round),
      stage: { name: "result", round, outcome, guessedBy },
    });
  }

  function afterElimination(round: Round, player: Player) {
    // A voted-out Mr. White still gets his one guess at the civilians' word.
    if (player.role === "mrwhite") {
      goTo({ name: "mrWhiteGuess", round, player });
      return;
    }
    settle(round, null);
  }

  function submitGuess(round: Round, player: Player, guess: string) {
    settle(round, isCivilianWord(round, guess) ? player : null);
  }

  const back = dict.common.back;
  const { stage } = session;

  switch (stage.name) {
    case "lineup":
      return (
        <Screen title={dict.play.title} backLabel={back} backHref={homeHref}>
          <LineupPicker
            dict={dict.play}
            lineup={session.lineup}
            onChange={(lineup: Lineup) => commit({ ...session, lineup })}
            onConfirm={() => goTo({ name: "names" })}
          />
        </Screen>
      );

    case "names":
      return (
        <Screen
          title={dict.play.names.title}
          backLabel={back}
          onBack={() => goTo({ name: "lineup" })}
          wide
        >
          <NameEntry
            dict={dict.play}
            count={session.lineup.players}
            initialNames={session.names}
            onBack={() => goTo({ name: "lineup" })}
            onConfirm={confirmNames}
          />
        </Screen>
      );

    case "reveal":
      return (
        <Screen
          title={dict.play.reveal.title}
          backLabel={back}
          onBack={() => goTo({ name: "names" })}
          wide
        >
          <WordReveal
            dict={dict.play}
            round={stage.round}
            onSeen={markSeen}
            onReDeal={() => deal(session.names, session)}
            onStart={() => goTo({ name: "firstClue", round: stage.round })}
          />
        </Screen>
      );

    // From here on there is no way back out of the round: the words are out of
    // reach and the game is under way. See CONCEPT.md.
    case "firstClue":
      return (
        <Screen title={dict.play.firstClue.title}>
          <FirstClue
            dict={dict.play}
            round={stage.round}
            onContinue={() => goTo({ name: "clues", round: stage.round })}
          />
        </Screen>
      );

    case "clues":
      return (
        <Screen title={dict.play.clues.title} wide>
          <ClueRound
            dict={dict.play}
            round={stage.round}
            onDone={() => goTo({ name: "voting", round: stage.round })}
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
            onUndo={() =>
              goTo({
                name: "voting",
                round: reinstate(stage.round, stage.player.id),
              })
            }
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
            scores={session.scores}
            roundNumber={session.roundNumber}
            onNextRound={() => deal(session.names, session)}
            onNewGame={() => commit(resetGame(session))}
          />
        </Screen>
      );
  }
}
