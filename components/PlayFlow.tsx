"use client";

import { useState } from "react";
import FirstClue from "@/components/FirstClue";
import LineupPicker from "@/components/LineupPicker";
import NameEntry from "@/components/NameEntry";
import Screen from "@/components/Screen";
import WordReveal from "@/components/WordReveal";
import { dealRound, suggestedFor, type Lineup, type Round } from "@/lib/game";
import type { Dictionary, Locale } from "@/lib/i18n";
import { randomWordPair } from "@/lib/words";

/** Only the names are kept between games; a half-played round is not. */
const NAMES_STORAGE_KEY = "mrwhite.names";

/**
 * A round only exists once it has been dealt, so it belongs to the stage
 * rather than sitting in a nullable field. No screen can then be reached
 * without the data it needs.
 */
type Stage =
  | { name: "lineup" }
  | { name: "names" }
  | { name: "reveal"; round: Round }
  | { name: "firstClue"; round: Round };

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

  switch (stage.name) {
    case "lineup":
      return (
        <Screen
          title={dict.play.title}
          backLabel={dict.common.back}
          backHref={homeHref}
        >
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
          backLabel={dict.common.back}
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
          backLabel={dict.common.back}
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

    // No way back: once the round starts the words are out of reach, which is
    // the point. See CONCEPT.md.
    case "firstClue":
      return (
        <Screen title={dict.play.firstClue.title}>
          <FirstClue
            dict={dict.play}
            round={stage.round}
            onNewGame={() => setStage({ name: "lineup" })}
          />
        </Screen>
      );
  }
}
