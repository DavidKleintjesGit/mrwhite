import Scherm from "@/components/Scherm";

export default function UitlegPage() {
  return (
    <Scherm titel="Uitleg">
      <div className="flex flex-col gap-6 pb-6">
        <Blok titel="Het idee">
          <p>
            Iedereen krijgt hetzelfde geheime woord — behalve de infiltranten.
            Je weet niet wie wat heeft. Door om de beurt een hint te geven moet
            je eruit zien te vissen wie erbuiten valt, zonder je eigen woord weg
            te geven.
          </p>
        </Blok>

        <Blok titel="De rollen">
          <dl className="flex flex-col gap-3">
            <Rol naam="Burger">
              Krijgt het geheime woord. Moet alle infiltranten eruit stemmen.
            </Rol>
            <Rol naam="Undercover">
              Krijgt een woord dat erop lijkt, bijvoorbeeld appel tegenover
              peer. Moet overleven tot de burgers in de minderheid zijn.
            </Rol>
            <Rol naam="Mr. White">
              Krijgt helemaal geen woord. Moet uit de hints van de anderen zien
              op te maken waar het over gaat, en meebluffen.
            </Rol>
          </dl>
        </Blok>

        <Blok titel="Een ronde">
          <ol className="flex flex-col gap-2">
            <Stap n={1}>
              De telefoon gaat rond. Iedereen zoekt zijn eigen naam op en
              bekijkt zijn woord — zo vaak als nodig, tot de ronde start.
            </Stap>
            <Stap n={2}>
              Om de beurt zegt iedereen één woord of korte zin over zijn woord.
              Niet het woord zelf, en geen hint die al gegeven is.
            </Stap>
            <Stap n={3}>Overleggen. Wie klinkt vaag?</Stap>
            <Stap n={4}>
              Stemmen. Wie de meeste stemmen krijgt ligt eruit, en de app laat
              zien wat die speler was.
            </Stap>
            <Stap n={5}>Herhalen tot een van de partijen gewonnen heeft.</Stap>
          </ol>
        </Blok>

        <Blok titel="Winnen">
          <ul className="flex flex-col gap-2">
            <li>
              <strong className="font-medium">Burgers</strong> winnen zodra alle
              infiltranten weggestemd zijn.
            </li>
            <li>
              <strong className="font-medium">Infiltranten</strong> winnen zodra
              ze met evenveel zijn als de burgers.
            </li>
            <li>
              Wordt <strong className="font-medium">Mr. White</strong>{" "}
              weggestemd, dan krijgt hij één gok naar het woord van de burgers.
              Raadt hij goed, dan winnen de infiltranten alsnog.
            </li>
          </ul>
        </Blok>

        <Blok titel="Goed om te weten">
          <p>
            De speler die begint is altijd een burger. Mr. White heeft bij een
            eerste hint namelijk nog geen enkele informatie, en zou dan geen
            kans maken.
          </p>
        </Blok>
      </div>
    </Scherm>
  );
}

function Blok({
  titel,
  children,
}: {
  titel: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 text-sm font-medium uppercase tracking-wide text-muted">
        {titel}
      </h2>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}

function Rol({ naam, children }: { naam: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <dt className="font-semibold">{naam}</dt>
      <dd className="mt-1 text-muted">{children}</dd>
    </div>
  );
}

function Stap({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface text-sm font-semibold tabular-nums">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}
