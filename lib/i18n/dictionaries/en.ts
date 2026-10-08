/**
 * English is the source language. Every other dictionary is typed against this
 * one, so a missing or renamed key fails the build instead of showing up blank.
 */
const en = {
  meta: {
    title: "Mr. White",
    description:
      "Word game for 3 to 10 players. Everyone gets the same secret word — except the infiltrators.",
  },

  common: {
    back: "Back",
  },

  home: {
    tagline: "Everyone gets the same secret word. Except the infiltrators.",
    play: "Play",
    rules: "How to play",
    settings: "Settings",
  },

  play: {
    title: "New game",
    players: "Players",
    undercovers: "Undercovers",
    undercoversHint: "Get a word that resembles the civilians' word",
    mrWhites: "Mr. Whites",
    mrWhitesHint: "Get no word at all and have to bluff along",
    distribution: "Line-up",
    civilians: "Civilians",
    undercover: "Undercover",
    mrWhite: "Mr. White",
    useRecommended:
      "Back to the suggested line-up for {players} players ({undercovers} undercover, {mrWhites} Mr. White)",
    next: "Next: enter names",
    errors: {
      playerRange: "This game works with {min} to {max} players.",
      noInfiltrators:
        "Pick at least one undercover or Mr. White, or there is nothing to work out.",
      civiliansMinority:
        "Civilians have to outnumber the infiltrators, otherwise the game is over before it starts.",
    },

    names: {
      title: "Who is playing?",
      hint: "Leave a field empty and we will fill in a name for you.",
      playerNumber: "Player {number}",
      duplicate: "{name} is in there twice. Give them different names.",
      back: "Back to the line-up",
      confirm: "Hand out the words",
    },

    reveal: {
      title: "Everyone's word",
      instruction:
        "Pass the phone around. Find your own name, hold it to read your word, and let go.",
      stillOpen:
        "Look as often as you like. Once the round starts, the words are gone.",
      progress: "{seen} of {total} have looked",
      hold: "Hold to read",
      close: "Done",
      start: "Start round 1",
      roleNames: {
        civilian: "Civilian",
        undercover: "Undercover",
        mrwhite: "Mr. White",
      },
      yourWord: "Your word",
      noWord: "You get no word. Listen closely and bluff along.",
      reDeal: "Deal again",
    },

    firstClue: {
      title: "First clue",
      startsWith: "{name} starts",
      note: "The clue round, voting and the rest of the game come next.",
      newGame: "New game",
    },
  },

  rules: {
    title: "How to play",
    idea: {
      heading: "The idea",
      body: "Everyone gets the same secret word — except the infiltrators. You do not know who has what. By taking turns giving a clue, you have to work out who falls outside the group, without giving away your own word.",
    },
    roles: {
      heading: "The roles",
      items: [
        {
          name: "Civilian",
          body: "Gets the secret word. Has to vote out every infiltrator.",
        },
        {
          name: "Undercover",
          body: "Gets a word that resembles it, say apple against pear. Has to survive until the civilians are outnumbered.",
        },
        {
          name: "Mr. White",
          body: "Gets no word at all. Has to work out from everyone else's clues what the word is about, and bluff along.",
        },
      ],
    },
    round: {
      heading: "A round",
      steps: [
        "The phone goes around. Everyone looks up their own name and checks their word — as often as they need, until the round starts.",
        "Taking turns, everyone says one word or short phrase about their word. Not the word itself, and no clue that has already been given.",
        "Talk it over. Who sounds vague?",
        "Vote. Whoever gets the most votes is out, and the app shows what they were.",
        "Repeat until one side has won.",
      ],
    },
    winning: {
      heading: "Winning",
      items: [
        {
          term: "Civilians",
          body: "win as soon as every infiltrator has been voted out.",
        },
        {
          term: "Infiltrators",
          body: "win as soon as they equal the civilians in number.",
        },
        {
          term: "Mr. White",
          body: "gets one guess at the civilians' word if he is voted out. Guess right and the infiltrators win after all.",
        },
      ],
    },
  },

  settings: {
    title: "Settings",
    intro:
      "Nothing to set here yet. You pick the number of players, undercovers and Mr. Whites per game under Play.",
    language: "Language",
    comingHeading: "What lands here",
    coming: [
      "Pick a theme, or mix everything",
      "Difficulty of the word pairs",
      "Sound on or off",
    ],
  },
};

export default en;

export type Dictionary = typeof en;
