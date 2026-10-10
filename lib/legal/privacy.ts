/**
 * The privacy policy, as a small document the page renders.
 *
 * Both stores demand a policy on a public URL, so this is a page on the site
 * rather than a screen in the game. Keep it in step with what the app does:
 * every claim below was true when written and is checkable.
 *
 *   - Nothing leaves the device. The export carries its own fonts, so even
 *     those are not fetched from anywhere (`next/font` inlines them at build
 *     time); a round played from the Android bundle made no external request.
 *   - The only thing stored is one localStorage entry, `mrwhite-noir-v1`,
 *     holding the language, the settings and a game in progress.
 *
 * Only verified languages get a page, so Dutch and English are enough; any
 * other locale falls back to English rather than showing a blank document.
 */
import type { Locale } from "@/lib/i18n";

export type PrivacyDoc = {
  title: string;
  /** Rendered under the title; both languages must name the same date. */
  updated: string;
  lead: string;
  sections: { heading: string; body: string[] }[];
  back: string;
};

const nl: PrivacyDoc = {
  title: "Privacybeleid",
  updated: "Laatst bijgewerkt: 10 oktober 2026",
  lead:
    "Mister White verzamelt niets over je. Geen account, geen advertenties, geen " +
    "statistieken, geen trackers. Hieronder staat precies wat dat betekent.",
  sections: [
    {
      heading: "Welke gegevens we verzamelen",
      body: [
        "Geen. De app vraagt niet om je naam, e-mailadres, telefoonnummer of " +
          "locatie, en er is niets om een account mee aan te maken.",
        "De namen die je bij het opzetten van een potje invult, zijn de " +
          "bijnamen van de spelers aan tafel. Die blijven op het toestel en " +
          "worden nergens naartoe gestuurd.",
      ],
    },
    {
      heading: "Wat er op je toestel blijft staan",
      body: [
        "Het spel bewaart één ding in de opslag van je toestel: je gekozen " +
          "taal, je instellingen en een potje dat nog bezig is. Daardoor kun " +
          "je de app sluiten of de pagina verversen zonder je spel kwijt te " +
          "raken. Een onafgemaakt potje vervalt vanzelf na zes uur.",
        "Die gegevens staan alleen op jouw toestel. Wij kunnen er niet bij. " +
          "Je wist ze door de app te verwijderen, of in de browser door de " +
          "sitegegevens te wissen.",
      ],
    },
    {
      heading: "Internetverbinding",
      body: [
        "Het spel werkt volledig offline. Alles wat het nodig heeft — de " +
          "woorden, de vertalingen, de lettertypen — zit in de app zelf. " +
          "Tijdens het spelen worden geen verzoeken naar servers gedaan, ook " +
          "niet naar die van ons.",
      ],
    },
    {
      heading: "De website",
      body: [
        "Deze site gebruikt geen cookies, geen bezoekersstatistieken en geen " +
          "trackers van derden. Zoals elke webserver kan de onze technische " +
          "gegevens zoals een IP-adres kortstondig verwerken om de pagina uit " +
          "te leveren en de server te beveiligen. Daar bouwen we geen " +
          "profielen mee op en we koppelen het niet aan personen.",
      ],
    },
    {
      heading: "De App Store en Google Play",
      body: [
        "Download je de app via Apple of Google, dan verzamelen zij zelf " +
          "gegevens over die download, volgens hun eigen privacybeleid. Daar " +
          "hebben wij geen invloed op, en wij zien er niets van behalve " +
          "geanonimiseerde aantallen.",
      ],
    },
    {
      heading: "Kinderen",
      body: [
        "Het spel is geschikt voor kinderen. Omdat we van niemand gegevens " +
          "verzamelen, verzamelen we ze ook niet van kinderen.",
      ],
    },
    {
      heading: "Je rechten",
      body: [
        "De AVG geeft je het recht om je gegevens in te zien, te corrigeren " +
          "of te laten verwijderen. Omdat wij niets van je bewaren, is er " +
          "niets in te zien en niets te verwijderen — behalve wat op je eigen " +
          "toestel staat, en dat heb je zelf in de hand.",
      ],
    },
    {
      heading: "Wijzigingen",
      body: [
        "Verandert er iets aan wat de app doet, dan verandert deze tekst mee " +
          "en schuift de datum bovenaan op. Gaan we ooit wél gegevens " +
          "verwerken, bijvoorbeeld voor aankopen in de app, dan staat dat " +
          "hier voordat het zover is.",
      ],
    },
    {
      heading: "Contact",
      body: [
        "Vragen over dit beleid kun je stellen via privacy@misterwhite.online.",
      ],
    },
  ],
  back: "Terug naar het spel",
};

const en: PrivacyDoc = {
  title: "Privacy policy",
  updated: "Last updated: 10 October 2026",
  lead:
    "Mister White collects nothing about you. No account, no adverts, no " +
    "analytics, no trackers. Here is exactly what that means.",
  sections: [
    {
      heading: "What we collect",
      body: [
        "Nothing. The app never asks for your name, email address, phone " +
          "number or location, and there is no account to create.",
        "The names you type when setting up a game are the nicknames of the " +
          "players at the table. They stay on the device and are never sent " +
          "anywhere.",
      ],
    },
    {
      heading: "What stays on your device",
      body: [
        "The game keeps one thing in your device's storage: your chosen " +
          "language, your settings, and a game still in progress. That is " +
          "what lets you close the app or refresh the page without losing " +
          "your round. An unfinished game expires by itself after six hours.",
        "That data sits on your device only. We cannot reach it. You can " +
          "erase it by deleting the app, or in a browser by clearing the " +
          "site's data.",
      ],
    },
    {
      heading: "Internet access",
      body: [
        "The game works entirely offline. Everything it needs — the words, " +
          "the translations, the fonts — ships inside the app. While you " +
          "play it makes no requests to any server, including ours.",
      ],
    },
    {
      heading: "The website",
      body: [
        "This site uses no cookies, no visitor analytics and no third-party " +
          "trackers. Like any web server, ours may briefly process technical " +
          "data such as an IP address in order to deliver the page and keep " +
          "the server secure. We build no profiles from it and do not link " +
          "it to individuals.",
      ],
    },
    {
      heading: "The App Store and Google Play",
      body: [
        "If you download the app through Apple or Google, they collect their " +
          "own data about that download under their own privacy policies. We " +
          "have no say in that, and see nothing from it beyond anonymised " +
          "totals.",
      ],
    },
    {
      heading: "Children",
      body: [
        "The game is suitable for children. Since we collect no data from " +
          "anyone, we collect none from children either.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Under the GDPR you have the right to see, correct or erase your " +
          "data. Because we hold nothing about you, there is nothing to show " +
          "and nothing to erase — other than what sits on your own device, " +
          "which is yours to control.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "If what the app does changes, this text changes with it and the " +
          "date above moves. Should we ever process data, for in-app " +
          "purchases for instance, it will be described here before that " +
          "happens.",
      ],
    },
    {
      heading: "Contact",
      body: ["Questions about this policy go to privacy@misterwhite.online."],
    },
  ],
  back: "Back to the game",
};

const DOCS: Partial<Record<Locale, PrivacyDoc>> = { nl, en };

/** Falls back to English: a readable policy beats an empty page. */
export function getPrivacyDoc(locale: Locale): PrivacyDoc {
  return DOCS[locale] ?? en;
}
