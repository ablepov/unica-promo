import {
  BrainCircuit,
  Building2,
  CheckCircle2,
  Database,
  LockKeyhole,
  Radar,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { SectionIntro } from "@/components/landing/ui";
import { advantages, securityControls } from "@/lib/landing-content";

const advantageIcons = [
  LockKeyhole,
  BrainCircuit,
  CheckCircle2,
  Database,
  Building2,
  Radar,
] as const;

export function PlatformSecuritySection() {
  return (
    <>
      <section id="platform" className="scroll-mt-28 border-b border-white/8 py-24">
        <div className="page-shell grid gap-12 xl:grid-cols-[0.88fr_1.12fr]">
          <Reveal>
            <div>
              <SectionIntro
                label="Что такое Unica"
                title="Умный оркестратор корпоративного AI"
                description="Платформа подключает модели, корпоративные знания, документы, речевые данные, skills, агентов и действия в единый управляемый контур."
              />
              <div className="mt-8 space-y-4 text-sm leading-7 text-[var(--muted-strong)]">
                <p>
                  Unica не живёт отдельно от бизнеса. Она встраивает AI в
                  реальные процессы компании и государства, помогает управлять
                  логикой сценариев, контролем доступа и качеством результата.
                </p>
                <p>
                  Поэтому вместо набора отдельных пилотов появляется работающая
                  платформа: от поиска и документов до автоматизации рутинных
                  операций и цифровой рабочей силы.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="surface-panel relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(76,239,214,0.16),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(32,114,255,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
              <div className="relative grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
                <div className="space-y-4">
                  {[
                    "Подключает разные LLM и внутренние источники данных",
                    "Управляет логикой сценариев, агентами и действиями",
                    "Контролирует роли, аудит, источники и потребление",
                    "Переводит AI из экспериментов в рабочий инструмент",
                  ].map((item, index) => (
                    <div key={item} className="surface-subtle p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                        0{index + 1}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-100">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="surface-subtle p-4 sm:p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                    Orchestration flow
                  </p>
                  <div className="mt-6 space-y-4">
                    {[
                      ["Запрос или задача", "Сотрудник, руководитель, сервисная функция, контакт-центр."],
                      ["Контекст и источники", "RAG, документы, базы знаний, транскрипты, системы компании."],
                      ["Skills и бизнес-логика", "OCR, ASR, workflow, routing, правила и роли."],
                      ["Действие и результат", "Черновик ответа, извлечение данных, следующий шаг процесса, протокол или задача."],
                    ].map(([title, detail], index) => (
                      <div key={title} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex size-9 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs font-semibold text-cyan-100">
                            {index + 1}
                          </div>
                          {index !== 3 ? (
                            <div className="mt-2 h-full w-px bg-[linear-gradient(180deg,rgba(115,214,255,0.5),rgba(115,214,255,0))]" />
                          ) : null}
                        </div>
                        <div className="pb-4">
                          <h3 className="text-base font-semibold text-white">{title}</h3>
                          <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                            {detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="security" className="scroll-mt-28 border-b border-white/8 py-24">
        <div className="page-shell grid gap-10 xl:grid-cols-[1fr_1fr]">
          <Reveal>
            <div>
              <SectionIntro
                label="Почему выбирают Unica"
                title="Enterprise-команды берут платформу под контроль, а не под обещания"
                description="Закрытый контур, гибкость по моделям, ответы на ваших данных и прозрачность использования делают Unica рабочим инструментом, а не демонстрацией возможностей LLM."
              />
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {advantages.map((item, index) => {
                  const Icon = advantageIcons[index];
                  return (
                    <div key={item.title} className="surface-panel p-5">
                      <div className="icon-chip">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted-strong)]">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="surface-panel relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(76,239,214,0.14),transparent_22%),radial-gradient(circle_at_10%_90%,rgba(32,114,255,0.18),transparent_26%)]" />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Security & governance
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-white">
                  AI под контролем ИТ, ИБ и бизнеса
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted-strong)]">
                  Unica создавалась для сценариев, где важны не только
                  возможности AI, но и роли, аудит, контроль источников и
                  управляемость на масштабе.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {securityControls.map((item) => (
                    <div key={item} className="surface-subtle p-4 text-sm text-slate-100">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
                  <div className="surface-subtle p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                      Access matrix
                    </p>
                    <div className="mt-4 space-y-3 text-sm text-[var(--muted-strong)]">
                      {[
                        ["Роль: CDTO / CIO", "Обзор и KPI"],
                        ["Роль: Контакт-центр", "Сценарии и QA"],
                        ["Роль: ИБ / IT", "Политики и аудит"],
                      ].map(([role, access]) => (
                        <div
                          key={role}
                          className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3"
                        >
                          <span>{role}</span>
                          <span className="text-cyan-100">{access}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="surface-subtle p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                      Audit log
                    </p>
                    <div className="mt-4 space-y-3 text-sm text-[var(--muted-strong)]">
                      {[
                        "10:14  | knowledge-search  | role validated",
                        "10:14  | source bundle     | 4 corp sources",
                        "10:15  | workflow action   | follow-up created",
                        "10:16  | token budget      | within policy",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 font-mono text-xs text-cyan-50"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
