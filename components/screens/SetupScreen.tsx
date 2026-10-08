"use client";

import { Stepper } from "@/components/ui/Controls";
import Press from "@/components/ui/Press";
import Screen, { Header } from "@/components/ui/Screen";
import { MAX_PLAYERS, MIN_PLAYERS, cap } from "@/lib/game";
import type { Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Props = {
  dict: Dictionary;
  players: number;
  undercovers: number;
  whites: number;
  onPlayers: (delta: number) => void;
  onUndercovers: (delta: number) => void;
  onWhites: (delta: number) => void;
  onBack: () => void;
  onNext: () => void;
};

export default function SetupScreen({
  dict,
  players,
  undercovers,
  whites,
  onPlayers,
  onUndercovers,
  onWhites,
  onBack,
  onNext,
}: Props) {
  const t = dict.setup;
  const limit = cap(players);
  const atLimit = undercovers + whites >= limit;
  const atMinimum = undercovers + whites <= 1;
  const civilians = players - undercovers - whites;

  // One tile per suspect: civilians in card colour, then cyan, then red.
  const dots = [
    ...Array<string>(civilians).fill("var(--card)"),
    ...Array<string>(undercovers).fill("#3DD6FF"),
    ...Array<string>(whites).fill("#FF3D3D"),
  ];

  return (
    <Screen
      label={t.title}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
        alignContent: "start",
        gap: "28px 36px",
      }}
    >
      <Header
        kicker={t.kicker}
        title={t.title}
        backLabel={dict.common.back}
        onBack={onBack}
      />

      <Stepper
        label={t.players}
        description={t.playersDesc}
        value={players}
        accent="#FFD23F"
        decDisabled={players <= MIN_PLAYERS}
        incDisabled={players >= MAX_PLAYERS}
        onDec={() => onPlayers(-1)}
        onInc={() => onPlayers(1)}
      />
      <Stepper
        label={t.undercovers}
        description={t.undercoversDesc}
        value={undercovers}
        accent="#3DD6FF"
        decDisabled={undercovers <= 0 || atMinimum}
        incDisabled={atLimit}
        onDec={() => onUndercovers(-1)}
        onInc={() => onUndercovers(1)}
      />
      <Stepper
        label={t.whites}
        description={t.whitesDesc}
        value={whites}
        accent="#FF3D3D"
        decDisabled={whites <= 0 || atMinimum}
        incDisabled={atLimit}
        onDec={() => onWhites(-1)}
        onInc={() => onWhites(1)}
      />

      <div
        style={{
          border: "3px dashed var(--fg)",
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {t.distribution}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {dots.map((color, index) => (
            <span
              key={index}
              style={{
                width: 26,
                height: 34,
                background: color,
                border: "2px solid var(--fg)",
                animation: "popIn .35s both",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: 8,
            textAlign: "center",
          }}
        >
          <Tally label={t.civilians} value={civilians} />
          <Tally label={t.undercover} value={undercovers} color="var(--cy)" />
          <Tally label={t.white} value={whites} color="#FF3D3D" />
        </div>
      </div>

      <Press
        onClick={onNext}
        style={{
          marginTop: "auto",
          fontFamily: ARCHIVO,
          fontSize: 19,
          textTransform: "uppercase",
          background: "#FFD23F",
          color: "#0d0d0d",
          border: "3px solid #0d0d0d",
          padding: 17,
          boxShadow: "6px 6px 0 var(--fg)",
          cursor: "pointer",
        }}
        press={{
          transform: "translate(5px,5px)",
          boxShadow: "1px 1px 0 var(--fg)",
        }}
      >
        {t.next}
      </Press>
    </Screen>
  );
}

function Tally({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div>
      <div style={{ fontFamily: ARCHIVO, fontSize: 30, color }}>{value}</div>
      <div style={{ fontSize: 13, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}
