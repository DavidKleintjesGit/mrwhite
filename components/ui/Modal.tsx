"use client";

import type { CSSProperties, ReactNode } from "react";

type Props = {
  /** The taped-on label sticking out of the top-left corner. */
  tag: string;
  tagColor: string;
  shadowColor: string;
  maxWidth: number;
  /** Panels that scroll set their own height; the confirm box does not. */
  fill?: boolean;
  background?: string;
  onClose: () => void;
  style?: CSSProperties;
  children: ReactNode;
};

export default function Modal({
  tag,
  tagColor,
  shadowColor,
  maxWidth,
  fill = true,
  background = "var(--card)",
  onClose,
  style,
  children,
}: Props) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(13,13,13,.82)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "screenIn .25s both",
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth,
          boxSizing: "border-box",
          background,
          color: "#0d0d0d",
          border: "4px solid #0d0d0d",
          boxShadow: `10px 10px 0 ${shadowColor}`,
          display: "flex",
          flexDirection: "column",
          animation: "popIn .4s cubic-bezier(.2,1.3,.4,1) both",
          ...(fill ? { maxHeight: "calc(100dvh - 40px)" } : null),
          ...style,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -18,
            left: 18,
            fontFamily: "var(--font-permanent-marker), cursive",
            fontSize: 18,
            background: tagColor,
            color: "#0d0d0d",
            border: "3px solid #0d0d0d",
            padding: "1px 12px",
            transform: "rotate(-4deg)",
          }}
        >
          {tag}
        </div>
        {children}
      </div>
    </div>
  );
}

/** The "Klaar" bar both the archive and language panels close with. */
export function ModalFooter({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        padding: "16px 22px 20px",
        borderTop: "3px solid #0d0d0d",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {children}
    </div>
  );
}

export const MODAL_BODY: CSSProperties = {
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
  padding: "16px 26px 22px 22px",
  display: "grid",
  alignContent: "start",
  gap: 10,
};
