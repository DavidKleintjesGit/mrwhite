import type { CategoryId, Pair } from "../words.ts";

/**
 * De woordparen voor Deutsch.
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
    ["Pizza", "Hamburger", 1],
    ["Kaffee", "Tee", 1],
    ["Brezel", "Brötchen", 2],
    ["Wurst", "Schnitzel", 2],
  ],
  dieren: [
    ["Katze", "Hund", 1],
    ["Hai", "Delfin", 1],
    ["Löwe", "Tiger", 2],
    ["Frosch", "Kröte", 2],
  ],
  plekken: [
    ["Strand", "Schwimmbad", 1],
    ["Flughafen", "Bahnhof", 1],
    ["Kino", "Theater", 2],
    ["Burg", "Palast", 2],
  ],
  huis: [
    ["Kerze", "Lampe", 1],
    ["Sofa", "Bett", 1],
    ["Spiegel", "Fenster", 2],
    ["Kissen", "Decke", 2],
  ],
  beroepen: [
    ["Polizist", "Feuerwehrmann", 1],
    ["Arzt", "Apotheker", 2],
    ["Koch", "Bäcker", 2],
    ["Detektiv", "Spion", 2],
  ],
  sport: [
    ["Fußball", "Hockey", 1],
    ["Boxen", "Judo", 1],
    ["Tennis", "Padel", 2],
    ["Schach", "Dame", 2],
  ],
  pop: [
    ["Superheld", "Schurke", 1],
    ["Zeichentrick", "Doku", 1],
    ["Streaming", "Fernsehen", 2],
    ["Fortsetzung", "Neuverfilmung", 2],
  ],
};

export default words;
