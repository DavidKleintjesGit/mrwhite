type Props = {
  /** Diameter of the lens in pixels; the handle scales with it. */
  size: number;
  /** Lens rim colour. The reveal cover uses paper, the rest uses --fg. */
  rim?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * The magnifying glass: a thick ring with an inset highlight and a red
 * handle. Used at three sizes — sweeping across the logo, wobbling on the
 * confidential cover, and spinning while the game picks who starts.
 */
export default function Magnifier({
  size,
  rim = "var(--fg)",
  className = "",
  style,
}: Props) {
  const ring = Math.round(size * 0.73);
  const border = Math.round(size * 0.08);
  const handleW = Math.round(size * 0.16);
  const handleH = Math.round(size * 0.43);
  const inset = Math.round(size * 0.08);

  return (
    <div
      aria-hidden="true"
      className={`relative ${className}`}
      style={{ width: size, height: Math.round(size * 1.05), ...style }}
    >
      <div
        className="absolute left-0 top-0 rounded-full"
        style={{
          width: ring,
          height: ring,
          border: `${border}px solid ${rim}`,
          background: "rgba(245,217,10,.18)",
          boxShadow: `inset ${inset}px ${inset}px 0 rgba(255,255,255,.25),0 0 0 3px #0e0e0e`,
        }}
      />
      <div
        className="absolute rounded"
        style={{
          left: Math.round(size * 0.6),
          top: Math.round(size * 0.6),
          width: handleW,
          height: handleH,
          background: "#e8322b",
          border: "3px solid #0e0e0e",
          transform: "rotate(-45deg)",
          transformOrigin: "top center",
        }}
      />
    </div>
  );
}
