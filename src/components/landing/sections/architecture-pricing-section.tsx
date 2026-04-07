import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/ui";
import {
  architectureLayers,
  integrationGroups,
  platformPillars,
} from "@/lib/landing-content";

export function ArchitecturePricingSection() {
  return (
    <section
      id="platform"
      className="relative scroll-mt-28 border-b border-[var(--line)] py-24"
    >
      <div id="architecture" className="absolute -top-28" />

      <div className="page-shell">
        <Reveal>
          <SectionHeading
            label="Архитектура"
            title="Не ещё один AI-бот, а полноценный control plane поверх вашего стека."
            description="Главное здесь не количество слов, а предсказуемость конструкции: источники, сценарии, контроль и каналы живут в одной системе."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="section-plane h-full px-6 py-6 sm:px-8 sm:py-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">Контур платформы</p>
                  <h3 className="mt-3 text-[1.7rem] font-semibold leading-tight text-[var(--foreground-strong)]">
                    Четыре слоя, которые держат запуск в production-режиме.
                  </h3>
                </div>
                <span className="telemetry-chip">stack visible</span>
              </div>

              <div className="mt-8 space-y-3">
                {architectureLayers.map((layer, index) => (
                  <div key={layer.title} className="product-card px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="max-w-md">
                        <p className="eyebrow">Слой 0{index + 1}</p>
                        <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                          {layer.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                          {layer.description}
                        </p>
                      </div>

                      <div className="flex max-w-sm flex-wrap gap-2">
                        {layer.items.slice(0, 4).map((item) => (
                          <span key={item} className="telemetry-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal delay={0.04}>
              <div className="section-plane px-5 py-6">
                <p className="eyebrow">Ядро запуска</p>
                <div className="mt-4 space-y-4">
                  {platformPillars.map((pillar) => (
                    <div
                      key={pillar.title}
                      className="flex items-start gap-4 border-b border-[var(--line)] pb-4 last:border-0 last:pb-0"
                    >
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] font-mono text-[11px] tracking-[0.18em] text-[var(--foreground)]">
                        {pillar.label}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">
                          {pillar.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[var(--muted-strong)]">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="section-plane px-5 py-6">
                <p className="eyebrow">Подключения</p>
                <div className="mt-4 space-y-4">
                  {integrationGroups.map((group) => (
                    <div key={group.title}>
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {group.title}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.items.slice(0, 3).map((item) => (
                          <span key={item} className="telemetry-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
