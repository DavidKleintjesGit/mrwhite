import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MAX_PLAYERS,
  MIN_DRINK_PLAYERS,
  MIN_PLAYERS,
  cap,
  clampPlayers,
  deal,
  drinkersFor,
  eliminate,
  fillNames,
  fitRoles,
  isCivilianWord,
  normaliseGuess,
  minPlayers,
  openingOrder,
  outcomeOf,
  pickPair,
  tallyVotes,
  type DealOptions,
  type Player,
  type Role,
} from "./game.ts";
import { ALIASES, CATEGORY_IDS } from "./words.ts";

const allOn = () => {
  const buckets: Record<string, boolean> = { eigen: true };
  for (const id of CATEGORY_IDS) buckets[id] = true;
  return buckets;
};

const options = (over: Partial<DealOptions> = {}): DealOptions => ({
  players: 6,
  undercovers: 1,
  whites: 1,
  names: [],
  lang: "nl",
  buckets: allOn(),
  difficulty: "mix",
  custom: [],
  fallbackName: (i) => `Agent ${i + 1}`,
  ...over,
});

const roundOf = (roles: Role[]): Player[] =>
  roles.map((role, index) => ({
    name: `P${index + 1}`,
    role,
    word: role === "white" ? null : role === "undercover" ? "pasta" : "pizza",
    seen: false,
    alive: true,
    challenge: null,
    challengeDone: false,
    outRound: null,
  }));

// --- Line-up ---------------------------------------------------------------

test("the cap leaves the civilians in the majority at every table size", () => {
  for (let players = MIN_PLAYERS; players <= MAX_PLAYERS; players++) {
    const infiltrators = cap(players);
    const civilians = players - infiltrators;
    assert.ok(
      civilians > 1,
      `${players} players would start with ${civilians} civilians`
    );
    // Infiltrators win once one civilian is left, so the game has to have
    // room for at least one vote before that happens.
    assert.ok(
      civilians > infiltrators,
      `${players} players: ${civilians} vs ${infiltrators}`
    );
  }
});

test("there is always room for one infiltrator, even at three players", () => {
  assert.equal(cap(3), 1);
  assert.equal(cap(4), 1);
  assert.equal(cap(5), 2);
  assert.equal(cap(10), 4);
  assert.equal(cap(20), 9);
});

test("shrinking the table trims the infiltrators to fit", () => {
  // Whichever side is ahead gives way first, and on a tie the undercover does.
  assert.deepEqual(fitRoles(4, 3, 2), { undercovers: 0, whites: 1 });
  assert.deepEqual(fitRoles(3, 1, 1), { undercovers: 0, whites: 1 });
  assert.deepEqual(fitRoles(3, 0, 2), { undercovers: 0, whites: 1 });
  // A line-up that already fits is left alone.
  assert.deepEqual(fitRoles(10, 2, 2), { undercovers: 2, whites: 2 });
});

test("trimming always lands on a playable line-up", () => {
  for (let players = MIN_PLAYERS; players <= MAX_PLAYERS; players++) {
    for (let u = 0; u <= 10; u++) {
      for (let w = 0; w <= 10; w++) {
        const fitted = fitRoles(players, u, w);
        assert.ok(
          fitted.undercovers + fitted.whites <= cap(players),
          `${players}/${u}/${w} came out over the cap`
        );
        assert.ok(fitted.undercovers >= 0 && fitted.whites >= 0);
      }
    }
  }
});

test("the player count stays inside the supported range", () => {
  assert.equal(clampPlayers(1), MIN_PLAYERS);
  assert.equal(clampPlayers(99), MAX_PLAYERS);
  assert.equal(clampPlayers(7), 7);
});

// --- Names -----------------------------------------------------------------

test("blank fields get an alias and typed names are left alone", () => {
  const names = fillNames(["Sam", "", "  "], 3, (i) => `Agent ${i + 1}`);
  assert.equal(names[0], "Sam");
  assert.ok(ALIASES.includes(names[1]));
  assert.ok(ALIASES.includes(names[2]));
  assert.notEqual(names[1], names[2]);
});

test("an alias is never handed out twice, nor stolen from a typed name", () => {
  const names = fillNames(["Poirot", "", "", ""], 4, (i) => `Agent ${i + 1}`);
  assert.equal(new Set(names).size, 4);
  assert.equal(names.filter((n) => n === "Poirot").length, 1);
});

// --- Dealing ---------------------------------------------------------------

