import DocLink from "@/components/ui/DocLink";
import { LOCALE_NAMES, VERIFIED_LOCALES } from "@/lib/i18n";

/**
 * What you see if the redirect in the layout did not take you away: a plain
 * choice between the languages. No JavaScript involved, so it works even when
 * nothing else does.
 */
export default function EntryPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        padding: 24,
        background: "#0d0d0d",
        backgroundImage:
          "radial-gradient(rgba(243,240,232,.08) 1px, transparent 1.6px)",
        backgroundSize: "9px 9px",
        color: "#F3F0E8",
        fontFamily: "var(--font-courier-prime), 'Courier New', monospace",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-archivo-black), sans-serif",
          fontSize: 56,
          lineHeight: 1,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Mr.{" "}
        <span
          style={{
            display: "inline-block",
            background: "#FFD23F",
            color: "#0d0d0d",
            padding: "2px 12px 5px",
            transform: "rotate(-2deg)",
            boxShadow: "6px 6px 0 #F3F0E8",
          }}
        >
          White
        </span>
      </h1>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
          maxWidth: 320,
        }}
      >
        {VERIFIED_LOCALES.map((locale) => (
          <DocLink
            key={locale}
            href={`/${locale}/`}
            lang={locale}
            hrefLang={locale}
            style={{
              fontFamily: "var(--font-archivo-black), sans-serif",
              display: "flex",
              height: 56,
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #F3F0E8",
              background: "#0d0d0d",
              color: "#F3F0E8",
              fontSize: 16,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "5px 5px 0 #FFD23F",
            }}
          >
            {LOCALE_NAMES[locale]}
          </DocLink>
        ))}
      </nav>
    </main>
  );
}
