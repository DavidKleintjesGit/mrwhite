import type { WordPair } from "./index";

const nl: readonly WordPair[] = [
  // eten
  { civilian: "pizza", undercover: "pasta", theme: "food", difficulty: 2 },
  { civilian: "koffie", undercover: "thee", theme: "food", difficulty: 2 },
  { civilian: "frikandel", undercover: "kroket", theme: "food", difficulty: 2 },
  {
    civilian: "pannenkoek",
    undercover: "poffertje",
    theme: "food",
    difficulty: 2,
  },
  {
    civilian: "stroopwafel",
    undercover: "speculaas",
    theme: "food",
    difficulty: 2,
  },
  { civilian: "appel", undercover: "peer", theme: "food", difficulty: 2 },
  { civilian: "boterham", undercover: "tosti", theme: "food", difficulty: 2 },
  { civilian: "soep", undercover: "stamppot", theme: "food", difficulty: 2 },
  { civilian: "hagelslag", undercover: "vlokken", theme: "food", difficulty: 3 },
  { civilian: "patat", undercover: "nasischijf", theme: "food", difficulty: 2 },

  // dieren
  { civilian: "hond", undercover: "kat", theme: "animals", difficulty: 1 },
  { civilian: "koe", undercover: "geit", theme: "animals", difficulty: 2 },
  { civilian: "haai", undercover: "dolfijn", theme: "animals", difficulty: 2 },
  { civilian: "meeuw", undercover: "duif", theme: "animals", difficulty: 2 },
  { civilian: "paard", undercover: "pony", theme: "animals", difficulty: 3 },
  { civilian: "kikker", undercover: "pad", theme: "animals", difficulty: 3 },

  // plaatsen
  { civilian: "strand", undercover: "woestijn", theme: "places", difficulty: 1 },
  {
    civilian: "bibliotheek",
    undercover: "boekwinkel",
    theme: "places",
    difficulty: 2,
  },
  {
    civilian: "ziekenhuis",
    undercover: "huisarts",
    theme: "places",
    difficulty: 2,
  },
  { civilian: "sauna", undercover: "zwembad", theme: "places", difficulty: 2 },
  { civilian: "kroeg", undercover: "café", theme: "places", difficulty: 3 },
  {
    civilian: "camping",
    undercover: "vakantiepark",
    theme: "places",
    difficulty: 3,
  },

  // typisch Nederlands
  {
    civilian: "Sinterklaas",
    undercover: "Kerstman",
    theme: "netherlands",
    difficulty: 2,
  },
  {
    civilian: "Koningsdag",
    undercover: "carnaval",
    theme: "netherlands",
    difficulty: 2,
  },
  {
    civilian: "molen",
    undercover: "dijk",
    theme: "netherlands",
    difficulty: 2,
  },
  {
    civilian: "fiets",
    undercover: "scooter",
    theme: "netherlands",
    difficulty: 2,
  },
  {
    civilian: "tram",
    undercover: "metro",
    theme: "netherlands",
    difficulty: 3,
  },
  {
    civilian: "snackbar",
    undercover: "cafetaria",
    theme: "netherlands",
    difficulty: 3,
  },

  // sport
  { civilian: "voetbal", undercover: "hockey", theme: "sports", difficulty: 2 },
  {
    civilian: "schaatsen",
    undercover: "skiën",
    theme: "sports",
    difficulty: 2,
  },
  {
    civilian: "tennis",
    undercover: "badminton",
    theme: "sports",
    difficulty: 2,
  },
  {
    civilian: "wielrennen",
    undercover: "hardlopen",
    theme: "sports",
    difficulty: 2,
  },

  // spullen
  {
    civilian: "paraplu",
    undercover: "regenjas",
    theme: "objects",
    difficulty: 2,
  },
  { civilian: "spiegel", undercover: "raam", theme: "objects", difficulty: 2 },
  { civilian: "kussen", undercover: "dekbed", theme: "objects", difficulty: 2 },
  { civilian: "kaars", undercover: "lamp", theme: "objects", difficulty: 2 },
  { civilian: "pen", undercover: "potlood", theme: "objects", difficulty: 3 },
  { civilian: "klok", undercover: "horloge", theme: "objects", difficulty: 3 },

  // vrije tijd
  {
    civilian: "bioscoop",
    undercover: "theater",
    theme: "entertainment",
    difficulty: 2,
  },
  {
    civilian: "gitaar",
    undercover: "ukelele",
    theme: "entertainment",
    difficulty: 3,
  },
];

export default nl;
