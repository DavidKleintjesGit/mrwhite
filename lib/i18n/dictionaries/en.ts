/**
 * English is the source language. Every other dictionary is typed against this
 * one, so a missing or renamed key fails the build instead of showing up blank.
 *
 * Capitalised strings are set in Archivo Black, which the design uses in caps
 * throughout. They are written in caps here rather than uppercased in CSS, so
 * a translator can lowercase a language that would read badly shouted.
 */
const en = {
  meta: {
    title: "Mr. White",
    description:
      "Word game for 3 to 20 players. Everyone gets the same secret word — except the infiltrators.",
  },

  common: {
    back: "Back",
  },

  roleNames: {
    civilian: "CIVILIAN",
    undercover: "UNDERCOVER",
    mrwhite: "MR. WHITE",
  },

  home: {
    caseNumber: "CASE Nº 0451 · UNDERCOVER",
    taglineOne: "Everyone gets the same secret word.",
    taglineTwo: "Except the",
    taglineHighlight: "infiltrators",
    note: "Trust nobody. Not even your best friend.",
    play: "PLAY ▸",
    rules: "HOW TO PLAY",
    settings: "SETTINGS",
    imprint: "© 1994 DETECTIVE GAMES LTD.",
    themeToDark: "☾ DARK",
    themeToLight: "☀ LIGHT",
    tapeTop: "DO NOT CROSS",
    tapeBottom: "POLICE LINE",
  },

  setup: {
    kicker: "FILE 01 · LINE-UP",
    title: "NEW GAME",
    players: "PLAYERS",
    playersSub: "How many suspects?",
    undercovers: "UNDERCOVERS",
    undercoversSub: "Get a word that resembles the civilians' word",
    mrWhites: "MR. WHITES",
    mrWhitesSub: "Get no word at all and have to bluff along",
    listHeading: "SUSPECT LIST",
    civilians: "CIVILIANS",
    undercover: "UNDERCOVER",
    mrWhite: "MR. WHITE",
    tip: "Tip: roughly one infiltrator per 3 or 4 players.",
    next: "NEXT: NAMES ▸",
  },

  names: {
    kicker: "FILE 02 · SUSPECTS",
    title: "WHO IS PLAYING?",
    hint: "Leave a field empty and we will pick an alias for you.",
    placeholder: "Suspect {number}",
    back: "← LINE-UP",
    deal: "HAND OUT THE WORDS",
  },

  deal: {
    kicker: "FILE 03 · CLASSIFIED",
    title: "EVERYONE'S WORD",
    instructionBefore: "Pass the phone around. Tap your own file,",
    instructionBold: "hold it down",
    instructionAfter: "to read your word, and let go. No peeking.",
    dossier: "FILE #{num}",
    seen: "SEEN",
    progress: "{seen} of {total} have looked",
    again: "↻ DEAL AGAIN",
    start: "START ROUND 1 ▸",
  },

  reveal: {
    kicker: "FILE #{num} · FOR THE EYES OF",
    youAre: "YOU ARE",
    mrWhite: "MR. WHITE",
    mrWhiteNote: "No word for you. Listen closely and bluff your way through.",
    yourWord: "YOUR SECRET WORD",
    wordNote: "Tell nobody your word. Who here has a different one?",
    confidential: "CONFIDENTIAL",
    hold: "HOLD DOWN",
    personal: "STRICTLY PERSONAL · DO NOT PASS ON",
    done: "DONE ✓",
  },

  start: {
    round: "ROUND {number}",
    rolling: "WHO STARTS…",
    rolled: "THE FIRST CLUE COMES FROM",
    begins: "STARTS! 🔍",
    begin: "START THE CLUES ▸",
  },

  hint: {
    kicker: "ROUND {number} · INTERVIEW",
    title: "CLUE ROUND",
    speaking: "SPEAKING",
    instruction: "Give one clue about your word. Do not make it too easy!",
    noteLabel: "NOTE · {name}",
    notePlaceholder: "Jot down the clue…",
    timeUp: "TIME!",
    toVote: "VOTE NOW",
    next: "NEXT ▸",
    last: "TO THE VOTE ▸",
  },

  vote: {
    kicker: "ROUND {number} · CONFRONTATION",
    title: "WHO IS THE TRAITOR?",
    instruction:
      "Talk it over, point fingers and vote. Tap the suspect with the most votes.",
    suspect: "SUSPECT #{num}",
  },

  elim: {
    banner: "PHOTO TAKEN · UNMASKED",
    suspect: "SUSPECT #{num}",
    verdictCivilian: "Ouch. An innocent civilian…",
    verdictUndercover: "Caught! Their word was “{word}”.",
    verdictMrWhite: "Got them! Mr. White had no word at all.",
    continue: "CONTINUE ▸",
    mrWhiteGuesses: "MR. WHITE MAY GUESS ▸",
  },

  guess: {
    kicker: "LAST CHANCE",
    title: "MR. WHITE MAY GUESS",
    instruction:
      "Guess the civilians' word. Get it right and Mr. White wins on his own.",
    placeholder: "The word is…",
    submit: "GUESS 🔍",
    right: "DIRECT HIT!",
    rightSub: "The word was “{word}”.",
    wrong: "MISS!",
    wrongSub: "“{guess}” is not it. The game goes on.",
    continue: "CONTINUE ▸",
  },

  end: {
    after: "AFTER {number} ROUND(S)",
    closed: "CASE CLOSED",
    civiliansTitle: "THE CIVILIANS WIN",
    civiliansSub: "Every infiltrator has been unmasked.",
    infiltratorsTitle: "THE INFILTRATORS WIN",
    infiltratorsSub: "They stayed under the radar.",
    mrWhiteTitle: "MR. WHITE WINS!",
    mrWhiteSub: "No word, and he guessed it anyway. Masterful.",
    civilianWord: "CIVILIAN WORD",
    undercoverWord: "UNDERCOVER WORD",
    menu: "MENU",
    again: "NEW CASE ▸",
  },

  rules: {
    kicker: "DETECTIVE'S HANDBOOK",
    title: "HOW TO PLAY",
    items: [
      {
        title: "Everyone gets a word",
        body: "Civilians all get the same word. Undercovers get one that resembles it — and do not know they are the undercover.",
      },
      {
        title: "Mr. White gets nothing",
        body: "Mr. White gets no word at all and has to listen, guess and bluff along.",
      },
      {
        title: "Clue round",
        body: "Taking turns, everyone gives one clue about their word. Too vague is suspicious, too clear helps Mr. White.",
      },
      {
        title: "Vote",
        body: "Talk it over and vote on who goes. That player is unmasked and their role revealed.",
      },
      {
        title: "Who wins?",
        body: "Civilians win once every infiltrator is out. Infiltrators win once a single civilian is left. Unmasked, Mr. White can still win by guessing the word.",
      },
    ],
    cta: "GOT IT, LET'S PLAY ▸",
  },

  settings: {
    kicker: "BUREAU · CONFIGURATION",
    title: "SETTINGS",
    tabs: ["GAME", "WORDS", "DISPLAY"],

    timerTitle: "CLUE TIMER",
    timerSub: "Thinking time per clue, in seconds.",
    timerOff: "OFF",
    timerOffLabel: "Off",
    timerSecondsLabel: "{number} sec",

    difficultyTitle: "DIFFICULTY",
    difficultySub: "How close together are the two words?",
    difficultyNames: {
      easy: "Easy",
      normal: "Normal",
      hard: "Tough",
    },

    mrWhiteGuessLabel: "MR. WHITE MAY GUESS",
    mrWhiteGuessDesc: "One guess at the word when he is unmasked",
    mrWhiteNeverFirstLabel: "MR. WHITE NEVER STARTS",
    mrWhiteNeverFirstDesc: "Avoids an impossible opening clue",

    categoriesTitle: "CATEGORIES",
    pairCount: "{number} pairs",
    categoryNames: {
      eten: "Food",
      dieren: "Animals",
      plekken: "Places",
      beroepen: "Jobs",
      dingen: "Things",
      sport: "Sport",
    },

    wordLanguageTitle: "LANGUAGE OF THE WORDS",
    wordLanguageNames: { nl: "NL", en: "EN" },

    customTitle: "YOUR OWN WORDS",
    customSub:
      "A word for the civilians and a similar one for the undercover.",
    customA: "Civilian",
    customB: "Undercover",
    customEmpty: "Nothing noted down yet…",
    customAdd: "Add word pair",
    customRemove: "Remove {a} and {b}",

    themeTitle: "THEME",
    themeDarkLabel: "Dark",
    themeDarkSub: "Night shift",
    themeLightLabel: "Light",
    themeLightSub: "Day shift",
    chosen: "CHOSEN",

    save: "SAVE ✓",
  },
};

export default en;

export type Dictionary = typeof en;
