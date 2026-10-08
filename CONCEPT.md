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

**Pass-and-play is de enige modus.** Geen online rooms, geen spelen op afstand. Dat is een
bewuste keuze, geen tijdelijke beperking: het spel leeft van mensen die bij elkaar zitten.

## 3. Spelregels

### Rollen

| Rol | Krijgt | Doel |
|---|---|---|
| **Burger** | Het geheime woord | Alle infiltranten eruit stemmen |
| **Undercover** | Een *lijkend* woord (appel ↔ peer) | Overleven tot de burgers in de minderheid zijn |
| **Mr. White** | Niets. Alleen "???" | Meebluffen op basis van wat anderen zeggen |

### Verloop van een ronde

1. **Uitdelen** — de telefoon gaat rond; iedereen zoekt zijn eigen naam op en bekijkt zijn woord.
   Dit scherm blijft open en herhaaldelijk te gebruiken tot de ronde start (zie hieronder)
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

### Je woord inzien: open tot de ronde begint

Geen eenmalige onthulling waarbij de telefoon één rondje gaat en je daarna je kans gehad hebt.
In plaats daarvan één scherm met alle spelersnamen als tegels:

- Tik op je eigen naam → houd ingedrukt → je rol en woord verschijnen → laat los en het is weer weg
- Dat kan zo vaak als je wil. Te snel doorgeklikt, niet goed gelezen, of even twijfel: gewoon
  nog een keer kijken
- Bekeken namen krijgen een vinkje, zodat de groep ziet wie nog moet
- Pas als iemand op **Start ronde 1** tikt wordt dit scherm gesloten en is inzien voorbij

Vanaf dat moment moet je het uit je hoofd doen — dat is het spel. Maar niemand verliest een ronde
omdat de telefoon te snel werd doorgegeven.

Dit scherm werkt op vertrouwen: je kunt technisch ook op iemand anders zijn naam tikken. Dat hoort
bij pass-and-play en lossen we niet op met pincodes; dat maakt het alleen omslachtig.

### Huisregels die de app afdwingt

- Je mag je eigen woord niet letterlijk noemen, ook geen vervoeging ervan
- Geen hint herhalen die al gegeven is
- Weggestemde spelers praten niet meer mee
- **De eerste spreker is nooit een Mr. White** — die heeft bij een eerste hint geen enkele
  informatie en is dan kansloos. Undercovers mogen wél openen: zou de opener altijd een burger
  zijn, dan is die speler elke ronde gratis vrijgepleit van twee rollen, en dat rekent de tafel
  binnen een paar potjes uit.

  **Dit wordt nergens in de app benoemd.** Uitleggen hoe de startspeler gekozen wordt, verklapt
  welke rol die speler niet heeft. De regel zit in de code, niet in de interface.

## 4. Wat we beter doen dan de bestaande apps

