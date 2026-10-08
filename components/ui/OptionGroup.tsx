"use client";

type Option<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  options: Option<T>[];
  value: T;
  onPick: (value: T) => void;
  columns: number;
  label: string;
};

/** Segmented buttons: the chosen one inverts to ink with evidence-yellow type. */
export default function OptionGroup<T extends string | number>({
  options,
  value,
  onPick,
  columns,
  label,
}: Props<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="grid gap-[6px]"
      style={{ gridTemplateColumns: `repeat(${columns},minmax(0,1fr))` }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onPick(option.value)}
            className="font-display h-[42px] cursor-pointer border-2 border-ink p-0 text-[14px]"
            style={{
              background: active ? "#0e0e0e" : "transparent",
              color: active ? "#f5d90a" : "#0e0e0e",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
