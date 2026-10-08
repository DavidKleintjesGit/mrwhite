import type { CSSProperties, ReactNode } from "react";

type Props = {
  /** Shadow colour; the design uses --soft, --pop or a flat accent. */
  shadow?: string;
  depth?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** A cream card with a hard border and a solid offset shadow. */
export default function Sheet({
  shadow = "var(--soft)",
  depth = 6,
  className = "",
  style,
  children,
}: Props) {
  return (
    <div
      className={`sheet ${className}`}
      style={{ boxShadow: `${depth}px ${depth}px 0 ${shadow}`, ...style }}
    >
      {children}
    </div>
  );
}
