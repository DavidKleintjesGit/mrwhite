import type { CategoryId, Pair } from "../words.ts";

/**
 * De woordparen voor Türkçe.
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
    ["Kahve", "Çay", 1],
    ["Baklava", "Lokum", 2],
    ["Döner", "Lahmacun", 2],
  ],
  dieren: [
    ["Kedi", "Köpek", 1],
    ["Köpekbalığı", "Yunus", 1],
    ["Aslan", "Kaplan", 2],
    ["Kurbağa", "Kaplumbağa", 2],
  ],
  plekken: [
    ["Plaj", "Havuz", 1],
    ["Havalimanı", "Tren garı", 1],
    ["Sinema", "Tiyatro", 2],
    ["Kale", "Saray", 2],
  ],
  huis: [
    ["Mum", "Lamba", 1],
    ["Kanepe", "Yatak", 1],
    ["Ayna", "Pencere", 2],
    ["Yastık", "Battaniye", 2],
  ],
  beroepen: [
    ["Polis", "İtfaiyeci", 1],
    ["Doktor", "Diş hekimi", 2],
    ["Aşçı", "Fırıncı", 2],
    ["Dedektif", "Casus", 2],
  ],
  sport: [
    ["Futbol", "Hokey", 1],
    ["Boks", "Judo", 1],
    ["Tenis", "Padel", 2],
    ["Satranç", "Dama", 2],
  ],
  pop: [
    ["Süper kahraman", "Kötü adam", 1],
    ["Çizgi film", "Belgesel", 1],
    ["Dizi", "Televizyon", 2],
    ["Devam filmi", "Yeniden çevrim", 2],
  ],
};

export default words;
