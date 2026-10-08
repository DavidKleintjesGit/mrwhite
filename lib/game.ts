import type { RoleSetup } from "./roles";
import type { WordPair } from "./words";

export type Role = "civilian" | "undercover" | "mrwhite";

export type Player = {
  id: string;
  name: string;
  role: Role;
  /** Null for Mr. White, who gets no word at all. */
  word: string | null;
  /** Ticked off on the reveal screen so the group sees who still has to look. */
  seenWord: boolean;
  alive: boolean;
  score: number;
};

export type Round = {
  players: Player[];
  /** Never a Mr. White. See `createRound`. */
  startPlayerId: string;
  pair: WordPair;
};

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Hands out roles and words, and picks who gives the first clue.
 *
 * The opener is never a Mr. White: he has nothing to go on before anyone has
 * spoken, so opening would make the round unplayable for him. Undercovers can
 * open — narrowing it further to civilians would quietly clear that player of
 * two roles instead of one, and the table would work that out.
 *
 * This is deliberately never stated in the interface. See CONCEPT.md.
 */
export function createRound(
  setup: RoleSetup,
  names: readonly string[],
  pair: WordPair,
): Round {
  const roles: Role[] = [
    ...Array<Role>(setup.undercovers).fill("undercover"),
    ...Array<Role>(setup.mrWhites).fill("mrwhite"),
    ...Array<Role>(setup.players - setup.undercovers - setup.mrWhites).fill(
      "civilian",
    ),
  ];

  const shuffledRoles = shuffle(roles);

  const players: Player[] = names.map((name, index) => {
    const role = shuffledRoles[index];
    return {
      id: `p${index}`,
      name,
      role,
      word:
        role === "mrwhite"
          ? null
          : role === "undercover"
            ? pair.undercover
            : pair.civilian,
      seenWord: false,
      alive: true,
      score: 0,
    };
  });

  // `validate` keeps civilians in the majority, so this is never empty.
  const canOpen = players.filter((player) => player.role !== "mrwhite");
  const starter = canOpen[Math.floor(Math.random() * canOpen.length)];

  return { players, startPlayerId: starter.id, pair };
}

/** Fills in blanks so nobody ends up as an unnamed tile on the reveal screen. */
export function normaliseNames(
  names: readonly string[],
  fallback: (index: number) => string,
): string[] {
  return names.map((name, index) => name.trim() || fallback(index));
}

/** Case-insensitive, because "Sam" and "sam" are the same person in a room. */
export function findDuplicateName(names: readonly string[]): string | null {
  const seen = new Set<string>();
  for (const name of names) {
    const key = name.trim().toLowerCase();
    if (!key) continue;
    if (seen.has(key)) return name.trim();
    seen.add(key);
  }
  return null;
}
