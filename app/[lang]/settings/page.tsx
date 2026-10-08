import { notFound } from "next/navigation";
import AppShell from "@/components/shell/AppShell";
import SettingsScreen from "@/components/screens/SettingsScreen";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function SettingsPage({
  params,
}: PageProps<"/[lang]/settings">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <AppShell>
      <SettingsScreen dict={getDictionary(lang)} lang={lang} />
    </AppShell>
  );
}
