"use client";

import { motion, useReducedMotion } from "motion/react";

const heroSignals = [
  "Контекст из документов и систем",
  "Роли, аудит и политики",
  "Cloud / On-prem / Hybrid",
];

const navItems = [
  { label: "Обзор", active: true },
  { label: "Сценарии" },
  { label: "Источники" },
  { label: "Политики" },
  { label: "Аудит" },
];

const eventRows = [
  {
    title: "Сервис-деск / первая линия",
    meta: "контур активен",
    detail: "Маршрут построен, SLA под контролем",
  },
  {
    title: "Поиск по знаниям",
    meta: "источники обновлены",
    detail: "Confluence, DMS, SharePoint",
  },
  {
    title: "Документы / OCR",
    meta: "очередь обработана",
    detail: "142 файла за последний цикл",
  },
];

const statCards = [
  "12 источников",
  "07 сценариев",
  "24 политики",
];

const policyRows = [
  { label: "RBAC", value: "активен" },
  { label: "Аудит", value: "включён" },
  { label: "Маршруты", value: "видимы" },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const transition = {
    duration: shouldReduceMotion ? 0.18 : 0.72,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-[var(--line)] pt-24 sm:pt-28"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_14%_16%,rgba(55,78,132,0.46),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(213,169,94,0.08),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.015),rgba(0,0,0,0))]" />

      <div className="page-shell relative py-12 sm:py-16 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-start">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={transition}
            className="relative z-10"
          >
            <p className="eyebrow">Unica AI / control plane</p>
            <h1 className="display-title mt-5 max-w-2xl text-[3rem] leading-[0.9] sm:text-[4.2rem] lg:text-[4.75rem]">
              Запускайте корпоративный AI без потери контроля.
            </h1>
            <p className="mt-5 max-w-xl text-[1.02rem] leading-7 text-[var(--muted-strong)] sm:text-lg">
              Unica связывает источники, сценарии и политики в одном рабочем
              интерфейсе, а не в наборе разрозненных пилотов.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#lead-form" className="btn-primary">
                Запросить демо
                <HeroArrow />
              </a>
              <a href="#architecture" className="btn-secondary">
                Смотреть архитектуру
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroSignals.map((item) => (
                <span key={item} className="signal-pill">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.12 }}
            aria-hidden="true"
          >
            <div className="product-shell p-4 sm:p-5">
              <div className="product-window overflow-hidden rounded-[1.2rem] border border-[var(--line)] bg-[rgba(9,12,19,0.72)]">
                <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-2 rounded-full bg-[rgba(255,255,255,0.22)]" />
                    <span className="inline-flex size-2 rounded-full bg-[rgba(255,255,255,0.12)]" />
                    <span className="inline-flex size-2 rounded-full bg-[rgba(255,255,255,0.12)]" />
                  </div>
                  <span className="telemetry-chip">Контур активен</span>
                </div>

                <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[170px_minmax(0,1fr)_220px]">
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <div
                        key={item.label}
                        className={`product-sidebar-item ${item.active ? "is-active" : ""}`}
                      >
                        <span>{item.label}</span>
                      </div>
                    ))}

                    <div className="product-card mt-5 px-4 py-4">
                      <p className="eyebrow">Модель поставки</p>
                      <div className="mt-3 space-y-2 text-sm text-[var(--muted-strong)]">
                        <div className="flex items-center justify-between gap-3">
                          <span>Cloud</span>
                          <span className="text-[var(--foreground)]">готов</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span>On-prem</span>
                          <span className="text-[var(--foreground)]">готов</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span>Hybrid</span>
                          <span className="text-[var(--foreground)]">готов</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="product-card px-4 py-4 sm:px-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="eyebrow">Сценарий дня</p>
                          <h2 className="mt-2 text-[1.45rem] font-semibold leading-tight text-[var(--foreground-strong)]">
                            Ассистент сервис-деска
                          </h2>
                          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted-strong)]">
                            Контекст из базы знаний, маршрутизация по типу
                            задачи, журнал действий и ролевая модель.
                          </p>
                        </div>
                        <div className="flex max-w-[13rem] flex-wrap justify-start gap-2 sm:justify-end">
                          {statCards.map((item) => (
                            <span key={item} className="telemetry-chip">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {eventRows.map((row) => (
                        <div key={row.title} className="product-card px-4 py-4 sm:px-5">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-[var(--foreground)]">
                                {row.title}
                              </p>
                              <p className="mt-1 text-sm text-[var(--muted-strong)]">
                                {row.detail}
                              </p>
                            </div>
                            <span className="telemetry-chip">{row.meta}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="product-card px-4 py-4">
                      <p className="eyebrow">Политики доступа</p>
                      <div className="mt-4 space-y-3">
                        {policyRows.map((row) => (
                          <div
                            key={row.label}
                            className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-3 text-sm last:border-0 last:pb-0"
                          >
                            <span className="text-[var(--muted-strong)]">{row.label}</span>
                            <span className="text-[var(--foreground)]">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="product-card px-4 py-4">
                      <p className="eyebrow">Источники</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["DMS", "CRM", "Confluence", "SharePoint", "Vector DB"].map((item) => (
                          <span key={item} className="telemetry-chip">
                            {item}
                          </span>
                        ))}
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
