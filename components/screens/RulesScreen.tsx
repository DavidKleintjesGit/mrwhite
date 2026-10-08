import Link from "next/link";
import ScreenHeader from "@/components/ui/ScreenHeader";
import Sheet from "@/components/ui/Sheet";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  lang: string;
};

/** One accent per numbered step, cycling paper, blood, evidence. */
const BADGE_COLOURS = ["#f2efe6", "#e8322b", "#f5d90a", "#f2efe6", "#e8322b"];

export default function RulesScreen({ dict, lang }: Props) {
  const t = dict.rules;

  return (
    <div className="flex flex-1 flex-col gap-[18px]">
      <ScreenHeader
        kicker={t.kicker}
        title={t.title}
        backHref={`/${lang}`}
        backLabel={dict.common.back}
      />

      <div className="flex flex-col gap-[14px]">
        {t.items.map((item, index) => (
          <Sheet
            key={item.title}
            depth={5}
            className="flex gap-[14px] p-[14px]"
            style={{ animation: "slideUp .35s ease-out both" }}
          >
            <div
              className="font-display flex h-10 w-10 flex-none items-center justify-center border-[3px] border-ink text-[18px]"
              style={{ background: BADGE_COLOURS[index % BADGE_COLOURS.length] }}
            >
              {index + 1}
            </div>
            <div>
              <div className="font-display text-[16px]">{item.title}</div>
              <div className="text-[15px] leading-[1.4] text-pretty">
                {item.body}
              </div>
            </div>
          </Sheet>
        ))}
      </div>

      <Link
        href={`/${lang}/play`}
        className="pressable font-display mt-auto flex h-16 items-center justify-center border-[3px] border-ink bg-blood text-[19px] text-ink"
        style={{ boxShadow: "6px 6px 0 var(--pop)" }}
      >
        {t.cta}
      </Link>
    </div>
  );
}
