import assert from "node:assert/strict";
import test from "node:test";
import {
  CHALLENGES,
  CHALLENGE_IDS,
  CONFLICTS,
  MAX_REWARD,
  MIN_REWARD,
  RULES_BY_CATEGORY,
  RULES_PER_GAME,
  RULE_CATEGORIES,
  RULE_IDS,
  type RuleCategory,
  challengeReward,
  dealChallenges,
  drawRules,
  ruleCategory,
} from "./drink.ts";

// --- The rule set ----------------------------------------------------------

test("every rule has exactly one category", () => {
  const seen = new Set<number>();
  for (const id of RULE_IDS) {
    assert.ok(!seen.has(id), `rule ${id} appears twice`);
    seen.add(id);
    assert.ok(RULE_CATEGORIES.includes(ruleCategory(id)));
  }
  assert.equal(RULE_IDS.length, 45);
});

test("conflict pairs point at rules that exist, and never at themselves", () => {
  for (const [a, b] of CONFLICTS) {
    assert.notEqual(a, b);
    assert.ok(RULE_IDS.includes(a), `conflict names unknown rule ${a}`);
    assert.ok(RULE_IDS.includes(b), `conflict names unknown rule ${b}`);
  }
});

test("an unknown rule id is an error rather than a silent category", () => {
  assert.throws(() => ruleCategory(999));
});

// --- Drawing a game's rules ------------------------------------------------

const allOn = (): Record<RuleCategory, boolean> => ({
  A: true,
  B: true,
  C: true,
  D: true,
});

test("a draw gives three different rules", () => {
  for (let run = 0; run < 400; run++) {
    const drawn = drawRules(allOn());
    assert.equal(drawn.length, RULES_PER_GAME);
    assert.equal(new Set(drawn).size, RULES_PER_GAME, "a rule was dealt twice");
  }
});

test("a draw never pairs two rules that contradict each other", () => {
  for (let run = 0; run < 1000; run++) {
    const drawn = drawRules(allOn());
    for (const [a, b] of CONFLICTS) {
      assert.ok(
        !(drawn.includes(a) && drawn.includes(b)),
        `drew the conflicting pair ${a} and ${b}`
      );
    }
  }
});

test("with every category on, the three rules come from three categories", () => {
  for (let run = 0; run < 200; run++) {
    const categories = drawRules(allOn()).map(ruleCategory);
    assert.equal(
      new Set(categories).size,
      RULES_PER_GAME,
      "two rules came from the same category"
    );
  }
});

test("switching a category off keeps its rules out", () => {
  for (let run = 0; run < 300; run++) {
    const drawn = drawRules({ A: false, B: true, C: true, D: true });
    for (const id of drawn) {
      assert.notEqual(ruleCategory(id), "A");
    }
  }
});

test("one category on still yields three rules, all from it", () => {
  for (let run = 0; run < 200; run++) {
    const drawn = drawRules({ A: false, B: true, C: false, D: false });
    assert.equal(drawn.length, RULES_PER_GAME);
    for (const id of drawn) assert.equal(ruleCategory(id), "B");
  }
});

test("switching everything off falls back to the whole set", () => {
  const drawn = drawRules({ A: false, B: false, C: false, D: false });
  assert.equal(drawn.length, RULES_PER_GAME);
  assert.equal(new Set(drawn).size, RULES_PER_GAME);
});

test("no category can be painted into a corner by its own conflicts", () => {
  // With one category on, three rules have to come out of it. Checked
  // exhaustively rather than by sampling: whatever first two it picks, a
  // compatible third must still exist.
  const clashes = (a: number, b: number) =>
    CONFLICTS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

  for (const category of RULE_CATEGORIES) {
    const ids = RULES_BY_CATEGORY[category];
    assert.ok(
      ids.length >= RULES_PER_GAME,
      `category ${category} is too small`
    );

    for (const first of ids) {
      for (const second of ids) {
        if (first === second || clashes(first, second)) continue;
        const third = ids.some(
          (id) =>
            id !== first &&
            id !== second &&
            !clashes(id, first) &&
            !clashes(id, second)
        );
        assert.ok(
          third,
          `${category}: rules ${first} and ${second} leave no third option`
        );
      }
    }
  }
});

// --- Challenges ------------------------------------------------------------

test("every player gets a challenge", () => {
  for (const players of [4, 6, 9, 20]) {
    const dealt = dealChallenges(players);
    assert.equal(dealt.length, players);
    for (const id of dealt) assert.ok(CHALLENGE_IDS.includes(id));
  }
});

test("challenges are spread before any of them repeats", () => {
  const dealt = dealChallenges(CHALLENGE_IDS.length);
  assert.equal(new Set(dealt).size, CHALLENGE_IDS.length);
});

test("every challenge pays out, and harder ones pay more", () => {
  const rewards = CHALLENGES.map((challenge) => challenge.reward);
  for (const reward of rewards) {
    assert.ok(
      reward >= MIN_REWARD && reward <= MAX_REWARD,
      `${reward} is off the scale`
    );
  }
  // The payout is the only clue to how hard one is, so two challenges that
  // pay the same would be telling the player something untrue.
  assert.equal(
    new Set(rewards).size,
    rewards.length,
    "two challenges pay the same"
  );
  assert.equal(Math.min(...rewards), MIN_REWARD);
  assert.equal(Math.max(...rewards), MAX_REWARD);
});

test("a reward can be looked up for every dealt challenge", () => {
  for (const id of dealChallenges(20)) {
    assert.ok(challengeReward(id) >= MIN_REWARD);
  }
  assert.throws(() => challengeReward(999));
});
