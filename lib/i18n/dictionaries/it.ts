import type { Dictionary } from "./nl";

/**
 * Not yet read through by a native speaker, so Italian stays out of
 * VERIFIED_LOCALES and out of the picker. See lib/i18n/config.ts.
 */
const it: Dictionary = {
  meta: {
    title: "Mister White",
    description:
      "Gioco di parole per 3-20 giocatori. Tutti ricevono la stessa parola segreta — tranne gli impostori.",
  },

  common: {
    back: "Indietro",
    done: "Fatto",
  },

  roles: {
    burger: "Cittadino",
    undercover: "Infiltrato",
    white: "Mr. White",
  },

  categories: {
    eten: "Cibo",
    dieren: "Animali",
    plekken: "Luoghi",
    huis: "In casa",
    beroepen: "Mestieri",
    sport: "Sport e giochi",
    pop: "Cultura pop",
    eigen: "Le tue parole",
  },

  home: {
    caseNumber: "Fascicolo n. 0042",
    rec: "Rec",
    recNumber: "N. 0042",
    stamp: "Top secret",
    titleTop: "Mr.",
    titleBottom: "White",
    tagline:
      "Tutti ricevono la stessa parola segreta. Tranne gli impostori. Chi non è chi dice di essere?",
    play: "Gioca",
    rules: "Come si gioca",
    settings: "Impostazioni",
  },

  rules: {
    kicker: "Manuale dell'investigatore",
    title: "Come si gioca",
    cards: [
      { name: "Cittadino", body: "Conosce la parola vera." },
      {
        name: "Infiltrato",
        body: "Una parola quasi uguale. Non lo sa nemmeno lui.",
      },
      { name: "Mr. White", body: "Nessuna parola. Bluffa!" },
    ],
    items: [
      "Ognuno riceve una parola in segreto. I cittadini hanno tutti la stessa.",
      "Gli infiltrati ricevono una parola simile e non sanno di essere infiltrati.",
      "Mr. White non riceve niente e deve stare al gioco.",
      "A turno ognuno dice una parola come indizio. Né troppo chiara né troppo vaga.",
      "Poi votate chi far uscire. Se beccate Mr. White, ha diritto a un tentativo.",
    ],
    note: "I cittadini vincono quando tutti gli impostori sono fuori. Gli impostori vincono appena resta un solo cittadino.",
    cta: "Capito, si gioca",
  },

  settings: {
    kicker: "Il quartier generale",
    title: "Impostazioni",
    categories: "Categorie di parole",
    pick: "Scegli →",
    allCategories: "Tutte le {total} categorie",
    someCategories: "{on} categorie su {total}",
    noneChosen: "Nessuna scelta, prendiamo tutto",
    display: "Aspetto",
    themeDark: "Scuro",
    themeLight: "Chiaro",
    difficulty: "Difficoltà delle parole",
    diffEasy: "Facile",
    diffMix: "Misto",
    diffHard: "Difficile",
    diffHelpEasy:
      "Le parole sono molto diverse. Gli infiltrati si notano prima.",
    diffHelpMix: "Un misto di coppie facili e insidiose.",
    diffHelpHard: "Le parole si somigliano moltissimo. Dubbi garantiti.",
    language: "Lingua",
    timer: "Timer degli indizi",
    timerOff: "Off",
    mrGuessLabel: "Mr. White può indovinare",
    mrGuessDesc: "Smascherato? Un tentativo sulla parola. Se indovina, vince.",
    mrNotFirstLabel: "Mr. White non inizia mai",
    mrNotFirstDesc: "Il primo indizio viene sempre da chi ha una parola.",
    customWords: "Le tue parole",
    customA: "Parola dei cittadini",
    customB: "Infiltrato",
    customAdd: "Aggiungi una coppia",
    customRemove: "Elimina {a} e {b}",
    customEmpty:
      'Inventa una coppia di parole. Finirà nella categoria "Le tue parole".',
    save: "Salva",
    privacy: "Informativa sulla privacy",
  },

  archive: {
    tag: "ARCHIVIO",
    title: "Categorie di parole",
    search: "Cerca una categoria…",
    all: "Attiva tutto",
    none: "Disattiva tutto",
    count: "{on} / {total} attive",
    pairs: "{n} coppie di parole",
    noResults: 'Nessuna categoria trovata per "{query}".',
  },

  language: {
    tag: "INTERNAZIONALE",
    title: "Lingua",
    sub: "In che lingua si gioca la partita?",
    chosen: "Scelta",
  },

  setup: {
    kicker: "Passo 1 di {total}",
    title: "Nuova partita",
    players: "Giocatori",
    playersDesc: "Da 3 a 20 agenti",
    undercovers: "Infiltrati",
    undercoversDesc: "Una parola appena diversa",
    whites: "Mr. White",
    whitesDesc: "Nessuna parola, solo bluff",
    distribution: "Come stanno i sospettati",
    civilians: "Cittadini",
    undercover: "Infiltrato",
    white: "Mr. White",
    next: "Avanti: i nomi →",
  },

  names: {
    kicker: "Passo 2 di {total}",
    title: "Chi gioca?",
    hint: "Lascia un campo vuoto e ti diamo un nome in codice.",
    placeholder: "Agente {n}",
    back: "Formazione",
    deal: "Distribuisci le parole",
  },

  deal: {
    kicker: "Passo {n} di {total}",
    title: "Il fascicolo di ognuno",
    instruction:
      "Passatevi il telefono. Tocca il tuo fascicolo, tieni premuto per leggere la parola e lascia. Non sbirciare!",
    number: "N. {n}",
    tapToOpen: "Tocca per aprire",
    seenStamp: "Visto",
    seenText: "{seen} fascicoli letti su {total}",
    remaining: "Ne mancano {n}",
    reshuffle: "Ridistribuisci",
    start: "Inizia il round 1",
  },

  confirm: {
    tag: "ATTENZIONE!",
    title: "Ridistribuire?",
    bodyStart:
      "Tutti ricevono una parola e un ruolo nuovi. Chi ha già letto il fascicolo dovrà rileggerlo. ",
    bodyStrong: "Non si torna indietro.",
    cancel: "Annulla",
    yes: "Sì, ridistribuisci",
    waiting: "Leggi prima… {n}",
    quitTitle: "Fermare la partita?",
    quitBody:
      "La partita finisce e torni al menu. Ruoli e voti vengono cancellati.",
    quitYes: "Sì, fermati",
  },

  card: {
    kicker: "Fascicolo riservato di",
    hold: "Tieni premuto",
    holdSub:
      "Solo per gli occhi di {name}. Lascia per richiudere il fascicolo.",
    topSecret: "Top secret",
    youAre: "Tu sei",
    whiteTop: "Mr.",
    whiteBottom: "White",
    whiteNote: "Non hai nessuna parola. Ascolta bene e bluffa.",
    yourWord: "La tua parola segreta",
    wordNote: "Ricordala bene. Non svelarla troppo presto.",
    close: "Fatto, passa oltre",
  },

  hint: {
    kicker: "Interrogatorio",
    title: "Round {n}",
    speaking: "Ha la parola",
    instruction: "Dai una parola come indizio sulla tua parola segreta.",
    begins: "INIZIA!",
    voteNow: "Vota subito",
    next: "Avanti",
    toVote: "Passa al voto",
  },

  vote: {
    kicker: "Round {n} · Il confronto",
    title: "Chi è sospetto?",
    instruction:
      "Discutete, puntate il dito e votate. Tocca il sospettato che esce.",
    stamp: "Sospetto",
    anotherRound: "Ancora un giro",
    unmask: "Smaschera {name}",
    pickFirst: "Scegli un sospettato",
  },

  unmask: {
    kicker: "Il fascicolo di",
    investigating: "Sotto esame…",
    lineBurger: "Innocente! Avete appena cacciato uno dei vostri.",
    lineUndercover:
      "Preso! Questo agente aveva una parola leggermente diversa.",
    lineWhite: "Trovato! Mr. White non aveva nessuna parola.",
    next: "Continua",
    toGuess: "Mr. White può indovinare",
  },

  guess: {
    lastChance: "Ultima occasione…",
    title: "{name}, qual è la parola?",
    sub: "Indovina la parola dei cittadini e vinci all'istante. Hai un solo tentativo.",
    placeholder: "Scrivi la tua risposta…",
    submit: "Tenta il colpo",
    miss: "Sbagliato!",
    missSub: '"{guess}" non è la parola. Mr. White è fuori.',
    next: "Continua",
  },

  end: {
    stamp: "Caso chiuso",
    burgersTitle: "Vincono i cittadini",
    burgersLine:
      "Tutti gli impostori sono stati smascherati. Bel lavoro, agenti.",
    infiltrantenTitle: "Vincono gli impostori",
    infiltrantenLine: "Sono rimasti nell'ombra fino a quando è stato tardi.",
    whiteTitle: "Vince Mr. White",
    whiteLine: "Indovinata! Mr. White sapeva la parola da sempre.",
    civilianWord: "Parola dei cittadini",
    undercoverWord: "Parola dell'infiltrato",
    out: "fuori",
    menu: "Menu",
    again: "Un altro caso",
  },
  modes: {
    kicker: "Scegli il tuo caso",
    title: "Modalità di gioco",
    caseLabel: "Caso",
    open: "Apri il fascicolo →",
    soon: "Prossimamente",
    classicTitle: "Classica",
    classicDesc:
      "Cittadini, infiltrati e Mr. White. Dare indizi, votare, smascherare.",
    classicMeta: "3–20 giocatori",
    drinkTitle: "Drinking Edition",
    drinkDesc:
      "Tre regole della casa a caso, sfide segrete e voto privato. Chi fa fuori un cittadino beve.",
    drinkMeta: "4–20 · 18+",
    soonCases: [
      {
        title: "White Lies",
        desc: "Un nuovo caso in preparazione. Dettagli in arrivo.",
      },
      {
        title: "Trust Issues",
        desc: "Nessuno è affidabile. Nemmeno tu.",
      },
      {
        title: "Double Agent",
        desc: "Un giocatore lavora per entrambe le parti insieme.",
      },
    ],
  },

  drink: {
    stepKicker: "Passo 3 di {total}",
    rulesTitle: "Le regole di questa partita",
    rulesIntro:
      "Queste tre regole valgono per tutta la partita. Il gruppo si controlla da solo: se ne infrangi una, fai un piccolo sorso. Analcolico va sempre bene.",
    rolling: "Mescolo…",
    reroll: "Nuove regole",
    deal: "Distribuisci i ruoli",
    namesCta: "Alle regole",

    catsTitle: "Drinking Edition · tipi di regola",

    catCount: "{n} regole",
    catALabel: "Parole vietate",
    catAShort: "Parole",
    catBLabel: "Gesti vietati",
    catBShort: "Gesti",
    catCLabel: "Regole di parola",
    catCShort: "Parlare",
    catDLabel: "Caos sociale",
    catDShort: "Sociale",

    challengeKicker: "Sfida segreta",
    challengeReward: "Premio: distribuisci {n} sorsi.",
    challengeHint: "Riuscita? Allora distribuisci {n} sorsi.",
    challengeDone: "Sfida riuscita",
    challengeHandOut: "Distribuisci {n} sorsi",
    challengeSecret: "segreta",
    challengeLapsed: "annullata",
    challengesTitle: "Le sfide di questa partita",
    challengeCheck:
      "Apri il fascicolo di qualcuno per controllare la sua sfida.",

    caseNo: "Caso n. 0042",

    agents: "Agenti",

    quit: "Esci",

    reveal: "Tocca per leggere",

    fileLabel: "Fascicolo personale · N. {n}",

    status: "Stato",

    role: "Ruolo",

    roleHidden: "segreto segreto",

    achieved: "Riuscita",

    rulesHelp: "Infranta? Fai un sorso. Il gruppo controlla.",

    close: "Chiudi",

    sheetOpen: "Fascicolo del caso ▾",
    sheetClose: "Chiudi ▴",
    sheetTitle: "Fedina penale",
    sheetIntro:
      "Regola infranta? Tocca Infrazione. Il gruppo controlla, il conteggio è solo un aiuto.",
    rulesTab: "Regole",
    houseRules: "Regole della casa",
    eliminated: "Eliminato",
    active: "In gioco",

    resultDrink: "Si beve!",

    cheers: "Salute",

    timeUp: "Tempo scaduto · fai un sorso",
    resultDry: "Non beve nessuno",
    resultBurger: "Chi ha votato questo cittadino fa un sorso.",
    resultNobody: "Stranamente nessuno ha votato questo cittadino.",
    resultInfiltrant: "Chi ha votato questo infiltrato ha indovinato.",

    rules: {
      "1": { t: "Niente IO", d: "Non puoi dire la parola 'io'." },
      "2": { t: "Niente SÌ", d: "Non puoi dire la parola 'sì'." },
      "3": { t: "Niente NO", d: "Non puoi dire la parola 'no'." },
      "4": { t: "Niente EHM", d: "Non puoi dire 'ehm', 'uhm' né 'eh'." },
      "5": { t: "Niente nomi", d: "Non puoi chiamare nessuno per nome." },
      "6": {
        t: "Niente sospetto",
        d: "Non puoi dire la parola 'sospetto'.",
      },
      "7": {
        t: "Niente scusa",
        d: "Non puoi dire 'scusa' né 'mi dispiace'.",
      },
      "8": { t: "Niente forse", d: "Né 'forse', né 'magari', né 'possibile'." },
      "9": { t: "Niente perché", d: "Non puoi dire la parola 'perché'." },
      "10": { t: "Niente davvero", d: "Né 'davvero' né 'sul serio'." },
      "11": { t: "Niente sapere", d: "Né 'so', né 'sapere', né 'sapevo'." },
      "12": { t: "Niente tu", d: "Né 'tu', né 'te', né 'tuo'." },
      "13": {
        t: "Niente pensare",
        d: "Né 'penso', né 'pensare', né 'pensavo'.",
      },
      "14": { t: "Niente semplicemente", d: "Non puoi dire 'semplicemente'." },
      "15": { t: "Niente ma", d: "Non puoi dire la parola 'ma'." },
      "16": { t: "Non indicare", d: "Non puoi indicare nessuno col dito." },
      "17": {
        t: "Non ridere",
        d: "Non puoi ridere durante un indizio o la discussione.",
      },
      "18": {
        t: "Niente sguardi",
        d: "Non guardare nessuno negli occhi durante il tuo indizio.",
      },
      "19": {
        t: "Mani ferme",
        d: "Non puoi toccarti il viso mentre parli.",
      },
      "20": { t: "Non annuire", d: "Non puoi annuire per dire di sì." },
      "21": {
        t: "Non scuotere la testa",
        d: "Non puoi scuotere la testa per negare.",
      },
      "22": { t: "Braccia sciolte", d: "Non puoi incrociare le braccia." },
      "23": {
        t: "Lascia il telefono",
        d: "Non toccare il telefono quando non è il tuo turno.",
      },
      "24": {
        t: "Non interrompere",
        d: "Non puoi interrompere nessuno mentre parla.",
      },
      "25": {
        t: "Bocca libera",
        d: "Non puoi coprirti la bocca mentre parli.",
      },
      "26": {
        t: "Solo domande",
        d: "Nella discussione puoi solo fare domande.",
      },
      "27": { t: "Niente domande", d: "Non puoi fare nessuna domanda." },
      "28": {
        t: "Massimo cinque parole",
        d: "Ogni turno nella discussione è di cinque parole al massimo.",
      },
      "29": {
        t: "Niente ripetizioni",
        d: "Non puoi ripetere quello che hai già detto.",
      },
      "30": {
        t: "Niente anglicismi",
        d: "Non puoi usare parole inglesi.",
      },
      "31": {
        t: "Parla lentamente",
        d: "Niente fretta. Il gruppo decide se andavi troppo veloce.",
      },
      "32": { t: "Niente difesa", d: "Non puoi dire che sei innocente." },
      "33": {
        t: "Niente certezze",
        d: "Non puoi dire di essere sicuro al 100%.",
      },
      "34": {
        t: "Indizio unico",
        d: "Il tuo indizio non deve essere già stato dato da altri.",
      },
      "35": {
        t: "Una frase",
        d: "Nella discussione dici una sola frase per turno.",
      },
      "36": {
        t: "Alleato vietato",
        d: "Non difendere due volte di fila la stessa persona.",
      },
      "37": {
        t: "Niente consigli di voto",
        d: "Non puoi dire a nessuno chi votare.",
      },
      "38": {
        t: "Niente nomi di ruolo",
        d: "Non dire mai 'cittadino', 'infiltrato' o 'Mr. White'.",
      },
      "39": {
        t: "Niente accuse",
        d: "Non puoi accusare nessuno direttamente, solo per allusione.",
      },
      "40": {
        t: "Niente autodifesa",
        d: "Non puoi rispondere a un'accusa contro di te.",
      },
      "41": {
        t: "Mai per primo",
        d: "Non puoi parlare per primo quando si apre la discussione.",
      },
      "42": {
        t: "Niente d'accordo",
        d: "Non puoi dire letteralmente che sei d'accordo con qualcuno.",
      },
      "43": {
        t: "Niente domande sul voto",
        d: "Non puoi chiedere a nessuno chi voterà.",
      },
      "44": {
        t: "Niente spiegazioni",
        d: "Non puoi spiegare il tuo indizio dopo.",
      },
      "45": {
        t: "Niente citazioni",
        d: "Non puoi citare gli indizi precedenti parola per parola.",
      },
    },

    challenges: {
      "1": {
        t: "L'Esca",
        d: "Fai dire a qualcuno una parola vietata senza dirla tu.",
      },
      "2": {
        t: "Il Pappagallo",
        d: "Fai ripetere il tuo indizio parola per parola da un altro giocatore.",
      },
      "3": {
        t: "Il Protetto",
        d: "Fai in modo che qualcuno ti difenda spontaneamente.",
      },
      "4": {
        t: "Il Manipolatore",
        d: "Fai cambiare sospettato a qualcuno ad alta voce grazie al tuo argomento.",
      },
      "5": {
        t: "Il Richiamo",
        d: "Fatti accusare e sopravvivi alla votazione.",
      },
      "6": {
        t: "Il Disturbatore",
        d: "Fai in modo che due altri giocatori si accusino a vicenda nella stessa discussione.",
      },
    },
  },

  pvote: {
    kicker: "Round {n} · Voto segreto",
    title: "Voto segreto",
    revoteTitle: "Ballottaggio",
    resultTitle: "Risultato",
    instruction:
      "Come per il tuo ruolo: tocca il tuo fascicolo, vota in segreto e passa il telefono. L'ordine non conta.",
    number: "N. {n}",
    voted: "Ha votato",
    tapToVote: "Tocca per votare",
    waiting: "Non ancora",
    tally: "Conta i voti",
    progress: "{n} / {total} hanno votato",
    ask: "{name}, chi voti?",
    myVote: "Il mio voto",
    confirm: "Conferma il voto per {name}",
    pickFirst: "Scegli un sospettato",
    tieTitle: "Parità",
    tieBody: "Nessuno è eliminato e nessuno beve. Si vota di nuovo, solo tra:",
    revote: "Avvia il ballottaggio",
  },
};

export default it;
