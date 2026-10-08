import type { Dictionary } from "./en";

const nl: Dictionary = {
  meta: {
    title: "Mr. White",
    description:
      "Woordspel voor 3 tot 20 spelers. Iedereen krijgt hetzelfde geheime woord — behalve de infiltranten.",
  },

  common: {
    back: "Terug",
  },

  roleNames: {
    civilian: "BURGER",
    undercover: "UNDERCOVER",
    mrwhite: "MR. WHITE",
  },

  home: {
    caseNumber: "ZAAK Nº 0451 · UNDERCOVER",
    taglineOne: "Iedereen krijgt hetzelfde geheime woord.",
    taglineTwo: "Behalve de",
    taglineHighlight: "infiltranten",
    note: "Vertrouw niemand. Ook je beste vriend niet.",
    play: "SPELEN ▸",
    rules: "UITLEG",
    settings: "INSTELLINGEN",
    imprint: "© 1994 RECHERCHE SPELLEN B.V.",
    themeToDark: "☾ DONKER",
    themeToLight: "☀ LICHT",
    tapeTop: "NIET BETREDEN",
    tapeBottom: "POLITIE LINIE",
  },

  setup: {
    kicker: "DOSSIER 01 · VERDELING",
    title: "NIEUW SPEL",
    players: "SPELERS",
    playersSub: "Hoeveel verdachten?",
    undercovers: "UNDERCOVERS",
    undercoversSub: "Krijgen een woord dat lijkt op dat van de burgers",
    mrWhites: "MR. WHITES",
    mrWhitesSub: "Krijgen geen woord en moeten meebluffen",
    listHeading: "VERDACHTENLIJST",
    civilians: "BURGERS",
    undercover: "UNDERCOVER",
    mrWhite: "MR. WHITE",
    tip: "Tip: ongeveer 1 infiltrant per 3 à 4 spelers.",
    next: "VOLGENDE: NAMEN ▸",
  },

  names: {
    kicker: "DOSSIER 02 · VERDACHTEN",
    title: "WIE DOEN ER MEE?",
    hint: "Laat een veld leeg en we vullen zelf een schuilnaam in.",
    placeholder: "Verdachte {number}",
    back: "← VERDELING",
    deal: "WOORDEN UITDELEN",
  },

  deal: {
    kicker: "DOSSIER 03 · GEHEIM",
    title: "IEDERS WOORD",
    instructionBefore: "Geef de telefoon door. Tik je eigen dossier,",
    instructionBold: "houd ingedrukt",
    instructionAfter: "om je woord te lezen en laat los. Niet spieken.",
    dossier: "DOSSIER #{num}",
    seen: "GEZIEN",
    progress: "{seen} van de {total} hebben gekeken",
    again: "↻ OPNIEUW",
    start: "START RONDE 1 ▸",
  },

  reveal: {
    kicker: "DOSSIER #{num} · ALLEEN VOOR",
    youAre: "JIJ BENT",
    mrWhite: "MR. WHITE",
    mrWhiteNote: "Geen woord voor jou. Luister goed en bluf je erdoorheen.",
    yourWord: "JOUW GEHEIME WOORD",
    wordNote: "Vertel niemand je woord. Wie is er anders dan jij?",
    confidential: "VERTROUWELIJK",
    hold: "HOUD INGEDRUKT",
    personal: "STRIKT PERSOONLIJK · NIET DOORGEVEN",
    done: "KLAAR ✓",
  },

  start: {
    round: "RONDE {number}",
    rolling: "WIE BEGINT ER…",
    rolled: "DE EERSTE HINT KOMT VAN",
    begins: "BEGINT! 🔍",
    begin: "HINTRONDE STARTEN ▸",
  },

  hint: {
    kicker: "RONDE {number} · VERHOOR",
    title: "HINTRONDE",
    speaking: "AAN HET WOORD",
    instruction: "Geef één hint over je woord. Niet te makkelijk!",
    noteLabel: "AANTEKENING · {name}",
    notePlaceholder: "Noteer de hint…",
    timeUp: "TIJD!",
    toVote: "DIRECT STEMMEN",
    next: "VOLGENDE ▸",
    last: "NAAR STEMMING ▸",
  },

  vote: {
    kicker: "RONDE {number} · CONFRONTATIE",
    title: "WIE IS DE VERRADER?",
    instruction:
      "Overleg, wijs aan en stem. Tik op de verdachte met de meeste stemmen.",
    suspect: "VERDACHTE #{num}",
  },

  elim: {
    banner: "FOTO GENOMEN · ONTMASKERD",
    suspect: "VERDACHTE #{num}",
    verdictCivilian: "Oei. Een onschuldige burger…",
    verdictUndercover: "Betrapt! Hun woord was “{word}”.",
    verdictMrWhite: "Gesnapt! Mr. White had geen woord.",
    continue: "VERDER ▸",
    mrWhiteGuesses: "MR. WHITE MAG RADEN ▸",
  },

  guess: {
    kicker: "LAATSTE KANS",
    title: "MR. WHITE MAG RADEN",
    instruction:
      "Raad het woord van de burgers. Goed geraden? Dan wint Mr. White in z'n eentje.",
    placeholder: "Het woord is…",
    submit: "RADEN 🔍",
    right: "RAAK!",
    rightSub: "Het woord was “{word}”.",
    wrong: "MIS!",
    wrongSub: "“{guess}” is het niet. Het spel gaat door.",
    continue: "VERDER ▸",
  },

  end: {
    after: "NA {number} RONDE(S)",
    closed: "ZAAK GESLOTEN",
    civiliansTitle: "DE BURGERS WINNEN",
    civiliansSub: "Alle infiltranten zijn ontmaskerd.",
    infiltratorsTitle: "DE INFILTRANTEN WINNEN",
    infiltratorsSub: "Ze bleven onder de radar.",
    mrWhiteTitle: "MR. WHITE WINT!",
    mrWhiteSub: "Zonder woord, toch geraden. Meesterlijk.",
    civilianWord: "BURGERWOORD",
    undercoverWord: "UNDERCOVERWOORD",
    menu: "MENU",
    again: "NIEUWE ZAAK ▸",
  },

  rules: {
    kicker: "HANDBOEK VOOR RECHERCHEURS",
    title: "UITLEG",
    items: [
      {
        title: "Iedereen een woord",
        body: "Burgers krijgen allemaal hetzelfde woord. Undercovers krijgen een woord dat erop lijkt — en weten zelf niet dat ze undercover zijn.",
      },
      {
        title: "Mr. White heeft niks",
        body: "Mr. White krijgt geen woord en moet luisteren, raden en meebluffen.",
      },
      {
        title: "Hintronde",
        body: "Om de beurt geeft iedereen één hint over zijn woord. Te vaag is verdacht, te duidelijk helpt Mr. White.",
      },
      {
        title: "Stemmen",
        body: "Overleg en stem wie eruit moet. Diegene wordt ontmaskerd en hun rol onthuld.",
      },
      {
        title: "Wie wint?",
        body: "Burgers winnen als alle infiltranten eruit zijn. Infiltranten winnen als er nog maar één burger over is. Mr. White kan bij ontmaskering nog winnen door het woord te raden.",
      },
    ],
    cta: "BEGREPEN, SPELEN ▸",
  },

  settings: {
    kicker: "BUREAU · CONFIGURATIE",
    title: "INSTELLINGEN",
    tabs: ["SPEL", "WOORDEN", "WEERGAVE"],

    timerTitle: "HINT-TIMER",
    timerSub: "Bedenktijd per hint, in seconden.",
    timerOff: "UIT",
    timerOffLabel: "Uit",
    timerSecondsLabel: "{number} sec",

    difficultyTitle: "MOEILIJKHEID",
    difficultySub: "Hoe dicht liggen de twee woorden bij elkaar?",
    difficultyNames: {
      easy: "Makkelijk",
      normal: "Normaal",
      hard: "Pittig",
    },

    mrWhiteGuessLabel: "MR. WHITE MAG RADEN",
    mrWhiteGuessDesc: "Eén gok op het woord als hij ontmaskerd wordt",
    mrWhiteNeverFirstLabel: "MR. WHITE BEGINT NOOIT",
    mrWhiteNeverFirstDesc: "Voorkomt een onmogelijke eerste hint",

    categoriesTitle: "CATEGORIEËN",
    pairCount: "{number} paren",
    categoryNames: {
      eten: "Eten",
      dieren: "Dieren",
      plekken: "Plekken",
      beroepen: "Beroepen",
      dingen: "Dingen",
      sport: "Sport",
    },

    wordLanguageTitle: "TAAL VAN DE WOORDEN",
    wordLanguageNames: { nl: "NL", en: "EN" },

    customTitle: "EIGEN WOORDEN",
    customSub:
      "Een woord voor de burgers en een lijkend woord voor de undercover.",
    customA: "Burger",
    customB: "Undercover",
    customEmpty: "Nog niks genoteerd…",
    customAdd: "Woordpaar toevoegen",
    customRemove: "{a} en {b} verwijderen",

    themeTitle: "THEMA",
    themeDarkLabel: "Donker",
    themeDarkSub: "Nachtdienst",
    themeLightLabel: "Licht",
    themeLightSub: "Dagdienst",
    chosen: "GEKOZEN",

    save: "OPSLAAN ✓",
  },
};

export default nl;
