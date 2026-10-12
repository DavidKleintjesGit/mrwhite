"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * A link from one document of this app to another.
 *
 * On the web these are plain directory URLs — `/nl/`, `/nl/privacy/` — and
 * stay that way, because they are what people see and share.
 *
 * Inside the native app they cannot be. Capacitor's local server serves
 * `/nl/index.html` but answers a top-level navigation to `/nl/` with an
 * empty document, so the WebView lands on a blank screen and stays there.
 * Verified on an Android emulator: `/en/` gave a document with no `body` at
 * all, `/en/index.html` gave the page.
 *
 * The rewrite happens on click rather than in the href, so the markup that
 * ships is the same everywhere and hydration has nothing to disagree about.
 */
export default function DocLink({
  href,
  style,
  lang,
  hrefLang,
  children,
}: {
  /** A directory path ending in a slash, as the web wants it. */
  href: string;
  style?: CSSProperties;
  lang?: string;
  hrefLang?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      lang={lang}
      hrefLang={hrefLang}
      style={style}
      onClick={(event) => {
        if (!isNativeShell()) return;
        event.preventDefault();
        window.location.assign(nativeHref(href));
      }}
    >
      {children}
    </a>
  );
}

/**
 * Whether we are running inside the native shell.
 *
 * Capacitor serves the app from `https://localhost`, which nothing else
 * here does: the dev server is plain http and the real site has its own
 * domain. Deliberately not `window.Capacitor`, because the bridge is
 * injected by a script tag and the check has to work before that lands.
 */
export function isNativeShell(): boolean {
  if (typeof window === "undefined") return false;
  // The two platforms serve the bundle over different schemes: Android over
  // https, iOS over capacitor:. Checking only for https meant iOS fell
  // through to the web behaviour, asked for the directory URL, got the empty
  // document and sat on a black screen. Both hosts are localhost.
  if (window.location.hostname !== "localhost") return false;
  const scheme = window.location.protocol;
  return scheme === "https:" || scheme === "capacitor:" || scheme === "ionic:";
}

/** The same path, in the form Capacitor's local server will actually serve. */
export function nativeHref(path: string): string {
  return path.endsWith("/") ? `${path}index.html` : path;
}
