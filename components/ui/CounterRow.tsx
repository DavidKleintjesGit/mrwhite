"use client";

import type { ReactNode } from "react";
import Sheet from "@/components/ui/Sheet";

type Props = {
  title: ReactNode;
  description: string;
  value: number;
  minusLabel: string;
  plusLabel: string;
  minusEnabled: boolean;
  plusEnabled: boolean;
  onMinus: () => void;
  onPlus: () => void;
  delay: number;
};

const STEP =
  "font-display h-[46px] w-[46px] flex-none cursor-pointer border-0 bg-ink text-[22px] text-paper";

/**
 * A line on the line-up screen: label, description and a pair of square
 * steppers. Disabled steps dim rather than disappear, so the row does not
 * reflow while you tap.
 */
export default function CounterRow({
  title,
  description,
  value,
  minusLabel,
  plusLabel,
  minusEnabled,
  plusEnabled,
  onMinus,
  onPlus,
  delay,
}: Props) {
  return (
    <Sheet
      className="flex items-center gap-3 p-4"
      style={{ animation: `slideUp .35s ${delay}s ease-out both` }}
    >
      <div className="min-w-0 flex-1">
        <div className="font-display flex items-center gap-2 text-[18px]">
          {title}
        </div>
        <div className="text-[14px] text-[#4a4842] text-pretty">
          {description}
        </div>
      </div>

      <button
        type="button"
        aria-label={minusLabel}
        onClick={onMinus}
        disabled={!minusEnabled}
        className={STEP}
        style={{ opacity: minusEnabled ? 1 : 0.3 }}
      >
        −
      </button>
      <div className="font-display w-11 text-center text-[32px]">{value}</div>
      <button
        type="button"
        aria-label={plusLabel}
        onClick={onPlus}
        disabled={!plusEnabled}
        className={STEP}
        style={{ opacity: plusEnabled ? 1 : 0.3 }}
      >
        +
      </button>
    </Sheet>
  );
}
