import Scherm from "@/components/Scherm";

/**
 * Nog leeg: alles wat hier hoort (thema's, moeilijkheid, geluid) bestaat nog
 * niet. Zie FASEN.md. Liever een eerlijk leeg scherm dan nepschakelaars.
 */
export default function InstellingenPage() {
  return (
    <Scherm titel="Instellingen">
      <p className="text-muted">
        Hier valt nog niets in te stellen. Het aantal spelers, undercovers en
        Mr. Whites kies je per spel bij <strong>Spelen</strong>.
      </p>

      <section className="rounded-2xl border border-border bg-surface p-4">
        <h2 className="text-sm font-medium text-muted">Wat hier komt</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          <li>Thema kiezen, of alles door elkaar</li>
          <li>Moeilijkheid van de woordparen</li>
          <li>Geluid aan of uit</li>
        </ul>
      </section>
    </Scherm>
  );
}
