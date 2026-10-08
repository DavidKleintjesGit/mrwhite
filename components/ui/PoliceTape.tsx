type Props = {
  text: string;
  /** Degrees of tilt; the two bands on the home screen lean opposite ways. */
  rotate: number;
  top: number;
  height: number;
  fontSize: number;
  /** Seconds for one full pass. */
  duration: number;
  reverse?: boolean;
  opacity?: number;
};

/** Enough repeats to fill any screen twice, so the marquee loop is seamless. */
const SEGMENTS = 16;

export default function PoliceTape({
  text,
  rotate,
  top,
  height,
  fontSize,
  duration,
  reverse = false,
  opacity = 1,
}: Props) {
  const hatch = Math.round(fontSize * 2.2);

  return (
    <div
      aria-hidden="true"
      className="absolute left-0 right-0 overflow-hidden"
      style={{
        top,
        height,
        opacity,
        transform: `rotate(${rotate}deg)`,
        background: "#f5d90a",
        borderTop: "4px solid #0e0e0e",
        borderBottom: "4px solid #0e0e0e",
        boxShadow: "0 8px 0 rgba(0,0,0,.35)",
      }}
    >
      <div
        className="flex h-full w-max"
        style={{
          animation: `marquee ${duration}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {Array.from({ length: SEGMENTS }, (_, index) => (
          <div
            key={index}
            className="flex h-full items-center"
            style={{ gap: fontSize, paddingRight: fontSize }}
          >
            <div
              className="font-display whitespace-nowrap text-ink"
              style={{ fontSize, letterSpacing: ".14em" }}
            >
              {text}
            </div>
            <div
              className="h-full"
              style={{
                width: hatch,
                background: `repeating-linear-gradient(${reverse ? 45 : -45}deg,#0e0e0e 0 ${Math.round(fontSize * 0.35)}px,transparent ${Math.round(fontSize * 0.35)}px ${Math.round(fontSize * 0.7)}px)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
