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
    recNumber: "No. 0042",
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
    kicker: "Step 1 of {total}",
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
    kicker: "Step 2 of {total}",
    title: "Who is playing?",
    hint: "Leave a field empty and you get a cover name.",
    placeholder: "Agent {n}",
    back: "Line-up",
    deal: "Hand out the words",
  },

  deal: {
    kicker: "Step {n} of {total}",
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
  modes: {
    kicker: "Pick your case",
    title: "Game mode",
    caseLabel: "Case",
    open: "Open file →",
    soon: "Coming soon",
    classicTitle: "Classic",
    classicDesc:
      "Civilians, undercovers and Mr. White. Give clues, vote, unmask.",
    classicMeta: "3–20 players",
    drinkTitle: "Drinking Edition",
    drinkDesc:
      "Three random house rules, secret challenges and a private vote. Vote out a civilian and you drink.",
    drinkMeta: "4–20 · 18+",
    soonCases: [
      {
        title: "White Lies",
        desc: "A new case in preparation. Details to follow.",
      },
      {
        title: "Trust Issues",
        desc: "Nobody can be trusted. Not even you.",
      },
      {
        title: "Double Agent",
        desc: "One player works for both sides at once.",
      },
    ],
  },

  drink: {
    stepKicker: "Step 3 of {total}",
    rulesTitle: "This game's rules",
    rulesIntro:
      "These three rules apply all game. The table keeps itself honest: break one and you take a small sip. Alcohol-free is always fine.",
    rolling: "Shuffling…",
    reroll: "New rules",
    deal: "Hand out roles",
    namesCta: "On to the rules",

    catsTitle: "Drinking Edition · kinds of rule",
    catALabel: "Forbidden words",
    catAShort: "Words",
    catBLabel: "Forbidden behaviour",
    catBShort: "Behaviour",
    catCLabel: "Speaking rules",
    catCShort: "Speaking",
    catDLabel: "Social chaos",
    catDShort: "Social",

    challengeKicker: "Secret challenge",
    challengeReward: "Reward: hand out {n} sips.",
    challengeHint: "Pulled it off? Then you hand out {n} sips.",
    challengeDone: "Challenge done",
    challengeHandOut: "Hand out {n} sips",
    challengeSecret: "secret",
    challengeLapsed: "lapsed",
    challengeBusy: "Challenge still running",
    challengeWon: "Challenge done · handed out {n} sips",
    challengeLost: "Out of the game · challenge lapsed",
    challengesTitle: "This game's challenges",
    challengeCheck: "Open someone's file to check their challenge.",

    sheetTag: "CHARGE SHEET",

    sheetAsk: "Who has to drink?",

    challengeLabel: "Challenge: {t}",

    caseNo: "Case no. 0042",

    agents: "Agents",

    quit: "Leave",

    reveal: "Tap to read",

    fileLabel: "Personal file · No. {n}",

    status: "Status",

    role: "Role",

    roleHidden: "secret secret",

    achieved: "Done",

    rulesHelp: "Broke one? Just take a sip. The table keeps watch.",

    close: "Close",

    sheetOpen: "Case file ▾",
    sheetClose: "Close ▴",
    sheetTitle: "Charge sheet",
    sheetIntro:
      "Broke a rule? Tap Violation. The table keeps watch; the count is only here to help.",
    rulesTab: "Rules",
    houseRules: "House rules",
    violation: "Violation",
    violationFlash: "Cheers +1",
    sip: "{n} sip",
    sips: "{n} sips",
    eliminated: "Out",
    active: "In play",

    resultDrink: "Drink!",
    resultDry: "Nobody drinks",
    resultBurger: "Everyone who voted for this civilian takes a sip.",
    resultNobody: "Oddly enough, nobody voted for this civilian.",
    resultInfiltrant: "Everyone who voted for this infiltrator got it right.",

    rules: {
      "1": { t: "No I", d: "You may not say the word 'I'." },
      "2": { t: "No yes", d: "You may not say the word 'yes'." },
      "3": { t: "No no", d: "You may not say the word 'no'." },
      "4": { t: "No um", d: "You may not say 'uh', 'um' or 'er'." },
      "5": { t: "No names", d: "You may not call anyone by their name." },
      "6": {
        t: "No suspicious",
        d: "You may not say the word 'suspicious'.",
      },
      "7": { t: "No sorry", d: "You may not say 'sorry' in any form." },
      "8": { t: "No maybe", d: "No 'maybe', 'perhaps' or 'possibly'." },
      "9": { t: "No why", d: "You may not say the word 'why'." },
      "10": { t: "No really", d: "No 'really' or 'seriously'." },
      "11": { t: "No know", d: "No 'know', 'knew' or 'knows'." },
      "12": { t: "No you", d: "No 'you' or 'your'." },
      "13": { t: "No think", d: "No 'think', 'thought' or 'thinking'." },
      "14": { t: "No just", d: "You may not say the word 'just'." },
      "15": { t: "No but", d: "You may not say the word 'but'." },
      "16": { t: "No pointing", d: "You may not point a finger at anyone." },
      "17": {
        t: "No laughing",
        d: "You may not laugh during a clue or the discussion.",
      },
      "18": {
        t: "No eye contact",
        d: "Look nobody in the eye while giving your own clue.",
      },
      "19": {
        t: "Hands down",
        d: "You may not touch your face while speaking.",
      },
      "20": { t: "No nodding", d: "You may not nod to agree with anything." },
      "21": {
        t: "No head shaking",
        d: "You may not shake your head to deny anything.",
      },
      "22": { t: "Arms loose", d: "You may not fold your arms." },
      "23": {
        t: "Leave the phone",
        d: "Do not touch the phone when it is not your turn.",
      },
      "24": {
        t: "No interrupting",
        d: "You may not interrupt anyone while they are speaking.",
      },
      "25": {
        t: "Mouth clear",
        d: "You may not cover your mouth while speaking.",
      },
      "26": {
        t: "Questions only",
        d: "In the discussion you may only ask questions.",
      },
      "27": { t: "No questions", d: "You may not ask any questions at all." },
      "28": {
        t: "Five words max",
        d: "Every turn in the discussion is five words at most.",
      },
      "29": {
        t: "No repeating",
        d: "You may not repeat something you said before.",
      },
      "30": {
        t: "No foreign words",
        d: "You may not use words from another language.",
      },
      "31": {
        t: "Speak slowly",
        d: "No rushing. The table decides whether you were too fast.",
      },
      "32": { t: "No defence", d: "You may not say that you are innocent." },
      "33": {
        t: "No certainty",
        d: "You may not say you are 100% sure of anything.",
      },
      "34": {
        t: "Unique clue",
        d: "Your clue may not have been given by anyone else yet.",
      },
      "35": {
        t: "One sentence",
        d: "In the discussion you get one sentence per turn.",
      },
      "36": {
        t: "No standing ally",
        d: "Do not defend the same person twice in a row.",
      },
      "37": {
        t: "No vote advice",
        d: "You may not tell anyone who to vote for.",
      },
      "38": {
        t: "No role names",
        d: "Never say 'civilian', 'undercover' or 'Mr. White'.",
      },
      "39": {
        t: "No accusations",
        d: "You may not accuse anyone outright, only by implication.",
      },
      "40": {
        t: "No self-defence",
        d: "You may not respond to an accusation against yourself.",
      },
      "41": {
        t: "Never first",
        d: "You may not be the first to speak when the discussion opens.",
      },
      "42": {
        t: "No agreeing",
        d: "You may not say outright that you agree with someone.",
      },
      "43": {
        t: "No vote questions",
        d: "You may not ask anyone who they are voting for.",
      },
      "44": {
        t: "No clue explaining",
        d: "You may not explain your clue afterwards.",
      },
      "45": {
        t: "No quoting",
        d: "You may not quote earlier clues word for word.",
      },
    },

    challenges: {
      "1": {
        t: "The Baiter",
        d: "Get someone to say a forbidden word without saying it yourself.",
      },
      "2": {
        t: "The Parrot",
        d: "Get another player to repeat your clue word for word.",
      },
      "3": {
        t: "The Protected",
        d: "Get someone to defend you unprompted.",
      },
      "4": {
        t: "The Manipulator",
        d: "Make someone switch suspects out loud because of your argument.",
      },
      "5": {
        t: "The Decoy",
        d: "Get yourself accused, and survive the vote.",
      },
      "6": {
        t: "The Jammer",
        d: "Get two other players to accuse each other in the same discussion.",
      },
    },
  },

  pvote: {
    kicker: "Round {n} · Secret vote",
    title: "Secret vote",
    revoteTitle: "Re-vote",
    resultTitle: "Result",
    instruction:
      "Same as your role: tap your own file, vote in secret and pass the phone on. The order does not matter.",
    number: "No. {n}",
    voted: "Voted",
    waiting: "Not yet",
    tally: "Count the votes",
    progress: "{n} / {total} voted",
    ask: "{name}, who are you voting for?",
    myVote: "My vote",
    confirm: "Confirm vote for {name}",
    pickFirst: "Pick a suspect",
    tieTitle: "Tied",
    tieBody:
      "Nobody is out and nobody drinks. Everyone votes again, only between:",
    revote: "Start the re-vote",
  },
};

export default en;
