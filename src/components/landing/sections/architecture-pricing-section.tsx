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
            label="Платформа"
            title="Архитектура запуска, а не демонстрационный AI-пилот."
            description="Unica встраивается в существующий enterprise-стек, поднимает корпоративный контекст и удерживает сценарии в управляемом контуре от первого запуска до рабочего контура."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <div className="space-y-4 lg:sticky lg:top-28">
              <div className="section-plane px-6 py-6 sm:px-7 sm:py-7">
                <p className="eyebrow">Точки подключения</p>
                <div className="mt-5 space-y-4">
                  {integrationGroups.map((group) => (
                    <div key={group.title} className="section-rule pt-4 first:border-0 first:pt-0">
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {group.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--muted-strong)]">
                        {group.items.join(" • ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-plane px-6 py-6 sm:px-7 sm:py-7">
                <p className="eyebrow">Слой управления</p>
                <p className="mt-4 text-base leading-8 text-[var(--muted-strong)]">
                  Здесь архитектура показана не как абстрактный стек, а как
                  последовательность слоёв, которые удерживают запуск AI под
                  контролем ИТ, ИБ и бизнеса.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.05}>
              <div className="grid gap-4 md:grid-cols-3">
                {platformPillars.map((pillar) => (
                  <article key={pillar.title} className="section-plane px-5 py-6">
                    <p className="eyebrow">{pillar.label}</p>
                    <h3 className="mt-4 text-2xl font-semibold text-[var(--foreground-strong)]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                      {pillar.description}
                    </p>
                    <ul className="mt-5 space-y-2 border-t border-[var(--line)] pt-4 text-sm leading-6 text-[var(--foreground)]">
                      {pillar.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 inline-flex size-1.5 rounded-full bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </Reveal>

            <div className="space-y-4">
              {architectureLayers.map((layer, index) => (
                <Reveal key={layer.title} delay={0.08 + index * 0.05}>
                  <article
                    className={`section-plane overflow-hidden px-6 py-6 sm:px-8 sm:py-7 ${
                      index % 2 === 1 ? "lg:ml-10" : "lg:mr-10"
                    }`}
                  >
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-start">
                      <div>
                        <p className="eyebrow">Слой 0{index + 1}</p>
                        <h3 className="mt-4 text-[1.9rem] leading-tight font-semibold text-[var(--foreground-strong)]">
                          {layer.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
                          {layer.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2.5 lg:justify-end">
                        {layer.items.map((item) => (
                          <span key={item} className="telemetry-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
