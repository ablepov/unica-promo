"use client";

import { motion, useReducedMotion } from "motion/react";

const launchSignals = [
  {
    title: "Контекст",
    body: "Документы, CRM, базы знаний, звонки и внутренние сервисы в одном слое.",
  },
  {
    title: "Оркестрация",
    body: "Навыки, workflow, агенты и маршрутизация поверх реального процесса.",
  },
  {
    title: "Контроль",
    body: "Роли, аудит, источники, политика ответов и наблюдаемость на каждом шаге.",
  },
];

const boardStages = [
  {
    label: "01",
    title: "Подъём корпоративного контекста",
    body: "Unica связывает документы, системы, знания и события с реальным рабочим контуром.",
  },
  {
    label: "02",
    title: "Оркестрация сценария",
    body: "Сценарий собирается из retrieval, навыков, действий и бизнес-правил без ручной склейки пилотов.",
  },
  {
    label: "03",
    title: "Контур управления",
    body: "ИТ и ИБ видят роли, аудит, лимиты и поведение сценария как часть рабочего production-контура.",
  },
];

const deploymentTelemetry = [
  "Cloud / On-prem / Hybrid",
  "RBAC и аудит",
  "Интеграции с enterprise-стеком",
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const transition = {
    duration: shouldReduceMotion ? 0.18 : 0.78,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-[var(--line)] pt-24 sm:pt-28"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_14%_16%,rgba(19,35,58,0.62),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(200,146,62,0.1),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.01),rgba(0,0,0,0))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-[linear-gradient(90deg,rgba(240,235,223,0),rgba(240,235,223,0.24),rgba(240,235,223,0))]" />

      <div className="page-shell relative py-14 sm:py-18 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={transition}
            className="relative z-10"
          >
            <p className="eyebrow">Unica AI / Orbital control</p>
            <h1 className="display-title mt-6 max-w-3xl text-[3.55rem] leading-[0.88] sm:text-[4.5rem] lg:text-[5.25rem]">
              AI-контур, который встраивается в enterprise-стек и остаётся под
              контролем.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-strong)] sm:text-xl">
              Unica поднимает корпоративный контекст, оркестрирует действия и
              удерживает роли, источники и политики в едином слое управления.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#lead-form" className="btn-primary">
                Запросить демо
                <HeroArrow />
              </a>
              <a href="#architecture" className="btn-secondary">
                Смотреть архитектуру
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {launchSignals.map((signal, index) => (
                <motion.article
                  key={signal.title}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{
                    ...transition,
                    delay: shouldReduceMotion ? 0 : 0.08 + index * 0.06,
                  }}
                  className="metric-card px-5 py-5"
                >
                  <p className="eyebrow">{signal.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                    {signal.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.14 }}
            className="relative"
            aria-hidden="true"
          >
            <div className="section-plane relative overflow-hidden px-6 py-6 sm:px-8 sm:py-8 lg:min-h-[46rem]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(200,146,62,0.12),transparent_18%),radial-gradient(circle_at_18%_50%,rgba(19,35,58,0.54),transparent_28%)]" />
              <div className="trajectory-line absolute bottom-8 left-11 top-8 w-px rounded-full" />
              <div className="hero-beacon left-[2.4rem] top-[5.4rem] size-5" />
              <div className="hero-beacon left-[2.4rem] top-[17.4rem] size-4" />
              <div className="hero-beacon bottom-[7.2rem] left-[2.35rem] size-6" />

              <div className="relative flex h-full flex-col">
                <div className="flex flex-col gap-5 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="eyebrow">Пусковой контур / v1</p>
                    <p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted-strong)]">
                      Архитектурная зрелость вместо витрины: от контекста и
                      сценария до ролей, аудита и модели поставки.
                    </p>
                  </div>
                  <span className="telemetry-chip">Контроль активен</span>
                </div>

                <div className="mt-8 flex-1 space-y-6 pl-9">
                  {boardStages.map((stage, index) => (
                    <motion.article
                      key={stage.label}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                      animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                      transition={{
                        ...transition,
                        delay: shouldReduceMotion ? 0 : 0.16 + index * 0.08,
                      }}
                      className="metric-card px-5 py-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="max-w-md">
                          <p className="eyebrow">{stage.label}</p>
                          <h3 className="mt-3 text-[1.55rem] leading-tight font-semibold text-[var(--foreground-strong)]">
                            {stage.title}
                          </h3>
                        </div>
                        <p className="max-w-sm text-sm leading-7 text-[var(--muted-strong)]">
                          {stage.body}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 border-t border-[var(--line)] pt-6 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="metric-card px-5 py-5">
                    <p className="eyebrow">Режимы запуска</p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {deploymentTelemetry.map((item) => (
                        <span key={item} className="telemetry-chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="metric-card px-5 py-5">
                    <p className="eyebrow">Статус контура</p>
                    <div className="mt-4 space-y-3 text-sm text-[var(--muted-strong)]">
                      <div className="flex items-center justify-between gap-4">
                        <span>Подключение источников</span>
                        <span className="text-[var(--foreground)]">готово</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Маршрутизация сценариев</span>
                        <span className="text-[var(--foreground)]">готово</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Контроль и аудит</span>
                        <span className="text-[var(--foreground)]">готово</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.75 9h10.5" />
      <path d="m9.75 4.5 4.5 4.5-4.5 4.5" />
    </svg>
  );
}
