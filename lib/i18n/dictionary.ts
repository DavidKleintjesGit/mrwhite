import en from "./dictionaries/en";

/**
 * De vorm waar elke taal zich aan houdt.
 *
 * Die hing aan het Nederlands — `type Dictionary = typeof nl` — waardoor
 * iedere nieuwe taal zich naar het Nederlands moest voegen terwijl Engels de
 * taal is waarin dit spel verkocht wordt. Met twintig talen op komst hoort
 * dat niet aan een toevallige taal te hangen.
 *
 * Engels is nu het model, en dat is ook de taal waar een nieuwe taal van
 * wordt afgeleid en waartegen vertalingen worden nagekeken. Eén taal die
 * duidelijk de maat is, in plaats van twee die er allebei een stukje van
 * waren.
 */
export type Dictionary = typeof en;
