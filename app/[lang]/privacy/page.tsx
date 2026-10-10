import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VERIFIED_LOCALES, isLocale, isVerified } from "@/lib/i18n";
import { getPrivacyDoc } from "@/lib/legal/privacy";

/**
 * The policy both stores insist on, at a public URL.
 *
 * It sits outside the game on purpose: the app is one state machine behind
 * `/[lang]/`, and a legal page that has to stay reachable should not depend on
 * that machine being in any particular state. So this is a plain document,
 * dark like the entry page, with no client code at all.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return VERIFIED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang) || !isVerified(lang)) notFound();

  const doc = getPrivacyDoc(lang);
  return { title: `${doc.title} — Mr. White`, description: doc.lead };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang) || !isVerified(lang)) notFound();

  const doc = getPrivacyDoc(lang);

  return (
    <main
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        background: "#0d0d0d",
        backgroundImage:
          "radial-gradient(rgba(243,240,232,.08) 1px, transparent 1.6px)",
        backgroundSize: "9px 9px",
        color: "#F3F0E8",
        fontFamily: "var(--font-courier-prime), 'Courier New', monospace",
        paddingTop: "calc(clamp(32px,6vw,72px) + env(safe-area-inset-top))",
        paddingBottom:
          "calc(clamp(32px,6vw,72px) + env(safe-area-inset-bottom))",
        paddingLeft: "calc(clamp(20px,5vw,40px) + env(safe-area-inset-left))",
        paddingRight: "calc(clamp(20px,5vw,40px) + env(safe-area-inset-right))",
      }}
    >
      <article style={{ maxWidth: 680, margin: "0 auto" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-archivo-black), sans-serif",
            fontSize: "clamp(30px,7vw,46px)",
            lineHeight: 1.05,
            textTransform: "uppercase",
            maxWidth: "100%",
            overflowWrap: "break-word",
          }}
        >
          {doc.title}
        </h1>

        <p
          style={{
            margin: "14px 0 0",
            fontSize: 12,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#8a877f",
          }}
        >
          {doc.updated}
        </p>

        <p style={{ margin: "28px 0 0", fontSize: 17, lineHeight: 1.65 }}>
          {doc.lead}
        </p>

        {doc.sections.map((section) => (
          <section key={section.heading} style={{ marginTop: 40 }}>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-archivo-black), sans-serif",
                fontSize: "clamp(17px,4vw,21px)",
                textTransform: "uppercase",
                lineHeight: 1.2,
                maxWidth: "100%",
                overflowWrap: "break-word",
              }}
            >
              {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p
                key={paragraph}
                style={{
                  margin: "12px 0 0",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "#b9b5aa",
                }}
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <a
          href={`/${lang}/`}
          style={{
            fontFamily: "var(--font-archivo-black), sans-serif",
            display: "inline-flex",
            marginTop: 48,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
            padding: "0 26px",
            border: "3px solid #F3F0E8",
            background: "#0d0d0d",
            color: "#F3F0E8",
            fontSize: 15,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "5px 5px 0 #FFD23F",
          }}
        >
          {doc.back}
        </a>
      </article>
    </main>
  );
}
