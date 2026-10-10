# Waar dit project staat

**Bijgewerkt:** 2026-10-10 (nacht) · **Doel:** App Store en Play Store

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
| Ontwerp | **Volledig op v3**, scherm voor scherm tegen de opmaak gelegd |
| Spelmodi | **Klassiek en Drinking Edition**, uit ontwerp v3 |
| Spelloop | Compleet: modus → verdeling → namen → (drankregels) → dossiers → hints → stemmen → ontmaskering → gok → uitslag |
| Drankregels | 45 regelkaarten in 4 soorten, 8 conflictparen, 6 geheime challenges |
| Talen | Interface én woorden in 7 talen geschreven; **alleen NL en EN vrijgegeven** |
| Woorden | 154 paren voor NL en EN, 28 voor de rest |
| Tests | 118, via `npm test`. Woorden apart met `npm run words:check` |
| Opslag | Alles per toestel in `localStorage`, sleutel `mrwhite-noir-v1`. Potje vervalt na 6 uur, namen na 7 dagen, en Instellingen heeft een wisknop |
| Eindrapport | Gebouwd uit de losse handoff van 2026-10-10 |
| Native | `android/` en `ios/` staan in de repo, iconen gegenereerd uit `assets/icon.svg` |
| Android-build | **Ondertekende AAB gebouwd op 2026-10-10**, klaar voor de Play Console |
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

**3 tot 20 spelers**, en vier als minimum in de Drinking Edition.

**De Drinking Edition is een volwaardige tweede modus**, niet een schakelaar.
Eigen schermen (Spelmodus, Drankregels, Geheime stemming), een strafblad, en
andere rekenkunde: infiltranten winnen daar bij gelijke stand en er passen
meer infiltranten aan tafel. Besloten op 2026-10-10 om hem **precies zoals
ontworpen** te bouwen, inclusief de slokken, en de leeftijdsclassificatie
eerlijk op te geven. Verwachting 12+, mogelijk 17+; dat rolt uit de
vragenlijst van de winkels.

**Een gehaalde challenge levert slokken op, geen vrijstelling.** Het ontwerp
beloofde allebei en gaf alleen het eerste; vrijstellingen waren onmogelijk te
verdienen. Beloning schaalt nu met moeilijkheid, 3 tot 8 slokken, en wordt
willekeurig toegewezen — de uitbetaling is het enige signaal hoe zwaar je
opdracht is.

**Een gelijkspel bij de stemming wordt niet door de app beslist.** Er volgt
een herstemming tussen de gedeelden en niemand drinkt ervoor. Willekeurig
kiezen zou het spel op een muntworp beslissen die niemand zag.

**Eén taal stuurt alles aan** — interface én woorden. Taal zit in de URL
(`/nl/`, `/en/`), wisselen is een volledige paginalading omdat elke taal zijn
eigen root layout is. Dat mag: het spel wordt bij elke zet opgeslagen.

**Een taal gaat pas aan als iemand hem gelezen heeft.** `VERIFIED_LOCALES` in
`lib/i18n/config.ts`, één regel. Duits, Frans, Spaans, Italiaans en Turks zijn
geschreven maar ongecontroleerd en staan niet in de kiezer. Reden: een
onvertaalde interface is op élk scherm fout, en niemand in het team kan die
vijf talen nalezen.

**De app-id is `online.misterwhite.game`** — besloten op 2026-10-10. Een
app-id is een omgedraaide domeinnaam, dus dit is `misterwhite.online`, het
domein dat David zelf bezit. De oude `nl.mtvtd.mrwhite` wees naar een bedrijf
dat niet van hem is. **Na publicatie ligt dit voorgoed vast.**

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

1. **Apple Developer Program**, €99/jaar, **als persoon** — besloten op
   2026-10-10. Scheelt het D-U-N-S-nummer en daarmee weken wachten; de prijs
   is dat "David Kleintjes" als verkoper bij de app staat in plaats van
   Logicly. Omzetten naar een bedrijfsaccount kan later nog.
2. **De naam is `Mister White`** — besloten op 2026-10-10. "Mr. White" is in
   beide winkels bezet en dat is in dit genre het grootste afwijzingsrisico
   (richtlijn 4.3, duplicaat). "Mister White" is veel vrijer en sluit aan op
   het domein. De rol in het spel heet nog gewoon Mr. White; alleen de
   productnaam veranderde, dus het ontwerp bleef zoals het was.

### Android — alles staat klaar behalve de gereedschapsketen

Gradle is al ingericht om te ondertekenen; het leest
`android/keystore.properties`, en dat bestand staat in `.gitignore`.
Bestaat het niet, dan komt er gewoon een niet-ondertekende build uit.

**1. De gereedschapsketen staat en is bewezen.** Android Studio, de SDK
(platform 37, build-tools 36) en een JDK 21 staan op de machine; een
`assembleDebug` is doorgekomen, dus Java, SDK, Gradle, Capacitor en onze
webbuild passen op elkaar.

