import type { ReactNode } from "react";

/** Film grain. Pure decoration, so it never swallows a tap. */
const GRAIN_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

type Props = {
  children: ReactNode;
};

/**
 * The frame every screen sits in: dotted paper, a grain layer and a vignette,
 * over a single phone-width column.
 */
export default function AppShell({ children }: Props) {
  return (
    <div
      className="relative flex min-h-screen justify-center overflow-hidden text-fg"
      style={{
        backgroundColor: "var(--bg)",
        backgroundImage: "radial-gradient(var(--dot) 1px,transparent 1.3px)",
        backgroundSize: "6px 6px",
        transition: "background-color .3s,color .3s",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-50 opacity-[.13]"
        style={{
          inset: "-20%",
          backgroundImage: GRAIN_SVG,
          animation: "grain .5s steps(3) infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[49]"
        style={{
          background:
            "radial-gradient(ellipse at center,transparent 45%,var(--vig) 100%)",
        }}
      />
      <div className="relative z-[1] flex min-h-screen w-full max-w-[480px] flex-col px-5 pt-7 pb-8">
        {children}
      </div>
    </div>
  );
}
