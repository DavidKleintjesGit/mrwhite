"use client";

type Props = {
  label: string;
  description: string;
  on: boolean;
  onFlip: () => void;
};

/** A square switch with a hard knob, matching the rest of the ink-on-paper kit. */
export default function Toggle({ label, description, on, onFlip }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onFlip}
      className="flex w-full cursor-pointer items-center gap-[14px] border-0 border-b-2 border-dashed border-[#c9c4b6] bg-transparent py-4 text-left text-ink"
    >
      <div className="min-w-0 flex-1">
        <div className="font-display text-[16px]">{label}</div>
        <div className="font-mono text-[14px] text-[#4a4842]">{description}</div>
      </div>
      <div
        className="relative h-8 w-[60px] flex-none border-[3px] border-ink"
        style={{
          background: on ? "#e8322b" : "#d8d4c8",
          transition: "background .2s",
        }}
      >
        <div
          className="absolute h-[22px] w-[22px] bg-ink"
          style={{
            top: 2,
            left: 2,
            transform: on ? "translateX(28px)" : "translateX(0)",
            transition: "transform .2s cubic-bezier(.3,1.6,.5,1)",
          }}
        />
      </div>
    </button>
  );
}
