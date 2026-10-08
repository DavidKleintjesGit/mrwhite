# Mr. White

A social deduction word game for 3 to 10 people in the same room. One phone gets
passed around — no account, no sign-up, no internet connection needed.

## The game

Everyone gets the same secret word, except the infiltrators.

| Role | Gets | Goal |
|---|---|---|
| **Civilian** | The secret word | Vote out every infiltrator |
| **Undercover** | A word that resembles it (apple ↔ pear) | Survive until the civilians are outnumbered |
| **Mr. White** | Nothing at all | Work out the word from everyone else's clues and bluff along |

Each round, players take turns giving one word or short phrase about their own
word — never the word itself. Then everyone talks it over and votes. Whoever
gets the most votes is out, and their role is revealed.

Civilians win once every infiltrator is gone. Infiltrators win as soon as they
equal the civilians in number. The twist: if Mr. White is voted out, he gets one
guess at the civilians' word — guess right and the infiltrators win anyway.

Whoever gives the first clue is always a civilian. Mr. White has nothing to go on
before anyone has spoken, so opening the round would leave him no chance.

## Languages

English is the source language, with a full Dutch translation. Each language has
its own routes (`/en/play`, `/nl/play`) so both can be indexed, and the language
is picked from the browser on a first visit. Dictionaries live in
`lib/i18n/dictionaries/`; every translation is type-checked against the English
one, so a missing key fails the build instead of rendering blank.

## Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS 4**
- `output: 'export'` — the build produces a plain static site in `out/`

There is no backend and no database. All game logic runs client-side, which is
what keeps the game playable without a connection and what lets the same build
be wrapped as a native app later.

Because of the static export there are no API routes and no server-side
rendering. Anything that needs a server has to live in a separate service.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
npm run lint
```
