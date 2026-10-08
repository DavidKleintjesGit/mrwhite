"use client";

import BrutalButton from "@/components/ui/BrutalButton";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { format, type Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  count: number;
  names: string[];
  onChange: (names: string[]) => void;
  onBack: () => void;
  onDeal: () => void;
};

export default function NamesScreen({
  dict,
  count,
  names,
  onChange,
  onBack,
  onDeal,
}: Props) {
  const t = dict.names;
  const fields = Array.from({ length: count }, (_, index) => names[index] ?? "");

  function setName(index: number, value: string) {
    const next = [...fields];
    next[index] = value;
    onChange(next);
  }

  return (
    <div className="flex flex-1 flex-col gap-[18px]">
      <ScreenHeader
        kicker={t.kicker}
        title={t.title}
        onBack={onBack}
        backLabel={dict.common.back}
      />

      <p className="m-0 text-[15px] text-muted">{t.hint}</p>

      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          onDeal();
        }}
      >
        {fields.map((value, index) => {
          const placeholder = format(t.placeholder, { number: index + 1 });
          return (
            <div
              key={index}
              className="flex items-center gap-[10px]"
              style={{ animation: "slideUp .3s ease-out both" }}
            >
              <div className="font-display flex h-[52px] w-12 flex-none items-center justify-center border-[3px] border-ink bg-evidence text-[18px] text-ink">
                {index + 1}
              </div>
              <input
                type="text"
                value={value}
                onChange={(event) => setName(index, event.target.value)}
                placeholder={placeholder}
                aria-label={placeholder}
                maxLength={24}
                autoComplete="off"
                className="font-mono h-[52px] min-w-0 flex-1 border-[3px] border-ink bg-[var(--card)] px-[14px] text-[18px] font-bold text-ink outline-none"
                style={{ boxShadow: "4px 4px 0 var(--soft)" }}
                onFocus={(event) => {
                  event.currentTarget.style.boxShadow = "4px 4px 0 #e8322b";
                }}
                onBlur={(event) => {
                  event.currentTarget.style.boxShadow = "4px 4px 0 var(--soft)";
                }}
              />
            </div>
          );
        })}
        {/* Lets Enter submit without showing a second button. */}
        <button type="submit" className="hidden" aria-hidden="true" />
      </form>

      <div className="mt-auto grid grid-cols-[1fr_1.4fr] gap-[14px] pt-3">
        <BrutalButton
          variant="outline"
          shadow="var(--soft)"
          depth={5}
          onClick={onBack}
          className="h-16 text-[14px]"
        >
          {t.back}
        </BrutalButton>
        <BrutalButton onClick={onDeal} className="h-16 text-[17px]">
          {t.deal}
        </BrutalButton>
      </div>
    </div>
  );
}
