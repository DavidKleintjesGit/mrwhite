import { notFound } from "next/navigation";
import AppShell from "@/components/shell/AppShell";
import HomeScreen from "@/components/screens/HomeScreen";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <AppShell>
      <HomeScreen dict={getDictionary(lang)} lang={lang} />
    </AppShell>
  );
}
