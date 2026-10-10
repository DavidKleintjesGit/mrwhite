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
    privacy: "Privacybeleid",
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
    kicker: "Stap 1 van {total}",
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
    kicker: "Stap 2 van {total}",
    title: "Wie doen er mee?",
    hint: "Laat een veld leeg en je krijgt een schuilnaam.",
    placeholder: "Agent {n}",
    back: "Verdeling",
    deal: "Woorden uitdelen",
  },

  deal: {
    kicker: "Stap {n} van {total}",
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
    instruction:
      "Overleg, wijs aan en stem. Tik op de verdachte die eruit gaat.",
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
  modes: {
    kicker: "Kies je zaak",
    title: "Spelmodus",
    caseLabel: "Zaak",
    open: "Open dossier →",
    soon: "Binnenkort",
    classicTitle: "Klassiek",
    classicDesc:
      "Burgers, undercovers en Mr. White. Hints geven, stemmen, ontmaskeren.",
    classicMeta: "3–20 spelers",
    drinkTitle: "Drinking Edition",
    drinkDesc:
      "Drie random drankregels, geheime challenges en privé stemmen. Wie een burger wegstemt, drinkt.",
    drinkMeta: "4–20 · 18+",
    soonCases: [
      {
        title: "White Lies",
        desc: "Nieuwe zaak in voorbereiding. Details volgen.",
      },
      {
        title: "Trust Issues",
        desc: "Niemand is te vertrouwen. Ook jij niet.",
      },
      {
        title: "Double Agent",
        desc: "Eén speler werkt voor beide kanten tegelijk.",
      },
    ],
  },

  drink: {
    stepKicker: "Stap 3 van {total}",
    rulesTitle: "Regels van dit potje",
    rulesIntro:
      "Deze drie regels gelden het hele potje. De groep let zelf op: overtreed je er één, dan neem je een kleine slok. Alcoholvrij mag altijd.",
    rolling: "Schudden…",
    reroll: "Nieuwe regels",
    deal: "Rollen uitdelen",
    namesCta: "Naar de regels",

    catsTitle: "Drinking Edition · regelsoorten",
    catALabel: "Verboden woorden",
    catAShort: "Woorden",
    catBLabel: "Verboden gedrag",
    catBShort: "Gedrag",
    catCLabel: "Spreekregels",
    catCShort: "Spreken",
    catDLabel: "Sociale chaos",
    catDShort: "Sociaal",

    challengeKicker: "Geheime challenge",
    challengeReward: "Beloning: {n} slokken uitdelen.",
    challengeHint: "Gehaald? Dan mag je {n} slokken uitdelen.",
    challengeDone: "Challenge gehaald",
    challengeHandOut: "Deel {n} slokken uit",
    challengeSecret: "geheim",
    challengeLapsed: "vervallen",
    challengeBusy: "Challenge nog bezig",
    challengeWon: "Challenge gehaald · mocht {n} slokken uitdelen",
    challengeLost: "Ligt eruit · challenge vervallen",
    challengesTitle: "Challenges van dit potje",
    challengeCheck: "Open iemands dossier om zijn challenge te controleren.",

    sheetOpen: "Zaakdossier ▾",
    sheetClose: "Sluiten ▴",
    sheetTitle: "Strafblad",
    sheetIntro:
      "Regel overtreden? Tik op Overtreding. De groep let zelf op, en de telling is alleen een hulpmiddel.",
    rulesTab: "Regels",
    houseRules: "Huisregels",
    violation: "Overtreding",
    violationFlash: "Proost +1",
    sip: "{n} slok",
    sips: "{n} slokken",
    eliminated: "Uitgeschakeld",
    active: "Actief",

    resultDrink: "Drinken!",
    resultDry: "Niemand drinkt",
    resultBurger: "Wie op deze burger stemde, neemt een slok.",
    resultNobody: "Gek genoeg stemde niemand op deze burger.",
    resultInfiltrant: "Wie op deze infiltrant stemde, stemde goed.",

    rules: {
      "1": { t: "Geen IK", d: "Je mag het woord 'ik' niet zeggen." },
      "2": { t: "Geen JA", d: "Je mag het woord 'ja' niet zeggen." },
      "3": { t: "Geen NEE", d: "Je mag het woord 'nee' niet zeggen." },
      "4": { t: "Geen UHM", d: "Je mag geen 'uh', 'uhm' of 'eh' zeggen." },
      "5": { t: "Geen namen", d: "Je mag niemand bij zijn naam noemen." },
      "6": {
        t: "Geen verdacht",
        d: "Je mag het woord 'verdacht' niet zeggen.",
      },
      "7": {
        t: "Geen sorry",
        d: "Je mag geen 'sorry' of 'sorry hoor' zeggen.",
      },
      "8": {
        t: "Geen misschien",
        d: "Geen 'misschien', 'wellicht' of 'mogelijk'.",
      },
      "9": { t: "Geen waarom", d: "Je mag het woord 'waarom' niet zeggen." },
      "10": { t: "Geen echt", d: "Geen 'echt' of 'serieus'." },
      "11": { t: "Geen weten", d: "Geen 'weet', 'weten' of 'wist'." },
      "12": { t: "Geen jij", d: "Geen 'jij', 'jou' of 'jouw'." },
      "13": { t: "Geen denken", d: "Geen 'denk', 'denken' of 'dacht'." },
      "14": { t: "Geen gewoon", d: "Je mag het woord 'gewoon' niet zeggen." },
      "15": { t: "Geen maar", d: "Je mag het woord 'maar' niet zeggen." },
      "16": {
        t: "Niet wijzen",
        d: "Je mag niet met je vinger naar iemand wijzen.",
      },
      "17": {
        t: "Niet lachen",
        d: "Je mag niet lachen tijdens een hint of discussie.",
      },
      "18": {
        t: "Geen oogcontact",
        d: "Kijk niemand in de ogen tijdens je eigen hint.",
      },
      "19": {
        t: "Handen thuis",
        d: "Je mag je gezicht niet aanraken tijdens het praten.",
      },
      "20": {
        t: "Niet knikken",
        d: "Je mag niet knikken om ergens mee in te stemmen.",
      },
      "21": {
        t: "Niet hoofdschudden",
        d: "Je mag je hoofd niet schudden om iets te ontkennen.",
      },
      "22": { t: "Armen los", d: "Je mag je armen niet over elkaar doen." },
      "23": {
        t: "Telefoon met rust",
        d: "Raak de telefoon niet aan als je niet aan de beurt bent.",
      },
      "24": {
        t: "Niet onderbreken",
        d: "Je mag niemand onderbreken terwijl die praat.",
      },
      "25": {
        t: "Mond vrij",
        d: "Je mag je mond niet bedekken tijdens het praten.",
      },
      "26": {
        t: "Alleen vragen",
        d: "In de discussie mag je alleen vragen stellen.",
      },
      "27": { t: "Vraagverbod", d: "Je mag helemaal geen vragen stellen." },
      "28": {
        t: "Max vijf woorden",
        d: "Elke spreekbeurt in de discussie is maximaal vijf woorden.",
      },
      "29": {
        t: "Geen herhaling",
        d: "Je mag je eigen vorige uitspraak niet herhalen.",
      },
      "30": { t: "Geen Engels", d: "Je mag geen Engelse woorden gebruiken." },
      "31": {
        t: "Spreek langzaam",
        d: "Niet haastig praten. De groep beslist of je te snel was.",
      },
      "32": {
        t: "Geen verdediging",
        d: "Je mag niet zeggen dat je onschuldig bent.",
      },
      "33": {
        t: "Geen zekerheid",
        d: "Je mag niet zeggen dat je ergens 100% zeker van bent.",
      },
      "34": {
        t: "Uniek hintwoord",
        d: "Je hint mag nog niet door iemand anders gegeven zijn.",
      },
      "35": { t: "Eén zin", d: "Bij een discussiebeurt zeg je maar één zin." },
      "36": {
        t: "Verboden bondgenoot",
        d: "Verdedig niet twee keer achter elkaar dezelfde persoon.",
      },
      "37": {
        t: "Geen stemadvies",
        d: "Je mag niemand vertellen op wie die moet stemmen.",
      },
      "38": {
        t: "Geen rolnamen",
        d: "Zeg nooit 'Burger', 'Undercover' of 'Mr. White'.",
      },
      "39": {
        t: "Geen beschuldigingen",
        d: "Je mag niemand rechtstreeks beschuldigen, alleen indirect.",
      },
      "40": {
        t: "Geen zelfverdediging",
        d: "Je mag niet reageren op een beschuldiging tegen jezelf.",
      },
      "41": {
        t: "Niet als eerste",
        d: "Je mag niet als eerste reageren als de discussie begint.",
      },
      "42": {
        t: "Geen eens",
        d: "Je mag niet letterlijk zeggen dat je het met iemand eens bent.",
      },
      "43": {
        t: "Geen stemvragen",
        d: "Je mag niemand vragen op wie die gaat stemmen.",
      },
      "44": {
        t: "Geen hintuitleg",
        d: "Je mag je hint niet achteraf uitleggen.",
      },
      "45": {
        t: "Geen citaten",
        d: "Je mag eerdere hints niet letterlijk citeren.",
      },
    },

    challenges: {
      "1": {
        t: "De Uitlokker",
        d: "Laat iemand een verboden woord zeggen, zonder het zelf te zeggen.",
      },
      "2": {
        t: "De Papegaai",
        d: "Zorg dat een andere speler jouw hint letterlijk herhaalt.",
      },
      "3": {
        t: "De Beschermer",
        d: "Zorg dat iemand jou spontaan verdedigt.",
      },
      "4": {
        t: "De Manipulator",
        d: "Zorg dat iemand hardop van verdachte wisselt door jouw argument.",
      },
      "5": {
        t: "De Lokvogel",
        d: "Zorg dat iemand jou beschuldigt, en overleef de stemming.",
      },
      "6": {
        t: "De Stoorzender",
        d: "Zorg dat twee andere spelers elkaar in dezelfde discussie beschuldigen.",
      },
    },
  },

  pvote: {
    kicker: "Ronde {n} · Geheime stemming",
    title: "Geheime stemming",
    revoteTitle: "Herstemming",
    resultTitle: "Uitslag",
    instruction:
      "Net als bij je rol: tik op je eigen dossier, stem in het geheim en geef de telefoon door. Volgorde maakt niet uit.",
    number: "Nr. {n}",
    voted: "Gestemd",
    waiting: "Nog niet",
    tally: "Stemmen tellen",
    progress: "{n} / {total} gestemd",
    ask: "{name}, op wie stem jij?",
    myVote: "Mijn stem",
    confirm: "Bevestig stem op {name}",
    pickFirst: "Kies een verdachte",
    tieTitle: "Gelijke stand",
    tieBody:
      "Niemand ligt eruit en niemand drinkt. Iedereen stemt opnieuw, alleen tussen:",
    revote: "Start herstemming",
  },
};

export default nl;

export type Dictionary = typeof nl;
