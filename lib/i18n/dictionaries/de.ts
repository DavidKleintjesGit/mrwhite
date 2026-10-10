import type { Dictionary } from "./nl";

/**
 * Not yet read through by a native speaker, so German stays out of
 * VERIFIED_LOCALES and out of the picker. See lib/i18n/config.ts.
 */
const de: Dictionary = {
  meta: {
    title: "Mister White",
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
    recNumber: "Nr. 0042",
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
    diffHelpHard: "Die Wörter ähneln sich sehr. Zweifel sind garantiert.",
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
    privacy: "Datenschutz",
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
    kicker: "Schritt 1 von {total}",
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
    kicker: "Schritt 2 von {total}",
    title: "Wer spielt mit?",
    hint: "Lass ein Feld leer und du bekommst einen Decknamen.",
    placeholder: "Agent {n}",
    back: "Aufstellung",
    deal: "Wörter austeilen",
  },

  deal: {
    kicker: "Schritt {n} von {total}",
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
  modes: {
    kicker: "Wähle deinen Fall",
    title: "Spielmodus",
    caseLabel: "Fall",
    open: "Akte öffnen →",
    soon: "Demnächst",
    classicTitle: "Klassisch",
    classicDesc:
      "Bürger, Undercover und Mr. White. Hinweise geben, abstimmen, enttarnen.",
    classicMeta: "3–20 Spieler",
    drinkTitle: "Drinking Edition",
    drinkDesc:
      "Drei zufällige Hausregeln, geheime Challenges und eine private Abstimmung. Wer einen Bürger rauswählt, trinkt.",
    drinkMeta: "4–20 · 18+",
    soonCases: [
      {
        title: "White Lies",
        desc: "Ein neuer Fall in Vorbereitung. Details folgen.",
      },
      {
        title: "Trust Issues",
        desc: "Niemandem ist zu trauen. Dir auch nicht.",
      },
      {
        title: "Double Agent",
        desc: "Ein Spieler arbeitet für beide Seiten gleichzeitig.",
      },
    ],
  },

  drink: {
    stepKicker: "Schritt 3 von {total}",
    rulesTitle: "Regeln dieser Runde",
    rulesIntro:
      "Diese drei Regeln gelten die ganze Runde. Die Gruppe passt selbst auf: Wer eine bricht, nimmt einen kleinen Schluck. Alkoholfrei geht immer.",
    rolling: "Mischen…",
    reroll: "Neue Regeln",
    deal: "Rollen verteilen",
    namesCta: "Weiter zu den Regeln",

    catsTitle: "Drinking Edition · Regelarten",

    catCount: "{n} Regeln",
    catALabel: "Verbotene Wörter",
    catAShort: "Wörter",
    catBLabel: "Verbotenes Verhalten",
    catBShort: "Verhalten",
    catCLabel: "Sprechregeln",
    catCShort: "Sprechen",
    catDLabel: "Soziales Chaos",
    catDShort: "Sozial",

    challengeKicker: "Geheime Challenge",
    challengeReward: "Belohnung: {n} Schlucke verteilen.",
    challengeHint: "Geschafft? Dann darfst du {n} Schlucke verteilen.",
    challengeDone: "Challenge geschafft",
    challengeHandOut: "Verteile {n} Schlucke",
    challengeSecret: "geheim",
    challengeLapsed: "verfallen",
    challengeBusy: "Challenge läuft noch",
    challengeWon: "Challenge geschafft · durfte {n} Schlucke verteilen",
    challengeLost: "Ausgeschieden · Challenge verfallen",
    challengesTitle: "Challenges dieser Runde",
    challengeCheck: "Öffne jemandes Akte, um seine Challenge zu prüfen.",

    sheetTag: "VORSTRAFEN",

    sheetAsk: "Wer muss trinken?",

    challengeLabel: "Challenge: {t}",

    caseNo: "Fall Nr. 0042",

    agents: "Agenten",

    quit: "Verlassen",

    reveal: "Zum Lesen tippen",

    fileLabel: "Personalakte · Nr. {n}",

    status: "Status",

    role: "Rolle",

    roleHidden: "geheim geheim",

    achieved: "Geschafft",

    rulesHelp: "Gebrochen? Einfach einen Schluck nehmen. Die Gruppe passt auf.",

    close: "Schließen",

    sheetOpen: "Fallakte ▾",
    sheetClose: "Schließen ▴",
    sheetTitle: "Vorstrafen",
    sheetIntro:
      "Regel gebrochen? Tippe auf Verstoß. Die Gruppe passt selbst auf, die Zählung ist nur eine Hilfe.",
    rulesTab: "Regeln",
    houseRules: "Hausregeln",
    violation: "Verstoß",
    violationFlash: "Prost +1",
    sip: "{n} Schluck",
    sips: "{n} Schlucke",
    eliminated: "Ausgeschieden",
    active: "Im Spiel",

    resultDrink: "Trinken!",

    cheers: "Prost",
    resultDry: "Niemand trinkt",
    resultBurger: "Wer für diesen Bürger gestimmt hat, nimmt einen Schluck.",
    resultNobody: "Komischerweise hat niemand für diesen Bürger gestimmt.",
    resultInfiltrant: "Wer für diesen Infiltranten gestimmt hat, lag richtig.",

    rules: {
      "1": { t: "Kein ICH", d: "Du darfst das Wort 'ich' nicht sagen." },
      "2": { t: "Kein JA", d: "Du darfst das Wort 'ja' nicht sagen." },
      "3": { t: "Kein NEIN", d: "Du darfst das Wort 'nein' nicht sagen." },
      "4": { t: "Kein ÄH", d: "Du darfst kein 'äh', 'ähm' oder 'hm' sagen." },
      "5": { t: "Keine Namen", d: "Du darfst niemanden beim Namen nennen." },
      "6": {
        t: "Kein verdächtig",
        d: "Du darfst das Wort 'verdächtig' nicht sagen.",
      },
      "7": {
        t: "Kein Sorry",
        d: "Du darfst kein 'sorry' oder 'tut mir leid' sagen.",
      },
      "8": {
        t: "Kein vielleicht",
        d: "Kein 'vielleicht', 'eventuell' oder 'möglicherweise'.",
      },
      "9": { t: "Kein warum", d: "Du darfst das Wort 'warum' nicht sagen." },
      "10": { t: "Kein echt", d: "Kein 'echt' oder 'ernsthaft'." },
      "11": { t: "Kein wissen", d: "Kein 'weiß', 'wissen' oder 'wusste'." },
      "12": { t: "Kein du", d: "Kein 'du', 'dir' oder 'dein'." },
      "13": { t: "Kein denken", d: "Kein 'denke', 'denken' oder 'dachte'." },
      "14": {
        t: "Kein einfach",
        d: "Du darfst das Wort 'einfach' nicht sagen.",
      },
      "15": { t: "Kein aber", d: "Du darfst das Wort 'aber' nicht sagen." },
      "16": {
        t: "Nicht zeigen",
        d: "Du darfst mit dem Finger auf niemanden zeigen.",
      },
      "17": {
        t: "Nicht lachen",
        d: "Du darfst während eines Hinweises oder der Diskussion nicht lachen.",
      },
      "18": {
        t: "Kein Blickkontakt",
        d: "Sieh bei deinem eigenen Hinweis niemandem in die Augen.",
      },
      "19": {
        t: "Hände runter",
        d: "Du darfst dein Gesicht beim Sprechen nicht berühren.",
      },
      "20": {
        t: "Nicht nicken",
        d: "Du darfst nicht nicken, um zuzustimmen.",
      },
      "21": {
        t: "Nicht Kopf schütteln",
        d: "Du darfst nicht den Kopf schütteln, um etwas zu verneinen.",
      },
      "22": { t: "Arme locker", d: "Du darfst die Arme nicht verschränken." },
      "23": {
        t: "Handy in Ruhe",
        d: "Fass das Handy nicht an, wenn du nicht dran bist.",
      },
      "24": {
        t: "Nicht unterbrechen",
        d: "Du darfst niemanden beim Sprechen unterbrechen.",
      },
      "25": {
        t: "Mund frei",
        d: "Du darfst deinen Mund beim Sprechen nicht bedecken.",
      },
      "26": {
        t: "Nur Fragen",
        d: "In der Diskussion darfst du nur Fragen stellen.",
      },
      "27": {
        t: "Frageverbot",
        d: "Du darfst überhaupt keine Fragen stellen.",
      },
      "28": {
        t: "Maximal fünf Wörter",
        d: "Jeder Beitrag in der Diskussion hat höchstens fünf Wörter.",
      },
      "29": {
        t: "Keine Wiederholung",
        d: "Du darfst deine eigene vorherige Aussage nicht wiederholen.",
      },
      "30": {
        t: "Keine Anglizismen",
        d: "Du darfst keine englischen Wörter benutzen.",
      },
      "31": {
        t: "Langsam sprechen",
        d: "Nicht hastig reden. Die Gruppe entscheidet, ob du zu schnell warst.",
      },
      "32": {
        t: "Keine Verteidigung",
        d: "Du darfst nicht sagen, dass du unschuldig bist.",
      },
      "33": {
        t: "Keine Gewissheit",
        d: "Du darfst nicht sagen, dass du dir zu 100% sicher bist.",
      },
      "34": {
        t: "Einzigartiger Hinweis",
        d: "Dein Hinweis darf noch nicht von jemand anderem gekommen sein.",
      },
      "35": {
        t: "Ein Satz",
        d: "In der Diskussion sagst du pro Zug nur einen Satz.",
      },
      "36": {
        t: "Verbotener Verbündeter",
        d: "Verteidige nicht zweimal hintereinander dieselbe Person.",
      },
      "37": {
        t: "Kein Wahlratschlag",
        d: "Du darfst niemandem sagen, für wen er stimmen soll.",
      },
      "38": {
        t: "Keine Rollennamen",
        d: "Sage nie 'Bürger', 'Undercover' oder 'Mr. White'.",
      },
      "39": {
        t: "Keine Anschuldigungen",
        d: "Du darfst niemanden direkt beschuldigen, nur indirekt.",
      },
      "40": {
        t: "Keine Selbstverteidigung",
        d: "Du darfst auf eine Anschuldigung gegen dich nicht reagieren.",
      },
      "41": {
        t: "Nicht als Erster",
        d: "Du darfst nicht als Erster reagieren, wenn die Diskussion beginnt.",
      },
      "42": {
        t: "Kein Zustimmen",
        d: "Du darfst nicht wörtlich sagen, dass du jemandem zustimmst.",
      },
      "43": {
        t: "Keine Wahlfragen",
        d: "Du darfst niemanden fragen, für wen er stimmt.",
      },
      "44": {
        t: "Keine Hinweiserklärung",
        d: "Du darfst deinen Hinweis nicht nachträglich erklären.",
      },
      "45": {
        t: "Keine Zitate",
        d: "Du darfst frühere Hinweise nicht wörtlich zitieren.",
      },
    },

    challenges: {
      "1": {
        t: "Der Lockvogel",
        d: "Bring jemanden dazu, ein verbotenes Wort zu sagen, ohne es selbst zu sagen.",
      },
      "2": {
        t: "Der Papagei",
        d: "Bring einen anderen Spieler dazu, deinen Hinweis wörtlich zu wiederholen.",
      },
      "3": {
        t: "Der Beschützte",
        d: "Bring jemanden dazu, dich von sich aus zu verteidigen.",
      },
      "4": {
        t: "Der Manipulator",
        d: "Bring jemanden dazu, wegen deines Arguments laut den Verdächtigen zu wechseln.",
      },
      "5": {
        t: "Der Köder",
        d: "Lass dich beschuldigen und überlebe die Abstimmung.",
      },
      "6": {
        t: "Der Störsender",
        d: "Bring zwei andere Spieler dazu, sich in derselben Diskussion gegenseitig zu beschuldigen.",
      },
    },
  },

  pvote: {
    kicker: "Runde {n} · Geheime Abstimmung",
    title: "Geheime Abstimmung",
    revoteTitle: "Stichwahl",
    resultTitle: "Ergebnis",
    instruction:
      "Wie bei deiner Rolle: Tippe auf deine eigene Akte, stimme geheim ab und gib das Handy weiter. Die Reihenfolge ist egal.",
    number: "Nr. {n}",
    voted: "Abgestimmt",
    waiting: "Noch nicht",
    tally: "Stimmen zählen",
    progress: "{n} / {total} abgestimmt",
    ask: "{name}, für wen stimmst du?",
    myVote: "Meine Stimme",
    confirm: "Stimme für {name} bestätigen",
    pickFirst: "Wähle einen Verdächtigen",
    tieTitle: "Gleichstand",
    tieBody:
      "Niemand fliegt raus und niemand trinkt. Alle stimmen noch einmal ab, nur zwischen:",
    revote: "Stichwahl starten",
  },
};

export default de;
