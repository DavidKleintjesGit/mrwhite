import type { Dictionary } from "./nl";

/**
 * Not yet read through by a native speaker, so German stays out of
 * VERIFIED_LOCALES and out of the picker. See lib/i18n/config.ts.
 */
const de: Dictionary = {
  meta: {
    title: "Mr. White",
    description:
      "Wortspiel für 3 bis 20 Spieler. Alle bekommen dasselbe geheime Wort — außer den Eindringlingen.",
  },

  common: {
    back: "Zurück",
    done: "Fertig",
  },

  roles: {
    burger: "Bürger",
    undercover: "Undercover",
    white: "Mr. White",
  },

  categories: {
    eten: "Essen",
    dieren: "Tiere",
    plekken: "Orte",
    huis: "Im Haus",
    beroepen: "Berufe",
    sport: "Sport & Spiel",
    pop: "Popkultur",
    eigen: "Eigene Wörter",
  },

  home: {
    caseNumber: "Akte Nr. 0042",
    rec: "Rec",
    stamp: "Streng geheim",
    titleTop: "Mr.",
    titleBottom: "White",
    tagline:
      "Alle bekommen dasselbe geheime Wort. Außer den Eindringlingen. Wer ist nicht der, für den er sich ausgibt?",
    play: "Spielen",
    rules: "Anleitung",
    settings: "Einstellungen",
  },

  rules: {
    kicker: "Handbuch für Ermittler",
    title: "Anleitung",
    cards: [
      { name: "Bürger", body: "Kennt das echte Wort." },
      {
        name: "Undercover",
        body: "Fast dasselbe Wort. Weiß es selbst nicht.",
      },
      { name: "Mr. White", body: "Kein Wort. Bluffen!" },
    ],
    items: [
      "Alle bekommen heimlich ein Wort. Die Bürger haben alle dasselbe.",
      "Undercover bekommen ein ähnliches Wort und wissen selbst nicht, dass sie Undercover sind.",
      "Mr. White bekommt gar nichts und muss mitbluffen.",
      "Reihum gibt jeder ein Wort als Hinweis. Nicht zu deutlich, nicht zu vage.",
      "Danach stimmt ihr ab, wer rausfliegt. Wird Mr. White erwischt, darf er einmal raten.",
    ],
    note: "Die Bürger gewinnen, wenn alle Eindringlinge draußen sind. Die Eindringlinge gewinnen, sobald nur noch ein Bürger übrig ist.",
    cta: "Verstanden, los geht's",
  },

  settings: {
    kicker: "Das Hauptquartier",
    title: "Einstellungen",
    categories: "Wortkategorien",
    pick: "Auswählen →",
    allCategories: "Alle {total} Kategorien",
    someCategories: "{on} von {total} Kategorien",
    noneChosen: "Keine gewählt, wir nehmen alles",
    display: "Darstellung",
    themeDark: "Dunkel",
    themeLight: "Hell",
    difficulty: "Schwierigkeit der Wörter",
    diffEasy: "Leicht",
    diffMix: "Gemischt",
    diffHard: "Schwer",
    diffHelpEasy:
      "Die Wörter liegen weit auseinander. Undercover fallen schneller auf.",
    diffHelpMix: "Eine Mischung aus leichten und kniffligen Wortpaaren.",
    diffHelpHard:
      "Die Wörter ähneln sich sehr. Zweifel sind garantiert.",
    language: "Sprache",
    timer: "Hinweis-Timer",
    timerOff: "Aus",
    mrGuessLabel: "Mr. White darf raten",
    mrGuessDesc: "Enttarnt? Ein Versuch auf das Wort. Richtig heißt Sieg.",
    mrNotFirstLabel: "Mr. White beginnt nie",
    mrNotFirstDesc: "Der erste Hinweis kommt immer von jemandem mit Wort.",
    customWords: "Eigene Wörter",
    customA: "Bürgerwort",
    customB: "Undercover",
    customAdd: "Wortpaar hinzufügen",
    customRemove: "{a} und {b} entfernen",
    customEmpty:
      'Denk dir ein Wortpaar aus. Es landet in der Kategorie "Eigene".',
    save: "Speichern",
  },

  archive: {
    tag: "ARCHIV",
    title: "Wortkategorien",
    search: "Kategorie suchen…",
    all: "Alle an",
    none: "Alle aus",
    count: "{on} / {total} an",
    pairs: "{n} Wortpaare",
    noResults: 'Keine Kategorie gefunden für "{query}".',
  },

  language: {
    tag: "INTERNATIONAL",
    title: "Sprache",
    sub: "In welcher Sprache läuft das Spiel?",
    chosen: "Gewählt",
  },

  setup: {
    kicker: "Schritt 1 von 3",
    title: "Neues Spiel",
    players: "Spieler",
    playersDesc: "3 bis 20 Ermittler",
    undercovers: "Undercover",
    undercoversDesc: "Ein Wort, das nur leicht abweicht",
    whites: "Mr. Whites",
    whitesDesc: "Kein Wort, nur Bluff",
    distribution: "So stehen die Verdächtigen",
    civilians: "Bürger",
    undercover: "Undercover",
    white: "Mr. White",
    next: "Weiter: Namen →",
  },

  names: {
    kicker: "Schritt 2 von 3",
    title: "Wer spielt mit?",
    hint: "Lass ein Feld leer und du bekommst einen Decknamen.",
    placeholder: "Agent {n}",
    back: "Aufstellung",
    deal: "Wörter austeilen",
  },

  deal: {
    kicker: "Schritt 3 von 3",
    title: "Jede Akte",
    instruction:
      "Gebt das Handy herum. Tippe auf deine eigene Akte, halte sie gedrückt, um dein Wort zu lesen, und lass los. Nicht spicken!",
    number: "Nr. {n}",
    tapToOpen: "Zum Öffnen tippen",
    seenStamp: "Gesehen",
    seenText: "{seen} von {total} Akten gelesen",
    remaining: "Noch {n} übrig",
    reshuffle: "Neu austeilen",
    start: "Runde 1 starten",
  },

  confirm: {
    tag: "ACHTUNG!",
    title: "Neu austeilen?",
    bodyStart:
      "Alle bekommen ein neues Wort und eine neue Rolle. Wer seine Akte schon gelesen hat, muss noch einmal schauen. ",
    bodyStrong: "Das lässt sich nicht rückgängig machen.",
    cancel: "Abbrechen",
    yes: "Ja, neu austeilen",
    waiting: "Erst lesen… {n}",
  },

  card: {
    kicker: "Vertrauliche Akte von",
    hold: "Gedrückt halten",
    holdSub:
      "Nur für die Augen von {name}. Loslassen schließt die Akte wieder.",
    topSecret: "Top secret",
    youAre: "Du bist",
    whiteTop: "Mr.",
    whiteBottom: "White",
    whiteNote: "Du hast kein Wort. Hör gut zu und bluffe mit.",
    yourWord: "Dein geheimes Wort",
    wordNote: "Merk es dir gut. Verrate es nicht zu früh.",
    close: "Fertig, weitergeben",
  },

  hint: {
    kicker: "Verhör",
    title: "Runde {n}",
    speaking: "Am Zug",
    instruction: "Gib ein Wort als Hinweis auf dein geheimes Wort.",
    begins: "BEGINNT!",
    voteNow: "Jetzt abstimmen",
    next: "Weiter",
    toVote: "Zur Abstimmung",
  },

  vote: {
    kicker: "Runde {n} · Gegenüberstellung",
    title: "Wer ist verdächtig?",
    instruction:
      "Beratet euch, zeigt aufeinander und stimmt ab. Tippt den Verdächtigen an, der rausfliegt.",
    stamp: "Verdächtig",
    anotherRound: "Noch eine Runde",
    unmask: "{name} enttarnen",
    pickFirst: "Wähle einen Verdächtigen",
  },

  unmask: {
    kicker: "Die Akte von",
    investigating: "Wird untersucht…",
    lineBurger: "Unschuldig! Ihr habt einen der Euren rausgeworfen.",
    lineUndercover: "Erwischt! Dieser Agent hatte ein leicht anderes Wort.",
    lineWhite: "Gefunden! Mr. White hatte überhaupt kein Wort.",
    next: "Weiter",
    toGuess: "Mr. White darf raten",
  },

  guess: {
    lastChance: "Letzte Chance…",
    title: "{name}, wie lautet das Wort?",
    sub: "Errätst du das Wort der Bürger, gewinnst du sofort. Du hast einen Versuch.",
    placeholder: "Tipp eingeben…",
    submit: "Alles auf eine Karte",
    miss: "Daneben!",
    missSub: '"{guess}" ist es nicht. Mr. White ist raus.',
    next: "Weiter",
  },

  end: {
    stamp: "Fall geschlossen",
    burgersTitle: "Bürger gewinnen",
    burgersLine: "Alle Eindringlinge sind enttarnt. Gute Arbeit, Ermittler.",
    infiltrantenTitle: "Eindringlinge gewinnen",
    infiltrantenLine: "Sie blieben unsichtbar, bis es zu spät war.",
    whiteTitle: "Mr. White gewinnt",
    whiteLine: "Erraten! Mr. White kannte das Wort die ganze Zeit.",
    civilianWord: "Bürgerwort",
    undercoverWord: "Undercover-Wort",
    out: "raus",
    menu: "Menü",
    again: "Noch ein Fall",
  },
};

export default de;
