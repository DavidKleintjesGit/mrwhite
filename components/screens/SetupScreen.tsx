"use client";

import BrutalButton from "@/components/ui/BrutalButton";
import CounterRow from "@/components/ui/CounterRow";
import ScreenHeader from "@/components/ui/ScreenHeader";
import StickyNote from "@/components/ui/StickyNote";
import {
  MAX_PLAYERS,
  MIN_PLAYERS,
  civilianCount,
  infiltratorCount,
  maxInfiltrators,
  withPlayers,
  withRole,
  type Lineup,
} from "@/lib/game";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  lang: string;
  lineup: Lineup;
  onChange: (lineup: Lineup) => void;
  onNext: () => void;
};

export default function SetupScreen({
  dict,
  lang,
  lineup,
  onChange,
  onNext,
}: Props) {
  const t = dict.setup;
  const infiltrators = infiltratorCount(lineup);
  const roomLeft = infiltrators < maxInfiltrators(lineup.players);

  function step(field: "undercovers" | "mrWhites", delta: number) {
    const next = withRole(lineup, field, delta);
    if (next) onChange(next);
  }

  return (
    <div className="flex flex-1 flex-col gap-[18px]">
      <ScreenHeader
        kicker={t.kicker}
        title={t.title}
        backHref={`/${lang}`}
        backLabel={dict.common.back}
      />

      <CounterRow
        title={t.players}
        description={t.playersSub}
        value={lineup.players}
        minusLabel={`${t.players} −`}
        plusLabel={`${t.players} +`}
        minusEnabled={lineup.players > MIN_PLAYERS}
        plusEnabled={lineup.players < MAX_PLAYERS}
        onMinus={() => onChange(withPlayers(lineup, lineup.players - 1))}
        onPlus={() => onChange(withPlayers(lineup, lineup.players + 1))}
        delay={0.05}
      />

      <CounterRow
        title={
          <>
            <span className="h-[14px] w-[14px] border-2 border-ink bg-evidence" />
            {t.undercovers}
          </>
        }
        description={t.undercoversSub}
        value={lineup.undercovers}
        minusLabel={`${t.undercovers} −`}
        plusLabel={`${t.undercovers} +`}
        minusEnabled={lineup.undercovers > 0 && infiltrators > 1}
        plusEnabled={roomLeft}
        onMinus={() => step("undercovers", -1)}
        onPlus={() => step("undercovers", 1)}
        delay={0.1}
      />

      <CounterRow
        title={
          <>
            <span className="h-[14px] w-[14px] border-2 border-ink bg-blood" />
            {t.mrWhites}
          </>
        }
        description={t.mrWhitesSub}
        value={lineup.mrWhites}
        minusLabel={`${t.mrWhites} −`}
        plusLabel={`${t.mrWhites} +`}
        minusEnabled={lineup.mrWhites > 0 && infiltrators > 1}
        plusEnabled={roomLeft}
        onMinus={() => step("mrWhites", -1)}
        onPlus={() => step("mrWhites", 1)}
        delay={0.15}
      />

      <div
        className="border-[3px] border-dashed border-[var(--soft)] p-4"
        style={{ animation: "slideUp .35s .2s ease-out both" }}
      >
        <div
          className="font-type mb-3 text-[13px] text-dim"
          style={{ letterSpacing: ".18em" }}
        >
          {t.listHeading}
        </div>
        <dl className="grid grid-cols-3 gap-3 text-center">
          <Tally label={t.civilians} count={civilianCount(lineup)} />
          <Tally
            label={t.undercover}
            count={lineup.undercovers}
            background="#f5d90a"
            rotate={3}
          />
          <Tally
            label={t.mrWhite}
            count={lineup.mrWhites}
            background="#e8322b"
            rotate={-3}
          />
        </dl>
      </div>

      <StickyNote
        rotate={-2}
        tapeRotate={5}
        maxWidth={280}
        delay={0.3}
        className="ml-2 self-start"
      >
        {t.tip}
      </StickyNote>

      <div className="mt-auto pt-3">
        <BrutalButton
          onClick={onNext}
          className="h-[66px] w-full text-[18px] tracking-[.05em]"
        >
          {t.next}
        </BrutalButton>
      </div>
    </div>
  );
}

function Tally({
  label,
  count,
  background = "var(--card)",
  rotate = 0,
}: {
  label: string;
  count: number;
  background?: string;
  rotate?: number;
}) {
  return (
    <div className="flex flex-col items-center gap-[6px]">
      <dd
        className="font-display flex h-[58px] w-[58px] items-center justify-center border-[3px] border-ink text-[28px] text-ink"
        style={{
          background,
          boxShadow: "4px 4px 0 var(--soft)",
          transform: rotate ? `rotate(${rotate}deg)` : undefined,
        }}
      >
        {count}
      </dd>
      <dt className="text-[13px] font-bold">{label}</dt>
    </div>
  );
}
