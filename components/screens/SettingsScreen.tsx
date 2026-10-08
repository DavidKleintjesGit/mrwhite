"use client";

import Link from "next/link";
import { useState } from "react";
import OptionGroup from "@/components/ui/OptionGroup";
import ScreenHeader from "@/components/ui/ScreenHeader";
import Toggle from "@/components/ui/Toggle";
import { useSettings } from "@/components/game/useSettings";
import { format, type Dictionary, type Locale } from "@/lib/i18n";
import {
  DIFFICULTY_CHOICES,
  TIMER_CHOICES,
  type Settings,
} from "@/lib/settings";
import { applyTheme, readTheme, type Theme } from "@/lib/theme";
import { CATEGORIES, countPairs, type CategoryId } from "@/lib/words";

type Props = {
  dict: Dictionary;
  lang: Locale;
};

type Tab = 0 | 1 | 2;

const SECTION = "flex flex-col gap-[10px] border-b-2 border-dashed border-[#c9c4b6] py-[18px]";
const HEADING = "font-display text-[16px]";
const SUB = "-mt-[6px] text-[14px] text-[#4a4842]";

export default function SettingsScreen({ dict, lang }: Props) {
  const t = dict.settings;
  const [settings, update] = useSettings(lang);
  const [tab, setTab] = useState<Tab>(0);
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document === "undefined" ? "dark" : readTheme(),
  );
  const [draft, setDraft] = useState({ a: "", b: "" });

  const pairs = countPairs(
    settings.categories,
    settings.difficulty,
    settings.custom,
  );

  function toggleCategory(id: CategoryId) {
    const on = settings.categories.includes(id);
    update({
      categories: on
        ? settings.categories.filter((category) => category !== id)
        : [...settings.categories, id],
    });
  }

  function addCustom() {
    if (!draft.a.trim() || !draft.b.trim()) return;
    update({
      custom: [...settings.custom, { a: draft.a.trim(), b: draft.b.trim() }],
    });
    setDraft({ a: "", b: "" });
  }

  function pickTheme(next: Theme) {
    applyTheme(next);
    setTheme(next);
  }

  return (
    <div className="flex flex-1 flex-col gap-[22px]">
      <ScreenHeader
        kicker={t.kicker}
        title={t.title}
        backHref={`/${lang}`}
        backLabel={dict.common.back}
      />

      <div
        className="flex flex-col"
        style={{ animation: "slideUp .35s .05s ease-out both" }}
      >
        {/* File tabs: the active one is taller and sits above the folder. */}
        <div className="grid grid-cols-3 items-end gap-[6px] px-[6px]">
          {t.tabs.map((label, index) => {
            const active = tab === index;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setTab(index as Tab)}
                className="font-display relative flex cursor-pointer flex-col items-center justify-center gap-px border-[3px] border-b-0 border-ink text-[13px] text-ink"
                style={{
                  height: active ? 56 : 46,
                  background: active ? "var(--card)" : "#bdb7a6",
                  borderRadius: "8px 8px 0 0",
                  marginBottom: -3,
                  zIndex: active ? 2 : 0,
                  letterSpacing: ".06em",
                  transition: "height .15s",
                }}
              >
                <span
                  className="font-type text-[11px] text-[#5d5a53]"
                  style={{ letterSpacing: ".1em" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {label}
              </button>
            );
          })}
        </div>

        <div
          className="sheet relative z-[1] px-[18px] pt-1 pb-2"
          style={{ boxShadow: "6px 6px 0 var(--pop)" }}
        >
          {tab === 0 && (
            <GameTab dict={dict} settings={settings} update={update} />
          )}

          {tab === 1 && (
            <>
              <div className={SECTION}>
                <div className="flex items-baseline justify-between gap-3">
                  <div className={HEADING}>{t.categoriesTitle}</div>
                  <div className="font-marker text-[18px] text-marker">
                    {format(t.pairCount, { number: pairs })}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[6px]">
                  {CATEGORIES.map((category) => {
                    const on = settings.categories.includes(category.id);
                    return (
                      <button
                        key={category.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleCategory(category.id)}
                        className="flex h-11 cursor-pointer items-center gap-[10px] border-2 border-ink px-[10px] text-left text-ink"
                        style={{ background: on ? "#fff8c2" : "#fff" }}
                      >
                        <div className="font-marker flex h-[22px] w-[22px] flex-none items-center justify-center border-2 border-ink bg-white text-[17px] leading-none text-marker">
                          {on ? "✕" : ""}
                        </div>
                        <div className="font-mono flex-1 text-[16px] font-bold">
                          {t.categoryNames[category.id]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={SECTION}>
                <div className={HEADING}>{t.wordLanguageTitle}</div>
                <OptionGroup
                  label={t.wordLanguageTitle}
                  columns={2}
                  value={settings.wordLanguage}
                  onPick={(wordLanguage) => update({ wordLanguage })}
                  options={[
                    { value: "nl", label: t.wordLanguageNames.nl },
                    { value: "en", label: t.wordLanguageNames.en },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-[10px] py-[18px] pb-[10px]">
                <div className={HEADING}>{t.customTitle}</div>
                <div className={SUB}>{t.customSub}</div>
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_44px] gap-2">
                  <input
                    value={draft.a}
                    onChange={(event) =>
                      setDraft({ ...draft, a: event.target.value })
                    }
                    placeholder={t.customA}
                    aria-label={t.customA}
                    className="font-mono h-11 min-w-0 border-2 border-ink bg-white px-[10px] text-[16px] font-bold text-ink outline-none"
                  />
                  <input
                    value={draft.b}
                    onChange={(event) =>
                      setDraft({ ...draft, b: event.target.value })
                    }
                    placeholder={t.customB}
                    aria-label={t.customB}
                    className="font-mono h-11 min-w-0 border-2 border-ink px-[10px] text-[16px] font-bold text-ink outline-none"
                    style={{ background: "#fff8c2" }}
                  />
                  <button
                    type="button"
                    onClick={addCustom}
                    aria-label={t.customAdd}
                    className="font-display h-11 cursor-pointer border-2 border-ink bg-blood p-0 text-[20px]"
                  >
                    +
                  </button>
                </div>

                {settings.custom.length === 0 ? (
                  <div className="font-marker py-1 text-[16px] text-dim">
                    {t.customEmpty}
                  </div>
                ) : (
                  settings.custom.map((entry, index) => (
                    <div
                      key={`${entry.a}-${entry.b}-${index}`}
                      className="flex items-center gap-2 border-b border-[#e0dbcd] py-[6px]"
                    >
                      <div className="font-marker flex-1 text-[18px]">
                        {entry.a} <span className="text-marker">≠</span>{" "}
                        {entry.b}
                      </div>
                      <button
                        type="button"
                        aria-label={format(t.customRemove, entry)}
                        onClick={() =>
                          update({
                            custom: settings.custom.filter(
                              (_, i) => i !== index,
                            ),
                          })
                        }
                        className="font-display h-[30px] w-[30px] cursor-pointer border-0 bg-ink p-0 text-paper"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {tab === 2 && (
            <div className="flex flex-col gap-3 py-[18px] pb-3">
              <div className={HEADING}>{t.themeTitle}</div>
              <div className="grid grid-cols-2 gap-[14px]">
                <ThemePreview
                  label={t.themeDarkLabel}
                  sub={t.themeDarkSub}
                  chosen={t.chosen}
                  active={theme === "dark"}
                  background="#0b0b0b"
                  dot="rgba(255,255,255,.25)"
                  bar="#f2efe6"
                  onPick={() => pickTheme("dark")}
                />
                <ThemePreview
                  label={t.themeLightLabel}
                  sub={t.themeLightSub}
                  chosen={t.chosen}
                  active={theme === "light"}
                  background="#ece8dc"
                  dot="rgba(0,0,0,.2)"
                  bar="#0e0e0e"
                  onPick={() => pickTheme("light")}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Link
        href={`/${lang}`}
        className="pressable font-display mt-auto flex h-16 flex-none items-center justify-center border-[3px] border-ink bg-blood text-[19px] text-ink"
        style={{ boxShadow: "6px 6px 0 var(--pop)" }}
      >
        {t.save}
      </Link>
    </div>
  );
}

function GameTab({
  dict,
  settings,
  update,
}: {
  dict: Dictionary;
  settings: Settings;
  update: (change: Partial<Settings>) => void;
}) {
  const t = dict.settings;

  return (
    <>
      <div className={SECTION}>
        <div className="flex items-baseline justify-between gap-3">
          <div className={HEADING}>{t.timerTitle}</div>
          <div className="font-marker text-[20px] text-marker">
            {settings.timer
              ? format(t.timerSecondsLabel, { number: settings.timer })
              : t.timerOffLabel}
          </div>
        </div>
        <div className={SUB}>{t.timerSub}</div>
        <OptionGroup
          label={t.timerTitle}
          columns={4}
          value={settings.timer}
          onPick={(timer) => update({ timer })}
          options={TIMER_CHOICES.map((seconds) => ({
            value: seconds,
            label: seconds === 0 ? t.timerOff : String(seconds),
          }))}
        />
      </div>

      <div className={SECTION}>
        <div className={HEADING}>{t.difficultyTitle}</div>
        <div className={SUB}>{t.difficultySub}</div>
        <OptionGroup
          label={t.difficultyTitle}
          columns={3}
          value={settings.difficulty}
          onPick={(difficulty) => update({ difficulty })}
          options={DIFFICULTY_CHOICES.map((level) => ({
            value: level,
            label: t.difficultyNames[level],
          }))}
        />
      </div>

      <Toggle
        label={t.mrWhiteGuessLabel}
        description={t.mrWhiteGuessDesc}
        on={settings.mrWhiteGuess}
        onFlip={() => update({ mrWhiteGuess: !settings.mrWhiteGuess })}
      />
      <Toggle
        label={t.mrWhiteNeverFirstLabel}
        description={t.mrWhiteNeverFirstDesc}
        on={settings.mrWhiteNeverFirst}
        onFlip={() =>
          update({ mrWhiteNeverFirst: !settings.mrWhiteNeverFirst })
        }
      />
    </>
  );
}

function ThemePreview({
  label,
  sub,
  chosen,
  active,
  background,
  dot,
  bar,
  onPick,
}: {
  label: string;
  sub: string;
  chosen: string;
  active: boolean;
  background: string;
  dot: string;
  bar: string;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onPick}
      className="relative flex cursor-pointer flex-col gap-[10px] border-[3px] border-ink bg-white p-[10px] text-left text-ink"
      style={{
        boxShadow: active ? "6px 6px 0 #e8322b" : "4px 4px 0 var(--soft)",
        transition: "box-shadow .15s",
      }}
    >
      <div
        className="flex h-16 w-full flex-col items-center justify-center gap-[6px] border-2 border-ink"
        style={{
          backgroundColor: background,
          backgroundImage: `radial-gradient(${dot} 1px,transparent 1.3px)`,
          backgroundSize: "5px 5px",
        }}
      >
        <div className="h-2 w-14" style={{ background: bar }} />
        <div className="h-[14px] w-11 border-2 border-ink bg-blood" />
      </div>
      <div>
        <div className="font-display text-[16px]">{label}</div>
        <div className="font-mono text-[13px] text-[#4a4842]">{sub}</div>
      </div>
      {active && (
        <div
          className="font-display absolute border-2 border-ink bg-evidence px-2 py-[2px] text-[11px]"
          style={{
            top: -10,
            right: -8,
            letterSpacing: ".1em",
            transform: "rotate(8deg)",
            animation: "popIn .3s ease-out both",
          }}
        >
          {chosen}
        </div>
      )}
    </button>
  );
}
