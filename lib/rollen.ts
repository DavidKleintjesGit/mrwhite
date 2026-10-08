export const MIN_SPELERS = 3;
export const MAX_SPELERS = 10;

export type Rolverdeling = {
  spelers: number;
  undercovers: number;
  mrWhites: number;
};

/**
 * Geadviseerde verdeling per spelersaantal: ongeveer een derde infiltrant.
 * Zie de tabel in CONCEPT.md. De speler mag dit altijd overrulen.
 */
const ADVIES: Record<number, { undercovers: number; mrWhites: number }> = {
  3: { undercovers: 1, mrWhites: 0 },
  4: { undercovers: 1, mrWhites: 0 },
  5: { undercovers: 1, mrWhites: 1 },
  6: { undercovers: 1, mrWhites: 1 },
  7: { undercovers: 2, mrWhites: 1 },
  8: { undercovers: 2, mrWhites: 1 },
  9: { undercovers: 3, mrWhites: 1 },
  10: { undercovers: 3, mrWhites: 1 },
};

export function adviesVoor(spelers: number): Rolverdeling {
  const advies = ADVIES[spelers] ?? ADVIES[MIN_SPELERS];
  return { spelers, ...advies };
}

export function aantalBurgers(v: Rolverdeling): number {
  return v.spelers - v.undercovers - v.mrWhites;
}

export function aantalInfiltranten(v: Rolverdeling): number {
  return v.undercovers + v.mrWhites;
}

/**
 * Infiltranten winnen zodra ze gelijk in aantal zijn met de burgers. Starten ze
 * al gelijk of in de meerderheid, dan is het spel voorbij voordat het begint.
 */
export function maxInfiltranten(spelers: number): number {
  return Math.ceil(spelers / 2) - 1;
}

/** Foutmelding voor de speler, of null als de verdeling speelbaar is. */
export function controleer(v: Rolverdeling): string | null {
  if (v.spelers < MIN_SPELERS || v.spelers > MAX_SPELERS) {
    return `Dit spel werkt met ${MIN_SPELERS} tot ${MAX_SPELERS} spelers.`;
  }
  if (aantalInfiltranten(v) === 0) {
    return "Kies minstens één undercover of Mr. White, anders heeft niemand iets te zoeken.";
  }
  if (aantalBurgers(v) <= aantalInfiltranten(v)) {
    return "De burgers moeten met meer zijn dan de infiltranten, anders is het spel bij de start al voorbij.";
  }
  return null;
}
