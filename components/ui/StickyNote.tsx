import type { ReactNode } from "react";

type Props = {
  rotate: number;
  /** Tilt of the strip of tape at the top. */
  tapeRotate: number;
  maxWidth: number;
  delay?: number;
  className?: string;
  children: ReactNode;
};

/** A yellow note in marker pen, stuck on with a strip of tape. */
export default function StickyNote({
  rotate,
  tapeRotate,
  maxWidth,
  delay = 0,
  className = "",
  children,
}: Props) {
  return (
    <div
      className={`font-marker relative text-ink ${className}`}
      style={{
        maxWidth,
        background: "#f5d90a",
        border: "2px solid #0e0e0e",
        boxShadow: "4px 5px 0 rgba(0,0,0,.35)",
        padding: "14px 14px 10px",
        transform: `rotate(${rotate}deg)`,
        fontSize: 17,
        lineHeight: 1.15,
        animation: `popIn .5s ${delay}s ease-out both`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 h-5 w-14"
        style={{
          top: -11,
          marginLeft: -28,
          background: "rgba(242,239,230,.7)",
          border: "1px solid rgba(14,14,14,.25)",
          transform: `rotate(${tapeRotate}deg)`,
        }}
      />
      {children}
    </div>
  );
}
