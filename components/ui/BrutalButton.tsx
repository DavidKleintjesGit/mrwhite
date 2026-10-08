"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useState } from "react";

type Variant = "primary" | "outline" | "ink";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  /** Overrides the default shadow colour per variant. */
  shadow?: string;
  /** Shadow depth in pixels; the press state halves it. */
  depth?: number;
  children: ReactNode;
};

const BASE: Record<Variant, string> = {
  primary: "bg-blood text-ink border-[3px] border-ink",
  outline: "bg-[var(--bg)] text-fg border-[3px] border-[var(--fg)]",
  ink: "bg-ink text-paper border-0",
};

const SHADOW: Record<Variant, string> = {
  primary: "var(--pop)",
  outline: "#f5d90a",
  ink: "transparent",
};

/**
 * The one button in this design: a hard box that shifts into its own shadow
 * when pressed. Pointer state is tracked rather than using :active so the
 * press reads the same on a phone and with a mouse.
 */
export default function BrutalButton({
  variant = "primary",
  shadow,
  depth = 6,
  className = "",
  children,
  style,
  ...rest
}: Props) {
  const [pressed, setPressed] = useState(false);
  const colour = shadow ?? SHADOW[variant];
  const offset = pressed ? Math.max(depth - 4, 1) : depth;

  return (
    <button
      type="button"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      className={`pressable font-display tracking-[.06em] ${BASE[variant]} ${className}`}
      style={{
        boxShadow: variant === "ink" ? undefined : `${offset}px ${offset}px 0 ${colour}`,
        transform: pressed && variant !== "ink" ? "translate(4px,4px)" : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
