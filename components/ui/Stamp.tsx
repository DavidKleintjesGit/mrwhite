import type { CSSProperties, ReactNode } from "react";

/**
 * The speckled noise that eats away at the ink, so the stamp looks pressed
 * rather than printed. Identical in every stamp in the design.
 */
const NOISE =
  "url(data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27160%27%20height%3D%27160%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%27.9%27%20numOctaves%3D%272%27%20seed%3D%274%27%2F%3E%3CfeColorMatrix%20values%3D%270%200%200%200%200%20%200%200%200%200%200%20%200%200%200%200%200%20%200%200%200%20-1.6%202.4%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27160%27%20height%3D%27160%27%20filter%3D%27url%28%23n%29%27%2F%3E%3C%2Fsvg%3E)";

/** The single-line stamp: a double ring on one line. */
const RING: CSSProperties = {
  display: "inline-block",
  border: "6px double #E8202A",
  borderRadius: 6,
  padding: ".28em .55em .22em",
  whiteSpace: "nowrap",
};

/**
 * v3's two-line stamp: a solid ring with a second one inset by an outline,
 * stacked rather than on one line. The design uses it on the home screen and
 * on a completed challenge.
 */
const STACK: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  padding: "9px 14px 8px",
  border: "4px solid #E8202A",
  borderRadius: 10,
  outline: "2px solid #E8202A",
  outlineOffset: -9,
};

type Props = {
  children: ReactNode;
  fontSize: number | string;
  /** Degrees; the slam animation rotates around this through --r. */
  rotate: number;
  /** Seconds before the slam. Null leaves the stamp sitting there unanimated. */
  delay?: number | null;
  borderWidth?: number;
  background?: string;
  /** Switches from the single-line ring to the stacked two-line stamp. */
  stacked?: boolean;
  style?: CSSProperties;
};

export default function Stamp({
  children,
  fontSize,
  rotate,
  delay = 0,
  borderWidth,
  background = "transparent",
  stacked = false,
  style,
}: Props) {
  return (
    <span
      style={
        {
          "--r": `${rotate}deg`,
          ...(stacked ? STACK : RING),
          fontFamily: "var(--font-archivo-black), sans-serif",
          fontSize,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          lineHeight: 1,
          color: "#E8202A",
          background,
          transform: `rotate(${rotate}deg)`,
          WebkitMaskImage: NOISE,
          maskImage: NOISE,
          WebkitMaskSize: "160px",
          maskSize: "160px",
          pointerEvents: "none",
          ...(borderWidth ? { borderWidth } : null),
          ...(delay === null
            ? null
            : {
                animation: `stampSlam .5s ${delay}s cubic-bezier(.2,1.5,.35,1) both`,
              }),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}
