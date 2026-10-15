import type { CategoryId, Pair } from "../words.ts";

/**
 * De woordparen voor Français.
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
    ["Café", "Thé", 1],
    ["Croissant", "Baguette", 2],
    ["Crêpe", "Gaufre", 2],
  ],
  dieren: [
    ["Chat", "Chien", 1],
    ["Requin", "Dauphin", 1],
    ["Lion", "Tigre", 2],
    ["Grenouille", "Crapaud", 2],
  ],
  plekken: [
    ["Plage", "Piscine", 1],
    ["Aéroport", "Gare", 1],
    ["Cinéma", "Théâtre", 2],
    ["Château", "Palais", 2],
  ],
  huis: [
    ["Bougie", "Lampe", 1],
    ["Canapé", "Lit", 1],
    ["Miroir", "Fenêtre", 2],
    ["Oreiller", "Couverture", 2],
  ],
  beroepen: [
    ["Policier", "Pompier", 1],
    ["Médecin", "Dentiste", 2],
    ["Cuisinier", "Boulanger", 2],
    ["Détective", "Espion", 2],
  ],
  sport: [
    ["Football", "Hockey", 1],
    ["Boxe", "Judo", 1],
    ["Tennis", "Padel", 2],
    ["Échecs", "Dames", 2],
  ],
  pop: [
    ["Super-héros", "Méchant", 1],
    ["Dessin animé", "Documentaire", 1],
    ["Streaming", "Télévision", 2],
    ["Suite", "Remake", 2],
  ],
};

export default words;
