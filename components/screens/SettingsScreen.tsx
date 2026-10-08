"use client";

import { useState } from "react";
import { Field, FieldLabel, Segmented, ToggleRow } from "@/components/ui/Controls";
import Press from "@/components/ui/Press";
import Screen, { Header } from "@/components/ui/Screen";
import type { Difficulty } from "@/lib/game";
import { format, type Dictionary } from "@/lib/i18n";
import type { Settings, Theme } from "@/lib/settings";
import { CATEGORY_IDS } from "@/lib/words";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

type Props = {
  dict: Dictionary;
  settings: Settings;
  update: (change: Partial<Settings>) => void;
  langCode: string;
  langName: string;
  onBack: () => void;
  onOpenCategories: () => void;
  onOpenLanguage: () => void;
};

export default function SettingsScreen({
  dict,
  settings,
  update,
  langCode,
  langName,
  onBack,
  onOpenCategories,
  onOpenLanguage,
}: Props) {
  const t = dict.settings;
  const [draft, setDraft] = useState({ a: "", b: "" });

  const buckets = [...CATEGORY_IDS, ...(settings.custom.length ? ["eigen"] : [])];
  const on = buckets.filter((id) => settings.cats[id]);
  const summaryTitle =
    on.length === buckets.length
      ? format(t.allCategories, { total: buckets.length })
      : format(t.someCategories, { on: on.length, total: buckets.length });
  const summaryList = on.length
    ? on.map((id) => dict.categories[id as keyof typeof dict.categories]).join(", ")
    : t.noneChosen;

  const help = {
    makkelijk: t.diffHelpEasy,
    mix: t.diffHelpMix,
    moeilijk: t.diffHelpHard,
  }[settings.diff];

  function addCustom() {
    const a = draft.a.trim();
    const b = draft.b.trim();
    if (!a || !b) return;
    setDraft({ a: "", b: "" });
    update({
      custom: settings.custom.concat([{ a, b }]),
      cats: { ...settings.cats, eigen: true },
    });
  }

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

      <Field>
        <FieldLabel>{t.categories}</FieldLabel>
        <Press
          onClick={onOpenCategories}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            textAlign: "left",
            background: "var(--card)",
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            padding: 14,
            boxShadow: "5px 5px 0 #FFD23F",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "transform .12s",
          }}
          hover={{ transform: "rotate(-.6deg)" }}
          press={{
            transform: "translate(4px,4px)",
            boxShadow: "1px 1px 0 #FFD23F",
          }}
        >
          <span
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: ARCHIVO,
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              {summaryTitle}
            </span>
            <span
              style={{
                fontSize: 14,
                lineHeight: 1.35,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {summaryList}
            </span>
          </span>
          <span
            style={{
              flex: "none",
              fontFamily: ARCHIVO,
              fontSize: 13,
              textTransform: "uppercase",
              background: "#0d0d0d",
              color: "#FFD23F",
              padding: "8px 12px",
            }}
          >
            {t.pick}
          </span>
        </Press>
      </Field>

      <Field>
        <FieldLabel>{t.display}</FieldLabel>
        <Segmented<Theme>
          label={t.display}
          value={settings.theme}
          onPick={(theme) => update({ theme })}
          options={[
            { value: "donker", label: t.themeDark },
            { value: "licht", label: t.themeLight },
          ]}
        />
      </Field>

      <Field>
        <FieldLabel>{t.difficulty}</FieldLabel>
        <Segmented<Difficulty>
          label={t.difficulty}
          value={settings.diff}
          onPick={(diff) => update({ diff })}
          options={[
            { value: "makkelijk", label: t.diffEasy },
            { value: "mix", label: t.diffMix },
            { value: "moeilijk", label: t.diffHard },
          ]}
        />
        <div style={{ fontSize: 14, color: "var(--muted)" }}>{help}</div>
      </Field>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr)",
          gap: 14,
        }}
      >
        <Field>
          <FieldLabel>{t.language}</FieldLabel>
          <Press
            onClick={onOpenLanguage}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textAlign: "left",
              fontFamily: "inherit",
              background: "var(--bg)",
              color: "var(--fg)",
              border: "3px solid var(--fg)",
              padding: "9px 10px",
              cursor: "pointer",
              boxShadow: "4px 4px 0 #3DD6FF",
            }}
            press={{
              transform: "translate(3px,3px)",
              boxShadow: "1px 1px 0 #3DD6FF",
            }}
          >
            <span
              style={{
                flex: "none",
                fontFamily: ARCHIVO,
                fontSize: 13,
                background: "#3DD6FF",
                color: "#0d0d0d",
                padding: "3px 6px",
              }}
            >
              {langCode}
            </span>
            <span
              style={{
                flex: 1,
                minWidth: 0,
                fontWeight: 700,
                fontSize: 14,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {langName}
            </span>
            <span style={{ flex: "none", fontWeight: 700 }}>→</span>
          </Press>
        </Field>

        <Field>
          <FieldLabel>{t.timer}</FieldLabel>
          <Segmented<number>
            label={t.timer}
            value={settings.timer}
            onPick={(timer) => update({ timer })}
            padding="12px 2px"
            options={[
              { value: 0, label: t.timerOff },
              { value: 15, label: "15s" },
              { value: 30, label: "30s" },
              { value: 60, label: "60s" },
            ]}
          />
        </Field>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ToggleRow
          label={t.mrGuessLabel}
          description={t.mrGuessDesc}
          on={settings.mrGuess}
          onFlip={() => update({ mrGuess: !settings.mrGuess })}
        />
        <ToggleRow
          label={t.mrNotFirstLabel}
          description={t.mrNotFirstDesc}
          on={settings.mrNotFirst}
          onFlip={() => update({ mrNotFirst: !settings.mrNotFirst })}
        />
      </div>

      <Field>
        <FieldLabel>{t.customWords}</FieldLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) auto",
            gap: 8,
          }}
        >
          <input
            value={draft.a}
            placeholder={t.customA}
            aria-label={t.customA}
            onChange={(event) => setDraft({ ...draft, a: event.target.value })}
            style={{
              minWidth: 0,
              fontFamily: "inherit",
              fontSize: 16,
              padding: 12,
              background: "var(--bg)",
              color: "var(--fg)",
              border: "3px solid var(--fg)",
              outline: "none",
            }}
          />
          <input
            value={draft.b}
            placeholder={t.customB}
            aria-label={t.customB}
            onChange={(event) => setDraft({ ...draft, b: event.target.value })}
            style={{
              minWidth: 0,
              fontFamily: "inherit",
              fontSize: 16,
              padding: 12,
              background: "var(--bg)",
              color: "var(--fg)",
              border: "3px solid var(--fg)",
              outline: "none",
            }}
          />
          <Press
            onClick={addCustom}
            title={t.customAdd}
            style={{
              width: 50,
              fontFamily: ARCHIVO,
              fontSize: 24,
              background: "#FFD23F",
              color: "#0d0d0d",
              border: "3px solid #0d0d0d",
              boxShadow: "4px 4px 0 var(--fg)",
              cursor: "pointer",
            }}
            press={{
              transform: "translate(3px,3px)",
              boxShadow: "1px 1px 0 var(--fg)",
            }}
          >
            +
          </Press>
        </div>

        {settings.custom.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {settings.custom.map((entry, index) => (
              <span
                key={`${entry.a}-${entry.b}-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  border: "2px dashed var(--fg)",
                  padding: "6px 6px 6px 12px",
                  fontSize: 15,
                }}
              >
                {entry.a} <span style={{ color: "var(--muted)" }}>/</span>{" "}
                {entry.b}
                <button
                  type="button"
                  aria-label={format(t.customRemove, entry)}
                  onClick={() =>
                    update({
                      custom: settings.custom.filter((_, i) => i !== index),
                    })
                  }
                  style={{
                    width: 28,
                    height: 28,
                    background: "#FF3D3D",
                    color: "#0d0d0d",
                    border: "2px solid #0d0d0d",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 14, color: "var(--muted)" }}>
            {t.customEmpty}
          </div>
        )}
      </Field>

      <Press
        onClick={onBack}
        style={{
          gridColumn: "1 / -1",
          justifySelf: "end",
          width: "100%",
          maxWidth: 380,
          marginTop: "auto",
          fontFamily: ARCHIVO,
          fontSize: 20,
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
        {t.save}
      </Press>
    </Screen>
  );
}
