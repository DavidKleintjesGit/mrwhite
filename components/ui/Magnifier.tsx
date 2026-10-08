import type { CSSProperties } from "react";

type Props = {
  /**
   * "lens" is the yellow-lit glass on the card back; "outline" is the plain
   * ring that scans across the unmasking screen.
   */
  variant: "lens" | "outline";
  style?: CSSProperties;
};

/** The magnifying glass: a thick ring with a handle at the bottom right. */
export default function Magnifier({ variant, style }: Props) {
  const lens = variant === "lens";

  return (
    <div
      aria-hidden="true"
      style={{ position: "relative", width: 120, height: 150, ...style }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: `10px solid ${lens ? "#0d0d0d" : "var(--fg)"}`,
          boxSizing: "border-box",
          ...(lens
            ? {
                background:
                  "radial-gradient(circle at 35% 30%, rgba(255,210,63,.9) 0%, rgba(255,210,63,.35) 55%, rgba(255,210,63,0) 75%)",
              }
            : { boxShadow: "5px 5px 0 #FFD23F" }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 86,
          width: 20,
          height: 62,
          background: lens ? "#0d0d0d" : "var(--fg)",
          borderRadius: 5,
          transform: "rotate(-45deg)",
          transformOrigin: "50% 0",
        }}
      />
    </div>
  );
}