Onderzocht: [mrwhiteonline.com](https://mrwhiteonline.com), [meneerwit.com](https://www.meneerwit.com),
[Undercover van Yanstar](https://apps.apple.com/nl/app/undercover-woord-feestspel/id946882449),
[UnderCover & Mr White Party](https://play.google.com/store/apps/details?id=com.arouaystudio.undercoverparty).

| Probleem bij de concurrentie | Onze aanpak |
|---|---|
| Woordparen zijn klakkeloos vertaald uit het Engels, vaak onlogisch | Handgeschreven Nederlandse paren, met Nederlandse thema's (Sinterklaas, Koningsdag, snackbar) |
| Mr. White mag soms als eerste praten, en is dan kansloos | Startspeler is nooit een Mr. White, zonder dat de app dat verklapt |
| Je bent drie rondes achter elkaar Mr. White | Nooit twee rondes achter elkaar infiltrant. Niet "nooit dezelfde rol": met vier burgers op zes spelers moeten er altijd burgers terugkomen |
| Reclame tussen elke ronde, breekt het feestje | Geen advertenties in de spelloop |
| Kleine knopjes, licht thema, onbruikbaar op een donker feestje | Grote trefvlakken, dark mode standaard, hoog contrast |
| Werkt niet zonder internet | Volledig offline, ook de categorieën |

## 5. Schermen

1. **Home** — Spelen · Regels · Instellingen
2. **Spelers** — namen invoeren, worden onthouden voor de volgende keer
3. **Ronde-instellingen** — aantal undercovers, Mr. White aan/uit, thema, moeilijkheid
4. **Woorden inzien** — tegels met alle namen, iedereen bekijkt zijn eigen woord zo vaak als nodig,
   tot iemand op "Start ronde 1" tikt
5. **Startspeler** — "Joost begint", zonder uitleg waarom juist hij
6. **Hintronde** — spreekvolgorde met wie aan de beurt is, één tik naar de volgende
7. **Stemmen** — tegels per speler
8. **Onthulling** — wie lag eruit, en wat was hij
9. **Gok van Mr. White** — alleen als die weggestemd is
10. **Einde ronde** — winnaar, punten, scorebord
11. **Volgende ronde** of stoppen

### Bewust niet in de eerste versies

Overwogen en geschrapt om het simpel te houden. Staan hier zodat we ze niet opnieuw bedenken:

- **Hints laten intypen** — dan zit één persoon te typen terwijl de rest praat. Dat remt het tempo
  en legt al het werk bij de telefoonhouder
- **Timer per speler** — voegt druk toe die de meeste groepen niet willen
- **Pincode per speler** bij het inzien van je woord — lost een probleem op dat in de praktijk
  niet bestaat, en maakt de start omslachtig
- **Online rooms, chat, vriendenlijsten, accounts** — valt buiten pass-and-play

## 6. Woordenbank

JSON in de repo, meegeleverd in de bundel. Per paar: burgerwoord, undercoverwoord, thema, moeilijkheid.

```json
{ "civilian": "pannenkoek", "undercover": "poffertje", "theme": "eten", "difficulty": 2 }
```

Moeilijkheid 1 = ver uit elkaar (hond/kat), 3 = bijna identiek (thee/kruidenthee).
Doel voor de MVP: 150 paren. Doel voor v1.0: 500+, verdeeld over thema's.

Nieuwe pakketten uitrollen zonder app-update kan via een `packs.json` met versienummer op een CDN.
Dat is een statisch bestand, geen API: de app haalt het op als er toevallig internet is, en gebruikt
anders wat in de bundel zit.

## 7. Techniek

**Keuze: Next.js + TypeScript + Tailwind als statische export, later verpakt met Capacitor.
Daarnaast een aparte, kleine backend — maar pas zodra we iets gaan verkopen.**

### Drie losse delen

1. **De app** — alle spellogica en alle woorden, draait volledig lokaal, werkt zonder internet.
   Next.js App Router met `output: 'export'`, dus puur statische bestanden. Dat is precies wat
   Capacitor nodig heeft, dus web en native app komen uit dezelfde build.
2. **Woordpakketten** — in de bundel, optioneel aangevuld met een `packs.json` van een CDN.
3. **Backend** — apart deploybaar op `api.mrwhite.nl`. Kan Laravel zijn, sluit aan op de
   bestaande stack. Taken: account, entitlements (wat heeft deze gebruiker gekocht),
   betaalwebhooks, bonvalidatie van de stores.

### Waarom de backend apart staat, en niet als Next.js API-routes

- API-routes overleven `output: 'export'` niet, en die export is nodig voor Capacitor
- Het dwingt de goede scheiding af: ligt de server plat, dan speelt het spel gewoon door
- Los deploybaar en los te versioneren, en je kunt hem in Laravel bouwen

### Het principe dat we vasthouden

**De API mag nooit nodig zijn om te spelen.** Categorieën ophalen hoort dus níét via een API-call:
dat is statische data die mee de bundel in gaat. De API gaat uitsluitend over één vraag —
*wat heeft deze gebruiker gekocht?* Het antwoord daarop wordt lokaal gecachet, zodat ook dat
offline werkt.

### Betalingen — de lastige realiteit

| Platform | Betaalweg | Commissie |
|---|---|---|
| Web / PWA | Stripe Checkout + webhook | alleen de Stripe-fee |
| iOS | Verplicht in-app purchase (StoreKit) | 15–30% |
| Android | Verplicht Google Play Billing | 15–30% |

Apple en Google verplichten hun eigen betaalsysteem voor digitale content; Stripe mag daar niet
voor gebruikt worden. De regels rond uitlinken naar extern betalen zijn in de EU en de VS
versoepeld — controleer de actuele voorwaarden op het moment van indienen.

**Gevolg:** twee betaalwegen, en zodra iemand op web koopt en het in de app wil gebruiken heb je
**accounts** nodig om de ontgrendeling te koppelen. Dat accountsysteem is veruit het meeste werk
van het hele verdienmodel, meer dan de betaling zelf.

**Overweging:** een abonnement op een feestspel dat je vier keer per jaar speelt is een moeilijke
verkoop. Eén eenmalige "alles ontgrendelen" is makkelijker te verkopen en bespaart de hele
administratie van opzeggingen en verlopen rechten.

### Datamodel (schets)

De codebase is Engels — bestandsnamen, variabelen, commentaar, commits en de
README. De spelteksten zitten in woordenboeken per taal (`lib/i18n/dictionaries/`),
met Engels als brontaal en Nederlands als vertaling. Elke taal heeft eigen routes
(`/en/play`, `/nl/play`) zodat beide los vindbaar zijn in Google. Deze
planningsdocumenten blijven Nederlands.

```ts
type Role = 'civilian' | 'undercover' | 'mrwhite'

type Player = {
  id: string
  name: string
  role: Role
  word: string | null   // null voor Mr. White
  alive: boolean
  score: number
  seenWord: boolean     // vinkje op het inzien-scherm
}

type Phase = 'setup' | 'reveal' | 'hints' | 'voting' | 'elimination' | 'mrwhite-guess' | 'result'
```

State in een reducer of Zustand-store, weggeschreven naar `localStorage` zodat een per ongeluk
herladen pagina de ronde niet weggooit.

## 8. Fasering

Uitgewerkt in een eigen document: **[FASEN.md](FASEN.md)** — zeven fasen van kale spelloop tot
storevermelding, elk met een harde "klaar als"-voorwaarde.

Fase 1 tot en met 6 heeft geen backend nodig. Pas bij fase 7 komt er een server bij.

## 9. Nog te beslissen

- **Naam en merk** — "Mr. White" is de werktitel. De naam wordt breed gebruikt door concurrenten;
  voor een storevermelding is iets eigens sterker en juridisch rustiger
- **Taal** — alleen Nederlands, of vanaf het begin meertalig opzetten?
- **Verdienmodel** — eenmalige ontgrendeling of abonnement
- **Gratis of betaald** — waar ligt de grens, zodat de gratis versie op zichzelf leuk blijft