test("dealing hands out exactly the requested roles with the right words", () => {
  for (let i = 0; i < 400; i++) {
    const { players, pair } = deal(
      options({ players: 7, undercovers: 2, whites: 1 })
    );

    const counts: Record<Role, number> = { burger: 0, undercover: 0, white: 0 };
    for (const player of players) counts[player.role]++;
    assert.deepEqual(counts, { burger: 4, undercover: 2, white: 1 });

    for (const player of players) {
      if (player.role === "white") assert.equal(player.word, null);
      if (player.role === "undercover") assert.equal(player.word, pair[1]);
      if (player.role === "burger") assert.equal(player.word, pair[0]);
    }
  }
});

test("the difficulty filter only lets matching pairs through", () => {
  const easy = new Set<string>();
  const hard = new Set<string>();
  for (let i = 0; i < 300; i++) {
    easy.add(pickPair(options({ difficulty: "makkelijk" })).join("/"));
    hard.add(pickPair(options({ difficulty: "moeilijk" })).join("/"));
  }
  // The two pools must not overlap: a pair is level 1 or level 2, not both.
  for (const pair of easy) assert.ok(!hard.has(pair), `${pair} in both pools`);
});

test("a custom pair can come up, and only when its bucket is on", () => {
  const custom = [{ a: "Zeppelin", b: "Luchtballon" }];
  const only = options({
    custom,
    buckets: { eigen: true },
    difficulty: "mix",
  });

  const seen = new Set<string>();
  for (let i = 0; i < 50; i++) seen.add(pickPair(only).join("/"));
  assert.ok(
    [...seen].every(
      (p) => p === "Zeppelin/Luchtballon" || p === "Luchtballon/Zeppelin"
    ),
    `unexpected pairs: ${[...seen].join(", ")}`
  );
});

test("turning every category off still deals a word", () => {
  const pair = pickPair(options({ buckets: {}, custom: [] }));
  assert.equal(pair.length, 2);
  assert.ok(pair[0] && pair[1]);
  assert.notEqual(pair[0], pair[1]);
});

// --- Playing ---------------------------------------------------------------

test("a Mr. White never opens the round", () => {
  const opened = new Set<Role>();
  const players = roundOf([
    "burger",
    "burger",
    "burger",
    "undercover",
    "white",
  ]);

  for (let i = 0; i < 500; i++) {
    const order = openingOrder(players, true);
    opened.add(players[order[0]].role);
  }

  assert.ok(!opened.has("white"));
  // Undercovers have to open sometimes, or the opener would quietly clear
  // that player of two roles instead of one.
  assert.deepEqual([...opened].sort(), ["burger", "undercover"]);
});

test("turning the rule off lets Mr. White open", () => {
  const players = roundOf(["burger", "burger", "white"]);
  const opened = new Set<Role>();
  for (let i = 0; i < 300; i++) {
    opened.add(players[openingOrder(players, false)[0]].role);
  }
  assert.ok(opened.has("white"));
});

test("the order runs from the opener and skips whoever is out", () => {
  let players = roundOf(["burger", "undercover", "burger", "burger"]);
  players = eliminate(players, 2, 1);

  for (let i = 0; i < 100; i++) {
    const order = openingOrder(players, true);
    assert.equal(order.length, 3, "the dead do not speak");
    assert.ok(!order.includes(2));
    // Seating order is preserved, just rotated.
    const seats = [0, 1, 3];
    const from = seats.indexOf(order[0]);
    assert.deepEqual(order, [...seats.slice(from), ...seats.slice(0, from)]);
  }
});

test("the round runs on while both sides still have a chance", () => {
  assert.equal(
    outcomeOf(roundOf(["burger", "burger", "burger", "undercover", "white"])),
    null
  );
});

test("civilians win once the last infiltrator is out", () => {
  let players = roundOf(["burger", "burger", "burger", "undercover"]);
  players = eliminate(players, 3, 1);
  assert.equal(outcomeOf(players), "burgers");
});

test("infiltrators win when one civilian is left, not on equal numbers", () => {
  // 3 civilians against 2 infiltrators.
  let players = roundOf(["burger", "burger", "burger", "undercover", "white"]);

  players = eliminate(players, 0, 2);
  // 2 against 2 — even numbers, but the round is not over yet.
  assert.equal(outcomeOf(players), null);

  players = eliminate(players, 1, 3);
  assert.equal(outcomeOf(players), "infiltranten");
});

// --- Mr. White's guess -----------------------------------------------------

