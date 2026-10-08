import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MAX_PLAYERS,
  MIN_PLAYERS,
  checkLineup,
  civilianCount,
  clueOrder,
  dealRound,
  eliminate,
  fillInBlankNames,
  findDuplicateName,
  isCivilianWord,
  maxFor,
  outcomeOf,
  suggestedFor,
  type Lineup,
  type Role,
} from "./game.ts";

const PAIR = {
  civilian: "pizza",
  undercover: "pasta",
  theme: "food",
  difficulty: 2 as const,
};

const namesFor = (count: number) =>
  Array.from({ length: count }, (_, i) => `P${i + 1}`);

const PLAYABLE: Lineup[] = [
  { players: 3, undercovers: 1, mrWhites: 0 },
  { players: 5, undercovers: 1, mrWhites: 1 },
  { players: 7, undercovers: 2, mrWhites: 1 },
  { players: 10, undercovers: 3, mrWhites: 1 },
  { players: 10, undercovers: 1, mrWhites: 3 },
];

test("every suggested line-up is playable", () => {
  for (let players = MIN_PLAYERS; players <= MAX_PLAYERS; players++) {
    assert.equal(checkLineup(suggestedFor(players)), null, `${players} players`);
  }
});

test("a line-up without infiltrators is rejected", () => {
  assert.equal(
    checkLineup({ players: 6, undercovers: 0, mrWhites: 0 }),
    "noInfiltrators",
  );
});

test("infiltrators may never start equal to the civilians", () => {
  // 3 against 3 means the infiltrators have already won at deal time.
  assert.equal(
    checkLineup({ players: 6, undercovers: 2, mrWhites: 1 }),
    "civiliansMinority",
  );
});

test("maxFor never allows an unplayable line-up", () => {
  for (let players = MIN_PLAYERS; players <= MAX_PLAYERS; players++) {
    for (let mrWhites = 0; mrWhites <= players; mrWhites++) {
      const lineup = { players, undercovers: 0, mrWhites };
      const undercovers = maxFor(lineup, "undercovers");
      if (undercovers === 0) continue;
      const problem = checkLineup({ ...lineup, undercovers });
      assert.notEqual(problem, "civiliansMinority", JSON.stringify(lineup));
    }
  }
});

test("dealing hands out exactly the requested roles and the right words", () => {
  for (const lineup of PLAYABLE) {
    for (let i = 0; i < 500; i++) {
      const round = dealRound(lineup, namesFor(lineup.players), PAIR);

      const counts: Record<Role, number> = {
        civilian: 0,
        undercover: 0,
        mrwhite: 0,
      };
      for (const player of round.players) counts[player.role]++;

      assert.equal(counts.undercover, lineup.undercovers);
      assert.equal(counts.mrwhite, lineup.mrWhites);
      assert.equal(counts.civilian, civilianCount(lineup));

      for (const player of round.players) {
        if (player.role === "mrwhite") assert.equal(player.word, null);
        if (player.role === "undercover")
          assert.equal(player.word, PAIR.undercover);
        if (player.role === "civilian")
          assert.equal(player.word, PAIR.civilian);
      }
    }
  }
});

test("a Mr. White never opens the round", () => {
  const openedAs = new Set<Role>();

  for (const lineup of PLAYABLE) {
    for (let i = 0; i < 500; i++) {
      const round = dealRound(lineup, namesFor(lineup.players), PAIR);
      const starter = round.players.find((p) => p.id === round.startPlayerId);
      assert.ok(starter, "the round always has a starter");
      assert.notEqual(starter.role, "mrwhite");
      openedAs.add(starter.role);
    }
  }

  // Undercovers have to open sometimes. If only civilians ever did, the
  // starter would quietly clear that player of two roles every round.
  assert.deepEqual([...openedAs].sort(), ["civilian", "undercover"]);
});

test("blank names are filled in, typed names are kept", () => {
  const filled = fillInBlankNames(["Sam", "  ", ""], (i) => `Player ${i + 1}`);
  assert.deepEqual(filled, ["Sam", "Player 2", "Player 3"]);
});

test("duplicate names are caught regardless of case or padding", () => {
  assert.equal(findDuplicateName(["Sam", " sam "]), "sam");
  assert.equal(findDuplicateName(["Sam", "Alex"]), null);
  // Blanks are not duplicates of each other; they get filled in later.
  assert.equal(findDuplicateName(["", ""]), null);
});

const roundOf = (roles: Role[]): ReturnType<typeof dealRound> => ({
  players: roles.map((role, index) => ({
    id: `p${index}`,
    name: `P${index + 1}`,
    role,
    word: role === "mrwhite" ? null : role === "undercover" ? PAIR.undercover : PAIR.civilian,
    seenWord: false,
    alive: true,
    score: 0,
  })),
  startPlayerId: "p0",
  pair: PAIR,
});

test("the round runs on while both sides still have a chance", () => {
  // 4 civilians against 2 infiltrators.
  const round = roundOf([
    "civilian", "civilian", "civilian", "civilian", "undercover", "mrwhite",
  ]);
  assert.equal(outcomeOf(round), null);
});

test("civilians win once the last infiltrator is out", () => {
  let round = roundOf(["civilian", "civilian", "civilian", "undercover"]);
  round = eliminate(round, "p3");
  assert.equal(outcomeOf(round), "civilians");
});

test("infiltrators win on equal numbers, not on a majority", () => {
  // 3 civilians against 2 infiltrators; voting out a civilian makes it 2-2.
  let round = roundOf([
    "civilian", "civilian", "civilian", "undercover", "mrwhite",
  ]);
  assert.equal(outcomeOf(round), null);
  round = eliminate(round, "p0");
  assert.equal(outcomeOf(round), "infiltrators");
});

test("the clue order starts at the opener and skips whoever is out", () => {
  let round = roundOf(["civilian", "undercover", "civilian", "civilian"]);
  round = { ...round, startPlayerId: "p2" };

  assert.deepEqual(
    clueOrder(round).map((p) => p.id),
    ["p2", "p3", "p0", "p1"],
  );

  round = eliminate(round, "p3");
  assert.deepEqual(
    clueOrder(round).map((p) => p.id),
    ["p2", "p0", "p1"],
  );
});

test("Mr. White's guess ignores case and padding", () => {
  const round = roundOf(["civilian", "mrwhite", "civilian"]);
  assert.equal(isCivilianWord(round, "  PiZZa "), true);
  assert.equal(isCivilianWord(round, "pasta"), false);
  assert.equal(isCivilianWord(round, ""), false);
});
