import type { Dictionary } from "./nl";

/**
 * Not yet read through by a native speaker, so Italian stays out of
 * VERIFIED_LOCALES and out of the picker. See lib/i18n/config.ts.
 */
const it: Dictionary = {
  meta: {
    title: "Mr. White",
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
    diffHelpHard:
      "Le parole si somigliano moltissimo. Dubbi garantiti.",
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
    kicker: "Passo 1 di 3",
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
    kicker: "Passo 2 di 3",
    title: "Chi gioca?",
    hint: "Lascia un campo vuoto e ti diamo un nome in codice.",
    placeholder: "Agente {n}",
    back: "Formazione",
    deal: "Distribuisci le parole",
  },

  deal: {
    kicker: "Passo 3 di 3",
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
    lineUndercover: "Preso! Questo agente aveva una parola leggermente diversa.",
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
    burgersLine: "Tutti gli impostori sono stati smascherati. Bel lavoro, agenti.",
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
};

export default it;
