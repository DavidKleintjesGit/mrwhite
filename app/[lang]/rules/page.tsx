import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Screen from "@/components/Screen";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function RulesPage({
  params,
}: PageProps<"/[lang]/rules">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const { rules } = dict;

  return (
    <Screen
      title={rules.title}
      backLabel={dict.common.back}
      backHref={`/${lang}`}
    >
      <div className="flex flex-col gap-6 pb-6">
        <Section heading={rules.idea.heading}>
          <p>{rules.idea.body}</p>
        </Section>

        <Section heading={rules.roles.heading}>
          <dl className="flex flex-col gap-3">
            {rules.roles.items.map((role) => (
              <div
                key={role.name}
                className="rounded-2xl border border-border bg-surface p-4"
              >
                <dt className="font-semibold">{role.name}</dt>
                <dd className="mt-1 text-muted">{role.body}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section heading={rules.round.heading}>
          <ol className="flex flex-col gap-2">
            {rules.round.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface text-sm font-semibold tabular-nums">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section heading={rules.winning.heading}>
          <ul className="flex flex-col gap-2">
            {rules.winning.items.map((item) => (
              <li key={item.term}>
                <strong className="font-medium">{item.term}</strong>{" "}
                {item.body}
              </li>
            ))}
          </ul>
        </Section>

      </div>
    </Screen>
  );
}

function Section({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 text-sm font-medium uppercase tracking-wide text-muted">
        {heading}
      </h2>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}
