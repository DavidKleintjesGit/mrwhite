/**
 * Dutch is the source language here: the design was written in Dutch and every
 * string below is taken from it verbatim. English is typed against this shape,
 * so a missing or renamed key fails the build instead of showing up blank.
 */
const nl = {
  meta: {
    title: "Mister White",
    description:
      "Woordspel voor 3 tot 20 spelers. Iedereen krijgt hetzelfde geheime woord — behalve de infiltranten.",
  },

  common: {
    back: "Terug",
    done: "Klaar",
  },

  roles: {
    burger: "Burger",
    undercover: "Undercover",
    white: "Mr. White",
  },

  categories: {
    eten: "Eten",
    dieren: "Dieren",
    plekken: "Plekken",
    huis: "In huis",
    beroepen: "Beroepen",
    sport: "Sport & spel",
    pop: "Popcultuur",
    eigen: "Eigen woorden",
  },

  home: {
    caseNumber: "Dossier nr. 0042",
    rec: "Rec",
    stamp: "Strikt geheim",
    titleTop: "Mr.",
    titleBottom: "White",
    tagline:
      "Iedereen krijgt hetzelfde geheime woord. Behalve de infiltranten. Wie is er niet wie hij zegt te zijn?",
    play: "Spelen",
    rules: "Uitleg",
    settings: "Instellingen",
  },

  rules: {
    kicker: "Handboek voor agenten",
    title: "Uitleg",
    cards: [
      { name: "Burger", body: "Kent het echte woord." },
      {
        name: "Undercover",
        body: "Bijna-hetzelfde woord. Weet het zelf niet.",
      },
      { name: "Mr. White", body: "Geen woord. Bluffen!" },
    ],
    items: [
      "Iedereen krijgt in het geheim een woord. De burgers hebben allemaal hetzelfde woord.",
      "Undercovers krijgen een woord dat erop lijkt, en weten zelf niet dat ze undercover zijn.",
      "Mr. White krijgt helemaal niets en moet meebluffen.",
      "Om de beurt geef je één woord als hint. Niet te duidelijk, niet te vaag.",
      "Daarna stemmen jullie wie eruit gaat. Wordt Mr. White gepakt, dan mag hij één keer raden.",
    ],
    note: "Burgers winnen als alle infiltranten eruit liggen. Infiltranten winnen als er nog maar één burger over is.",
    cta: "Begrepen, spelen",
  },

  settings: {
    kicker: "Het hoofdkwartier",
    title: "Instellingen",
    categories: "Woordcategorieën",
    pick: "Kiezen →",
    allCategories: "Alle {total} categorieën",
    someCategories: "{on} van {total} categorieën",
    noneChosen: "Geen gekozen, we pakken alles",
    display: "Weergave",
    themeDark: "Donker",
    themeLight: "Licht",
    difficulty: "Moeilijkheid woorden",
    diffEasy: "Makkelijk",
    diffMix: "Mix",
    diffHard: "Moeilijk",
    diffHelpEasy:
      "Woorden liggen ver uit elkaar. Undercovers vallen sneller op.",
    diffHelpMix: "Een mix van makkelijke en lastige woordparen.",
    diffHelpHard:
      "Woorden lijken heel erg op elkaar. Veel twijfel gegarandeerd.",
    language: "Taal",
    timer: "Hint-timer",
    timerOff: "Uit",
    mrGuessLabel: "Mr. White mag raden",
    mrGuessDesc: "Ontmaskerd? Eén gok op het woord. Goed is winst.",
    mrNotFirstLabel: "Mr. White begint nooit",
    mrNotFirstDesc: "De eerste hint komt altijd van iemand met een woord.",
    customWords: "Eigen woorden",
    customA: "Burgerwoord",
    customB: "Undercover",
    customAdd: "Woordpaar toevoegen",
    customRemove: "{a} en {b} verwijderen",
    customEmpty: 'Verzin een woordpaar. Het komt in de categorie "Eigen".',
    save: "Opslaan",
  },

  archive: {
    tag: "ARCHIEF",
    title: "Woordcategorieën",
    search: "Zoek een categorie…",
    all: "Alles aan",
    none: "Alles uit",
    count: "{on} / {total} aan",
    pairs: "{n} woordparen",
    noResults: 'Geen categorie gevonden voor "{query}".',
  },

  language: {
    tag: "INTERNATIONAAL",
    title: "Taal van de woorden",
    sub: "In welke taal krijgen de agenten hun geheime woord?",
    chosen: "Gekozen",
  },

  setup: {
    kicker: "Stap 1 van 3",
    title: "Nieuw spel",
    players: "Spelers",
    playersDesc: "3 tot 20 agenten",
    undercovers: "Undercovers",
    undercoversDesc: "Een woord dat net anders is",
    whites: "Mr. Whites",
    whitesDesc: "Geen woord, alleen bluf",
    distribution: "Verdeling van de verdachten",
    civilians: "Burgers",
    undercover: "Undercover",
    white: "Mr. White",
    next: "Volgende: namen →",
  },

  names: {
    kicker: "Stap 2 van 3",
    title: "Wie doen er mee?",
    hint: "Laat een veld leeg en je krijgt een schuilnaam.",
    placeholder: "Agent {n}",
    back: "Verdeling",
    deal: "Woorden uitdelen",
  },

  deal: {
    kicker: "Stap 3 van 3",
    title: "Ieders dossier",
    instruction:
      "Geef de telefoon door. Tik op je eigen dossier, houd ingedrukt om je woord te lezen en laat los. Niet spieken!",
    number: "Nr. {n}",
    tapToOpen: "Tik om te openen",
    seenStamp: "Gezien",
    seenText: "{seen} van de {total} dossiers gelezen",
    remaining: "Nog {n} te gaan",
    reshuffle: "Opnieuw delen",
    start: "Start ronde 1",
  },

  confirm: {
    tag: "LET OP!",
    title: "Opnieuw delen?",
    bodyStart:
      "Iedereen krijgt een nieuw woord en een nieuwe rol. Wie zijn dossier al las, moet opnieuw kijken. ",
    bodyStrong: "Dit kun je niet ongedaan maken.",
    cancel: "Annuleren",
    yes: "Ja, opnieuw delen",
    waiting: "Lees eerst… {n}",
  },

  card: {
    kicker: "Vertrouwelijk dossier van",
    hold: "Houd ingedrukt",
    holdSub:
      "Alleen voor de ogen van {name}. Laat los om het dossier te sluiten.",
    topSecret: "Top secret",
    youAre: "Jij bent",
    whiteTop: "Mr.",
    whiteBottom: "White",
    whiteNote: "Je hebt geen woord. Luister goed en bluf mee.",
    yourWord: "Jouw geheime woord",
    wordNote: "Onthoud het goed. Verraad het niet te snel.",
    close: "Klaar, doorgeven",
  },

  hint: {
    kicker: "Verhoor",
    title: "Ronde {n}",
    speaking: "Aan het woord",
    instruction: "Geef één woord als hint over je geheime woord.",
    begins: "BEGINT!",
    voteNow: "Nu stemmen",
    next: "Volgende",
    toVote: "Naar de stemming",
  },

  vote: {
    kicker: "Ronde {n} · De line-up",
    title: "Wie is verdacht?",
    instruction: "Overleg, wijs aan en stem. Tik op de verdachte die eruit gaat.",
    stamp: "Verdacht",
    anotherRound: "Nog een rondje",
    unmask: "Ontmasker {name}",
    pickFirst: "Kies een verdachte",
  },

  unmask: {
    kicker: "Het dossier van",
    investigating: "Wordt onderzocht…",
    lineBurger:
      "Onschuldig! Jullie hebben een van je eigen mensen weggestuurd.",
    lineUndercover: "Betrapt! Deze agent had een net-iets-ander woord.",
    lineWhite: "Gevonden! Mr. White had helemaal geen woord.",
    next: "Verder",
    toGuess: "Mr. White mag raden",
  },

  guess: {
    lastChance: "Laatste kans…",
    title: "{name}, wat is het woord?",
    sub: "Raad je het woord van de burgers? Dan win je meteen. Je krijgt één poging.",
    placeholder: "Typ je gok…",
    submit: "Waag de gok",
    miss: "Mis!",
    missSub: '"{guess}" is het niet. Mr. White ligt eruit.',
    next: "Verder",
  },

  end: {
    stamp: "Zaak gesloten",
    burgersTitle: "Burgers winnen",
    burgersLine: "Alle infiltranten zijn ontmaskerd. Goed speurwerk, agenten.",
    infiltrantenTitle: "Infiltranten winnen",
    infiltrantenLine: "De infiltranten bleven uit beeld tot het te laat was.",
    whiteTitle: "Mr. White wint",
    whiteLine: "Geraden! Mr. White had het woord al die tijd door.",
    civilianWord: "Burgerwoord",
    undercoverWord: "Undercoverwoord",
    out: "eruit",
    menu: "Menu",
    again: "Nog een zaak",
  },
};

export default nl;

export type Dictionary = typeof nl;
