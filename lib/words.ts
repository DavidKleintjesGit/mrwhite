/**
 * Word pairs, verbatim from the design. A pair is [civilian, undercover,
 * level]; level 1 is far apart, 2 is close. Custom pairs come in at level 0.
 */
export type Pair = [string, string, number];

export type CategoryId =
  | "eten"
  | "dieren"
  | "plekken"
  | "huis"
  | "beroepen"
  | "sport"
  | "pop";

/** The custom-words bucket is a category too, so it can be switched off. */
export type BucketId = CategoryId | "eigen";

export type LangId = "nl" | "en" | "de" | "fr" | "es" | "it" | "tr";

export const CATEGORY_IDS: CategoryId[] = [
  "eten",
  "dieren",
  "plekken",
  "huis",
  "beroepen",
  "sport",
  "pop",
];

export const LANGS: { id: LangId; name: string }[] = [
  { id: "nl", name: "Nederlands" },
  { id: "en", name: "English" },
  { id: "de", name: "Deutsch" },
  { id: "fr", name: "Français" },
  { id: "es", name: "Español" },
  { id: "it", name: "Italiano" },
  { id: "tr", name: "Türkçe" },
];

export const WORDS: Record<LangId, Record<CategoryId, Pair[]>> = {
  nl: {
    eten: [["Pizza","Hamburger",1],["Appel","Banaan",1],["Koffie","Thee",1],["Friet","Chips",1],["Kaas","Boter",1],["Sushi","Kapsalon",1],["Stroopwafel","Speculaas",2],["Pannenkoek","Poffertjes",2],["Hagelslag","Muisjes",2],["Bitterbal","Kroket",2]],
    dieren: [["Kat","Hond",1],["Haai","Dolfijn",1],["Uil","Papegaai",1],["Pinguïn","IJsbeer",1],["Leeuw","Tijger",2],["Paard","Ezel",2],["Kikker","Pad",2],["Muis","Rat",2]],
    plekken: [["Strand","Zwembad",1],["Ziekenhuis","Apotheek",1],["Vliegveld","Treinstation",1],["Camping","Hotel",1],["Bioscoop","Theater",2],["Bibliotheek","Boekwinkel",2],["Supermarkt","Markt",2],["Kasteel","Paleis",2]],
    huis: [["Kaars","Lamp",1],["Bank","Bed",1],["Tandenborstel","Kam",1],["Paraplu","Regenjas",1],["Spiegel","Raam",2],["Koelkast","Vriezer",2],["Kussen","Deken",2],["Wekker","Horloge",2]],
    beroepen: [["Politie","Brandweer",1],["Boer","Tuinman",1],["Dokter","Tandarts",2],["Kok","Bakker",2],["Piloot","Kapitein",2],["Leraar","Directeur",2],["Detective","Spion",2],["Kapper","Visagist",2]],
    sport: [["Voetbal","Hockey",1],["Boksen","Judo",1],["Darts","Bowlen",1],["Fietsen","Hardlopen",1],["Tennis","Padel",2],["Schaken","Dammen",2],["Zwemmen","Duiken",2],["Skiën","Snowboarden",2]],
    pop: [["Batman","Spider-Man",1],["Harry Potter","Gandalf",1],["Mario","Sonic",1],["Netflix","YouTube",1],["Shrek","Hulk",1],["TikTok","Instagram",2],["Pikachu","Hello Kitty",2],["Frozen","Moana",2]],
  },
  en: {
    eten: [["Pizza","Burger",1],["Coffee","Tea",1],["Pancake","Waffle",2],["Donut","Bagel",2]],
    dieren: [["Cat","Dog",1],["Shark","Dolphin",1],["Lion","Tiger",2],["Frog","Toad",2]],
    plekken: [["Beach","Pool",1],["Airport","Train station",1],["Cinema","Theatre",2],["Castle","Palace",2]],
    huis: [["Candle","Lamp",1],["Sofa","Bed",1],["Mirror","Window",2],["Pillow","Blanket",2]],
    beroepen: [["Police","Firefighter",1],["Doctor","Dentist",2],["Pilot","Captain",2],["Detective","Spy",2]],
    sport: [["Football","Hockey",1],["Boxing","Judo",1],["Tennis","Padel",2],["Chess","Checkers",2]],
    pop: [["Batman","Spider-Man",1],["Mario","Sonic",1],["TikTok","Instagram",2],["Frozen","Moana",2]],
  },
  de: {
    eten: [["Pizza","Hamburger",1],["Kaffee","Tee",1],["Brezel","Brötchen",2],["Wurst","Schnitzel",2]],
    dieren: [["Katze","Hund",1],["Hai","Delfin",1],["Löwe","Tiger",2],["Frosch","Kröte",2]],
    plekken: [["Strand","Schwimmbad",1],["Flughafen","Bahnhof",1],["Kino","Theater",2],["Burg","Palast",2]],
    huis: [["Kerze","Lampe",1],["Sofa","Bett",1],["Spiegel","Fenster",2],["Kissen","Decke",2]],
    beroepen: [["Polizist","Feuerwehrmann",1],["Arzt","Zahnarzt",2],["Koch","Bäcker",2],["Detektiv","Spion",2]],
    sport: [["Fußball","Hockey",1],["Boxen","Judo",1],["Tennis","Padel",2],["Schach","Dame",2]],
    pop: [["Batman","Spider-Man",1],["Mario","Sonic",1],["TikTok","Instagram",2],["Frozen","Moana",2]],
  },
  fr: {
    eten: [["Pizza","Hamburger",1],["Café","Thé",1],["Croissant","Baguette",2],["Crêpe","Gaufre",2]],
    dieren: [["Chat","Chien",1],["Requin","Dauphin",1],["Lion","Tigre",2],["Grenouille","Crapaud",2]],
    plekken: [["Plage","Piscine",1],["Aéroport","Gare",1],["Cinéma","Théâtre",2],["Château","Palais",2]],
    huis: [["Bougie","Lampe",1],["Canapé","Lit",1],["Miroir","Fenêtre",2],["Oreiller","Couverture",2]],
    beroepen: [["Policier","Pompier",1],["Médecin","Dentiste",2],["Cuisinier","Boulanger",2],["Détective","Espion",2]],
    sport: [["Football","Hockey",1],["Boxe","Judo",1],["Tennis","Padel",2],["Échecs","Dames",2]],
    pop: [["Batman","Spider-Man",1],["Mario","Sonic",1],["Astérix","Tintin",2],["Frozen","Moana",2]],
  },
  es: {
    eten: [["Pizza","Hamburguesa",1],["Café","Té",1],["Paella","Risotto",2],["Churros","Donuts",2]],
    dieren: [["Gato","Perro",1],["Tiburón","Delfín",1],["León","Tigre",2],["Rana","Sapo",2]],
    plekken: [["Playa","Piscina",1],["Aeropuerto","Estación",1],["Cine","Teatro",2],["Castillo","Palacio",2]],
    huis: [["Vela","Lámpara",1],["Sofá","Cama",1],["Espejo","Ventana",2],["Almohada","Manta",2]],
    beroepen: [["Policía","Bombero",1],["Médico","Dentista",2],["Cocinero","Panadero",2],["Detective","Espía",2]],
    sport: [["Fútbol","Hockey",1],["Boxeo","Judo",1],["Tenis","Pádel",2],["Ajedrez","Damas",2]],
    pop: [["Batman","Spider-Man",1],["Mario","Sonic",1],["TikTok","Instagram",2],["Frozen","Moana",2]],
  },
  it: {
    eten: [["Pizza","Lasagne",1],["Caffè","Tè",1],["Gelato","Sorbetto",2],["Spaghetti","Tagliatelle",2]],
    dieren: [["Gatto","Cane",1],["Squalo","Delfino",1],["Leone","Tigre",2],["Rana","Rospo",2]],
    plekken: [["Spiaggia","Piscina",1],["Aeroporto","Stazione",1],["Cinema","Teatro",2],["Castello","Palazzo",2]],
    huis: [["Candela","Lampada",1],["Divano","Letto",1],["Specchio","Finestra",2],["Cuscino","Coperta",2]],
    beroepen: [["Poliziotto","Pompiere",1],["Medico","Dentista",2],["Cuoco","Fornaio",2],["Detective","Spia",2]],
    sport: [["Calcio","Hockey",1],["Boxe","Judo",1],["Tennis","Padel",2],["Scacchi","Dama",2]],
    pop: [["Batman","Spider-Man",1],["Mario","Sonic",1],["TikTok","Instagram",2],["Frozen","Moana",2]],
  },
  tr: {
    eten: [["Pizza","Hamburger",1],["Kahve","Çay",1],["Baklava","Lokum",2],["Döner","Lahmacun",2]],
    dieren: [["Kedi","Köpek",1],["Köpekbalığı","Yunus",1],["Aslan","Kaplan",2],["Kurbağa","Kaplumbağa",2]],
    plekken: [["Plaj","Havuz",1],["Havalimanı","Tren istasyonu",1],["Sinema","Tiyatro",2],["Kale","Saray",2]],
    huis: [["Mum","Lamba",1],["Kanepe","Yatak",1],["Ayna","Pencere",2],["Yastık","Battaniye",2]],
    beroepen: [["Polis","İtfaiyeci",1],["Doktor","Diş hekimi",2],["Aşçı","Fırıncı",2],["Dedektif","Casus",2]],
    sport: [["Futbol","Hokey",1],["Boks","Judo",1],["Tenis","Padel",2],["Satranç","Dama",2]],
    pop: [["Batman","Spider-Man",1],["Mario","Sonic",1],["TikTok","Instagram",2],["Frozen","Moana",2]],
  },
};

/** Stand-in names for anyone who leaves their field blank. */
export const ALIASES = [
  "Sherlock","Poirot","Columbo","Marple","Baantjer","Maigret","Watson","Clouseau",
  "Gadget","Holmes","Morse","Kojak","Magnum","Bond","Tintin","Lupin","Fletcher",
  "Nancy","Scooby","Fox",
];

export function pairCount(lang: LangId, id: CategoryId): number {
  return WORDS[lang][id].length;
}

export function totalPairs(lang: LangId): number {
  return CATEGORY_IDS.reduce((sum, id) => sum + pairCount(lang, id), 0);
}
