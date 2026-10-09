# Waar dit project staat

**Bijgewerkt:** 2026-10-09 · **Doel:** App Store en Play Store

Dit document is de waarheid over de huidige stand. [CONCEPT.md](CONCEPT.md) en
[FASEN.md](FASEN.md) beschrijven het oorspronkelijke idee en zijn op onderdelen
achterhaald door het ontwerp; waar ze botsen wint dit document.

---

## Wat er nu is

Een werkend spel, nagebouwd uit het ontwerp **"Mr White VERSIE 2"** (het
self-extracting HTML-bestand in Downloads). Twaalf schermen, drie dialogen,
politiedossier-stijl met donker en licht thema.

- **Live:** https://mrwhite.178-105-197-213.sslip.io
- **Repo:** https://github.com/DavidKleintjesGit/mrwhite (openbaar — zet er geen servergegevens in)
- **Lokaal:** `npm run dev` → poort 3100, of `http://mrwhite.test` via Herd-proxy

### Techniek in één alinea

Next.js 16 met `output: "export"`, dus een statische site zonder server.
**Geen Tailwind** — het ontwerp is geschreven in platte CSS met inline-stijlen
en elke vertaling naar utility-klassen liet het schuiven, dus de declaraties
zijn letterlijk overgenomen en alleen de herhaling zit in componenten
(`components/ui/`). Capacitor pakt dezelfde build in tot iOS- en Android-app.

### Wat af is

| | |
|---|---|
| Spelloop | Compleet: verdeling → namen → dossiers → hints → stemmen → ontmaskering → gok → uitslag |
| Talen | Interface én woorden in 7 talen geschreven; **alleen NL en EN vrijgegeven** |
| Woorden | 154 paren voor NL en EN, 28 voor de rest |
| Tests | 87, via `npm test`. Woorden apart met `npm run words:check` |
| Opslag | Een lopend potje overleeft een herlaad. Sleutel `mrwhite-noir-v1`, vervalt na 6 uur |
| Native | `android/` en `ios/` staan in de repo, iconen gegenereerd uit `assets/icon.svg` |
| Uitrollen | `./deploy.sh` → roept de skill in `~/.claude/skills/staging-deploy/` aan |

---

## Beslissingen die vastliggen

Niet opnieuw ter discussie stellen zonder reden; de redenen staan erbij.

**Alleen pass-and-play.** Geen online rooms. Bewuste keuze, geen beperking.

**De startspeler is nooit een Mr. White, wél soms een undercover.** Mr. White
heeft bij een eerste hint geen informatie en is dan kansloos. Zou de opener
altijd een burger zijn, dan is die speler elke ronde gratis vrijgepleit van
twee rollen en rekent de tafel dat binnen een paar potjes uit.
**Dit wordt nergens in de app uitgelegd** — uitleggen verklapt het.

**Infiltranten winnen zodra er nog één burger over is**, niet bij gelijk
aantal. Komt uit het ontwerp.

**De undercover krijgt zijn rol niet te zien**, alleen zijn woord. Alleen
Mr. White weet wie hij is. Ook uit het ontwerp, en het verandert hoe het spel
speelt.

**Geen punten en geen scorebord.** Zat in een eerdere fase, het ontwerp kent
het niet, dus eruit.

**3 tot 20 spelers.**

**Eén taal stuurt alles aan** — interface én woorden. Taal zit in de URL
(`/nl/`, `/en/`), wisselen is een volledige paginalading omdat elke taal zijn
eigen root layout is. Dat mag: het spel wordt bij elke zet opgeslagen.

**Een taal gaat pas aan als iemand hem gelezen heeft.** `VERIFIED_LOCALES` in
`lib/i18n/config.ts`, één regel. Duits, Frans, Spaans, Italiaans en Turks zijn
geschreven maar ongecontroleerd en staan niet in de kiezer. Reden: een
onvertaalde interface is op élk scherm fout, en niemand in het team kan die
vijf talen nalezen.

**Geen merknamen in de inhoud.** Popcultuur was bijna volledig andermans merk
en is generiek gemaakt; de schuilnamen voor lege naamvelden zijn verzonnen
achternamen in plaats van Bond en Tintin.

**`trailingSlash: true` moet blijven staan.** Zonder dat schrijft de export
`nl.html` in plaats van `nl/index.html`, en dan opent de native app op een
blanco scherm — een WebView heeft geen `try_files`.

---

## Wat er nog moet voor de winkels

In volgorde van wachttijd, niet van werk.

### Nu beginnen, want het is pure doorlooptijd

1. **Apple Developer Program**, €99/jaar. Als bedrijf heb je een D-U-N-S-nummer
   nodig; reken op één tot twee weken.
2. **De naam.** "Mr. White" wordt al door meerdere apps gebruikt. Dit is het
   grootste afwijzingsrisico (richtlijn 4.3, duplicaat/spam) in een genre dat
   vol klonen zit. Het eigen ontwerp helpt daartegen, de naam niet.

### Android — kan het eerst af

- JDK en Android SDK installeren (Android Studio); stond bij het laatste
  controlepunt nog niet op deze machine
- Signing key aanmaken en Gradle erop wijzen. **De keystore en het wachtwoord
  horen van David te zijn en niet in de repo**; `android/keystore.properties`
  hoort in `.gitignore`
- `npx cap open android` → release-AAB bouwen → Play Console, $25 eenmalig

### iOS — kan niet op deze machine

Xcode draait alleen op macOS. Het project staat klaar in `ios/`. Keuze: een
Mac, of een cloud-build (Codemagic, EAS, Bitrise).

### Winkelmateriaal

- Schermafbeeldingen in de vereiste maten
- Beschrijving, ondertitel, trefwoorden
- **Privacybeleid op een URL.** De app verzamelt niets, dus de tekst is kort.
  Kan op de eigen server
- Leeftijdsclassificatie

### Losse einden

- **Er is een domein gekocht** (2026-10-09). Welke is nog niet doorgegeven.
  Zodra dat bekend is: de site erheen verhuizen en het privacybeleid daar
  neerzetten, zodat het server-IP uit de openbare repo kan blijven.
- `public/manifest.webmanifest` is door `capacitor-assets` gemaakt maar nog
  nergens aan gekoppeld. Voor PWA-installatie moet die nog in de `<head>`.
- Bij het stemmen zit geen gelijkspel-afhandeling en een stem is niet terug te
  draaien. Het ontwerp kent het ook niet; bewust zo gelaten.

---

## Dingen die me eerder in de val lieten lopen

Staan hier zodat niemand ze opnieuw ontdekt.

**De dev-server serveert oude CSS.** Een `next dev` die al draaide vóór een
wijziging in `globals.css` pikt die niet op. Een hele herbouw is daardoor een
keer beoordeeld door de vorige stylesheet heen. Na elke wijziging aan globale
CSS, config of lettertypen: dev-server herstarten en `.next` weggooien, en
controleren dat de geserveerde stylesheet de nieuwe tokens echt bevat.

**`key` op een statisch kind vervangt dat kind niet.** Op het hintscherm bleef
de vorige spelerskaart in de DOM staan, waardoor de naam een beurt achterliep.
Opgelost door het als lijst van één te renderen, zoals het ontwerp doet.

**De mechanische woordcontrole heeft een grens.** `Bus driver / Taxi driver`
wordt gepakt op het gedeelde woord, maar `Buschauffeur / Taxichauffeur` heeft
dezelfde fout verstopt in een samenstelling en glipt erdoor. De controle maakt
de stapel kleiner die een mens moet lezen; hij vervangt het lezen niet.
