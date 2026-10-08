# Mr. White — concept

**Status:** concept, nog geen code
**Laatst bijgewerkt:** 2026-10-08

---

## 1. In één zin

Een gratis, Nederlandstalig social-deduction woordspel voor je telefoon: iedereen krijgt hetzelfde
geheime woord — behalve de infiltranten. Praat je eruit, of word je ontmaskerd.

## 2. Doelgroep & moment

Groepen van 3 tot 10 mensen die fysiek bij elkaar zitten: borrel, verjaardag, vakantie, kantine,
treincoupé. Eén telefoon gaat rond. Geen account, geen installatie, geen uitleg nodig — binnen
30 seconden speel je.

## 3. Spelregels

### Rollen

| Rol | Krijgt | Doel |
|---|---|---|
| **Burger** | Het geheime woord | Alle infiltranten eruit stemmen |
| **Undercover** | Een *lijkend* woord (appel ↔ peer) | Overleven tot de burgers in de minderheid zijn |
| **Mr. White** | Niets. Alleen "???" | Meebluffen op basis van wat anderen zeggen |

### Verloop van een ronde

1. **Uitdelen** — telefoon gaat rond, iedereen houdt de knop ingedrukt om zijn rol + woord te zien
2. **Hints** — om de beurt zegt iedereen één woord of korte zin over zijn woord
3. **Overleg** — vrij praten, wie klinkt vaag?
4. **Stemmen** — iedereen wijst iemand aan, meeste stemmen ligt eruit
5. **Onthulling** — de app laat zien wat die speler was
6. Herhalen tot een van de partijen wint

### Winnen

- **Burgers winnen** zodra alle infiltranten weggestemd zijn
- **Infiltranten winnen** zodra ze met evenveel of meer zijn dan de burgers
- **De twist:** wordt Mr. White weggestemd, dan krijgt hij één gok naar het burgerwoord.
  Raadt hij goed, dan winnen de infiltranten alsnog — ter plekke

### Puntentelling

| Uitkomst | Punten |
|---|---|
| Burger wint | 2 |
| Undercover wint | 10 |
| Mr. White wint | 6 |
| Mr. White raadt het woord goed | +4 bonus |

Over meerdere rondes loopt een scorebord mee. Hogere punten voor de moeilijkere rollen, want
undercover zijn is zwaarder dan burger zijn.

### Rolverdeling per spelersaantal

| Spelers | Burgers | Undercover | Mr. White |
|---|---|---|---|
| 3 | 2 | 1 | — |
| 4 | 3 | 1 | — |
| 5 | 3 | 1 | 1 |
| 6 | 4 | 1 | 1 |
| 7 | 4 | 2 | 1 |
| 8 | 5 | 2 | 1 |
| 9 | 5 | 3 | 1 |
| 10 | 6 | 3 | 1 |

Vuistregel: ongeveer een derde is infiltrant. Alles is handmatig te overrulen in de instellingen.

### Huisregels die de app afdwingt

- Je mag je eigen woord niet letterlijk noemen, ook geen vervoeging ervan
- Geen hint herhalen die al gegeven is
- Weggestemde spelers praten niet meer mee
- **De eerste spreker is altijd een burger** — anders heeft Mr. White geen enkele informatie en is
  het spel voor hem onspeelbaar. Dit is het detail dat de meeste klonen fout doen.

## 4. Wat we beter doen dan de bestaande apps

