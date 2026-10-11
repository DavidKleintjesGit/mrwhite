import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocPage from "@/components/ui/DocPage";
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
  return { title: `${doc.title} — Mister White`, description: doc.lead };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang) || !isVerified(lang)) notFound();

  return <DocPage doc={getPrivacyDoc(lang)} lang={lang} />;
}
