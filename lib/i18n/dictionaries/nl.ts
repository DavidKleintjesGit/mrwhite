import type { Dictionary } from "./en";

const nl: Dictionary = {
  meta: {
    title: "Mr. White",
    description:
      "Woordspel voor 3 tot 10 spelers. Iedereen krijgt hetzelfde geheime woord — behalve de infiltranten.",
  },

  common: {
    back: "Terug",
  },

  home: {
    tagline: "Iedereen krijgt hetzelfde geheime woord. Behalve de infiltranten.",
    play: "Spelen",
    rules: "Uitleg",
    settings: "Instellingen",
  },

  play: {
    title: "Nieuw spel",
    players: "Spelers",
    undercovers: "Undercovers",
    undercoversHint: "Krijgen een woord dat lijkt op dat van de burgers",
    mrWhites: "Mr. Whites",
    mrWhitesHint: "Krijgen geen woord en moeten meebluffen",
    distribution: "Verdeling",
    civilians: "Burgers",
    undercover: "Undercover",
    mrWhite: "Mr. White",
    useRecommended:
      "Terug naar het advies voor {players} spelers ({undercovers} undercover, {mrWhites} Mr. White)",
    next: "Volgende: namen invoeren",

    roleNames: {
      civilian: "Burger",
      undercover: "Undercover",
      mrwhite: "Mr. White",
    },

    errors: {
      playerRange: "Dit spel werkt met {min} tot {max} spelers.",
      noInfiltrators:
        "Kies minstens één undercover of Mr. White, anders heeft niemand iets te zoeken.",
      civiliansMinority:
        "De burgers moeten met meer zijn dan de infiltranten, anders is het spel bij de start al voorbij.",
    },

    names: {
      title: "Wie doen er mee?",
      hint: "Veld leeg laten mag, dan vullen wij er een naam in.",
      playerNumber: "Speler {number}",
      duplicate: "{name} staat er twee keer in. Geef ze verschillende namen.",
      back: "Terug naar de verdeling",
      confirm: "Woorden uitdelen",
    },

    reveal: {
      title: "Ieders woord",
      instruction: "Geef de telefoon rond. Zoek je naam en houd 'm ingedrukt.",
      stillOpen:
        "Kijk zo vaak als je wil. Zodra de ronde start zijn de woorden weg.",
      progress: "{seen} van de {total} hebben gekeken",
      hold: "Ingedrukt houden",
      close: "Klaar",
      start: "Start de ronde",
      yourWord: "Jouw woord",
      noWord: "Jij krijgt geen woord. Luister goed en bluf mee.",
      reDeal: "Opnieuw verdelen",
    },

    firstClue: {
      title: "Eerste hint",
      startsWith: "{name} begint",
      continue: "Verder",
    },

    clues: {
      title: "Hints",
      instruction:
        "In deze volgorde één hint per speler, over je eigen woord. Nooit het woord zelf, en nooit een hint die al gevallen is.",
      toVoting: "Naar het stemmen",
    },

    voting: {
      title: "Wie ligt eruit?",
      instruction: "Overleg eerst. Tik daarna aan wie de groep eruit stemt.",
      pickFirst: "Kies eerst een speler",
      confirm: "{name} eruit stemmen",
    },

    elimination: {
      title: "Onthuld",
      was: "{name} was",
      continue: "Verder",
      mrWhiteGuesses: "Mr. White krijgt één gok",
      undo: "Verkeerde speler — terugdraaien",
    },

    mrWhiteGuess: {
      title: "Mr. White raadt",
      instruction:
        "{name}, één gok naar het woord van de burgers. Raad je goed, dan winnen de infiltranten alsnog.",
      placeholder: "Het woord van de burgers",
      submit: "Raden",
    },

    result: {
      title: "Uitslag",
      roundLabel: "Ronde {number}",
      civiliansWin: "De burgers winnen",
      infiltratorsWin: "De infiltranten winnen",
      byGuess: "{name} raadde het woord.",
      wordsWere: "De burgers hadden {civilian}, de undercovers {undercover}.",
      standings: "Stand",
      nextRound: "Nog een ronde",
      newGame: "Nieuw spel",
    },
  },

  rules: {
    title: "Uitleg",
    idea: {
      heading: "Het idee",
      body: "Iedereen krijgt hetzelfde geheime woord — behalve de infiltranten. Je weet niet wie wat heeft. Door om de beurt een hint te geven moet je eruit zien te vissen wie erbuiten valt, zonder je eigen woord weg te geven.",
    },
    roles: {
      heading: "De rollen",
      items: [
        {
          name: "Burger",
          body: "Krijgt het geheime woord. Moet alle infiltranten eruit stemmen.",
        },
        {
          name: "Undercover",
          body: "Krijgt een woord dat erop lijkt, bijvoorbeeld appel tegenover peer. Moet overleven tot de burgers in de minderheid zijn.",
        },
        {
          name: "Mr. White",
          body: "Krijgt helemaal geen woord. Moet uit de hints van de anderen zien op te maken waar het over gaat, en meebluffen.",
        },
      ],
    },
    round: {
      heading: "Een ronde",
      steps: [
        "De telefoon gaat rond. Iedereen zoekt zijn eigen naam op en bekijkt zijn woord — zo vaak als nodig, tot de ronde start.",
        "Om de beurt zegt iedereen één woord of korte zin over zijn woord. Niet het woord zelf, en geen hint die al gegeven is.",
        "Overleggen. Wie klinkt vaag?",
        "Stemmen. Wie de meeste stemmen krijgt ligt eruit, en de app laat zien wat die speler was.",
        "Herhalen tot een van de partijen gewonnen heeft.",
      ],
    },
    winning: {
      heading: "Winnen",
      items: [
        {
          term: "Burgers",
          body: "winnen zodra alle infiltranten weggestemd zijn.",
        },
        {
          term: "Infiltranten",
          body: "winnen zodra ze met evenveel zijn als de burgers.",
        },
        {
          term: "Mr. White",
          body: "krijgt één gok naar het woord van de burgers als hij weggestemd wordt. Raadt hij goed, dan winnen de infiltranten alsnog.",
        },
      ],
    },
  },

  settings: {
    title: "Instellingen",
    intro:
      "Hier valt nog niets in te stellen. Het aantal spelers, undercovers en Mr. Whites kies je per spel bij Spelen.",
    language: "Taal",
    comingHeading: "Wat hier komt",
    coming: [
      "Thema kiezen, of alles door elkaar",
      "Moeilijkheid van de woordparen",
      "Geluid aan of uit",
    ],
  },
};

export default nl;
