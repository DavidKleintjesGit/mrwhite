import type { CSSProperties, ReactNode } from "react";
import Press from "@/components/ui/Press";

/**
 * The design's padding, plus whatever the device reserves for its notch and
 * home indicator. On anything without them the insets are zero and the
 * numbers are exactly what the design says.
 */
const TOP = "calc(clamp(24px,4vw,56px) + env(safe-area-inset-top))";
const BOTTOM = "calc(clamp(24px,4vw,56px) + env(safe-area-inset-bottom))";

/** The wide screens; the card, unmask and guess screens use the narrow one. */
const WIDE: CSSProperties = {
  maxWidth: 1240,
  paddingTop: TOP,
  paddingBottom: BOTTOM,
  paddingLeft: "calc(clamp(20px,5vw,72px) + env(safe-area-inset-left))",
  paddingRight: "calc(clamp(20px,5vw,72px) + env(safe-area-inset-right))",
};

const NARROW: CSSProperties = {
  maxWidth: 760,
  paddingTop: TOP,
  paddingBottom: BOTTOM,
  paddingLeft: "calc(clamp(20px,5vw,40px) + env(safe-area-inset-left))",
  paddingRight: "calc(clamp(20px,5vw,40px) + env(safe-area-inset-right))",
};

type Props = {
  label: string;
  narrow?: boolean;
  /** Seconds the screen takes to settle; the home screen is a touch slower. */
  duration?: number;
  style: CSSProperties;
  children: ReactNode;
};

export default function Screen({
  label,
  narrow = false,
  duration = 0.45,
  style,
  children,
}: Props) {
  return (
    <div
      data-screen-label={label}
      style={{
        minHeight: "100vh",
        margin: "0 auto",
        boxSizing: "border-box",
        animation: `screenIn ${duration}s cubic-bezier(.2,1.3,.4,1) both`,
        ...(narrow ? NARROW : WIDE),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Back arrow, small uppercase kicker and the screen title. */
export function Header({
  kicker,
  title,
  backLabel,
  onBack,
}: {
  kicker: string;
  title: string;
  backLabel: string;
  onBack: () => void;
}) {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <Press
        title={backLabel}
        onClick={onBack}
        style={{
          width: 48,
          height: 48,
          flex: "none",
          background: "var(--card)",
          color: "#0d0d0d",
          border: "3px solid #0d0d0d",
          fontSize: 22,
          fontWeight: 700,
          boxShadow: "4px 4px 0 #FFD23F",
          cursor: "pointer",
        }}
        press={{
          transform: "translate(3px,3px)",
          boxShadow: "1px 1px 0 #FFD23F",
        }}
      >
        ←
      </Press>
      <div>
        <div
          style={{
            fontSize: 12,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {kicker}
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-archivo-black), sans-serif",
            fontSize: 30,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

/** The paired secondary / primary buttons pinned to the bottom right. */
export function FooterPair({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        marginTop: "auto",
        width: "100%",
        maxWidth: 620,
        alignSelf: "flex-end",
        justifySelf: "end",
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
        gap: 14,
      }}
    >
      {children}
    </div>
  );
}