Onderzocht: [mrwhiteonline.com](https://mrwhiteonline.com), [meneerwit.com](https://www.meneerwit.com),
[Undercover van Yanstar](https://apps.apple.com/nl/app/undercover-woord-feestspel/id946882449),
[UnderCover & Mr White Party](https://play.google.com/store/apps/details?id=com.arouaystudio.undercoverparty).

| Probleem bij de concurrentie | Onze aanpak |
|---|---|
| Woordparen zijn klakkeloos vertaald uit het Engels, vaak onlogisch | Handgeschreven Nederlandse paren, met Nederlandse thema's (Sinterklaas, koningsdag, snackbar) |
| Je vergeet halverwege wie wat gezegd heeft | Hints worden optioneel vastgelegd en staan op het stemscherm bij elke naam |
| Reclame tussen elke ronde, breekt het feestje | Geen ads in de spelloop |
| Mr. White mag soms als eerste praten → kansloos | Startspeler is gegarandeerd een burger |
| Je bent drie rondes achter elkaar Mr. White | Rolhistorie onthouden, niet twee keer achter elkaar dezelfde rol |
| Kleine knopjes, licht thema, onbruikbaar op een donker feestje | Grote trefvlakken, dark mode standaard, hoog contrast |
| Werkt niet zonder internet | Volledig offline na eerste keer laden |

## 5. Schermen

1. **Home** — Spelen · Regels · Instellingen
2. **Spelers** — namen invoeren, worden onthouden voor de volgende keer
3. **Ronde-instellingen** — aantal undercovers, Mr. White aan/uit, thema, moeilijkheid
4. **Rol onthullen** — "Geef de telefoon aan Sanne" → ingedrukt houden → woord → doorgeven
5. **Startspeler** — "Joost begint"
6. **Hintronde** — optionele timer, optioneel hints intypen
7. **Stemmen** — tegels per speler, met hun hints eronder
8. **Onthulling** — wie lag eruit, en wat was hij
9. **Gok van Mr. White** — alleen als die weggestemd is
10. **Einde ronde** — winnaar, punten, scorebord
11. **Volgende ronde** of stoppen

## 6. Woordenbank

JSON in de repo, geen database. Per paar: burgerwoord, undercoverwoord, thema, moeilijkheid.

```json
{ "civilian": "pannenkoek", "undercover": "poffertje", "theme": "eten", "difficulty": 2 }
```

Moeilijkheid 1 = ver uit elkaar (hond/kat), 3 = bijna identiek (thee/kruidenthee).
Doel voor de MVP: 150 paren. Doel voor v1.0: 500+, verdeeld over thema's.

## 7. Techniek

**Keuze: Next.js + TypeScript + Tailwind, als statische export. Later verpakt met Capacitor.**

Eén codebase die drie dingen oplevert: website, installeerbare PWA, en echte app in de stores.

- **Next.js (App Router)** met `output: 'export'` → puur statische bestanden, geen server nodig.
  Dat is ook precies wat Capacitor nodig heeft, dus de webapp en de native app blijven identiek.
- **Geen backend, geen database, geen accounts.** Het spel draait volledig in de browser.
  Dit is de directe winst van pass-and-play: geen hostingkosten, geen privacyvraagstuk,
  geen AVG-verplichtingen, werkt in een kelder zonder bereik.
- **State** in een reducer of Zustand-store, weggeschreven naar `localStorage` zodat een
  per ongeluk herladen pagina de ronde niet weggooit.
- **PWA**: manifest + service worker → "Zet op beginscherm" en volledig offline.
- **Later Capacitor**: dezelfde statische build wordt een iOS- en Android-app. Alleen voor
  push, haptics en de storevermelding is native code nodig.

### Consequentie om vast te houden

Geen Next.js API-routes en geen server components met serverlogica — die overleven de statische
export niet. Alle logica client-side. Komt er later toch online multiplayer, dan komt daar een
aparte realtime-service naast; de bestaande code blijft dan gewoon werken als "lokale modus".

### Datamodel (schets)

```ts
type Role = 'burger' | 'undercover' | 'mrwhite'

type Player = {
  id: string
  name: string
  role: Role
  word: string | null   // null voor Mr. White
  alive: boolean
  score: number
  hints: string[]
}

type Phase = 'setup' | 'reveal' | 'hints' | 'voting' | 'elimination' | 'mrwhite-guess' | 'result'
```

## 8. Fasering

| Fase | Inhoud |
|---|---|
| **0** | Concept vastleggen — *dit document* |
| **1 · MVP** | Spelers invoeren, rollen verdelen, woord onthullen, stemmen, win-check, Mr. White-gok. Lelijk mag. Doel: één keer helemaal uitspelen |
| **2 · Speelbaar** | Scorebord over meerdere rondes, hintlog, thema's, timer, foutbestendigheid |
| **3 · Af** | Vormgeving, animaties, geluid, dark mode, 500 woordparen |
| **4 · PWA** | Offline, installeerbaar, eigen domein |
| **5 · App** | Capacitor, iOS + Android, storevermelding |
| **6 · optioneel** | Online rooms met roomcode — alleen als fase 5 loopt |

## 9. Nog te beslissen

- **Naam en merk** — "Mr. White" is de werktitel. De naam wordt breed gebruikt door concurrenten;
  voor een storevermelding is iets eigens sterker en juridisch rustiger
- **Taal** — alleen Nederlands, of vanaf het begin meertalig opzetten?
- **Woordpakketten** — gratis basispakket plus betaalde thema's (18+, films, voetbal), of alles gratis?
- **Verdienmodel** — gratis met één bescheiden advertentie buiten de spelloop, eenmalige
  betaling voor extra pakketten, of puur gratis?
