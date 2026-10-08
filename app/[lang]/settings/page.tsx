import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Screen from "@/components/Screen";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function SettingsPage({
  params,
}: PageProps<"/[lang]/settings">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const { settings } = dict;

  return (
    <Screen
      title={settings.title}
      backLabel={dict.common.back}
      backHref={`/${lang}`}
    >
      <section className="rounded-2xl border border-border bg-surface p-4">
        <h2 className="mb-3 text-sm font-medium text-muted">
          {settings.language}
        </h2>
        <LanguageSwitcher current={lang} />
      </section>

      <p className="text-muted">{settings.intro}</p>

      <section className="rounded-2xl border border-border bg-surface p-4">
        <h2 className="text-sm font-medium text-muted">
          {settings.comingHeading}
        </h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {settings.coming.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </Screen>
  );
}
