"use client";

import type { CSSProperties, ReactNode } from "react";
import Press from "@/components/ui/Press";

/** The small uppercase label above every block of settings. */
export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 13,
        letterSpacing: ".18em",
        textTransform: "uppercase",
        color: "var(--muted)",
      }}
    >
      {children}
    </div>
  );
}

export function Field({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {children}
    </div>
  );
}

type Option<T> = { value: T; label: string };

/**
 * One bordered box split into equal cells; the chosen cell fills with the
 * accent colour. Used for theme, difficulty and the timer.
 */
export function Segmented<T extends string | number>({
  options,
  value,
  onPick,
  label,
  padding = "12px 4px",
}: {
  options: Option<T>[];
  value: T;
  onPick: (value: T) => void;
  label: string;
  padding?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${options.length}, minmax(0,1fr))`,
        border: "3px solid var(--fg)",
      }}
    >
      {options.map((option) => {
        const on = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onPick(option.value)}
            style={{
              fontFamily: "var(--font-archivo-black), sans-serif",
              fontSize: 13,
              textTransform: "uppercase",
              padding,
              border: "none",
              background: on ? "#FFD23F" : "var(--bg)",
              color: on ? "#0d0d0d" : "var(--fg)",
              cursor: "pointer",
              transition: "background .15s",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/** A card-sized switch with a square knob. */
export function ToggleRow({
  label,
  description,
  on,
  onFlip,
}: {
  label: string;
  description: string;
  on: boolean;
  onFlip: () => void;
}) {
  return (
    <Press
      onClick={onFlip}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        textAlign: "left",
        background: "var(--card)",
        color: "#0d0d0d",
        border: "3px solid #0d0d0d",
        padding: 14,
        boxShadow: "5px 5px 0 var(--line)",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      <span
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <span
          style={{
            fontFamily: "var(--font-archivo-black), sans-serif",
            fontSize: 16,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: 14, lineHeight: 1.35 }}>{description}</span>
      </span>
      <span
        style={{
          flex: "none",
          width: 58,
          height: 32,
          border: "3px solid #0d0d0d",
          background: on ? "#FFD23F" : "#bdb9ae",
          position: "relative",
          boxSizing: "border-box",
          transition: "background .2s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: 3,
            width: 20,
            height: 20,
            background: "#0d0d0d",
            transform: `translateX(${on ? "26px" : "0px"})`,
            transition: "transform .25s cubic-bezier(.3,1.6,.5,1)",
          }}
        />
      </span>
    </Press>
  );
}

/** Label, description and a pair of square steppers on a coloured shadow. */
export function Stepper({
  label,
  description,
  value,
  accent,
  decDisabled,
  incDisabled,
  onDec,
  onInc,
}: {
  label: string;
  description: string;
  value: number;
  accent: string;
  decDisabled: boolean;
  incDisabled: boolean;
  onDec: () => void;
  onInc: () => void;
}) {
  const step: CSSProperties = {
    width: 46,
    height: 46,
    flex: "none",
    background: "#0d0d0d",
    color: "#F3F0E8",
    border: "none",
    fontSize: 24,
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "var(--card)",
        color: "#0d0d0d",
        border: "3px solid #0d0d0d",
        padding: 14,
        boxShadow: `6px 6px 0 ${accent}`,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-archivo-black), sans-serif",
            fontSize: 18,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: 14, lineHeight: 1.3 }}>{description}</span>
      </div>
      <Press
        title={`${label} −`}
        onClick={onDec}
        disabled={decDisabled}
        style={{ ...step, opacity: decDisabled ? 0.3 : 1 }}
        press={{ transform: "scale(.9)" }}
      >
        −
      </Press>
      <span
        style={{
          width: 40,
          textAlign: "center",
          fontFamily: "var(--font-archivo-black), sans-serif",
          fontSize: 30,
        }}
      >
        {value}
      </span>
      <Press
        title={`${label} +`}
        onClick={onInc}
        disabled={incDisabled}
        style={{ ...step, opacity: incDisabled ? 0.3 : 1 }}
        press={{ transform: "scale(.9)" }}
      >
        +
      </Press>
    </div>
  );
}
