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
    recNumber: "N° 0042",
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
    diffHelpHard: "Les mots se ressemblent beaucoup. Le doute est garanti.",
    language: "Langue",
    timer: "Minuteur d'indice",
    timerOff: "Off",
    mrGuessLabel: "Mr. White peut deviner",
    mrGuessDesc: "Démasqué ? Un essai sur le mot. Juste, et il gagne.",
    mrNotFirstLabel: "Mr. White ne commence jamais",
    mrNotFirstDesc:
      "Le premier indice vient toujours de quelqu'un qui a un mot.",
    customWords: "Vos mots",
    customA: "Mot des citoyens",
    customB: "Infiltré",
    customAdd: "Ajouter une paire",
    customRemove: "Supprimer {a} et {b}",
    customEmpty:
      'Inventez une paire de mots. Elle ira dans la catégorie "Vos mots".',
    save: "Enregistrer",
    privacy: "Politique de confidentialité",
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
    kicker: "Étape 1 sur {total}",
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
    kicker: "Étape 2 sur {total}",
    title: "Qui joue ?",
    hint: "Laissez un champ vide et vous recevrez un nom de code.",
    placeholder: "Agent {n}",
    back: "Composition",
    deal: "Distribuer les mots",
  },

  deal: {
    kicker: "Étape {n} sur {total}",
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
    quitTitle: "Arrêter la partie ?",
    quitBody:
      "La manche s'arrête et tu reviens au menu. Les rôles et les votes sont effacés.",
    quitYes: "Oui, arrêter",
  },

  card: {
    kicker: "Dossier confidentiel de",
    hold: "Maintenez appuyé",
    holdSub: "Réservé aux yeux de {name}. Relâchez pour refermer le dossier.",
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
    report: "Rapport final",
    caseLine: "Affaire n° 0042 · {mode}",
    stampSub: "N° 0042 · classée",
    verdict: "Verdict",
    rounds: "Manches",
    houseRulesTitle: "Règles maison de cette partie",
    involved: "Personnes impliquées",
    survived: "A survécu",
    votedOut: "Éliminé · manche {n}",
    challengeMet: "défi ✓",
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
  modes: {
    kicker: "Choisis ton affaire",
    title: "Mode de jeu",
    caseLabel: "Affaire",
    open: "Ouvrir le dossier →",
    soon: "Bientôt",
    classicTitle: "Classique",
    classicDesc:
      "Citoyens, infiltrés et Mr. White. Donner des indices, voter, démasquer.",
    classicMeta: "3–20 joueurs",
    drinkTitle: "Drinking Edition",
    drinkDesc:
      "Trois règles maison au hasard, des défis secrets et un vote privé. Éliminer un citoyen, c'est boire.",
    drinkMeta: "4–20 · 18+",
    soonCases: [
      {
        title: "White Lies",
        desc: "Une nouvelle affaire en préparation. Détails à venir.",
      },
      {
        title: "Trust Issues",
        desc: "Personne n'est digne de confiance. Toi non plus.",
      },
      {
        title: "Double Agent",
        desc: "Un joueur travaille pour les deux camps à la fois.",
      },
    ],
  },

  drink: {
    stepKicker: "Étape 3 sur {total}",
    rulesTitle: "Les règles de cette partie",
    rulesIntro:
      "Ces trois règles valent pour toute la partie. Le groupe se surveille : si tu en enfreins une, tu prends une petite gorgée. Sans alcool, c'est toujours permis.",
    rolling: "Mélange…",
    reroll: "Nouvelles règles",
    deal: "Distribuer les rôles",
    namesCta: "Vers les règles",

    catsTitle: "Drinking Edition · types de règles",

    catCount: "{n} règles",
    catALabel: "Mots interdits",
    catAShort: "Mots",
    catBLabel: "Gestes interdits",
    catBShort: "Gestes",
    catCLabel: "Règles de parole",
    catCShort: "Parole",
    catDLabel: "Chaos social",
    catDShort: "Social",

    challengeKicker: "Défi secret",
    challengeReward: "Récompense : distribuer {n} gorgées.",
    challengeHint: "Réussi ? Tu distribues {n} gorgées.",
    challengeDone: "Défi réussi",
    challengeHandOut: "Distribue {n} gorgées",
    challengeSecret: "secret",
    challengeLapsed: "annulé",
    challengesTitle: "Les défis de cette partie",
    challengeCheck: "Ouvre le dossier de quelqu'un pour vérifier son défi.",

    caseNo: "Affaire n° 0042",

    agents: "Agents",

    quit: "Quitter",

    reveal: "Touche pour lire",

    fileLabel: "Dossier personnel · N° {n}",

    status: "Statut",

    role: "Rôle",

    roleHidden: "secret secret",

    achieved: "Réussi",

    rulesHelp: "Enfreinte ? Prends une gorgée. Le groupe surveille.",

    close: "Fermer",

    sheetOpen: "Dossier d'affaire ▾",
    sheetClose: "Fermer ▴",
    sheetTitle: "Casier",
    sheetIntro:
      "Règle enfreinte ? Touche Infraction. Le groupe surveille, le compteur n'est qu'une aide.",
    rulesTab: "Règles",
    houseRules: "Règles maison",
    eliminated: "Éliminé",
    active: "En jeu",

    resultDrink: "On boit !",

    cheers: "Santé",

    timeUp: "Temps écoulé · prends une gorgée",
    resultDry: "Personne ne boit",
    resultBurger: "Ceux qui ont voté pour ce citoyen prennent une gorgée.",
    resultNobody: "Curieusement, personne n'a voté pour ce citoyen.",
    resultInfiltrant: "Ceux qui ont voté pour cet infiltré ont eu raison.",

    rules: {
      "1": { t: "Pas de JE", d: "Tu ne peux pas dire le mot 'je'." },
      "2": { t: "Pas de OUI", d: "Tu ne peux pas dire le mot 'oui'." },
      "3": { t: "Pas de NON", d: "Tu ne peux pas dire le mot 'non'." },
      "4": { t: "Pas de EUH", d: "Tu ne peux pas dire 'euh' ni 'hum'." },
      "5": { t: "Pas de noms", d: "Tu ne peux appeler personne par son nom." },
      "6": {
        t: "Pas de suspect",
        d: "Tu ne peux pas dire le mot 'suspect'.",
      },
      "7": {
        t: "Pas de pardon",
        d: "Tu ne peux dire ni 'pardon' ni 'désolé'.",
      },
      "8": {
        t: "Pas de peut-être",
        d: "Ni 'peut-être', ni 'sans doute', ni 'possible'.",
      },
      "9": {
        t: "Pas de pourquoi",
        d: "Tu ne peux pas dire le mot 'pourquoi'.",
      },
      "10": { t: "Pas de vraiment", d: "Ni 'vraiment' ni 'sérieux'." },
      "11": { t: "Pas de savoir", d: "Ni 'sais', ni 'savoir', ni 'savais'." },
      "12": { t: "Pas de tu", d: "Ni 'tu', ni 'toi', ni 'ton'." },
      "13": { t: "Pas de penser", d: "Ni 'pense', ni 'penser', ni 'pensais'." },
      "14": { t: "Pas de juste", d: "Tu ne peux pas dire le mot 'juste'." },
      "15": { t: "Pas de mais", d: "Tu ne peux pas dire le mot 'mais'." },
      "16": {
        t: "Ne pas pointer",
        d: "Tu ne peux pointer personne du doigt.",
      },
      "17": {
        t: "Ne pas rire",
        d: "Tu ne peux pas rire pendant un indice ou la discussion.",
      },
      "18": {
        t: "Pas de regard",
        d: "Ne regarde personne dans les yeux pendant ton propre indice.",
      },
      "19": {
        t: "Mains tranquilles",
        d: "Tu ne peux pas toucher ton visage en parlant.",
      },
      "20": {
        t: "Ne pas hocher",
        d: "Tu ne peux pas hocher la tête pour approuver.",
      },
      "21": {
        t: "Ne pas secouer",
        d: "Tu ne peux pas secouer la tête pour nier.",
      },
      "22": { t: "Bras détendus", d: "Tu ne peux pas croiser les bras." },
      "23": {
        t: "Laisse le téléphone",
        d: "Ne touche pas au téléphone quand ce n'est pas ton tour.",
      },
      "24": {
        t: "Ne pas couper",
        d: "Tu ne peux couper la parole à personne.",
      },
      "25": {
        t: "Bouche dégagée",
        d: "Tu ne peux pas te couvrir la bouche en parlant.",
      },
      "26": {
        t: "Questions seulement",
        d: "Dans la discussion, tu ne peux que poser des questions.",
      },
      "27": {
        t: "Aucune question",
        d: "Tu ne peux poser aucune question.",
      },
      "28": {
        t: "Cinq mots maximum",
        d: "Chaque prise de parole fait cinq mots au maximum.",
      },
      "29": {
        t: "Pas de répétition",
        d: "Tu ne peux pas répéter ce que tu as déjà dit.",
      },
      "30": {
        t: "Pas d'anglicismes",
        d: "Tu ne peux pas utiliser de mots anglais.",
      },
      "31": {
        t: "Parle lentement",
        d: "Pas de précipitation. Le groupe décide si tu allais trop vite.",
      },
      "32": {
        t: "Pas de défense",
        d: "Tu ne peux pas dire que tu es innocent.",
      },
      "33": {
        t: "Pas de certitude",
        d: "Tu ne peux pas dire que tu es sûr à 100%.",
      },
      "34": {
        t: "Indice unique",
        d: "Ton indice ne doit pas avoir déjà été donné.",
      },
      "35": {
        t: "Une phrase",
        d: "Dans la discussion, tu ne dis qu'une phrase par tour.",
      },
      "36": {
        t: "Allié interdit",
        d: "Ne défends pas deux fois de suite la même personne.",
      },
      "37": {
        t: "Pas de consigne",
        d: "Tu ne peux dire à personne pour qui voter.",
      },
      "38": {
        t: "Pas de rôles",
        d: "Ne dis jamais 'citoyen', 'infiltré' ou 'Mr. White'.",
      },
      "39": {
        t: "Pas d'accusation",
        d: "Tu ne peux accuser personne directement, seulement par allusion.",
      },
      "40": {
        t: "Pas d'autodéfense",
        d: "Tu ne peux pas répondre à une accusation contre toi.",
      },
      "41": {
        t: "Jamais en premier",
        d: "Tu ne peux pas réagir en premier quand la discussion s'ouvre.",
      },
      "42": {
        t: "Pas d'accord",
        d: "Tu ne peux pas dire littéralement que tu es d'accord.",
      },
      "43": {
        t: "Pas de sondage",
        d: "Tu ne peux demander à personne pour qui il vote.",
      },
      "44": {
        t: "Pas d'explication",
        d: "Tu ne peux pas expliquer ton indice après coup.",
      },
      "45": {
        t: "Pas de citation",
        d: "Tu ne peux pas citer les indices précédents mot pour mot.",
      },
    },

    challenges: {
      "1": {
        t: "L'Appât",
        d: "Fais dire un mot interdit à quelqu'un sans le dire toi-même.",
      },
      "2": {
        t: "Le Perroquet",
        d: "Fais répéter ton indice mot pour mot par un autre joueur.",
      },
      "3": {
        t: "Le Protégé",
        d: "Fais en sorte que quelqu'un te défende spontanément.",
      },
      "4": {
        t: "Le Manipulateur",
        d: "Fais changer quelqu'un de suspect à voix haute grâce à ton argument.",
      },
      "5": {
        t: "Le Leurre",
        d: "Fais-toi accuser, et survis au vote.",
      },
      "6": {
        t: "Le Brouilleur",
        d: "Fais en sorte que deux autres joueurs s'accusent mutuellement dans la même discussion.",
      },
    },
  },

  pvote: {
    kicker: "Manche {n} · Vote secret",
    title: "Vote secret",
    revoteTitle: "Second tour",
    resultTitle: "Résultat",
    instruction:
      "Comme pour ton rôle : touche ton propre dossier, vote en secret et passe le téléphone. L'ordre n'a pas d'importance.",
    number: "N° {n}",
    voted: "A voté",
    tapToVote: "Touche pour voter",
    waiting: "Pas encore",
    tally: "Compter les voix",
    progress: "{n} / {total} ont voté",
    ask: "{name}, pour qui votes-tu ?",
    myVote: "Mon vote",
    confirm: "Confirmer le vote pour {name}",
    pickFirst: "Choisis un suspect",
    tieTitle: "Égalité",
    tieBody:
      "Personne n'est éliminé et personne ne boit. Tout le monde revote, seulement entre :",
    revote: "Lancer le second tour",
  },
};

export default fr;
