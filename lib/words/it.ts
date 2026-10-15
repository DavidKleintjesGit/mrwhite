import type { CategoryId, Pair } from "../words.ts";

/**
 * De woordparen voor Italiano.
 *
 * Elk paar is [burgerwoord, undercoverwoord, afstand]. Afstand 1 is ver uit
 * elkaar, 2 is dichtbij — dat is wat de moeilijkheidsgraad kiest. Welke van
 * de twee het burgerwoord wordt, bepaalt het spel met een muntworp, dus een
 * paar moet beide kanten op werken.
 *
 * Eén taal per bestand: met twintig talen in één bestand vindt niemand nog
 * iets terug, en een gegenereerde lijst kan hier in één keer overheen.
 */
const words: Record<CategoryId, Pair[]> = {
  eten: [
    ["Pizza", "Lasagne", 1],
    ["Caffè", "Tè", 1],
    ["Gelato", "Sorbetto", 2],
    ["Spaghetti", "Tagliatelle", 2],
  ],
  dieren: [
    ["Gatto", "Cane", 1],
    ["Squalo", "Delfino", 1],
    ["Leone", "Tigre", 2],
    ["Rana", "Rospo", 2],
  ],
  plekken: [
    ["Spiaggia", "Piscina", 1],
    ["Aeroporto", "Stazione", 1],
    ["Cinema", "Teatro", 2],
    ["Castello", "Palazzo", 2],
  ],
  huis: [
    ["Candela", "Lampada", 1],
    ["Divano", "Letto", 1],
    ["Specchio", "Finestra", 2],
    ["Cuscino", "Coperta", 2],
  ],
  beroepen: [
    ["Poliziotto", "Pompiere", 1],
    ["Medico", "Dentista", 2],
    ["Cuoco", "Fornaio", 2],
    ["Detective", "Spia", 2],
  ],
  sport: [
    ["Calcio", "Hockey", 1],
    ["Boxe", "Judo", 1],
    ["Tennis", "Padel", 2],
    ["Scacchi", "Dama", 2],
  ],
  pop: [
    ["Supereroe", "Cattivo", 1],
    ["Cartone animato", "Documentario", 1],
    ["Streaming", "Televisione", 2],
    ["Sequel", "Remake", 2],
  ],
};

export default words;
