import type { Dictionary } from "./nl";

/**
 * Not yet read through by a native speaker, so French stays out of
 * VERIFIED_LOCALES and out of the picker. See lib/i18n/config.ts.
 */
const fr: Dictionary = {
  meta: {
    title: "Mister White",
    description:
      "Jeu de mots pour 3 à 20 joueurs. Tout le monde reçoit le même mot secret — sauf les imposteurs.",
  },

  common: {
    back: "Retour",
    done: "Terminé",
  },

  roles: {
    burger: "Citoyen",
    undercover: "Infiltré",
    white: "Mr. White",
  },

  categories: {
    eten: "Nourriture",
    dieren: "Animaux",
    plekken: "Lieux",
    huis: "À la maison",
    beroepen: "Métiers",
    sport: "Sport & jeux",
    pop: "Culture pop",
    eigen: "Vos mots",
  },

  home: {
    caseNumber: "Dossier nº 0042",
    rec: "Rec",
    stamp: "Top secret",
    titleTop: "Mr.",
    titleBottom: "White",
    tagline:
      "Tout le monde reçoit le même mot secret. Sauf les imposteurs. Qui n'est pas celui qu'il prétend être ?",
    play: "Jouer",
    rules: "Règles",
    settings: "Réglages",
  },

  rules: {
    kicker: "Manuel de l'enquêteur",
    title: "Règles",
    cards: [
      { name: "Citoyen", body: "Connaît le vrai mot." },
      {
        name: "Infiltré",
        body: "Un mot presque identique. Il l'ignore lui-même.",
      },
      { name: "Mr. White", body: "Aucun mot. Il bluffe !" },
    ],
    items: [
      "Chacun reçoit un mot en secret. Les citoyens ont tous le même.",
      "Les infiltrés reçoivent un mot qui y ressemble, sans savoir qu'ils sont infiltrés.",
      "Mr. White ne reçoit rien du tout et doit bluffer.",
      "Chacun son tour, vous donnez un mot comme indice. Ni trop clair, ni trop vague.",
      "Ensuite vous votez pour éliminer quelqu'un. Si Mr. White est pris, il a droit à une devinette.",
    ],
    note: "Les citoyens gagnent quand tous les imposteurs sont sortis. Les imposteurs gagnent dès qu'il ne reste qu'un seul citoyen.",
    cta: "Compris, on joue",
  },

  settings: {
    kicker: "Le quartier général",
    title: "Réglages",
    categories: "Catégories de mots",
    pick: "Choisir →",
    allCategories: "Les {total} catégories",
    someCategories: "{on} catégories sur {total}",
    noneChosen: "Aucune choisie, on prend tout",
    display: "Affichage",
    themeDark: "Sombre",
    themeLight: "Clair",
    difficulty: "Difficulté des mots",
    diffEasy: "Facile",
    diffMix: "Mélange",
    diffHard: "Difficile",
    diffHelpEasy:
      "Les mots sont très différents. Les infiltrés se repèrent vite.",
    diffHelpMix: "Un mélange de paires faciles et retorses.",
    diffHelpHard:
      "Les mots se ressemblent beaucoup. Le doute est garanti.",
    language: "Langue",
    timer: "Minuteur d'indice",
    timerOff: "Off",
    mrGuessLabel: "Mr. White peut deviner",
    mrGuessDesc: "Démasqué ? Un essai sur le mot. Juste, et il gagne.",
    mrNotFirstLabel: "Mr. White ne commence jamais",
    mrNotFirstDesc: "Le premier indice vient toujours de quelqu'un qui a un mot.",
    customWords: "Vos mots",
    customA: "Mot des citoyens",
    customB: "Infiltré",
    customAdd: "Ajouter une paire",
    customRemove: "Supprimer {a} et {b}",
    customEmpty:
      'Inventez une paire de mots. Elle ira dans la catégorie "Vos mots".',
    save: "Enregistrer",
  },

  archive: {
    tag: "ARCHIVES",
    title: "Catégories de mots",
    search: "Chercher une catégorie…",
    all: "Tout activer",
    none: "Tout désactiver",
    count: "{on} / {total} actives",
    pairs: "{n} paires de mots",
    noResults: 'Aucune catégorie trouvée pour "{query}".',
  },

  language: {
    tag: "INTERNATIONAL",
    title: "Langue",
    sub: "Dans quelle langue se déroule la partie ?",
    chosen: "Choisie",
  },

  setup: {
    kicker: "Étape 1 sur 3",
    title: "Nouvelle partie",
    players: "Joueurs",
    playersDesc: "De 3 à 20 agents",
    undercovers: "Infiltrés",
    undercoversDesc: "Un mot légèrement différent",
    whites: "Mr. Whites",
    whitesDesc: "Aucun mot, rien que du bluff",
    distribution: "Composition des suspects",
    civilians: "Citoyens",
    undercover: "Infiltré",
    white: "Mr. White",
    next: "Suivant : les noms →",
  },

  names: {
    kicker: "Étape 2 sur 3",
    title: "Qui joue ?",
    hint: "Laissez un champ vide et vous recevrez un nom de code.",
    placeholder: "Agent {n}",
    back: "Composition",
    deal: "Distribuer les mots",
  },

  deal: {
    kicker: "Étape 3 sur 3",
    title: "Le dossier de chacun",
    instruction:
      "Faites tourner le téléphone. Touchez votre propre dossier, maintenez pour lire votre mot, puis relâchez. Pas de triche !",
    number: "Nº {n}",
    tapToOpen: "Touchez pour ouvrir",
    seenStamp: "Vu",
    seenText: "{seen} dossiers lus sur {total}",
    remaining: "Encore {n}",
    reshuffle: "Redistribuer",
    start: "Lancer la manche 1",
  },

  confirm: {
    tag: "ATTENTION !",
    title: "Redistribuer ?",
    bodyStart:
      "Tout le monde reçoit un nouveau mot et un nouveau rôle. Ceux qui ont déjà lu leur dossier devront recommencer. ",
    bodyStrong: "C'est irréversible.",
    cancel: "Annuler",
    yes: "Oui, redistribuer",
    waiting: "Lisez d'abord… {n}",
  },

  card: {
    kicker: "Dossier confidentiel de",
    hold: "Maintenez appuyé",
    holdSub:
      "Réservé aux yeux de {name}. Relâchez pour refermer le dossier.",
    topSecret: "Top secret",
    youAre: "Vous êtes",
    whiteTop: "Mr.",
    whiteBottom: "White",
    whiteNote: "Vous n'avez pas de mot. Écoutez bien et bluffez.",
    yourWord: "Votre mot secret",
    wordNote: "Retenez-le bien. Ne le lâchez pas trop vite.",
    close: "Terminé, au suivant",
  },

  hint: {
    kicker: "Interrogatoire",
    title: "Manche {n}",
    speaking: "À la parole",
    instruction: "Donnez un mot comme indice sur votre mot secret.",
    begins: "COMMENCE !",
    voteNow: "Voter maintenant",
    next: "Suivant",
    toVote: "Passer au vote",
  },

  vote: {
    kicker: "Manche {n} · La confrontation",
    title: "Qui est suspect ?",
    instruction:
      "Discutez, pointez du doigt et votez. Touchez le suspect qui sort.",
    stamp: "Suspect",
    anotherRound: "Encore un tour",
    unmask: "Démasquer {name}",
    pickFirst: "Choisissez un suspect",
  },

  unmask: {
    kicker: "Le dossier de",
    investigating: "Analyse en cours…",
    lineBurger: "Innocent ! Vous venez d'écarter l'un des vôtres.",
    lineUndercover: "Pris ! Cet agent avait un mot légèrement différent.",
    lineWhite: "Trouvé ! Mr. White n'avait aucun mot.",
    next: "Continuer",
    toGuess: "Mr. White peut deviner",
  },

  guess: {
    lastChance: "Dernière chance…",
    title: "{name}, quel est le mot ?",
    sub: "Devinez le mot des citoyens et vous gagnez sur-le-champ. Un seul essai.",
    placeholder: "Tapez votre réponse…",
    submit: "Tenter le coup",
    miss: "Raté !",
    missSub: '"{guess}" n\'est pas le bon mot. Mr. White est éliminé.',
    next: "Continuer",
  },

  end: {
    stamp: "Affaire classée",
    burgersTitle: "Les citoyens gagnent",
    burgersLine: "Tous les imposteurs sont démasqués. Beau travail, agents.",
    infiltrantenTitle: "Les imposteurs gagnent",
    infiltrantenLine: "Ils sont restés dans l'ombre jusqu'au bout.",
    whiteTitle: "Mr. White gagne",
    whiteLine: "Deviné ! Mr. White connaissait le mot depuis le début.",
    civilianWord: "Mot des citoyens",
    undercoverWord: "Mot des infiltrés",
    out: "éliminé",
    menu: "Menu",
    again: "Une autre affaire",
  },
};

export default fr;
