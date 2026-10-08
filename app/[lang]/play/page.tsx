import { notFound } from "next/navigation";
import PlayFlow from "@/components/PlayFlow";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function PlayPage({ params }: PageProps<"/[lang]/play">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <PlayFlow
      dict={getDictionary(lang)}
      lang={lang}
      homeHref={`/${lang}`}
    />
  );
}
