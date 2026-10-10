import type { Dictionary } from "./nl";

const en: Dictionary = {
  meta: {
    title: "Mister White",
    description:
      "Word game for 3 to 20 players. Everyone gets the same secret word — except the infiltrators.",
  },

  common: {
    back: "Back",
    done: "Done",
  },

  roles: {
    burger: "Civilian",
    undercover: "Undercover",
    white: "Mr. White",
  },

  categories: {
    eten: "Food",
    dieren: "Animals",
    plekken: "Places",
    huis: "Around the house",
    beroepen: "Jobs",
    sport: "Sport & games",
    pop: "Pop culture",
    eigen: "Your own words",
  },

  home: {
    caseNumber: "Case no. 0042",
    rec: "Rec",
    stamp: "Top secret",
    titleTop: "Mr.",
    titleBottom: "White",
    tagline:
      "Everyone gets the same secret word. Except the infiltrators. Who is not who they say they are?",
    play: "Play",
    rules: "How to play",
    settings: "Settings",
  },

  rules: {
    kicker: "Field manual",
    title: "How to play",
    cards: [
      { name: "Civilian", body: "Knows the real word." },
      {
        name: "Undercover",
        body: "Almost the same word. Does not know it either.",
      },
      { name: "Mr. White", body: "No word. Bluff!" },
    ],
    items: [
      "Everyone secretly gets a word. The civilians all share the same one.",
      "Undercovers get a word that resembles it, and do not know they are the undercover.",
      "Mr. White gets nothing at all and has to bluff along.",
      "Taking turns, you give one word as a clue. Not too clear, not too vague.",
      "Then you vote on who goes. If Mr. White is caught, he gets one guess.",
    ],
    note: "Civilians win once every infiltrator is out. Infiltrators win once a single civilian is left.",
    cta: "Got it, let's play",
  },

  settings: {
    kicker: "Headquarters",
    title: "Settings",
    categories: "Word categories",
    pick: "Choose →",
    allCategories: "All {total} categories",
    someCategories: "{on} of {total} categories",
    noneChosen: "None chosen, we will use everything",
    display: "Display",
    themeDark: "Dark",
    themeLight: "Light",
    difficulty: "Word difficulty",
    diffEasy: "Easy",
    diffMix: "Mix",
    diffHard: "Hard",
    diffHelpEasy: "Words are far apart. Undercovers stand out sooner.",
    diffHelpMix: "A mix of easy and tricky word pairs.",
    diffHelpHard: "Words are very close together. Plenty of doubt guaranteed.",
    language: "Language",
    timer: "Clue timer",
    timerOff: "Off",
    mrGuessLabel: "Mr. White may guess",
    mrGuessDesc: "Unmasked? One guess at the word. Right means a win.",
    mrNotFirstLabel: "Mr. White never starts",
    mrNotFirstDesc: "The first clue always comes from someone with a word.",
    customWords: "Your own words",
    customA: "Civilian word",
    customB: "Undercover",
    customAdd: "Add word pair",
    customRemove: "Remove {a} and {b}",
    customEmpty: 'Make up a word pair. It lands in the "Own" category.',
    save: "Save",
    privacy: "Privacy policy",
  },

  archive: {
    tag: "ARCHIVE",
    title: "Word categories",
    search: "Search a category…",
    all: "All on",
    none: "All off",
    count: "{on} / {total} on",
    pairs: "{n} word pairs",
    noResults: 'No category found for "{query}".',
  },

  language: {
    tag: "INTERNATIONAL",
    title: "Language of the words",
    sub: "Which language do the agents get their secret word in?",
    chosen: "Chosen",
  },

  setup: {
    kicker: "Step 1 of 3",
    title: "New game",
    players: "Players",
    playersDesc: "3 to 20 agents",
    undercovers: "Undercovers",
    undercoversDesc: "A word that is just a bit different",
    whites: "Mr. Whites",
    whitesDesc: "No word, pure bluff",
    distribution: "How the suspects line up",
    civilians: "Civilians",
    undercover: "Undercover",
    white: "Mr. White",
    next: "Next: names →",
  },

  names: {
    kicker: "Step 2 of 3",
    title: "Who is playing?",
    hint: "Leave a field empty and you get a cover name.",
    placeholder: "Agent {n}",
    back: "Line-up",
    deal: "Hand out the words",
  },

  deal: {
    kicker: "Step 3 of 3",
    title: "Everyone's file",
    instruction:
      "Pass the phone around. Tap your own file, hold it down to read your word, and let go. No peeking!",
    number: "No. {n}",
    tapToOpen: "Tap to open",
    seenStamp: "Seen",
    seenText: "{seen} of {total} files read",
    remaining: "{n} to go",
    reshuffle: "Deal again",
    start: "Start round 1",
  },

  confirm: {
    tag: "CAREFUL!",
    title: "Deal again?",
    bodyStart:
      "Everyone gets a new word and a new role. Whoever already read their file has to look again. ",
    bodyStrong: "This cannot be undone.",
    cancel: "Cancel",
    yes: "Yes, deal again",
    waiting: "Read it first… {n}",
  },

  card: {
    kicker: "Confidential file of",
    hold: "Hold it down",
    holdSub: "For the eyes of {name} only. Let go to close the file.",
    topSecret: "Top secret",
    youAre: "You are",
    whiteTop: "Mr.",
    whiteBottom: "White",
    whiteNote: "You have no word. Listen closely and bluff along.",
    yourWord: "Your secret word",
    wordNote: "Remember it well. Do not give it away too soon.",
    close: "Done, pass it on",
  },

  hint: {
    kicker: "Interview",
    title: "Round {n}",
    speaking: "Speaking",
    instruction: "Give one word as a clue about your secret word.",
    begins: "STARTS!",
    voteNow: "Vote now",
    next: "Next",
    toVote: "To the vote",
  },

  vote: {
    kicker: "Round {n} · The line-up",
    title: "Who looks guilty?",
    instruction:
      "Talk it over, point fingers and vote. Tap the suspect who goes.",
    stamp: "Suspect",
    anotherRound: "One more round",
    unmask: "Unmask {name}",
    pickFirst: "Pick a suspect",
  },

  unmask: {
    kicker: "The file of",
    investigating: "Under investigation…",
    lineBurger: "Innocent! You just sent one of your own away.",
    lineUndercover: "Caught! This agent had a just-slightly-different word.",
    lineWhite: "Found them! Mr. White had no word at all.",
    next: "Continue",
    toGuess: "Mr. White may guess",
  },

  guess: {
    lastChance: "Last chance…",
    title: "{name}, what is the word?",
    sub: "Guess the civilians' word and you win on the spot. You get one try.",
    placeholder: "Type your guess…",
    submit: "Take the shot",
    miss: "Miss!",
    missSub: '"{guess}" is not it. Mr. White is out.',
    next: "Continue",
  },

  end: {
    stamp: "Case closed",
    burgersTitle: "Civilians win",
    burgersLine: "Every infiltrator has been unmasked. Good work, agents.",
    infiltrantenTitle: "Infiltrators win",
    infiltrantenLine: "The infiltrators stayed out of sight until it was late.",
    whiteTitle: "Mr. White wins",
    whiteLine: "Guessed it! Mr. White had the word all along.",
    civilianWord: "Civilian word",
    undercoverWord: "Undercover word",
    out: "out",
    menu: "Menu",
    again: "Another case",
  },
};

export default en;
