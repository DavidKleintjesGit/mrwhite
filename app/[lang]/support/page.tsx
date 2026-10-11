import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocPage from "@/components/ui/DocPage";
import { VERIFIED_LOCALES, isLocale, isVerified } from "@/lib/i18n";
import { getSupportDoc } from "@/lib/legal/support";

/**
 * The support page Apple insists on before an app may be submitted, and the
 * contact address Google asks for. Same frame as the privacy policy.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return VERIFIED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/support">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang) || !isVerified(lang)) notFound();

  const doc = getSupportDoc(lang);
  return { title: `${doc.title} — Mister White`, description: doc.lead };
}

export default async function SupportPage({
  params,
}: PageProps<"/[lang]/support">) {
  const { lang } = await params;
  if (!isLocale(lang) || !isVerified(lang)) notFound();

  return <DocPage doc={getSupportDoc(lang)} lang={lang} />;
}
