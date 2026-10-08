import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { home } = getDictionary(lang);

  const menu = [
    { href: `/${lang}/play`, label: home.play, primary: true },
    { href: `/${lang}/rules`, label: home.rules, primary: false },
    { href: `/${lang}/settings`, label: home.settings, primary: false },
  ];

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-10 p-6">
      <header className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Mr.<span className="text-accent"> White</span>
        </h1>
        <p className="mt-3 text-muted">{home.tagline}</p>
      </header>

      <nav className="flex flex-col gap-3">
        {menu.map(({ href, label, primary }) => (
          <Link
            key={href}
            href={href}
            className={
              primary
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
