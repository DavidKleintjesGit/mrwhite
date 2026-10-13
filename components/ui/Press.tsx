"use client";

import {
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

type Props = {
  /** The resting style, written out exactly as the design has it. */
  style: CSSProperties;
  /** Merged in while the pointer is down — the design's `style-active`. */
  press?: CSSProperties;
  /** Merged in on hover — the design's `style-hover`. */
  hover?: CSSProperties;
  onClick?: () => void;
  /**
   * Meeluisteren met de aanwijzer, naast wat Press er zelf mee doet. De
   * dossiertab gebruikt dit om open te kunnen slepen in plaats van alleen
   * aangetikt te worden.
   */
  onPointerDown?: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerMove?: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerUp?: (event: PointerEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  title?: string;
  /** For the few cases a media query has to reach the button. */
  className?: string;
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
  onPointerDown,
  onPointerMove,
  onPointerUp,
  disabled,
  title,
  className,
  children,
}: Props) {
  const [down, setDown] = useState(false);
  const [over, setOver] = useState(false);

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      title={title}
      onClick={onClick}
      onPointerDown={(event) => {
        setDown(true);
        onPointerDown?.(event);
      }}
      onPointerMove={onPointerMove}
      onPointerUp={(event) => {
        setDown(false);
        onPointerUp?.(event);
      }}
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
