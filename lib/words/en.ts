import type { WordPair } from "./index";

const en: readonly WordPair[] = [
  // food
  { civilian: "pizza", undercover: "pasta", theme: "food", difficulty: 2 },
  { civilian: "coffee", undercover: "tea", theme: "food", difficulty: 2 },
  { civilian: "burger", undercover: "hot dog", theme: "food", difficulty: 2 },
  { civilian: "apple", undercover: "pear", theme: "food", difficulty: 2 },
  {
    civilian: "chocolate",
    undercover: "caramel",
    theme: "food",
    difficulty: 2,
  },
  { civilian: "soup", undercover: "stew", theme: "food", difficulty: 3 },
  { civilian: "bread", undercover: "toast", theme: "food", difficulty: 3 },
  {
    civilian: "ice cream",
    undercover: "frozen yoghurt",
    theme: "food",
    difficulty: 3,
  },

  // animals
  { civilian: "dog", undercover: "cat", theme: "animals", difficulty: 1 },
  { civilian: "horse", undercover: "donkey", theme: "animals", difficulty: 2 },
  { civilian: "shark", undercover: "dolphin", theme: "animals", difficulty: 2 },
  { civilian: "frog", undercover: "toad", theme: "animals", difficulty: 3 },
  { civilian: "eagle", undercover: "hawk", theme: "animals", difficulty: 3 },
  { civilian: "rabbit", undercover: "hare", theme: "animals", difficulty: 3 },

  // places
  { civilian: "beach", undercover: "desert", theme: "places", difficulty: 1 },
  { civilian: "hotel", undercover: "hostel", theme: "places", difficulty: 2 },
  {
    civilian: "library",
    undercover: "bookshop",
    theme: "places",
    difficulty: 2,
  },
  {
    civilian: "airport",
    undercover: "train station",
    theme: "places",
    difficulty: 2,
  },
  {
    civilian: "hospital",
    undercover: "clinic",
    theme: "places",
    difficulty: 3,
  },

  // sports
  {
    civilian: "football",
    undercover: "rugby",
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
    civilian: "swimming",
    undercover: "diving",
    theme: "sports",
    difficulty: 2,
  },
  {
    civilian: "boxing",
    undercover: "wrestling",
    theme: "sports",
    difficulty: 2,
  },
  {
    civilian: "marathon",
    undercover: "sprint",
    theme: "sports",
    difficulty: 2,
  },

  // everyday objects
  {
    civilian: "umbrella",
    undercover: "raincoat",
    theme: "objects",
    difficulty: 2,
  },
  { civilian: "mirror", undercover: "window", theme: "objects", difficulty: 2 },
  { civilian: "pillow", undercover: "blanket", theme: "objects", difficulty: 2 },
  { civilian: "candle", undercover: "lamp", theme: "objects", difficulty: 2 },
  { civilian: "pencil", undercover: "pen", theme: "objects", difficulty: 3 },
  { civilian: "clock", undercover: "watch", theme: "objects", difficulty: 3 },

  // entertainment
  {
    civilian: "cinema",
    undercover: "theatre",
    theme: "entertainment",
    difficulty: 2,
  },
  {
    civilian: "podcast",
    undercover: "radio",
    theme: "entertainment",
    difficulty: 2,
  },
  {
    civilian: "novel",
    undercover: "comic",
    theme: "entertainment",
    difficulty: 2,
  },
  {
    civilian: "guitar",
    undercover: "ukulele",
    theme: "entertainment",
    difficulty: 3,
  },

  // travel
  {
    civilian: "suitcase",
    undercover: "backpack",
    theme: "travel",
    difficulty: 2,
  },
  {
    civilian: "passport",
    undercover: "ticket",
    theme: "travel",
    difficulty: 2,
  },
  { civilian: "map", undercover: "compass", theme: "travel", difficulty: 2 },

  // work
  {
    civilian: "meeting",
    undercover: "interview",
    theme: "work",
    difficulty: 2,
  },
  { civilian: "email", undercover: "letter", theme: "work", difficulty: 2 },
  { civilian: "boss", undercover: "manager", theme: "work", difficulty: 3 },
];

export default en;
