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
    diffHelpHard:
      "Las palabras se parecen muchísimo. Dudas garantizadas.",
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
    kicker: "Paso 1 de 3",
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
    kicker: "Paso 2 de 3",
    title: "¿Quién juega?",
    hint: "Deja un campo vacío y te daremos un nombre en clave.",
    placeholder: "Agente {n}",
    back: "Reparto",
    deal: "Repartir las palabras",
  },

  deal: {
    kicker: "Paso 3 de 3",
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
  },

  card: {
    kicker: "Expediente confidencial de",
    hold: "Mantén pulsado",
    holdSub:
      "Solo para los ojos de {name}. Suelta para cerrar el expediente.",
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
    instruction:
      "Hablad, señalad y votad. Toca al sospechoso que se va.",
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
};

export default es;
