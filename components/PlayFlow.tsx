"use client";

import { useState } from "react";
import FirstClue from "@/components/FirstClue";
import GameSetup from "@/components/GameSetup";
import NameEntry from "@/components/NameEntry";
import Screen from "@/components/Screen";
import WordReveal from "@/components/WordReveal";
import { createRound, type Round } from "@/lib/game";
import type { Dictionary, Locale } from "@/lib/i18n";
import { recommendedFor, type RoleSetup } from "@/lib/roles";
import { randomWordPair } from "@/lib/words";

/** Only the names are kept between games; a half-played round is not. */
const NAMES_STORAGE_KEY = "mrwhite.names";

type Phase = "setup" | "names" | "reveal" | "firstClue";

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

export default function PlayFlow({ dict, lang, homeHref }: Props) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [setup, setSetup] = useState<RoleSetup>(() => recommendedFor(6));
  const [names, setNames] = useState<string[]>([]);
  const [round, setRound] = useState<Round | null>(null);

  function confirmSetup(confirmed: RoleSetup) {
    setSetup(confirmed);
    // Read here rather than on mount: the page is prerendered, so touching
    // localStorage during render would not match the server-rendered HTML.
    if (names.length === 0) setNames(readStoredNames());
    setPhase("names");
  }

  function confirmNames(confirmed: string[]) {
    setNames(confirmed);
    try {
      localStorage.setItem(NAMES_STORAGE_KEY, JSON.stringify(confirmed));
    } catch {
      // Not remembering the names is a nuisance, not a failure.
    }
    setRound(createRound(setup, confirmed, randomWordPair(lang)));
    setPhase("reveal");
  }

  function markSeen(playerId: string) {
    setRound((current) =>
      current === null
        ? current
        : {
            ...current,
            players: current.players.map((player) =>
              player.id === playerId ? { ...player, seenWord: true } : player,
            ),
          },
    );
  }

  function deal() {
    setRound(createRound(setup, names, randomWordPair(lang)));
  }

  if (phase === "names") {
    return (
      <Screen
        title={dict.play.names.title}
        backLabel={dict.common.back}
        onBack={() => setPhase("setup")}
        wide
      >
        <NameEntry
          dict={dict.play}
          count={setup.players}
          initialNames={names}
          onBack={() => setPhase("setup")}
          onConfirm={confirmNames}
        />
      </Screen>
    );
  }

  if (phase === "reveal" && round) {
    return (
      <Screen
        title={dict.play.reveal.title}
        backLabel={dict.common.back}
        onBack={() => setPhase("names")}
        wide
      >
        <WordReveal
          dict={dict.play}
          round={round}
          onSeen={markSeen}
          onRestart={deal}
          onStart={() => setPhase("firstClue")}
        />
      </Screen>
    );
  }

  if (phase === "firstClue" && round) {
    return (
      // No way back: once the round starts the words are out of reach, which
      // is the point. See CONCEPT.md.
      <Screen title={dict.play.firstClue.title} backLabel={dict.common.back}>
        <FirstClue
          dict={dict.play}
          round={round}
          onNewGame={() => setPhase("setup")}
        />
      </Screen>
    );
  }

  return (
    <Screen
      title={dict.play.title}
      backLabel={dict.common.back}
      backHref={homeHref}
    >
      <GameSetup
        dict={dict.play}
        initialSetup={setup}
        onConfirm={confirmSetup}
      />
    </Screen>
  );
}
