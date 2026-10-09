# Mr. White

A social deduction word game for 3 to 20 people in the same room. One phone gets
passed around — no account, no sign-up, no internet connection needed.

## The game

Everyone gets the same secret word, except the infiltrators.

| Role | Gets | Goal |
|---|---|---|
| **Civilian** | The secret word | Vote out every infiltrator |
| **Undercover** | A word that resembles it (apple ↔ pear) — they are not told they are the undercover | Survive until one civilian is left |
| **Mr. White** | Nothing at all | Work out the word from everyone else's clues and bluff along |

Each round, players take turns giving one word or short phrase about their own
word — never the word itself. Then everyone talks it over and votes. Whoever
gets the most votes is out, and their role is revealed.

Civilians win once every infiltrator is gone. Infiltrators win as soon as a
single civilian is left. The twist: if Mr. White is voted out, he gets one
guess at the civilians' word — guess right and he wins on his own.

The app picks who gives the first clue and does not explain how — saying so
would tell the table which role that player cannot have.

## Languages

English is the source language, with a full Dutch translation. Each language has
its own routes (`/en/play`, `/nl/play`) so both can be indexed, and the language
is picked from the browser on a first visit. Dictionaries live in
`lib/i18n/dictionaries/`; every translation is type-checked against the English
one, so a missing key fails the build instead of rendering blank.

## Look

A noir case file: evidence stamps that slam down, a torch that drifts across
the page, a magnifier you hold over your own file to read the word under it,
in a dark night shift and a light day shift. Three faces — Archivo Black,
Courier Prime and Permanent Marker — load through `next/font`, so nothing is
fetched at runtime.

## Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- Plain CSS and inline styles — no utility framework
- `output: 'export'` — the build produces a plain static site in `out/`

There is no backend and no database. All game logic runs client-side, which is
what keeps the game playable without a connection and what lets the same build
be wrapped as a native app later.

Because of the static export there are no API routes and no server-side
rendering. Anything that needs a server has to live in a separate service.

## Development

```bash
npm install
npm run dev     # http://localhost:3100, or http://mrwhite.test via a Herd proxy
npm run build   # static site in out/
npm run lint
npm test        # game rules, run straight from TypeScript by Node
```

## Deploying

The build is a static site, so deploying is copying `out/` to a web root.
`./deploy.sh` runs the tests, builds, and sends the result over SSH as one
tar stream. It takes the target from an SSH host alias rather than an address,
so no server details live in this repo; see the comments in the script for the
one-time web-server setup a new site needs.
