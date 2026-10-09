"use client";

import { useEffect, useState } from "react";
import Modal, { MODAL_BODY, ModalFooter } from "@/components/ui/Modal";
import Press from "@/components/ui/Press";
import Stamp from "@/components/ui/Stamp";
import { format, type Dictionary } from "@/lib/i18n";
import type { Settings } from "@/lib/settings";
import {
  CATEGORY_IDS,
  PICKABLE_LANGS,
  pairCount,
  totalPairs,
  type LangId,
} from "@/lib/words";

const ARCHIVO = "var(--font-archivo-black), sans-serif";

const CLOSE_BUTTON = {
  width: "100%",
  maxWidth: 260,
  fontFamily: ARCHIVO,
  fontSize: 17,
  textTransform: "uppercase" as const,
  background: "#FFD23F",
  color: "#0d0d0d",
  border: "3px solid #0d0d0d",
  padding: 14,
  boxShadow: "4px 4px 0 #0d0d0d",
  cursor: "pointer",
};

const CLOSE_PRESS = {
  transform: "translate(3px,3px)",
  boxShadow: "1px 1px 0 #0d0d0d",
};

/** The word-category archive: search, toggle, all on, all off. */
export function CategoryDialog({
  dict,
  settings,
  update,
  onClose,
}: {
  dict: Dictionary;
  settings: Settings;
  update: (change: Partial<Settings>) => void;
  onClose: () => void;
}) {
  const t = dict.archive;
  const [query, setQuery] = useState("");

  const buckets: string[] = [
    ...CATEGORY_IDS,
    ...(settings.custom.length ? ["eigen"] : []),
  ];
  const on = buckets.filter((id) => settings.cats[id]);

  const needle = query.trim().toLowerCase();
  const rows = buckets.filter((id) => {
    const label = dict.categories[id as keyof typeof dict.categories];
    return !needle || label.toLowerCase().includes(needle);
  });

  function setAll(value: boolean) {
    const cats = { ...settings.cats };
    for (const id of buckets) cats[id] = value;
    update({ cats });
  }

  return (
    <Modal
      tag={t.tag}
      tagColor="#FFD23F"
      shadowColor="#FFD23F"
      maxWidth={640}
      onClose={onClose}
    >
      <div
        style={{
          padding: "30px 22px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          borderBottom: "3px solid #0d0d0d",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: ARCHIVO,
              fontSize: 26,
              textTransform: "uppercase",
              lineHeight: 1.05,
            }}
          >
            {t.title}
          </h3>
          <span style={{ fontSize: 14, fontWeight: 700, whiteSpace: "nowrap" }}>
            {format(t.count, { on: on.length, total: buckets.length })}
          </span>
        </div>

        <input
          value={query}
          placeholder={t.search}
          aria-label={t.search}
          onChange={(event) => setQuery(event.target.value)}
          style={{
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: 16,
            padding: 12,
            background: "#fff",
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            outline: "none",
          }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <Press
            onClick={() => setAll(true)}
            style={{
              fontFamily: ARCHIVO,
              fontSize: 12,
              textTransform: "uppercase",
              background: "var(--bg)",
              color: "var(--fg)",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer",
            }}
            press={{ transform: "scale(.94)" }}
          >
            {t.all}
          </Press>
          <Press
            onClick={() => setAll(false)}
            style={{
              fontFamily: ARCHIVO,
              fontSize: 12,
              textTransform: "uppercase",
              background: "transparent",
              color: "#0d0d0d",
              border: "2px solid #0d0d0d",
              padding: "6px 12px",
              cursor: "pointer",
            }}
            press={{ transform: "scale(.94)" }}
          >
            {t.none}
          </Press>
        </div>
      </div>

      <div
        style={{
          ...MODAL_BODY,
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
        }}
      >
        {rows.map((id) => {
          const active = !!settings.cats[id];
          const label = dict.categories[id as keyof typeof dict.categories];
          const count =
            id === "eigen"
              ? settings.custom.length
              : pairCount(settings.lang, id as (typeof CATEGORY_IDS)[number]);
          return (
            <Press
              key={id}
              onClick={() =>
                update({ cats: { ...settings.cats, [id]: !active } })
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
                fontFamily: "inherit",
                background: active ? "#FFD23F" : "#F3F0E8",
                color: "#0d0d0d",
                border: "3px solid #0d0d0d",
                padding: 12,
                cursor: "pointer",
                transition: "transform .12s, background .15s",
              }}
              press={{ transform: "scale(.97)" }}
            >
              <span
                style={{
                  flex: "none",
                  width: 26,
                  height: 26,
                  border: "3px solid #0d0d0d",
                  background: "var(--card)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: ARCHIVO,
                  fontSize: 16,
                  boxSizing: "border-box",
                }}
              >
                {active ? "✓" : ""}
              </span>
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: ARCHIVO,
                    fontSize: 15,
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>
                  {format(t.pairs, { n: count })}
                </span>
              </span>
            </Press>
          );
        })}

        {rows.length === 0 && (
          <div style={{ gridColumn: "1 / -1", fontSize: 15, padding: "10px 0" }}>
            {format(t.noResults, { query })}
          </div>
        )}
      </div>

      <ModalFooter>
        <Press onClick={onClose} style={CLOSE_BUTTON} press={CLOSE_PRESS}>
          {dict.common.done}
        </Press>
      </ModalFooter>
    </Modal>
  );
}

