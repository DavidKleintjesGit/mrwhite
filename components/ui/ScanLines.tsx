type Props = {
  /** Distance between rules, in pixels. */
  spacing?: number;
  opacity?: number;
};

/** The faint ruling that makes a card read as a typed report. */
export default function ScanLines({ spacing = 38, opacity = 0.12 }: Props) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        backgroundImage: `repeating-linear-gradient(to bottom,transparent 0 ${spacing}px,rgba(14,14,14,${opacity}) ${spacing}px ${spacing + 2}px)`,
      }}
    />
  );
}
