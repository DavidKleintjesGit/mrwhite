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
    nextNote: "Namen invoeren en woorden uitdelen volgen hierna.",
    errors: {
      playerRange: "Dit spel werkt met {min} tot {max} spelers.",
      noInfiltrators:
        "Kies minstens één undercover of Mr. White, anders heeft niemand iets te zoeken.",
      civiliansMinority:
        "De burgers moeten met meer zijn dan de infiltranten, anders is het spel bij de start al voorbij.",
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
    note: {
      heading: "Goed om te weten",
      body: "De speler die begint is altijd een burger. Mr. White heeft bij een eerste hint namelijk nog geen enkele informatie, en zou dan geen kans maken.",
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
