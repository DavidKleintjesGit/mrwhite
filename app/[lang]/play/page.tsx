import { notFound } from "next/navigation";
import AppShell from "@/components/shell/AppShell";
import PlayFlow from "@/components/game/PlayFlow";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function PlayPage({ params }: PageProps<"/[lang]/play">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <AppShell>
      <PlayFlow dict={getDictionary(lang)} lang={lang} />
    </AppShell>
  );
}
