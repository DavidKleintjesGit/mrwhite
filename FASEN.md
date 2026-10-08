# Mr. White — fasering

Zeven fasen van niets naar een app in de stores. Elke fase heeft een **klaar als**: een harde
voorwaarde, niet "het voelt goed". We gaan niet naar de volgende fase voordat die gehaald is.

Uitgangspunt: **simpel beginnen.** Alles wat niet nodig is om te kunnen spelen, schuift naar
achteren. Zie "Bewust niet in de eerste versies" in [CONCEPT.md](CONCEPT.md).

| Fase | Wat | Backend nodig |
|---|---|---|
| [0](#fase-0--concept) | Concept vastleggen | nee |
| [1](#fase-1--kale-spelloop) | Kale spelloop | nee |
| [2](#fase-2--meerdere-rondes) | Meerdere rondes en opslag | nee |
| [3](#fase-3--woorden-en-instellingen) | Woorden en instellingen | nee |
| [4](#fase-4--vormgeving) | Vormgeving | nee |
| [5](#fase-5--pwa-en-live) | PWA en live op een domein | nee |
| [6](#fase-6--native-apps) | iOS- en Android-app | nee |
| [7](#fase-7--verkoop) | Verkoop van woordpakketten | ja |

---

## Fase 0 — Concept

**Status: klaar.**

[CONCEPT.md](CONCEPT.md) en dit document.

---

## Fase 1 — Kale spelloop

Het doel is één ding: een potje van begin tot eind kunnen uitspelen. Lelijk mag, ongepolijst mag,
alles op één pagina mag. We willen voelen of de ritmiek klopt voordat we er tijd in stoppen.

**Bouwen:**

- Next.js-project opzetten: App Router, TypeScript, Tailwind, `output: 'export'` meteen goed
- Spelers invoeren: 3 tot 10 namen
- Rolverdeling volgens de tabel in het concept
- Startspeler bepalen, **nooit een Mr. White** — altijd een burger
- Woorden-inzien-scherm: tegels met namen, ingedrukt houden om je woord te zien, zo vaak als je
  wil, vinkje bij wie gekeken heeft, open tot "Start ronde 1"
- Hintronde: spreekvolgorde tonen, één tik naar de volgende speler
- Stemmen: tik op een speler, die ligt eruit
- Onthulling: wat was de weggestemde speler
- Gok van Mr. White als die weggestemd wordt
- Win-check na elke eliminatie, plus eindscherm met de winnende partij
- Woordenlijst: 40 paren in één JSON-bestand, nog geen thema's

**Niet in deze fase:** scorebord, opslag, thema's, instellingen, vormgeving, geluid, animaties.

**Klaar als:** een potje met 6 spelers in de browser helemaal uitspeelbaar is — van namen invoeren
tot winnaar — in alle drie de uitkomsten: burgers winnen, infiltranten winnen op aantal, en
Mr. White die weggestemd wordt en het woord goed raadt.

**Stand:** alle schermen zijn gebouwd en de spelregels zijn afgedekt met tests (`npm test`).
Nog niet afgevinkt: één potje echt van begin tot eind uitspelen.

---

## Fase 2 — Meerdere rondes

Eén potje spelen is niet hetzelfde als een avond spelen. Hier wordt het pas bruikbaar.

**Bouwen:**

- Puntentelling volgens het concept, over meerdere rondes
- Scorebord tussen de rondes
- "Volgende ronde" met dezelfde spelers, nieuwe rollen en een nieuw woordpaar
- Rolrotatie: niemand twee rondes achter elkaar dezelfde rol
- Opslag in `localStorage`: spelersnamen onthouden, en een lopend spel overleeft het per ongeluk
  herladen of wegklikken van de pagina
- Spel afbreken en opnieuw beginnen

**Klaar als:** vijf rondes achter elkaar gespeeld zijn zonder namen opnieuw in te voeren, het
scorebord klopt, en de pagina halverwege verversen de ronde niet weggooit.

---

## Fase 3 — Woorden en instellingen

**Bouwen:**

- Woordenbank naar 150+ paren, met thema en moeilijkheid per paar
- Thema kiezen voor een spel, of "alles door elkaar"
- Moeilijkheid kiezen (1 ver uit elkaar, 3 bijna identiek)
- Aantal undercovers aanpassen, Mr. White aan of uit
- Geen woordpaar twee keer binnen dezelfde sessie
- Regelspagina die uitlegt hoe het werkt

**Klaar als:** een hele avond gespeeld kan worden zonder dat een woordpaar terugkomt, en de
instellingen daadwerkelijk effect hebben op de verdeling.

---

## Fase 4 — Vormgeving

Pas hier, want nu weten we wat de schermen moeten doen.

**Bouwen:**

- Visuele identiteit: kleuren, typografie, logo
- Dark mode als standaard, hoog contrast, grote trefvlakken — bruikbaar op een donker feestje
- Animaties bij het onthullen van een woord en bij een eliminatie
- Geluid, uitzetbaar
- Toegankelijkheid: contrastverhoudingen, meeschalende tekstgrootte
- Testen op een echte telefoon, niet alleen in de browser

**Klaar als:** vier mensen die het spel niet kennen het zonder uitleg kunnen spelen, en het eruitziet
als een afgemaakt product in plaats van een prototype.

---

## Fase 5 — PWA en live

**Bouwen:**

- Manifest en service worker: installeerbaar vanaf het beginscherm
- Volledig offline speelbaar na één keer laden
- App-iconen en splashscreen
- Domein en hosting
- Privacyvriendelijke statistieken, geen trackers

**Klaar als:** het spel vanaf het beginscherm van een telefoon start en een volledig potje
uitgespeeld kan worden in vliegtuigmodus.

---

## Fase 6 — Native apps

**Bouwen:**

- Capacitor eroverheen, iOS- en Android-build uit dezelfde statische export
- Native details: haptische feedback, statusbalk, de Android-terugknop die niet het spel sloopt
- Store-materiaal: schermafbeeldingen, beschrijving, iconen
- Privacybeleid en leeftijdsclassificatie
- Definitieve naam vastzetten — "Mr. White" is de werktitel en wordt breed gebruikt door
  concurrenten, dus hier valt de knoop

**Klaar als:** de app in de App Store en Google Play staat en op een echt toestel te downloaden is.

---

## Fase 7 — Verkoop

Optioneel, en alleen als fase 6 daadwerkelijk gebruikers heeft. Dit is de enige fase met een server,
en in z'n geheel meer werk dan fase 1 tot en met 3 bij elkaar.

**Bouwen:**

- Backend op `api.mrwhite.nl`, los van de app
- Accounts, puur om aankopen aan een persoon te koppelen
- Entitlements: welke pakketten heeft deze gebruiker, lokaal gecachet zodat het offline werkt
- Stripe Checkout en webhooks voor web
- In-app purchase voor iOS en Android, met bonvalidatie
- Betaalde woordpakketten, en de ontgrendeling in de app

**Klaar als:** iemand een pakket kan kopen op web, het terugziet in de native app op een ander
toestel, en het spel nog volledig werkt terwijl de server onbereikbaar is.

---

## Nog te beslissen, per fase

| Beslissing | Moet uiterlijk in |
|---|---|
| ~~Alleen Nederlands, of meertalig~~ — besloten: Engels als brontaal, Nederlands als vertaling, taal in de URL | ✓ fase 1 |
| Definitieve naam en merk | fase 6 |
| Eenmalige ontgrendeling of abonnement | fase 7 |
| Welke pakketten gratis blijven | fase 7 |
