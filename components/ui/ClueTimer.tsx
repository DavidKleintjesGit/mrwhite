"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Seconds for this clue. */
  seconds: number;
  timeUpLabel: string;
};

/**
 * Counts one clue down. The parent gives it a fresh key per speaker, so the
 * clock resets by remounting rather than by writing state from an effect.
 */
export default function ClueTimer({ seconds, timeUpLabel }: Props) {
  const [left, setLeft] = useState(seconds);
  const handle = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    handle.current = setInterval(() => {
      setLeft((current) => {
        if (current <= 1) {
          if (handle.current) clearInterval(handle.current);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => {
      if (handle.current) clearInterval(handle.current);
    };
  }, []);

  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="h-[18px] flex-1 overflow-hidden border-[3px] border-ink bg-white">
        <div
          className="h-full"
          style={{
            width: `${(left / seconds) * 100}%`,
            background: left <= 5 ? "#e8322b" : "#0e0e0e",
            transition: "width 1s linear",
          }}
        />
      </div>
      <div className="font-display w-[58px] text-right text-[22px]">
        {left > 0 ? `${left}s` : timeUpLabel}
      </div>
    </div>
  );
}
