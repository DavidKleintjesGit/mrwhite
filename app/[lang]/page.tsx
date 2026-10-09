import { notFound } from "next/navigation";
import App from "@/components/App";
import { getDictionary, isLocale, isVerified } from "@/lib/i18n";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang) || !isVerified(lang)) notFound();

  return <App dict={getDictionary(lang)} lang={lang} />;
}
