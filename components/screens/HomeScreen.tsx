"use client";

import Press from "@/components/ui/Press";
import Screen from "@/components/ui/Screen";
import type { Dictionary } from "@/lib/i18n";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Props = {
  dict: Dictionary;
  langCode: string;
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
        gridTemplateRows: "auto auto 1fr",
        alignItems: "center",
        gap: "32px clamp(40px,6vw,96px)",
        position: "relative",
      }}
    >
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px 20px",
          fontSize: 13,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
          }}
        >
          {t.recNumber}
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginLeft: "auto",
          }}
        >
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
              style={{
                background: "#3DD6FF",
                color: "#0d0d0d",
                padding: "1px 5px",
              }}
            >
              {langCode}
            </span>
            {dict.settings.language}
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
          gap: 20,
          paddingTop: 22,
          marginTop: "clamp(8px, 14vh, 150px)",
          textAlign: "left",
          // Maakt dit blok de maatstaf voor de titel eronder. In vw meten
          // ging mis: dat is het hele venster, terwijl de titel het binnen
          // deze kolom moet redden, en die is smaller door de schermmarges.
          containerType: "inline-size",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: ARCHIVO,
            // Zo groot als past, en geen punt groter. "White" in Archivo
            // Black meet 3,595 keer de lettergrootte plus 28px padding —
            // opgemeten, niet geschat. Met 6px voor de slagschaduw past het
            // in de kolom zolang de lettergrootte onder (100cqw - 34) / 3,6
            // blijft, oftewel 27,8cqw. Hieronder staat 26cqw, wat marge laat
            // voor afrondingen en voor een lettertype dat nog laadt.
            fontSize: "min(280px, calc(26cqw - 10px))",
            lineHeight: 0.9,
            letterSpacing: "-.02em",
            textTransform: "uppercase",
            maxWidth: "100%",
          }}
        >
          <span
            style={{
              display: "inline-block",
              animation: "driftTop 7s ease-in-out infinite",
            }}
          >
            {t.titleTop}
          </span>
          <br />
          <span
            style={{
              display: "inline-block",
              background: "#FFD23F",
              color: "#0d0d0d",
              padding: "2px 14px 6px",
              transform: "rotate(-2deg)",
              boxShadow: "6px 6px 0 var(--fg)",
              // Andere looptijd dan de bovenste regel, zodat ze uit de pas
              // raken en het zweven niet als één blok leest.
              animation: "driftBottom 9s ease-in-out infinite",
            }}
          >
            {t.titleBottom}
          </span>
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          alignSelf: "end",
        }}
      >
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
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
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
