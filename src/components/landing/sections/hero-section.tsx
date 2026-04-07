"use client";

import { motion, useReducedMotion } from "motion/react";

const proofCards = [
  {
    label: "Контур",
    value: "Cloud, on-prem, hybrid",
  },
  {
    label: "Контроль",
    value: "RBAC, аудит, цитаты",
  },
  {
    label: "Источники",
    value: "DMS, CRM, SharePoint",
  },
];

const sidebarItems = [
  { label: "Control", short: "CP", active: true },
  { label: "Источники", short: "DB" },
  { label: "Сценарии", short: "SC" },
  { label: "Политики", short: "PL" },
  { label: "Аудит", short: "AU" },
];

const launchMetrics = [
  { label: "Источников", value: "12" },
  { label: "Сценариев", value: "07" },
  { label: "Политик", value: "24" },
];

const sourceCoverage = [
  { label: "База знаний", coverage: "92%", width: "92%" },
  { label: "Service desk", coverage: "84%", width: "84%" },
  { label: "Документы / OCR", coverage: "76%", width: "76%" },
];

const policyChecks = [
  { label: "RBAC", detail: "роли применены" },
  { label: "Audit trail", detail: "действия журналируются" },
  { label: "Citations", detail: "источники видимы" },
];

const readinessRows = [
  { label: "Контур", value: "активен" },
  { label: "Режим", value: "mission ready" },
  { label: "Среда", value: "private deployment" },
];