test("the guess ignores case, accents, spacing and punctuation", () => {
  assert.equal(normaliseGuess("  Café! "), "cafe");
  assert.equal(normaliseGuess("Hello Kitty"), "hellokitty");
  assert.equal(normaliseGuess("Spider-Man"), "spiderman");
  assert.equal(normaliseGuess("   "), "");
});

test("the guess is checked against the civilians' word, not the undercover's", () => {
  const pair: [string, string] = ["Stroopwafel", "Speculaas"];
  assert.equal(isCivilianWord(pair, "stroopwafel"), true);
  assert.equal(isCivilianWord(pair, " STROOPWAFEL "), true);
  assert.equal(isCivilianWord(pair, "Speculaas"), false);
  assert.equal(isCivilianWord(pair, ""), false);
});

// --- The Drinking Edition --------------------------------------------------

test("the drinking edition needs a fourth player", () => {
  assert.equal(minPlayers("klassiek"), MIN_PLAYERS);
  assert.equal(minPlayers("drink"), MIN_DRINK_PLAYERS);
  assert.equal(clampPlayers(3, "drink"), MIN_DRINK_PLAYERS);
  assert.equal(clampPlayers(3, "klassiek"), 3);
});

test("the drinking edition allows more infiltrators at the same table", () => {
  for (let players = MIN_DRINK_PLAYERS; players <= MAX_PLAYERS; players++) {
    assert.ok(cap(players, "drink") >= cap(players, "klassiek"));
    // Still short of the whole table, or there would be nobody to fool.
    assert.ok(cap(players, "drink") < players);
  }
});

test("fitting roles respects the mode's own cap", () => {
  const fitted = fitRoles(6, 3, 0, "drink");
  assert.ok(fitted.undercovers + fitted.whites <= cap(6, "drink"));
});

test("infiltrators win on level pegging in the drinking edition only", () => {
  const level = roundOf(["burger", "burger", "undercover", "white"]);
  assert.equal(outcomeOf(level, "drink"), "infiltranten");
  assert.equal(outcomeOf(level, "klassiek"), null);
});

test("both modes still end the moment the infiltrators are gone", () => {
  const clean = roundOf(["burger", "burger", "burger"]);
  assert.equal(outcomeOf(clean, "drink"), "burgers");
  assert.equal(outcomeOf(clean, "klassiek"), "burgers");
});

test("the app names who drinks without keeping any count", () => {
  const players = roundOf(["burger", "burger", "undercover", "white"]);
  // Players 2 and 3 voted for player 0, a civilian; player 1 voted elsewhere.
  const votes = { 1: 2, 2: 0, 3: 0 };
  assert.deepEqual(drinkersFor(players, 0, votes).sort(), [2, 3]);
});

test("voting out an infiltrator costs nobody a sip", () => {
  const players = roundOf(["burger", "burger", "undercover"]);
  assert.deepEqual(drinkersFor(players, 2, { 0: 2, 1: 2 }), []);
});

test("eliminating only takes the one player out", () => {
  const players = roundOf(["burger", "burger", "undercover"]);
  const after = eliminate(players, 0, 2);
  assert.equal(after[0].alive, false);
  assert.ok(after.slice(1).every((player) => player.alive));
});

// --- Counting a secret vote ------------------------------------------------

test("a clear majority puts one player out", () => {
  assert.deepEqual(tallyVotes({ 0: 2, 1: 2, 3: 0 }), { out: 2 });
});

test("a tie is handed back to the table rather than broken by the app", () => {
  assert.deepEqual(tallyVotes({ 0: 1, 1: 0 }), { tie: [0, 1] });
  // Three voters, three different targets, one vote each.
  assert.deepEqual(tallyVotes({ 0: 1, 1: 2, 2: 3 }), { tie: [1, 2, 3] });
  // And the near miss: one target ahead by a single vote is not a tie.
  assert.deepEqual(tallyVotes({ 0: 1, 1: 2, 2: 3, 3: 1 }), { out: 1 });
});

test("counting nothing is nothing, not a crash", () => {
  assert.equal(tallyVotes({}), null);
});

test("a tie comes back in a stable order", () => {
  assert.deepEqual(tallyVotes({ 0: 3, 1: 1 }), tallyVotes({ 0: 1, 1: 3 }));
});

test("a player carries the round they went out in", () => {
  const players = roundOf(["burger", "burger", "undercover"]);
  assert.equal(players[0].outRound, null);

  const after = eliminate(players, 0, 3);
  assert.equal(after[0].outRound, 3);
  // Everyone still in stays unmarked, so the report cannot invent a round.
  assert.ok(after.slice(1).every((player) => player.outRound === null));
});
