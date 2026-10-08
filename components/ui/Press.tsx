"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  /** The resting style, written out exactly as the design has it. */
  style: CSSProperties;
  /** Merged in while the pointer is down — the design's `style-active`. */
  press?: CSSProperties;
  /** Merged in on hover — the design's `style-hover`. */
  hover?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  children: ReactNode;
};

/**
 * Every button in this design sits on a solid offset shadow and drops into it
 * when pressed. The design expresses that as `style-active`; pointer state is
 * tracked here instead of using :active, so the press reads the same under a
 * finger and under a mouse.
 */
export default function Press({
  style,
  press,
  hover,
  onClick,
  disabled,
  title,
  children,
}: Props) {
  const [down, setDown] = useState(false);
  const [over, setOver] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      title={title}
      onClick={onClick}
      onPointerDown={() => setDown(true)}
      onPointerUp={() => setDown(false)}
      onPointerCancel={() => setDown(false)}
      onPointerEnter={() => setOver(true)}
      onPointerLeave={() => {
        setDown(false);
        setOver(false);
      }}
      style={{
        ...style,
        ...(over && !down ? hover : null),
        ...(down ? press : null),
      }}
    >
      {children}
    </button>
  );
}
