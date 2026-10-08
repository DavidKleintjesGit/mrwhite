import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  /** Either a link back, or a button handled by the caller. */
  backHref?: string;
  onBack?: () => void;
  backLabel: string;
  /** Roomier column for grids; forms stay narrow so fields do not stretch. */
  wide?: boolean;
  children: ReactNode;
};

const BACK_CLASSES =
  "grid size-10 shrink-0 place-items-center rounded-xl border border-border transition-colors hover:bg-surface-hover";

export default function Screen({
  title,
  backHref,
  onBack,
  backLabel,
  wide = false,
  children,
}: Props) {
  return (
    <main
      className={`mx-auto flex w-full flex-1 flex-col gap-6 p-6 sm:p-8 ${
        wide ? "max-w-md sm:max-w-3xl" : "max-w-md sm:max-w-lg"
      }`}
    >
      <header className="flex items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel}
            className={BACK_CLASSES}
          >
            ←
          </button>
        ) : (
          backHref && (
            <Link href={backHref} aria-label={backLabel} className={BACK_CLASSES}>
              ←
            </Link>
          )
        )}
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
      </header>

      {children}
    </main>
  );
}
