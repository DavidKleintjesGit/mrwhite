# Mister White op de App Store — wat Ismael moet doen

Dit document is voor degene die de app indient. Alles wat hier staat is
gecontroleerd; waar iets nog openstaat, staat dat er met zoveel woorden bij.

**Afspraak:** het Apple Developer-account blijft van Ismael. David wordt als
**Admin** aan het team toegevoegd en doet daarna de teksten, de
schermafbeeldingen, de inzendingen en de updates zelf. Ismael maakt de eerste
build en hoeft er daarna in principe niets meer aan te doen.

**Let op:** de app staat daarmee op naam van Ismaels bedrijf. Die naam komt
als verkoper op de winkelpagina en de inkomsten lopen via die rekening. Later
overzetten naar een eigen account kan via Apple's overdrachtsprocedure, maar
daar gelden voorwaarden voor.

---

## 1. Wat Ismael eenmalig doet

### David toevoegen aan het team

App Store Connect → **Users and Access** → **+** → rol **Admin**, met het
Apple ID van David. Hij krijgt een uitnodiging per mail.

### De app aanmaken

App Store Connect → **Apps** → **+** → **New App**:

| Veld | Waarde |
|---|---|
| Platform | iOS |
| Name | `Mister White` |
| Primary language | English (U.S.) |
| Bundle ID | `online.misterwhite.game` |
| SKU | `misterwhite-game` (vrij te kiezen, alleen intern) |
| User Access | Full Access |

De bundel-id moet exact `online.misterwhite.game` zijn: die zit al in de
Android-build en in het Xcode-project, en hij ligt na publicatie vast.

Staat de id nog niet in het account, maak hem dan eerst aan onder
**Certificates, Identifiers & Profiles → Identifiers**. Geen enkele
capability aanzetten — de app gebruikt er geen.

---

## 2. De build maken

Dit kan alleen op een Mac. Eenmalig:

```bash
git clone https://github.com/<david>/mrwhite.git
cd mrwhite
npm install
npm run build
npx cap sync ios
```

`npm run build` maakt de statische export in `out/`, `cap sync` zet die in het
Xcode-project en haalt de pods op. Daarna:

```bash
open ios/App/App.xcworkspace
```

In Xcode, doel **App**:

1. **Signing & Capabilities** → *Automatically manage signing* aan, en het
   team van Ismael kiezen. Xcode maakt zelf het certificaat en het profiel.
2. **General** → controleer dat *Version* en *Build* kloppen. Voor de eerste
   inzending: version `1.0`, build `1`.
3. Kies als doel **Any iOS Device (arm64)**.
4. **Product → Archive**, en in de Organizer **Distribute App → App Store
   Connect → Upload**.

Na een kwartier staat de build in App Store Connect onder **TestFlight**.
Vanaf dat moment kan David het overnemen.

### Wat er al geregeld is

- Het Xcode-project staat in de repo, inclusief pictogrammen en het
  opstartscherm. Dat hoeft niemand op te zetten.
- `ITSAppUsesNonExemptEncryption` staat op `false` in `Info.plist`. Apple
  vraagt daardoor niet bij elke upload naar exportregels. Dat klopt ook: het
  spel gebruikt geen eigen versleuteling en doet tijdens het spelen geen
  enkel netwerkverzoek.
- Het opstartscherm is lichte versie van het logo, passend bij het thema
  waarin de app opent.

### Wat nog niemand heeft gedaan

**De app is nog nooit op een iPhone gedraaid.** Android is getest, iOS niet:
er staat hier geen Mac. Ga er dus niet van uit dat de eerste build meteen
goed is. Twee dingen om op te letten zodra hij draait:

- Of de inhoud netjes vrij blijft van de notch en de streep onderaan. Op
  Android is dat met de hand geregeld; iOS doet dit via
  `env(safe-area-inset-*)`, wat in de opmaak al gebruikt wordt, maar het is
  niet nagekeken op een echt toestel.
- Of het spel bij het starten op het beginscherm uitkomt en niet wit blijft.

---

## 3. Wat David invult

Alle teksten staan in **`STORE.md`** in de repo, Nederlands en Engels, binnen
de tekenlimieten van Apple.

| Onderdeel | Waar |
|---|---|
| Naam, ondertitel, beschrijving, trefwoorden | `STORE.md` |
| Schermafbeeldingen, 1320 × 2868, 9 stuks per taal | map `screenshots/apple-en/` en `apple-nl/` — **niet in git**, David levert ze |
| Privacybeleid-URL | `https://misterwhite.online/en/privacy/` |
| Ondersteunings-URL | `https://misterwhite.online/en/support/` |
| Leeftijdsvragenlijst | `STORE.md`, kopje *Leeftijd en inhoudsvragenlijst* |
| App Privacy | **Data Not Collected** |

### De leeftijdsvragenlijst

Eén antwoord wijkt af van de rest en dat is bewust: de app bevat een
**Drinking Edition**, dus *Alcohol, Tobacco, or Drug Use or References* gaat
op **Infrequent/Mild**. Al het andere staat op *None*. Verwachte uitkomst is
12+, Apple kan er 17+ van maken. Dat is geen afwijzing en vraagt geen
wijziging aan de app.

Niet opgeven is geen optie: dat is een reden tot verwijdering, en dat is een
veel groter probleem dan een hogere leeftijdsgrens.

### Beoordelingsnotities

Zet dit in het veld **Notes** bij de inzending:

```
The app is a pass-and-play party word game. One device is passed around a
table; there are no accounts, no network requests and no user-generated
content shared between users.

The app includes an optional "Drinking Edition" game mode for adults, which
is why alcohol references are declared in the age rating. The mode is
optional and the standard game does not involve alcohol.

No demo account is needed: everything is reachable from the start screen.
```

---

## 4. Nog open

- **De mailadressen bestaan nog niet.** `support@misterwhite.online` en
  `privacy@misterwhite.online` staan allebei op de site genoemd. Apple
  controleert de ondersteuningspagina, dus dat adres moet werken voordat er
  ingediend wordt.
- **iPad.** Het project bouwt nu voor iPhone. Wil je de app ook op iPad
  aanbieden, dan zijn er aparte schermafbeeldingen nodig (2064 × 2752) en
  moet de opmaak daar nagekeken worden.
- **Liggend scherm.** De `Info.plist` staat liggend toe. Het ontwerp is op
  staand gemaakt en liggend is nooit bekeken. Overweeg het vast te zetten op
  staand voordat je indient.
- **Vijf van de zeven talen zijn niet nagelezen** door iemand die ze spreekt.
  In de winkel staan alleen Nederlands en Engels; de andere talen zitten wel
  in de app.
