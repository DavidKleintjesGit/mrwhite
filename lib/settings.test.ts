import assert from "node:assert/strict";
import test from "node:test";
import { MAX_NAMES_AGE_MS, defaultStored, parseStored } from "./settings.ts";

const DAG = 24 * 60 * 60 * 1000;

/** A stored blob as it would come back out of localStorage. */
const saved = (over: Record<string, unknown>) =>
  JSON.stringify({ ...defaultStored(), ...over });

// --- Names ----------------------------------------------------------------

test("names come back while they are recent", () => {
  const raw = saved({ names: ["Ilse", "Bram"], namesAt: Date.now() - DAG });
  assert.deepEqual(parseStored(raw).names, ["Ilse", "Bram"]);
});

test("names lapse once they are older than the limit", () => {
  const raw = saved({
    names: ["Ilse", "Bram"],
    namesAt: Date.now() - MAX_NAMES_AGE_MS - 1000,
  });
  assert.deepEqual(parseStored(raw).names, []);
});

test("names written before the date existed lapse on first read", () => {
  // Safer this way round: a list of people's names should not be treated as
  // brand new just because we cannot tell how old it is.
  const raw = JSON.stringify({ names: ["Ilse", "Bram"] });
  assert.deepEqual(parseStored(raw).names, []);
});

test("nothing stored is simply no names", () => {
  assert.deepEqual(parseStored(null).names, []);
  assert.deepEqual(parseStored("niet eens json").names, []);
});
