import { notFound } from "next/navigation";
import GameSetup from "@/components/GameSetup";
import Screen from "@/components/Screen";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function PlayPage({ params }: PageProps<"/[lang]/play">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <Screen
      title={dict.play.title}
      backLabel={dict.common.back}
      backHref={`/${lang}`}
    >
      <GameSetup dict={dict.play} />
    </Screen>
  );
}
