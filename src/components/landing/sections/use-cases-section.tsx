import {
  BrainCircuit,
  FileText,
  GitBranchPlus,
  Radar,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { ChatBubble, SectionIntro } from "@/components/landing/ui";
import { useCases } from "@/lib/landing-content";

const useCaseIcons = [
  Radar,
  Workflow,
  FileText,
  BrainCircuit,
  Sparkles,
  GitBranchPlus,
] as const;

export function UseCasesSection() {
  return (
    <section id="scenarios" className="scroll-mt-28 border-b border-white/8 py-24">
      <div className="page-shell">
        <Reveal>
          <SectionIntro
            label="Сценарии запуска"
            title="С чего enterprise-команды начинают уже сейчас"
            description="Unica помогает быстро запускать прикладные AI-сценарии для сотрудников, контакт-центров, сервисных функций и руководителей."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((item, index) => {
            const Icon = useCaseIcons[index];
            return (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="surface-panel group relative h-full overflow-hidden p-6">
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(115,214,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(76,239,214,0.16),transparent_28%)]" />
                  <div className="relative flex h-full flex-col">
                    <div className="icon-chip">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
                      {item.description}
                    </p>
                    <div className="mt-6 grid gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="surface-panel mt-12 grid gap-8 overflow-hidden p-7 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
            <div className="relative">
              <div className="absolute left-0 top-0 h-full w-px bg-[linear-gradient(180deg,transparent,rgba(123,144,169,0.35),transparent)]" />
              <div className="pl-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Presale assistant
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-white">
                  Опишите задачу. Unica поможет очертить путь пилота.
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted-strong)]">
                  На следующем этапе сюда можно встроить пресейл-ассистента.
                  Сейчас в драфте оставил место под диалоговый блок и быструю
                  конверсию в заявку.
                </p>
                <a href="#lead-form" className="btn-secondary mt-6 inline-flex">
                  Описать задачу
                </a>
              </div>
            </div>

            <div className="surface-subtle p-5">
              <div className="space-y-3 text-sm">
                <ChatBubble
                  speaker="Клиент"
                  tone="user"
                  message="Нужно ускорить первую линию сервис-деска и подключить корпоративную базу знаний."
                />
                <ChatBubble
                  speaker="Unica"
                  tone="assistant"
                  message="Покажем сценарий на базе knowledge search, маршрутизации обращений и контрольного журнала действий. Возможен cloud и on-prem."
                />
                <ChatBubble
                  speaker="Unica"
                  tone="assistant"
                  message="Следующий шаг: короткое демо по вашим источникам, ролям и требованиям к безопасности."
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