/** Which language the secret words come in. */
export function LanguageDialog({
  dict,
  settings,
  update,
  onClose,
}: {
  dict: Dictionary;
  settings: Settings;
  update: (change: Partial<Settings>) => void;
  onClose: () => void;
}) {
  const t = dict.language;

  return (
    <Modal
      tag={t.tag}
      tagColor="#3DD6FF"
      shadowColor="#3DD6FF"
      maxWidth={560}
      background="#F3F0E8"
      onClose={onClose}
    >
      <div
        style={{
          padding: "30px 22px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          borderBottom: "3px solid #0d0d0d",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: ARCHIVO,
            fontSize: 26,
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          {t.title}
        </h3>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.4 }}>{t.sub}</p>
      </div>

      <div
        style={{
          ...MODAL_BODY,
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
        }}
      >
        {PICKABLE_LANGS.map((language) => {
          const active = settings.lang === language.id;
          return (
            <Press
              key={language.id}
              onClick={() => update({ lang: language.id as LangId })}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
                fontFamily: "inherit",
                background: active ? "#3DD6FF" : "#F3F0E8",
                color: "#0d0d0d",
                border: "3px solid #0d0d0d",
                padding: 12,
                cursor: "pointer",
                boxShadow: active ? "4px 4px 0 #0d0d0d" : "none",
                transition: "transform .12s, background .15s",
              }}
              press={{ transform: "scale(.97)" }}
            >
              <span
                style={{
                  flex: "none",
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0d0d0d",
                  color: "#F3F0E8",
                  fontFamily: ARCHIVO,
                  fontSize: 15,
                }}
              >
                {language.id.toUpperCase()}
              </span>
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: ARCHIVO,
                    fontSize: 15,
                    textTransform: "uppercase",
                  }}
                >
                  {language.name}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>
                  {format(dict.archive.pairs, { n: totalPairs(language.id) })}
                </span>
              </span>
              {active && (
                <Stamp
                  fontSize={11}
                  rotate={-10}
                  borderWidth={4}
                  style={{ position: "absolute", top: 8, right: 8 }}
                >
                  {t.chosen}
                </Stamp>
              )}
            </Press>
          );
        })}
      </div>

      <ModalFooter>
        <Press onClick={onClose} style={CLOSE_BUTTON} press={CLOSE_PRESS}>
          {dict.common.done}
        </Press>
      </ModalFooter>
    </Modal>
  );
}

/**
 * Re-dealing wipes everyone's word, so the confirm button stays locked for
 * three seconds — long enough to actually read what it says.
 */
export function ConfirmDialog({
  dict,
  onCancel,
  onConfirm,
}: {
  dict: Dictionary;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const t = dict.confirm;
  const [left, setLeft] = useState(3);

  useEffect(() => {
    const handle = setInterval(() => {
      setLeft((current) => {
        if (current <= 1) {
          clearInterval(handle);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <Modal
      tag={t.tag}
      tagColor="#FF3D3D"
      shadowColor="#FF3D3D"
      maxWidth={480}
      fill={false}
      onClose={onCancel}
      style={{ padding: "30px 24px 24px", gap: 16 }}
    >
      <h3
        style={{
          margin: 0,
          fontFamily: ARCHIVO,
          fontSize: 28,
          textTransform: "uppercase",
          lineHeight: 1.05,
        }}
      >
        {t.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 17,
          lineHeight: 1.45,
          textWrap: "pretty",
        }}
      >
        {t.bodyStart}
        <strong>{t.bodyStrong}</strong>
      </p>

      <div style={{ height: 10, border: "2px solid #0d0d0d" }}>
        <div
          style={{
            height: "100%",
            width: `${Math.round(((3 - left) / 3) * 100)}%`,
            background: "#FF3D3D",
            transition: "width 1s linear",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.3fr)",
          gap: 12,
        }}
      >
        <Press
          onClick={onCancel}
          style={{
            fontFamily: ARCHIVO,
            fontSize: 15,
            textTransform: "uppercase",
            background: "var(--card)",
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            padding: "15px 8px",
            boxShadow: "4px 4px 0 #0d0d0d",
            cursor: "pointer",
          }}
          press={CLOSE_PRESS}
        >
          {t.cancel}
        </Press>

        {left === 0 ? (
          <Press
            onClick={onConfirm}
            style={{
              fontFamily: ARCHIVO,
              fontSize: 15,
              textTransform: "uppercase",
              background: "#FF3D3D",
              color: "#0d0d0d",
              border: "3px solid #0d0d0d",
              padding: "15px 8px",
              boxShadow: "4px 4px 0 #0d0d0d",
              cursor: "pointer",
              animation: "popIn .3s both",
            }}
            press={CLOSE_PRESS}
          >
            {t.yes}
          </Press>
        ) : (
          <button
            type="button"
            disabled
            style={{
              fontFamily: ARCHIVO,
              fontSize: 15,
              textTransform: "uppercase",
              background: "#d9d5ca",
              color: "#6a675f",
              border: "3px dashed #8a877f",
              padding: "15px 8px",
            }}
          >
            {format(t.waiting, { n: left })}
          </button>
        )}
      </div>
    </Modal>
  );
}
