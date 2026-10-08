import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  backLabel: string;
  backHref: string;
  children: ReactNode;
};

export default function Screen({
  title,
  backLabel,
  backHref,
  children,
}: Props) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 p-6">
      <header className="flex items-center gap-3">
        <Link
          href={backHref}
          aria-label={backLabel}
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-border transition-colors hover:bg-surface-hover"
        >
          ←
        </Link>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </header>

      {children}
    </main>
  );
}
