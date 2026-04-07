import { Building2, Database, GitBranchPlus, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { SectionIntro } from "@/components/landing/ui";
import { painPoints, trustedBy } from "@/lib/landing-content";

const painIcons = [Database, GitBranchPlus, ShieldCheck, Building2] as const;

export function TrustPainSection() {
  return (
    <>
      <section className="border-b border-white/8 py-8">
        <div className="page-shell">
          <div className="surface-panel px-5 py-5 sm:px-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-md">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Нам доверяют
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                  Крупные корпоративные и государственные команды, которым нужен
                  AI в управляемом и защищённом контуре.
                </p>
              </div>
              <div className="grid flex-1 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {trustedBy.map((company) => (
                  <div
                    key={company}
                    className="surface-subtle flex min-h-16 items-center justify-center px-4 text-center text-sm font-medium tracking-[0.08em] text-slate-100 uppercase"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pain" className="scroll-mt-28 border-b border-white/8 py-24">
        <div className="page-shell">
          <Reveal>
            <SectionIntro
              label="Почему пилоты не становятся платформой"
              title="Корпоративный AI часто не доходит до результата"
              description="Бизнес уже видит ценность AI, но разрозненные данные, слабая управляемость и набор отдельных инструментов мешают превратить интерес в промышленный сценарий."
            />
          </Reveal>

          <div className="mt-14 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-4">
              {painPoints.map((item, index) => {
                const Icon = painIcons[index];
                return (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <div className="surface-panel p-6">
                      <div className="flex items-start gap-4">
                        <div className="icon-chip">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.15}>
              <div className="surface-panel relative overflow-hidden p-6 sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(76,239,214,0.16),transparent_24%),radial-gradient(circle_at_15%_85%,rgba(32,114,255,0.18),transparent_22%)]" />
                <div className="relative">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                    Pain to platform
                  </p>
                  <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                    <div className="grid gap-4">
                      {[
                        "Разные базы знаний",
                        "Документы и OCR отдельно",
                        "Контакт-центр в изоляции",
                        "Точечные чат-боты и пилоты",
                      ].map((item) => (
                        <div
                          key={item}
                          className="surface-subtle flex items-center justify-between px-4 py-4 text-sm text-[var(--muted-strong)]"
                        >
                          <span>{item}</span>
                          <span className="inline-flex size-2 rounded-full bg-slate-500" />
                        </div>
                      ))}
                    </div>

                    <div className="hidden h-full items-center lg:flex">
                      <div className="relative h-72 w-24">
                        {[22, 50, 78].map((top) => (
                          <div
                            key={top}
                            className="absolute inset-x-0 h-px bg-[linear-gradient(90deg,rgba(123,144,169,0),rgba(123,144,169,0.7),rgba(123,144,169,0))]"
                            style={{ top: `${top}%` }}
                          />
                        ))}
                        <div className="absolute left-1/2 top-1/2 h-52 w-px -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,rgba(123,144,169,0),rgba(123,144,169,0.5),rgba(123,144,169,0))]" />
                      </div>
                    </div>

                    <div className="surface-subtle relative overflow-hidden p-6">
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(76,239,214,0.1),transparent_48%,rgba(32,114,255,0.12))]" />
                      <div className="relative">
                        <div className="eyebrow">
                          <span className="inline-flex size-2 rounded-full bg-cyan-300" />
                          Unica control center
                        </div>
                        <h3 className="mt-5 text-3xl font-semibold text-white">
                          Единый контур вместо зоопарка решений
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
                          Unica подключает модели, данные, документы, речь,
                          workflow и действия в один управляемый orchestration
                          слой. Команда получает понятный интерфейс и прозрачный
                          результат.
                        </p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {[
                            "Прозрачный доступ и роли",
                            "Ответы с источниками",
                            "Контроль сценариев и лимитов",
                            "Быстрый путь от пилота к продуктиву",
                          ].map((item) => (
                            <div
                              key={item}
                              className="rounded-2xl border border-cyan-400/16 bg-cyan-400/8 px-4 py-3 text-sm text-cyan-50"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
