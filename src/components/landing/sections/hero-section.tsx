"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const introTransition = {
    duration: shouldReduceMotion ? 0.15 : 0.75,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-white/8 pt-20 sm:pt-24"
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_18%_16%,rgba(92,140,255,0.2),transparent_22%),radial-gradient(circle_at_84%_14%,rgba(91,168,255,0.18),transparent_24%),linear-gradient(180deg,rgba(8,11,16,0.36),rgba(8,11,16,0))]" />
      <div className="hero-grid absolute inset-0 -z-20 opacity-60" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,rgba(5,7,11,0),rgba(5,7,11,1))]" />

      <div className="page-shell grid min-h-[calc(100svh-5rem)] items-center gap-10 py-14 sm:py-18 lg:-translate-y-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={introTransition}
          className="relative z-10 max-w-xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
            Unica AI
          </p>
          <h1 className="mt-5 text-5xl leading-[0.9] font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-[5.2rem]">
            Управляемый AI-контур для корпоративных процессов
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
            Unica соединяет знания, документы, речь и действия в единую
            orchestration-платформу с аудитом, ролями и гибкой моделью
            поставки.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#lead-form" className="btn-primary">
              Запросить демо
              <ArrowRight className="size-4" />
            </a>
            <a href="#architecture" className="btn-secondary">
              Смотреть архитектуру
            </a>
          </div>

          <div className="mt-10 border-t border-white/8 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
              From pricing
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
              от 650 000 ₽ / год для быстрого пилота
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted-strong)]">
              Cloud, on-prem или гибридная модель. Подходит для сценариев, где
              нужен быстрый пилот без потери контроля.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ ...introTransition, delay: shouldReduceMotion ? 0 : 0.12 }}
          className="relative"
          aria-hidden="true"
        >
          <div className="relative min-h-[31rem] overflow-hidden sm:min-h-[38rem] lg:min-h-[42rem]">
            <motion.div
              className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(91,168,255,0.16),transparent_62%)] blur-2xl"
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              }
            />
            <div className="hero-orbit absolute left-[6%] top-[10%] h-[78%] w-[72%]" />
            <div className="hero-orbit absolute right-[4%] top-[14%] h-[54%] w-[54%]" />
            <div className="hero-orbit absolute left-[26%] top-[26%] h-[36%] w-[36%] border-white/14" />

            <div className="hero-beam absolute left-[17%] top-[32%] h-px w-[24%]" />
            <div className="hero-beam absolute right-[18%] top-[31%] h-px w-[18%]" />
            <div className="hero-beam absolute right-[18%] bottom-[28%] h-px w-[22%]" />

            <motion.div
              className="absolute left-[14%] top-[17%] max-w-[14rem]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...introTransition, delay: 0.2 }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                Business context
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-100">
                Документы, CRM, DMS, знания, звонки и внутренние сервисы.
              </p>
            </motion.div>

            <motion.div
              className="absolute right-[8%] top-[18%] max-w-[13rem] text-right"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...introTransition, delay: 0.28 }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                Governance
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-100">
                Роли, аудит, контроль источников, лимиты и политики ответа.
              </p>
            </motion.div>

            <motion.div
              className="absolute right-[11%] bottom-[16%] max-w-[15rem] text-right"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...introTransition, delay: 0.36 }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                Execution layer
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-100">
                RAG, OCR, ASR, skills, routing и действия поверх бизнес-логики.
              </p>
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-1/2 w-[15.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-8 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:w-[18rem]"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ ...introTransition, delay: 0.14 }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--muted)]">
                Unica control layer
              </p>
              <p className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.1rem]">
                Context. Action. Control.
              </p>
              <p className="mt-4 text-sm leading-6 text-[var(--muted-strong)]">
                Один orchestration-контур для продуктивных AI-сценариев.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
