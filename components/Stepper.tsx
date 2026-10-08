"use client";

type Props = {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  decreaseLabel: string;
  increaseLabel: string;
  onChange: (value: number) => void;
};

/**
 * Big plus/minus buttons. Deliberately no slider or text field: this has to
 * work with clumsy thumbs at a party in the dark.
 */
export default function Stepper({
  label,
  hint,
  value,
  min,
  max,
  decreaseLabel,
  increaseLabel,
  onChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-medium">{label}</p>
          {hint && <p className="mt-0.5 text-sm text-muted">{hint}</p>}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label={decreaseLabel}
            disabled={value <= min}
            onClick={() => onChange(value - 1)}
            className="size-12 rounded-xl border border-border text-2xl leading-none transition-colors enabled:hover:bg-surface-hover disabled:opacity-30"
          >
            −
          </button>

          <span
            aria-live="polite"
            className="w-10 text-center text-2xl font-semibold tabular-nums"
          >
            {value}
          </span>

          <button
            type="button"
            aria-label={increaseLabel}
            disabled={value >= max}
            onClick={() => onChange(value + 1)}
            className="size-12 rounded-xl border border-border text-2xl leading-none transition-colors enabled:hover:bg-surface-hover disabled:opacity-30"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
