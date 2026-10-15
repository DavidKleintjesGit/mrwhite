import type { CategoryId, Pair } from "../words.ts";

/**
 * De woordparen voor Español.
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
    ["Pizza", "Hamburguesa", 1],
    ["Café", "Té", 1],
    ["Paella", "Risotto", 2],
    ["Churros", "Donuts", 2],
  ],
  dieren: [
    ["Gato", "Perro", 1],
    ["Tiburón", "Delfín", 1],
    ["León", "Tigre", 2],
    ["Rana", "Sapo", 2],
  ],
  plekken: [
    ["Playa", "Piscina", 1],
    ["Aeropuerto", "Estación", 1],
    ["Cine", "Teatro", 2],
    ["Castillo", "Palacio", 2],
  ],
  huis: [
    ["Vela", "Lámpara", 1],
    ["Sofá", "Cama", 1],
    ["Espejo", "Ventana", 2],
    ["Almohada", "Manta", 2],
  ],
  beroepen: [
    ["Policía", "Bombero", 1],
    ["Médico", "Dentista", 2],
    ["Cocinero", "Panadero", 2],
    ["Detective", "Espía", 2],
  ],
  sport: [
    ["Fútbol", "Hockey", 1],
    ["Boxeo", "Judo", 1],
    ["Tenis", "Pádel", 2],
    ["Ajedrez", "Damas", 2],
  ],
  pop: [
    ["Superhéroe", "Villano", 1],
    ["Dibujos", "Documental", 1],
    ["Streaming", "Televisión", 2],
    ["Secuela", "Remake", 2],
  ],
};

export default words;
