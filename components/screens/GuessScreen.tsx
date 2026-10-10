"use client";

import { useState } from "react";
import Press from "@/components/ui/Press";
import Screen from "@/components/ui/Screen";
import { isCivilianWord, normaliseGuess, type WordPair } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Props = {
  dict: Dictionary;
  name: string;
  pair: WordPair;
  onWin: () => void;
  onMiss: () => void;
};

export default function GuessScreen({
  dict,
  name,
  pair,
  onWin,
  onMiss,
}: Props) {
  const t = dict.guess;
  const [guess, setGuess] = useState("");
  const [wrong, setWrong] = useState(false);

  function submit() {
    if (!normaliseGuess(guess)) return;
    if (isCivilianWord(pair, guess)) onWin();
    else setWrong(true);
  }

  return (
    <Screen
      label={t.lastChance}
      narrow
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-permanent-marker), cursive",
          fontSize: 22,
          color: "#FF3D3D",
          transform: "rotate(-3deg)",
        }}
      >
        {t.lastChance}
      </div>

      <h2
        style={{
          margin: 0,
          fontFamily: ARCHIVO,
          fontSize: "clamp(34px, 10vw, 48px)",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        {format(t.title, { name })}
      </h2>

      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.45 }}>{t.sub}</p>

      {wrong ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 18,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontFamily: ARCHIVO,
              fontSize: 40,
              textTransform: "uppercase",
              background: "var(--card)",
              color: "#0d0d0d",
              padding: "8px 18px",
              border: "4px solid #0d0d0d",
              boxShadow: "6px 6px 0 #FF3D3D",
              animation: "stampIn .5s both",
            }}
          >
            {t.miss}
          </div>
          <p style={{ margin: 0, fontSize: 17 }}>
            {format(t.missSub, { guess })}
          </p>
          <Press
            onClick={onMiss}
            style={{
              marginTop: "auto",
              width: "100%",
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
        </div>
      ) : (
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}
        >
          <input
            value={guess}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            autoComplete="off"
            autoFocus
            onChange={(event) => setGuess(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && submit()}
            style={{
              fontFamily: ARCHIVO,
              fontSize: 24,
              textTransform: "uppercase",
              padding: 16,
              background: "var(--card)",
              color: "#0d0d0d",
              border: "3px solid #0d0d0d",
              boxShadow: "6px 6px 0 #FF3D3D",
              outline: "none",
            }}
          />
          <Press
            onClick={submit}
            style={{
              marginTop: "auto",
              fontFamily: ARCHIVO,
              fontSize: 19,
              textTransform: "uppercase",
              background: "#FF3D3D",
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
            {t.submit}
          </Press>
        </div>
      )}
    </Screen>
  );
}
