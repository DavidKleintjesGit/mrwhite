/**
 * The support page, which Apple requires at a public URL before an app may
 * be submitted. Google asks for a contact address in the listing and links
 * here too.
 *
 * Everything below has to stay true of the app, the same as the privacy
 * policy: the game is offline, what it stores is one localStorage entry on
 * that device, and there is no account to recover anything from.
 */
import type { Locale } from "@/lib/i18n";
import type { Doc } from "./doc";

const ADDRESS = "support@misterwhite.online";

const nl: Doc = {
  title: "Hulp en contact",
  updated: "Ondersteuning · Mister White",
  lead:
    "Werkt er iets niet, of mis je iets? Hieronder staan de vragen die het " +
    "vaakst voorbijkomen. Staat je vraag er niet bij, mail dan gerust.",
  sections: [
    {
      heading: "Hoe het spel werkt",
      body: [
        "Iedereen krijgt hetzelfde geheime woord, behalve de infiltranten. De " +
          "undercovers kregen een woord dat er net naast zit, en Mr. White kreeg " +
          "helemaal niets. Om de beurt geef je één hint, daarna stemmen jullie " +
          "wie eruit gaat.",
        "In de app staat de hele uitleg onder de knop Uitleg op het beginscherm.",
      ],
    },
    {
      heading: "De app doet niets meer",
      body: [
        "Sluit hem helemaal af en start hem opnieuw. Het spel draait volledig " +
          "op je toestel en heeft geen internet nodig, dus een haperende " +
          "verbinding kan het niet zijn.",
        "Blijft het misgaan, laat dan weten welk toestel je hebt en bij welk " +
          "scherm het vastloopt. Een schermafbeelding helpt enorm.",
      ],
    },
    {
      heading: "Mijn namen of instellingen zijn weg",
      body: [
        "Namen blijven een week bewaard en vervallen daarna vanzelf, zodat je " +
          "niet met de namen van vorige maand begint.",
        "Alles wordt per toestel opgeslagen en staat nergens anders. Er is geen " +
          "account, dus er valt ook niets te herstellen of over te zetten naar " +
          "een ander toestel. Verwijder je de app, dan is het weg.",
        "Zelf wissen kan ook: dat staat onder Instellingen.",
      ],
    },
    {
      heading: "De Drinking Edition",
      body: [
        "Dat is een tweede manier van spelen, bedoeld voor volwassenen. Je hoeft " +
          "hem niet te gebruiken: het gewone spel staat er los naast.",
        "Alcoholvrij meespelen mag altijd en verandert niets aan het spel.",
      ],
    },
    {
      heading: "Een woord klopt niet, of ik mis er een",
      body: [
        "Laat het weten, dan passen we het aan. Je kunt in de app ook je eigen " +
          "woordparen toevoegen onder Instellingen.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `Mail naar ${ADDRESS}. We proberen binnen een paar werkdagen te reageren.`,
        "Vragen over privacy gaan naar privacy@misterwhite.online; wat de app " +
          "wel en niet opslaat staat in het privacybeleid.",
      ],
    },
  ],
  back: "Terug naar het spel",
};

const en: Doc = {
  title: "Help and contact",
  updated: "Support · Mister White",
  lead:
    "Something not working, or missing? The questions that come up most are " +
    "below. If yours is not there, send an email.",
  sections: [
    {
      heading: "How the game works",
      body: [
        "Everyone gets the same secret word except the infiltrators. The " +
          "undercovers got a word that is slightly off, and Mr. White got " +
          "nothing at all. You each give one clue, then you vote somebody out.",
        "The full explanation is in the app, under How to play on the start " +
          "screen.",
      ],
    },
    {
      heading: "The app has stopped responding",
      body: [
        "Close it completely and open it again. The game runs entirely on your " +
          "device and needs no internet, so a poor connection cannot be the " +
          "cause.",
        "If it keeps happening, tell us which device you have and which screen " +
          "it stops on. A screenshot helps a great deal.",
      ],
    },
    {
      heading: "My names or settings are gone",
      body: [
        "Names are kept for a week and then lapse on their own, so you do not " +
          "start a game with last month's line-up.",
        "Everything is stored on that one device and nowhere else. There is no " +
          "account, so there is nothing to restore and nothing to carry over to " +
          "another device. Delete the app and it is gone.",
        "You can also clear it yourself, under Settings.",
      ],
    },
    {
      heading: "The Drinking Edition",
      body: [
        "It is a second way to play, meant for adults. You do not have to use " +
          "it: the ordinary game stands on its own beside it.",
        "Playing alcohol-free is always fine and changes nothing about the game.",
      ],
    },
    {
      heading: "A word is wrong, or one is missing",
      body: [
        "Let us know and we will fix it. You can also add your own word pairs " +
          "in the app, under Settings.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `Email ${ADDRESS}. We aim to reply within a few working days.`,
        "Privacy questions go to privacy@misterwhite.online; what the app does " +
          "and does not store is set out in the privacy policy.",
      ],
    },
  ],
  back: "Back to the game",
};

export function getSupportDoc(lang: Locale): Doc {
  return lang === "nl" ? nl : en;
}
