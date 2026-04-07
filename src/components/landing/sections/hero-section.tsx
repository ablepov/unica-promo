import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { StageCard } from "@/components/landing/ui";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate min-h-screen overflow-hidden border-b border-white/8 pt-28 pb-18 sm:pt-32"
    >
      <div className="hero-grid absolute inset-0 -z-20 opacity-90" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_20%_20%,rgba(33,113,255,0.3),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(74,240,215,0.2),transparent_24%),radial-gradient(circle_at_50%_55%,rgba(13,25,39,0.7),transparent_70%)]" />
      <div className="page-shell grid items-center gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <Reveal>
          <div className="max-w-2xl">
            <div className="eyebrow mb-6">
              <span className="inline-flex size-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(70,240,215,0.8)]" />
              Enterprise AI orchestration platform
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-[var(--muted)]">
              Unica AI
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              Корпоративная <span className="text-gradient">AI-платформа</span>{" "}
              и умный оркестратор для запуска AI в защищённом контуре
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted-strong)] sm:text-xl">
              Объединяет LLM, документы, корпоративные знания, речевые данные,
              агентов и интеграции в единую управляемую среду и доводит AI до
              измеримого результата.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#lead-form" className="btn-primary">
                Заказать демо
                <ArrowRight className="size-4" />
              </a>
              <a href="#architecture" className="btn-secondary">
                Посмотреть архитектуру
              </a>
            </div>

            <div className="mt-12 grid gap-3 text-sm text-[var(--muted-strong)] sm:grid-cols-2">
              {[
                "Мультиагентный корпоративный оркестратор AI",
                "Облако и on-prem для разных контуров",
                "RBAC, аудит и контроль использования",
                "Отечественный стек и гибкое подключение LLM",
              ].map((item) => (
                <div key={item} className="surface-subtle flex items-start gap-3 p-4">
                  <span className="mt-1 inline-flex size-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-3xl">
            <div className="absolute -left-18 top-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(69,176,255,0.42),transparent_68%)] blur-2xl" />
            <div className="absolute -right-14 top-28 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(76,239,214,0.34),transparent_72%)] blur-2xl" />
            <div className="stage-frame">
              <div className="absolute inset-x-8 top-6 flex items-center justify-between rounded-full border border-white/10 bg-white/4 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.28em] text-[var(--muted)]">
                <span>enterprise ai cockpit</span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.8)]" />
                  Live orchestration
                </span>
              </div>

              <div className="grid gap-4 pt-18 lg:grid-cols-[1.25fr_0.85fr]">
                <div className="surface-panel min-h-[32rem] p-6">
                  <div className="flex items-center justify-between border-b border-white/8 pb-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--muted)]">
                        Assistant session
                      </p>
                      <h2 className="mt-2 text-lg font-semibold text-white">
                        Единый рабочий контур Unica
                      </h2>
                    </div>
                    <div className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium text-cyan-100">
                      RBAC + Audit
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4">
                    <div className="surface-subtle p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-white">
                            AI-ассистент для сервисной команды
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                            Собирает контекст из регламентов, базы знаний,
                            транскриптов и CRM. Возвращает ответ со ссылками на
                            источники и логом действий.
                          </p>
                        </div>
                        <Sparkles className="mt-0.5 size-5 text-cyan-200" />
                      </div>
                    </div>

                    <div className="grid gap-4 xl:grid-cols-[1fr_0.92fr]">
                      <div className="surface-subtle p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                          Sources
                        </p>
                        <div className="mt-4 space-y-3">
                          {[
                            "База знаний / регламенты",
                            "Транскрипты контакт-центра",
                            "Документный архив / OCR",
                            "Service Desk / CRM / ERP",
                          ].map((item) => (
                            <div
                              key={item}
                              className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-[var(--muted-strong)]"
                            >
                              <span>{item}</span>
                              <ChevronRight className="size-4 text-cyan-100" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <StageCard
                          title="Модель поставки"
                          value="Cloud / On-prem"
                          note="Гибкая модель старта под требования к контуру."
                        />
                        <StageCard
                          title="Оркестрация"
                          value="RAG • OCR • ASR • Skills"
                          note="Один сценарий управляет знаниями, речью, документами и действиями."
                        />
                        <StageCard
                          title="Прозрачность"
                          value="Журналы • роли • лимиты"
                          note="ИТ, ИБ и бизнес видят использование и качество AI."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="surface-subtle relative overflow-hidden p-4">
                  <div className="absolute inset-y-0 left-1/2 w-px bg-[linear-gradient(180deg,transparent,rgba(115,214,255,0.6),transparent)]" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                    Audit trail
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-[var(--muted-strong)]">
                    {[
                      "Ответ основан на 4 источниках  |  02:14",
                      "Проверена роль пользователя     |  02:14",
                      "Списан лимит сценария           |  02:15",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/8 bg-black/18 px-4 py-3 font-mono text-xs text-cyan-50"
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
  );
}
