import { notFound } from "next/navigation";
import AppShell from "@/components/shell/AppShell";
import RulesScreen from "@/components/screens/RulesScreen";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function RulesPage({ params }: PageProps<"/[lang]/rules">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <AppShell>
      <RulesScreen dict={getDictionary(lang)} lang={lang} />
    </AppShell>
  );
}
