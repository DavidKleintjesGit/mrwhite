import type { Dictionary } from "./nl";

/**
 * Not yet read through by a native speaker, so Spanish stays out of
 * VERIFIED_LOCALES and out of the picker. See lib/i18n/config.ts.
 */
const es: Dictionary = {
  meta: {
    title: "Mister White",
    description:
      "Juego de palabras para 3 a 20 jugadores. Todos reciben la misma palabra secreta — salvo los impostores.",
  },

  common: {
    back: "Atrás",
    done: "Listo",
  },

  roles: {
    burger: "Civil",
    undercover: "Infiltrado",
    white: "Mr. White",
  },

  categories: {
    eten: "Comida",
    dieren: "Animales",
    plekken: "Lugares",
    huis: "En casa",
    beroepen: "Profesiones",
    sport: "Deporte y juegos",
    pop: "Cultura pop",
    eigen: "Tus palabras",
  },

  home: {
    caseNumber: "Expediente nº 0042",
    rec: "Rec",
    recNumber: "N.º 0042",
    stamp: "Alto secreto",
    titleTop: "Mr.",
    titleBottom: "White",
    tagline:
      "Todos reciben la misma palabra secreta. Salvo los impostores. ¿Quién no es quien dice ser?",
    play: "Jugar",
    rules: "Cómo se juega",
    settings: "Ajustes",
  },

  rules: {
    kicker: "Manual del investigador",
    title: "Cómo se juega",
    cards: [
      { name: "Civil", body: "Conoce la palabra real." },
      {
        name: "Infiltrado",
        body: "Una palabra casi igual. Ni él mismo lo sabe.",
      },
      { name: "Mr. White", body: "Sin palabra. ¡A fingir!" },
    ],
    items: [
      "Cada uno recibe una palabra en secreto. Los civiles comparten la misma.",
      "Los infiltrados reciben una palabra parecida y no saben que son los infiltrados.",
      "Mr. White no recibe nada y tiene que fingir.",
      "Por turnos, cada uno da una palabra como pista. Ni muy clara ni muy vaga.",
      "Después votáis a quién expulsar. Si pillan a Mr. White, tiene derecho a una adivinanza.",
    ],
    note: "Los civiles ganan cuando no queda ningún impostor. Los impostores ganan en cuanto queda un solo civil.",
    cta: "Entendido, a jugar",
  },

  settings: {
    kicker: "El cuartel general",
    title: "Ajustes",
    categories: "Categorías de palabras",
    pick: "Elegir →",
    allCategories: "Las {total} categorías",
    someCategories: "{on} de {total} categorías",
    noneChosen: "Ninguna elegida, lo cogemos todo",
    display: "Apariencia",
    themeDark: "Oscuro",
    themeLight: "Claro",
    difficulty: "Dificultad de las palabras",
    diffEasy: "Fácil",
    diffMix: "Mezcla",
    diffHard: "Difícil",
    diffHelpEasy:
      "Las palabras son muy distintas. Los infiltrados cantan antes.",
    diffHelpMix: "Una mezcla de parejas fáciles y traicioneras.",
    diffHelpHard: "Las palabras se parecen muchísimo. Dudas garantizadas.",
    language: "Idioma",
    timer: "Cronómetro de pistas",
    timerOff: "Off",
    mrGuessLabel: "Mr. White puede adivinar",
    mrGuessDesc: "¿Descubierto? Un intento con la palabra. Acertar es ganar.",
    mrNotFirstLabel: "Mr. White nunca empieza",
    mrNotFirstDesc: "La primera pista siempre viene de alguien con palabra.",
    customWords: "Tus palabras",
    customA: "Palabra de los civiles",
    customB: "Infiltrado",
    customAdd: "Añadir pareja",
    customRemove: "Quitar {a} y {b}",
    customEmpty:
      'Inventa una pareja de palabras. Irá a la categoría "Tus palabras".',
    save: "Guardar",
    privacy: "Política de privacidad",
  },

  archive: {
    tag: "ARCHIVO",
    title: "Categorías de palabras",
    search: "Buscar una categoría…",
    all: "Activar todo",
    none: "Desactivar todo",
    count: "{on} / {total} activas",
    pairs: "{n} parejas de palabras",
    noResults: 'No hay ninguna categoría para "{query}".',
  },

  language: {
    tag: "INTERNACIONAL",
    title: "Idioma",
    sub: "¿En qué idioma se juega la partida?",
    chosen: "Elegido",
  },

  setup: {
    kicker: "Paso 1 de {total}",
    title: "Partida nueva",
    players: "Jugadores",
    playersDesc: "De 3 a 20 agentes",
    undercovers: "Infiltrados",
    undercoversDesc: "Una palabra apenas distinta",
    whites: "Mr. Whites",
    whitesDesc: "Sin palabra, puro farol",
    distribution: "Así quedan los sospechosos",
    civilians: "Civiles",
    undercover: "Infiltrado",
    white: "Mr. White",
    next: "Siguiente: los nombres →",
  },

  names: {
    kicker: "Paso 2 de {total}",
    title: "¿Quién juega?",
    hint: "Deja un campo vacío y te daremos un nombre en clave.",
    placeholder: "Agente {n}",
    back: "Reparto",
    deal: "Repartir las palabras",
  },

  deal: {
    kicker: "Paso {n} de {total}",
    title: "El expediente de cada uno",
    instruction:
      "Id pasando el móvil. Toca tu propio expediente, mantén pulsado para leer tu palabra y suelta. ¡Sin mirar los demás!",
    number: "Nº {n}",
    tapToOpen: "Toca para abrir",
    seenStamp: "Visto",
    seenText: "{seen} de {total} expedientes leídos",
    remaining: "Quedan {n}",
    reshuffle: "Repartir de nuevo",
    start: "Empezar la ronda 1",
  },

  confirm: {
    tag: "¡OJO!",
    title: "¿Repartir de nuevo?",
    bodyStart:
      "Todos reciben palabra y papel nuevos. Quien ya haya leído su expediente tendrá que volver a mirarlo. ",
    bodyStrong: "Esto no se puede deshacer.",
    cancel: "Cancelar",
    yes: "Sí, repartir de nuevo",
    waiting: "Léelo primero… {n}",
    quitTitle: "¿Parar la partida?",
    quitBody:
      "La ronda termina y vuelves al menú. Los roles y los votos se borran.",
    quitYes: "Sí, parar",
  },

  card: {
    kicker: "Expediente confidencial de",
    hold: "Mantén pulsado",
    holdSub: "Solo para los ojos de {name}. Suelta para cerrar el expediente.",
    topSecret: "Top secret",
    youAre: "Tú eres",
    whiteTop: "Mr.",
    whiteBottom: "White",
    whiteNote: "No tienes palabra. Escucha bien y disimula.",
    yourWord: "Tu palabra secreta",
    wordNote: "Memorízala. No la sueltes demasiado pronto.",
    close: "Listo, pásalo",
  },

  hint: {
    kicker: "Interrogatorio",
    title: "Ronda {n}",
    speaking: "Tiene la palabra",
    instruction: "Da una palabra como pista sobre tu palabra secreta.",
    begins: "¡EMPIEZA!",
    voteNow: "Votar ya",
    next: "Siguiente",
    toVote: "Pasar a la votación",
  },

  vote: {
    kicker: "Ronda {n} · La rueda de reconocimiento",
    title: "¿Quién es sospechoso?",
    instruction: "Hablad, señalad y votad. Toca al sospechoso que se va.",
    stamp: "Sospechoso",
    anotherRound: "Otra ronda más",
    unmask: "Desenmascarar a {name}",
    pickFirst: "Elige un sospechoso",
  },

  unmask: {
    kicker: "El expediente de",
    investigating: "Analizando…",
    lineBurger: "¡Inocente! Acabáis de echar a uno de los vuestros.",
    lineUndercover: "¡Pillado! Este agente tenía una palabra algo distinta.",
    lineWhite: "¡Encontrado! Mr. White no tenía ninguna palabra.",
    next: "Continuar",
    toGuess: "Mr. White puede adivinar",
  },

  guess: {
    lastChance: "Última oportunidad…",
    title: "{name}, ¿cuál es la palabra?",
    sub: "Si aciertas la palabra de los civiles, ganas en el acto. Tienes un intento.",
    placeholder: "Escribe tu respuesta…",
    submit: "Jugársela",
    miss: "¡Fallo!",
    missSub: '"{guess}" no es. Mr. White queda eliminado.',
    next: "Continuar",
  },

  end: {
    stamp: "Caso cerrado",
    burgersTitle: "Ganan los civiles",
    burgersLine: "Todos los impostores han caído. Buen trabajo, agentes.",
    infiltrantenTitle: "Ganan los impostores",
    infiltrantenLine: "Se mantuvieron fuera del foco hasta que fue tarde.",
    whiteTitle: "Gana Mr. White",
    whiteLine: "¡Acertó! Mr. White tenía la palabra desde el principio.",
    civilianWord: "Palabra de los civiles",
    undercoverWord: "Palabra del infiltrado",
    out: "fuera",
    menu: "Menú",
    again: "Otro caso",
  },
  modes: {
    kicker: "Elige tu caso",
    title: "Modo de juego",
    caseLabel: "Caso",
    open: "Abrir expediente →",
    soon: "Próximamente",
    classicTitle: "Clásico",
    classicDesc:
      "Civiles, infiltrados y Mr. White. Dar pistas, votar, desenmascarar.",
    classicMeta: "3–20 jugadores",
    drinkTitle: "Drinking Edition",
    drinkDesc:
      "Tres reglas de la casa al azar, retos secretos y voto privado. Quien expulsa a un civil, bebe.",
    drinkMeta: "4–20 · 18+",
    soonCases: [
      {
        title: "White Lies",
        desc: "Un caso nuevo en preparación. Detalles por llegar.",
      },
      {
        title: "Trust Issues",
        desc: "Nadie es de fiar. Tú tampoco.",
      },
      {
        title: "Double Agent",
        desc: "Un jugador trabaja para los dos bandos a la vez.",
      },
    ],
  },

  drink: {
    stepKicker: "Paso 3 de {total}",
    rulesTitle: "Las reglas de esta partida",
    rulesIntro:
      "Estas tres reglas valen toda la partida. El grupo se vigila solo: si rompes una, das un trago corto. Sin alcohol siempre vale.",
    rolling: "Barajando…",
    reroll: "Reglas nuevas",
    deal: "Repartir roles",
    namesCta: "A las reglas",

    catsTitle: "Drinking Edition · tipos de regla",

    catCount: "{n} reglas",
    catALabel: "Palabras prohibidas",
    catAShort: "Palabras",
    catBLabel: "Gestos prohibidos",
    catBShort: "Gestos",
    catCLabel: "Reglas del habla",
    catCShort: "Hablar",
    catDLabel: "Caos social",
    catDShort: "Social",

    challengeKicker: "Reto secreto",
    challengeReward: "Recompensa: repartir {n} tragos.",
    challengeHint: "¿Conseguido? Entonces repartes {n} tragos.",
    challengeDone: "Reto conseguido",
    challengeHandOut: "Reparte {n} tragos",
    challengeSecret: "secreto",
    challengeLapsed: "anulado",
    challengesTitle: "Los retos de esta partida",
    challengeCheck: "Abre el expediente de alguien para comprobar su reto.",

    caseNo: "Caso n.º 0042",

    agents: "Agentes",

    quit: "Salir",

    reveal: "Toca para leer",

    fileLabel: "Expediente personal · N.º {n}",

    status: "Estado",

    role: "Rol",

    roleHidden: "secreto secreto",

    achieved: "Conseguido",

    rulesHelp: "¿Rota? Da un trago. El grupo vigila.",

    close: "Cerrar",

    sheetOpen: "Expediente del caso ▾",
    sheetClose: "Cerrar ▴",
    sheetTitle: "Antecedentes",
    sheetIntro:
      "¿Regla rota? Toca Infracción. El grupo vigila, la cuenta solo es una ayuda.",
    rulesTab: "Reglas",
    houseRules: "Reglas de la casa",
    eliminated: "Eliminado",
    active: "En juego",

    resultDrink: "¡A beber!",

    cheers: "Salud",

    timeUp: "Se acabó · da un trago",
    resultDry: "Nadie bebe",
    resultBurger: "Quien votó a este civil da un trago.",
    resultNobody: "Curiosamente, nadie votó a este civil.",
    resultInfiltrant: "Quien votó a este infiltrado acertó.",

    rules: {
      "1": { t: "Sin YO", d: "No puedes decir la palabra 'yo'." },
      "2": { t: "Sin SÍ", d: "No puedes decir la palabra 'sí'." },
      "3": { t: "Sin NO", d: "No puedes decir la palabra 'no'." },
      "4": { t: "Sin EH", d: "No puedes decir 'eh', 'em' ni 'mmm'." },
      "5": { t: "Sin nombres", d: "No puedes llamar a nadie por su nombre." },
      "6": {
        t: "Sin sospechoso",
        d: "No puedes decir la palabra 'sospechoso'.",
      },
      "7": {
        t: "Sin perdón",
        d: "No puedes decir 'perdón' ni 'lo siento'.",
      },
      "8": {
        t: "Sin quizá",
        d: "Ni 'quizá', ni 'tal vez', ni 'posiblemente'.",
      },
      "9": { t: "Sin por qué", d: "No puedes decir 'por qué'." },
      "10": { t: "Sin en serio", d: "Ni 'en serio' ni 'de verdad'." },
      "11": { t: "Sin saber", d: "Ni 'sé', ni 'saber', ni 'sabía'." },
      "12": { t: "Sin tú", d: "Ni 'tú', ni 'ti', ni 'tu'." },
      "13": { t: "Sin pensar", d: "Ni 'creo', ni 'pensar', ni 'pensaba'." },
      "14": { t: "Sin simplemente", d: "No puedes decir 'simplemente'." },
      "15": { t: "Sin pero", d: "No puedes decir la palabra 'pero'." },
      "16": { t: "No señalar", d: "No puedes señalar a nadie con el dedo." },
      "17": {
        t: "No reír",
        d: "No puedes reírte durante una pista o la discusión.",
      },
      "18": {
        t: "Sin contacto visual",
        d: "No mires a nadie a los ojos durante tu propia pista.",
      },
      "19": {
        t: "Manos quietas",
        d: "No puedes tocarte la cara mientras hablas.",
      },
      "20": { t: "No asentir", d: "No puedes asentir para mostrar acuerdo." },
      "21": {
        t: "No negar con la cabeza",
        d: "No puedes negar con la cabeza.",
      },
      "22": { t: "Brazos sueltos", d: "No puedes cruzar los brazos." },
      "23": {
        t: "Deja el móvil",
        d: "No toques el móvil cuando no es tu turno.",
      },
      "24": {
        t: "No interrumpir",
        d: "No puedes interrumpir a nadie mientras habla.",
      },
      "25": {
        t: "Boca libre",
        d: "No puedes taparte la boca mientras hablas.",
      },
      "26": {
        t: "Solo preguntas",
        d: "En la discusión solo puedes hacer preguntas.",
      },
      "27": { t: "Sin preguntas", d: "No puedes hacer ninguna pregunta." },
      "28": {
        t: "Máximo cinco palabras",
        d: "Cada turno en la discusión son cinco palabras como mucho.",
      },
      "29": {
        t: "Sin repetir",
        d: "No puedes repetir lo que ya has dicho.",
      },
      "30": {
        t: "Sin anglicismos",
        d: "No puedes usar palabras en inglés.",
      },
      "31": {
        t: "Habla despacio",
        d: "Nada de prisas. El grupo decide si ibas demasiado rápido.",
      },
      "32": { t: "Sin defensa", d: "No puedes decir que eres inocente." },
      "33": {
        t: "Sin certezas",
        d: "No puedes decir que estás seguro al 100%.",
      },
      "34": {
        t: "Pista única",
        d: "Tu pista no puede haberla dado ya otra persona.",
      },
      "35": {
        t: "Una frase",
        d: "En la discusión dices solo una frase por turno.",
      },
      "36": {
        t: "Aliado prohibido",
        d: "No defiendas dos veces seguidas a la misma persona.",
      },
      "37": {
        t: "Sin consejos de voto",
        d: "No puedes decirle a nadie a quién votar.",
      },
      "38": {
        t: "Sin nombres de rol",
        d: "Nunca digas 'civil', 'infiltrado' ni 'Mr. White'.",
      },
      "39": {
        t: "Sin acusaciones",
        d: "No puedes acusar a nadie directamente, solo de forma indirecta.",
      },
      "40": {
        t: "Sin autodefensa",
        d: "No puedes responder a una acusación contra ti.",
      },
      "41": {
        t: "Nunca el primero",
        d: "No puedes ser el primero en hablar cuando empieza la discusión.",
      },
      "42": {
        t: "Sin estar de acuerdo",
        d: "No puedes decir literalmente que estás de acuerdo con alguien.",
      },
      "43": {
        t: "Sin preguntar el voto",
        d: "No puedes preguntarle a nadie a quién va a votar.",
      },
      "44": {
        t: "Sin explicar la pista",
        d: "No puedes explicar tu pista después.",
      },
      "45": {
        t: "Sin citas",
        d: "No puedes citar pistas anteriores palabra por palabra.",
      },
    },

    challenges: {
      "1": {
        t: "El Cebo",
        d: "Haz que alguien diga una palabra prohibida sin decirla tú.",
      },
      "2": {
        t: "El Loro",
        d: "Haz que otro jugador repita tu pista palabra por palabra.",
      },
      "3": {
        t: "El Protegido",
        d: "Haz que alguien te defienda por iniciativa propia.",
      },
      "4": {
        t: "El Manipulador",
        d: "Haz que alguien cambie de sospechoso en voz alta por tu argumento.",
      },
      "5": {
        t: "El Señuelo",
        d: "Haz que te acusen, y sobrevive a la votación.",
      },
      "6": {
        t: "El Perturbador",
        d: "Haz que dos jugadores se acusen entre sí en la misma discusión.",
      },
    },
  },

  pvote: {
    kicker: "Ronda {n} · Voto secreto",
    title: "Voto secreto",
    revoteTitle: "Segunda vuelta",
    resultTitle: "Resultado",
    instruction:
      "Igual que con tu rol: toca tu propio expediente, vota en secreto y pasa el móvil. El orden da igual.",
    number: "N.º {n}",
    voted: "Ha votado",
    tapToVote: "Toca para votar",
    waiting: "Todavía no",
    tally: "Contar los votos",
    progress: "{n} / {total} han votado",
    ask: "{name}, ¿a quién votas?",
    myVote: "Mi voto",
    confirm: "Confirmar voto a {name}",
    pickFirst: "Elige un sospechoso",
    tieTitle: "Empate",
    tieBody:
      "Nadie queda eliminado y nadie bebe. Todos votan otra vez, solo entre:",
    revote: "Empezar la segunda vuelta",
  },
};

export default es;
