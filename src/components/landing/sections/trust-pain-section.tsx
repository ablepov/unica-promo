import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/ui";
import { platformPillars, trustedBy, trustSignals } from "@/lib/landing-content";

export function TrustPainSection() {
  return (
    <>
      <section className="border-b border-white/8 py-8">
        <div className="page-shell">
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
                Trusted by
              </p>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--muted-strong)]">
                Крупные корпоративные и государственные команды, которым нужен
                AI в управляемом и защищённом контуре.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm uppercase tracking-[0.24em] text-slate-100/90">
              {trustedBy.map((company, index) => (
                <div key={company} className="flex items-center gap-6">
                  <span>{company}</span>
                  {index !== trustedBy.length - 1 ? (
                    <span className="hidden h-4 w-px bg-white/10 sm:inline-block" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-3">
            {trustSignals.map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-100">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="scroll-mt-28 border-b border-white/8 py-24">
        <div className="page-shell">
          <Reveal>
            <SectionHeading
              label="Платформа"
              title="Одна control plane для данных, действий и контроля"
              description="Unica убирает разрыв между пилотом и продуктивом: поднимает корпоративный контекст в AI, оркестрирует сценарий и оставляет его под наблюдением ИТ, ИБ и бизнеса."
            />
          </Reveal>

          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            {platformPillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.05}>
                <article
                  className={`border-t border-white/8 pt-7 ${
                    index > 0 ? "lg:border-l lg:pl-8" : ""
                  }`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--muted)]">
                    {pillar.label}
                  </p>
                  <h3 className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.04em] text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
                    {pillar.description}
                  </p>
                  <ul className="mt-8 space-y-3 border-t border-white/8 pt-6">
                    {pillar.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-100"
                      >
                        <span className="mt-2 inline-flex size-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