const sourceTags = ["DMS", "CRM", "Confluence", "SharePoint"];

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
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_14%_18%,rgba(74,102,173,0.34),transparent_20%),radial-gradient(circle_at_82%_20%,rgba(213,169,94,0.08),transparent_16%),linear-gradient(180deg,rgba(255,255,255,0.012),rgba(0,0,0,0))]" />
      <div className="absolute left-[10%] top-[20%] -z-10 h-48 w-48 rounded-full bg-[rgba(142,165,255,0.1)] blur-[120px]" />
      <div className="absolute right-[8%] top-[12%] -z-10 h-40 w-40 rounded-full bg-[rgba(213,169,94,0.08)] blur-[110px]" />

      <div className="page-shell relative py-12 sm:py-16 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:items-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={transition}
            className="relative z-10 max-w-[32rem]"
          >
            <p className="eyebrow">Unica AI / orbital control</p>
            <h1 className="display-title mt-5 text-[3.05rem] leading-[0.9] sm:text-[4rem] lg:text-[4.85rem]">
              AI в контуре бизнеса.
              <br className="hidden sm:block" />
              Не в режиме демо.
            </h1>
            <p className="mt-5 max-w-[27rem] text-[1rem] leading-7 text-[var(--muted-strong)] sm:text-[1.05rem]">
              Единый control plane для источников, сценариев и политик. Запуск в cloud,
              on-prem или hybrid без хаоса из пилотов и ручных склеек.
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

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {proofCards.map((item) => (
                <div key={item.label} className="metric-card px-4 py-4">
                  <p className="eyebrow">{item.label}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--foreground)]">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.12 }}
            className="relative lg:pl-3"
            aria-hidden="true"
          >
            <div className="product-shell p-4 sm:p-5 lg:p-6">
              <div className="absolute right-5 top-5 rounded-full border border-[rgba(213,169,94,0.28)] bg-[rgba(213,169,94,0.08)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--signal)]">
                T-09
              </div>

              <div className="product-window overflow-hidden rounded-[1.35rem] border border-[var(--line)] bg-[rgba(8,11,18,0.84)]">
                <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-2 rounded-full bg-[rgba(255,255,255,0.24)]" />
                    <span className="inline-flex size-2 rounded-full bg-[rgba(255,255,255,0.14)]" />
                    <span className="inline-flex size-2 rounded-full bg-[rgba(255,255,255,0.14)]" />
                  </div>
                  <span className="telemetry-chip">Mission control active</span>
                </div>

                <div className="grid min-h-[34rem] grid-cols-[78px_minmax(0,1fr)]">
                  <div className="border-r border-[var(--line)] bg-[rgba(255,255,255,0.018)] p-3">
                    <div className="space-y-2">
                      {sidebarItems.map((item) => (
                        <div
                          key={item.label}
                          className={`product-sidebar-item justify-center px-0 text-[11px] uppercase tracking-[0.18em] ${
                            item.active ? "is-active" : ""
                          }`}
                          title={item.label}
                        >
                          <span>{item.short}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1.14fr)_260px]">
                    <div className="space-y-4">
                      <div className="product-card px-4 py-4 sm:px-5 sm:py-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="max-w-md">
                            <p className="eyebrow">Launch board</p>
                            <h2 className="mt-2 text-[1.55rem] font-semibold leading-tight text-[var(--foreground-strong)] sm:text-[1.8rem]">
                              Ассистент сервис-деска
                            </h2>
                            <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--muted-strong)]">
                              Контекст из базы знаний, маршрутизация по сценарию и ответ под
                              политиками доступа.
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 sm:w-[13rem]">
                            {launchMetrics.map((item) => (
                              <div key={item.label} className="product-kpi px-3 py-3 text-center">
                                <p className="text-lg font-semibold text-[var(--foreground-strong)]">
                                  {item.value}
                                </p>
                                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                                  {item.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="relative mt-5 overflow-hidden rounded-[1rem] border border-[var(--line)] bg-[rgba(255,255,255,0.018)] p-4 sm:p-5">
                          {shouldReduceMotion ? null : (
                            <motion.div
                              className="pointer-events-none absolute inset-y-4 left-[-10rem] w-40 bg-[linear-gradient(90deg,transparent,rgba(213,169,94,0.22),transparent)] blur-2xl"
                              animate={{ x: [0, 580] }}
                              transition={{ duration: 5.6, ease: "linear", repeat: Infinity }}
                            />
                          )}

                          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
                            <div>
                              <div className="grid h-28 grid-cols-6 items-end gap-2">
                                {[36, 58, 44, 74, 62, 88].map((height, index) => (
                                  <div
                                    key={index}
                                    className="rounded-t-[0.9rem] border border-b-0 border-[rgba(142,165,255,0.18)] bg-[linear-gradient(180deg,rgba(142,165,255,0.34),rgba(142,165,255,0.06))]"
                                    style={{ height: `${height}%` }}
                                  />
                                ))}
                              </div>

                              <div className="mt-4 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                                <span>Intake</span>
                                <span>Route</span>
                                <span>Verify</span>
                                <span>Respond</span>
                              </div>
                            </div>

                            <div className="rounded-[1rem] border border-[var(--line)] bg-[rgba(6,9,15,0.78)] p-3">
                              <p className="eyebrow">Flow status</p>
                              <div className="mt-4 space-y-3">
                                {[
                                  "Контекст синхронизирован",
                                  "Сценарий применён",
                                  "Источники прикреплены",
                                ].map((item) => (
                                  <div key={item} className="flex items-center gap-3 text-sm text-[var(--foreground)]">
                                    <span className="inline-flex size-2 rounded-full bg-[var(--signal)] shadow-[0_0_0_4px_rgba(213,169,94,0.12)]" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="product-card px-4 py-4 sm:px-5">
                          <p className="eyebrow">Контур знаний</p>
                          <div className="mt-4 space-y-4">
                            {sourceCoverage.map((item) => (
                              <div key={item.label}>
                                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                                  <span className="text-[var(--foreground)]">{item.label}</span>
                                  <span className="text-[var(--muted-strong)]">{item.coverage}</span>
                                </div>
                                <div className="h-2 rounded-full bg-[rgba(255,255,255,0.06)]">
                                  <div
                                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),rgba(213,169,94,0.92))]"
                                    style={{ width: item.width }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="product-card px-4 py-4 sm:px-5">
                          <p className="eyebrow">Проверки ответа</p>
                          <div className="mt-4 space-y-3">
                            {policyChecks.map((item) => (
                              <div
                                key={item.label}
                                className="rounded-[1rem] border border-[var(--line)] bg-[rgba(255,255,255,0.018)] px-3 py-3"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="inline-flex size-2 rounded-full bg-[var(--success)] shadow-[0_0_0_4px_rgba(135,197,158,0.12)]" />
                                  <span className="text-sm font-medium text-[var(--foreground)]">
                                    {item.label}
                                  </span>
                                </div>
                                <p className="mt-2 text-sm text-[var(--muted-strong)]">
                                  {item.detail}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="product-card px-4 py-4 sm:px-5">
                        <div className="flex items-center justify-between gap-4">
                          <p className="eyebrow">Запрос оператора</p>
                          <span className="telemetry-chip">audit trail</span>
                        </div>

                        <div className="mt-4 rounded-[1rem] border border-[var(--line)] bg-[rgba(255,255,255,0.018)] px-4 py-3 text-sm text-[var(--foreground)]">
                          Как восстановить доступ в ERP и сохранить историю действий?
                        </div>

                        <div className="mt-3 rounded-[1rem] border border-[var(--line)] bg-[rgba(6,9,15,0.78)] px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {["ERP policy", "RBAC", "KB article 41"].map((item) => (
                              <span key={item} className="telemetry-chip">
                                {item}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="h-2 rounded-full bg-[rgba(255,255,255,0.08)]" />
                            <div className="h-2 w-[88%] rounded-full bg-[rgba(255,255,255,0.08)]" />
                            <div className="h-2 w-[70%] rounded-full bg-[rgba(255,255,255,0.08)]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="product-card px-4 py-4">
                        <p className="eyebrow">Статус контура</p>
                        <div className="mt-4 space-y-3">
                          {readinessRows.map((item) => (
                            <div
                              key={item.label}
                              className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-3 text-sm last:border-0 last:pb-0"
                            >
                              <span className="text-[var(--muted-strong)]">{item.label}</span>
                              <span className="text-[var(--foreground)]">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="product-card px-4 py-4">
                        <p className="eyebrow">Источники</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {sourceTags.map((item) => (
                            <span key={item} className="telemetry-chip">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="product-card px-4 py-4">
                        <p className="eyebrow">Режим запуска</p>
                        <div className="mt-4 space-y-2">
                          {["Cloud ready", "On-prem ready", "Hybrid ready"].map((item) => (
                            <div
                              key={item}
                              className="rounded-[0.9rem] border border-[var(--line)] bg-[rgba(255,255,255,0.018)] px-3 py-3 text-sm text-[var(--foreground)]"
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
