import Link from "next/link";

const MENU = [
  { href: "/spelen", label: "Spelen", nadruk: true },
  { href: "/uitleg", label: "Uitleg", nadruk: false },
  { href: "/instellingen", label: "Instellingen", nadruk: false },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-10 p-6">
      <header className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Mr.<span className="text-accent"> White</span>
        </h1>
        <p className="mt-3 text-muted">
          Iedereen krijgt hetzelfde geheime woord. Behalve de infiltranten.
        </p>
      </header>

      <nav className="flex flex-col gap-3">
        {MENU.map(({ href, label, nadruk }) => (
          <Link
            key={href}
            href={href}
            className={
              nadruk
                ? "rounded-2xl bg-accent px-6 py-5 text-center text-lg font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
                : "rounded-2xl border border-border bg-surface px-6 py-5 text-center text-lg font-semibold transition-colors hover:bg-surface-hover"
            }
          >
            {label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
