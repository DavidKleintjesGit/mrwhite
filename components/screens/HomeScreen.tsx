"use client";

import Press from "@/components/ui/Press";
import Screen from "@/components/ui/Screen";
import Stamp from "@/components/ui/Stamp";
import type { Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Props = {
  dict: Dictionary;
  langCode: string;
  langName: string;
  themeLabel: string;
  themeDot: string;
  onLanguage: () => void;
  onTheme: () => void;
  onPlay: () => void;
  onRules: () => void;
  onSettings: () => void;
};

export default function HomeScreen({
  dict,
  langCode,
  langName,
  themeLabel,
  themeDot,
  onLanguage,
  onTheme,
  onPlay,
  onRules,
  onSettings,
}: Props) {
  const t = dict.home;

  return (
    <Screen
      label="Home"
      duration={0.5}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
        alignContent: "center",
        alignItems: "center",
        gap: "40px clamp(40px,6vw,96px)",
        position: "relative",
      }}
    >
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // The design keeps this on one line, which runs off the right edge
          // of a phone. Wrapping costs nothing on a wide screen, where it
          // still fits on that one line.
          flexWrap: "wrap",
          gap: 12,
          fontSize: 13,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        <span>{t.caseNumber}</span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            gap: 16,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#FF3D3D",
                animation: "blink 1.2s steps(1) infinite",
              }}
            />
            {t.rec}
          </span>

          <Press
            onClick={onLanguage}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: ARCHIVO,
              fontSize: 12,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              background: "var(--bg)",
              color: "var(--fg)",
              border: "3px solid var(--fg)",
              padding: "7px 10px",
              boxShadow: "3px 3px 0 #3DD6FF",
              cursor: "pointer",
            }}
            press={{
              transform: "translate(2px,2px)",
              boxShadow: "1px 1px 0 #3DD6FF",
            }}
          >
            <span
              style={{ background: "#3DD6FF", color: "#0d0d0d", padding: "1px 5px" }}
            >
              {langCode}
            </span>
            {langName}
          </Press>

          <Press
            onClick={onTheme}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: ARCHIVO,
              fontSize: 12,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              background: "var(--bg)",
              color: "var(--fg)",
              border: "3px solid var(--fg)",
              padding: "7px 10px",
              boxShadow: "3px 3px 0 #FFD23F",
              cursor: "pointer",
            }}
            press={{
              transform: "translate(2px,2px)",
              boxShadow: "1px 1px 0 #FFD23F",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                border: "2px solid var(--fg)",
                background: themeDot,
                boxSizing: "border-box",
              }}
            />
            {themeLabel}
          </Press>
        </span>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          textAlign: "left",
        }}
      >
        <Stamp
          fontSize={18}
          rotate={9}
          delay={0.5}
          style={{ position: "absolute", right: 0, top: -14 }}
        >
          {t.stamp}
        </Stamp>

        <h1
          style={{
            margin: 0,
            fontFamily: ARCHIVO,
            fontSize: "clamp(64px, 11vw, 150px)",
            lineHeight: 0.9,
            letterSpacing: "-.02em",
            textTransform: "uppercase",
            animation: "flicker 6s infinite",
          }}
        >
          {t.titleTop}
          <br />
          <span
            style={{
              display: "inline-block",
              background: "#FFD23F",
              color: "#0d0d0d",
              padding: "2px 14px 6px",
              transform: "rotate(-2deg)",
              boxShadow: "6px 6px 0 var(--fg)",
            }}
          >
            {t.titleBottom}
          </span>
        </h1>

        <p
          style={{
            margin: "18px 0 0",
            maxWidth: 440,
            fontSize: "clamp(17px,1.5vw,21px)",
            lineHeight: 1.45,
            textWrap: "pretty",
          }}
        >
          {t.tagline}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Press
          onClick={onPlay}
          style={{
            fontFamily: ARCHIVO,
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: ".04em",
            background: "#FFD23F",
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            padding: 18,
            boxShadow: "6px 6px 0 var(--fg)",
            cursor: "pointer",
            animation: "pulse 2.4s ease-in-out infinite",
            transition: "transform .1s, box-shadow .1s",
          }}
          press={{
            transform: "translate(5px,5px)",
            boxShadow: "1px 1px 0 var(--fg)",
          }}
        >
          {t.play}
        </Press>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          <Press
            onClick={onRules}
            style={{
              fontFamily: ARCHIVO,
              fontSize: 16,
              textTransform: "uppercase",
              background: "var(--bg)",
              color: "var(--fg)",
              border: "3px solid var(--fg)",
              padding: "15px 10px",
              boxShadow: "5px 5px 0 #3DD6FF",
              cursor: "pointer",
              transition: "transform .1s, box-shadow .1s",
            }}
            hover={{ transform: "rotate(-1.5deg)" }}
            press={{
              transform: "translate(4px,4px)",
              boxShadow: "1px 1px 0 #3DD6FF",
            }}
          >
            {t.rules}
          </Press>
          <Press
            onClick={onSettings}
            style={{
              fontFamily: ARCHIVO,
              fontSize: 16,
              textTransform: "uppercase",
              background: "var(--bg)",
              color: "var(--fg)",
              border: "3px solid var(--fg)",
              padding: "15px 10px",
              boxShadow: "5px 5px 0 #FF3D3D",
              cursor: "pointer",
              transition: "transform .1s, box-shadow .1s",
            }}
            hover={{ transform: "rotate(1.5deg)" }}
            press={{
              transform: "translate(4px,4px)",
              boxShadow: "1px 1px 0 #FF3D3D",
            }}
          >
            {t.settings}
          </Press>
        </div>
      </div>
    </Screen>
  );
}
