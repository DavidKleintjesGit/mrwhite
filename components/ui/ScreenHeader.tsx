import Link from "next/link";
import BrutalButton from "@/components/ui/BrutalButton";

type Props = {
  /** The small typewritten line above the title, e.g. "DOSSIER 01 · VERDELING". */
  kicker: string;
  title: string;
  backHref?: string;
  onBack?: () => void;
  backLabel: string;
};

const BACK =
  "flex h-12 w-12 flex-none items-center justify-center font-display text-[22px]";

export default function ScreenHeader({
  kicker,
  title,
  backHref,
  onBack,
  backLabel,
}: Props) {
  return (
    <div
      className="flex items-center gap-[14px]"
      style={{ animation: "slideUp .35s ease-out both" }}
    >
      {onBack ? (
        <BrutalButton
          variant="outline"
          shadow="#e8322b"
          depth={3}
          aria-label={backLabel}
          onClick={onBack}
          className={BACK}
        >
          ←
        </BrutalButton>
      ) : (
        backHref && (
          <Link
            href={backHref}
            aria-label={backLabel}
            className={`${BACK} border-[3px] border-[var(--fg)] bg-[var(--bg)] text-fg`}
            style={{ boxShadow: "3px 3px 0 #e8322b" }}
          >
            ←
          </Link>
        )
      )}
      <div>
        <div
          className="font-type text-[13px] text-tag"
          style={{ letterSpacing: ".18em" }}
        >
          {kicker}
        </div>
        <div className="font-display text-[30px] leading-none">{title}</div>
      </div>
    </div>
  );
}
