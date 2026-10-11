/**
 * The shape of the plain documents that live beside the game: the privacy
 * policy and the support page.
 *
 * They sit outside the app on purpose. The game is one state machine behind
 * `/[lang]/`, and a page a store links to has to stay reachable whatever
 * state that machine is in, so these are documents with no client code.
 */
export type Doc = {
  title: string;
  /** Rendered under the title in small caps; a date, or what the page is. */
  updated: string;
  lead: string;
  sections: { heading: string; body: string[] }[];
  back: string;
};
