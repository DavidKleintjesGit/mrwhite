"use client";

type Props = {
  label: string;
  toelichting?: string;
  waarde: number;
  min: number;
  max: number;
  onChange: (waarde: number) => void;
};

/**
 * Grote plus/min-knoppen. Bewust geen schuifbalk of invoerveld: dit moet met
 * dikke duimen op een donker feestje werken.
 */
export default function Stepper({
  label,
  toelichting,
  waarde,
  min,
  max,
  onChange,
}: Props) {
  const omlaagKan = waarde > min;
  const omhoogKan = waarde < max;

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-medium">{label}</p>
          {toelichting && (
            <p className="mt-0.5 text-sm text-muted">{toelichting}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label={`${label} verlagen`}
            disabled={!omlaagKan}
            onClick={() => onChange(waarde - 1)}
            className="size-12 rounded-xl border border-border text-2xl leading-none transition-colors enabled:hover:bg-surface-hover disabled:opacity-30"
          >
            −
          </button>

          <span
            aria-live="polite"
            className="w-10 text-center text-2xl font-semibold tabular-nums"
          >
            {waarde}
          </span>

          <button
            type="button"
            aria-label={`${label} verhogen`}
            disabled={!omhoogKan}
            onClick={() => onChange(waarde + 1)}
            className="size-12 rounded-xl border border-border text-2xl leading-none transition-colors enabled:hover:bg-surface-hover disabled:opacity-30"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