**Gradle moet op JDK 21 draaien, niet op die van Android Studio.** Android
Studio brengt een JDK 25 mee, en Gradle 8.14 met AGP 8.13 breekt daarop af met
`Unsupported class file major version 69`. Daarom staat er een losse JDK 21
naast, en moet elke `./gradlew`-opdracht hiermee beginnen:

```bash
export JAVA_HOME="/c/Program Files/Microsoft/jdk-21.0.12.101-hotspot"
export ANDROID_HOME="$LOCALAPPDATA/Android/Sdk"
```

Die paden staan bewust niet in `android/gradle.properties`: dat bestand wordt
gecommit en ze gelden alleen voor deze machine.

**2. Een upload key maken.** Kies zelf een wachtwoord; schrijf het nergens op
waar het in de repo kan belanden.

```bash
keytool -genkey -v -keystore mrwhite-upload.jks -keyalg RSA -keysize 2048   -validity 10000 -alias upload
```

Zet de `.jks` buiten de repo, bijvoorbeeld in je documenten, en maak er een
back-up van.

**Play App Signing gaat aan** — besloten op 2026-10-10, en bij nieuwe apps is
het inmiddels verplicht. Google bewaart dus de echte handtekening en deze
sleutel is alleen een uploadsleutel. Raak je hem kwijt, dan reset Google hem;
zonder Play App Signing was dat het einde van elke toekomstige update.

**3. `android/keystore.properties` aanmaken** (wordt niet gecommit):

```properties
storeFile=C:/pad/naar/mrwhite-upload.jks
storePassword=...
keyAlias=upload
keyPassword=...
```

**4. Bouwen en uploaden.** Gedaan op 2026-10-10; herhaal dit bij elke
versie, na `versionCode` in `android/app/build.gradle` te verhogen.

```bash
export JAVA_HOME="/c/Program Files/Microsoft/jdk-21.0.12.101-hotspot"
export ANDROID_HOME="$LOCALAPPDATA/Android/Sdk"
npm run build && npx cap sync android
cd android && ./gradlew bundleRelease
```

De AAB komt in `android/app/build/outputs/bundle/release/app-release.aab`.
Controleer de handtekening met `jarsigner -verify`; dat die zelfondertekend is
en geen tijdstempel heeft, hoort zo bij een uploadsleutel.

Wat nog rest aan Android-kant is de Play Console zelf: $25 eenmalig, de app
aanmaken, en uploaden.

### iOS — kan niet op deze machine

Xcode draait alleen op macOS. Het project staat klaar in `ios/`. Keuze: een
Mac, of een cloud-build (Codemagic, EAS, Bitrise).

### Winkelmateriaal

- Schermafbeeldingen in de vereiste maten
- Beschrijving, ondertitel, trefwoorden
- ~~Privacybeleid op een URL~~ — klaar. Staat op `/nl/privacy/` en
  `/en/privacy/`, tekst in `lib/legal/privacy.ts`. Nog te regelen: het adres
  `privacy@misterwhite.online` moet bestaan en doorsturen
- Leeftijdsclassificatie

### Losse einden

- **Domein `misterwhite.online` is live** sinds 2026-10-10, met certificaat
  voor het kale domein en `www`, geldig tot 8 januari 2027. De webroot is
  dezelfde als die van de showcase-URL, maar zonder `noindex` — dit is de
  echte plek. Het privacybeleid staat op
  `https://misterwhite.online/nl/privacy/`; dat adres gaat naar beide winkels.
  **Val bij het opzetten van een nieuw domein niet in dezelfde val:** Caddy
  vraagt één certificaat aan voor alle namen in een blok, dus zolang `www`
  geen DNS-record had, kreeg ook het kale domein er geen — ook al klopte dat
  record allang.
- `public/manifest.webmanifest` is door `capacitor-assets` gemaakt maar nog
  nergens aan gekoppeld. Voor PWA-installatie moet die nog in de `<head>`.

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

**Twee keer `save` in één handeling werkt niet.** `save` bouwt op de `stored`
van die render, dus een tweede aanroep maakt de eerste ongedaan. Zo ging de
gekozen spelmodus verloren op weg naar het opzetscherm. Alles wat samen met
het scherm verandert, gaat nu in dezelfde aanroep mee.

**Een ontwerp nabouwen gaat per scherm, niet per mechaniek.** Bij v3 haalde
ik de gegevens en de logica eruit, begreep ik de werking goed, en tekende ik
de schermen vervolgens zelf. Het resultaat was herkenbaar een ánder ontwerp:
het zaakdossier waren twee overlays en bij mij één, een lade vanaf de
bovenrand werd een paneel van onderen. Splits de template op
`data-screen-label` in `design/_schermen_v3/` en bouw elk scherm tegen zijn
eigen bestand. Vergelijk ook de tellingen: `style-hover` tegen `hover=`, en
de `@keyframes` op naam.

**De mechanische woordcontrole heeft een grens.** `Bus driver / Taxi driver`
wordt gepakt op het gedeelde woord, maar `Buschauffeur / Taxichauffeur` heeft
dezelfde fout verstopt in een samenstelling en glipt erdoor. De controle maakt
de stapel kleiner die een mens moet lezen; hij vervangt het lezen niet.
