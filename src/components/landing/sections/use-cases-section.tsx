import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/ui";
import { featuredUseCases } from "@/lib/landing-content";

export function UseCasesSection() {
  return (
    <section id="scenarios" className="scroll-mt-28 border-b border-[var(--line)] py-24">
      <div className="page-shell">
        <Reveal>
          <SectionHeading
            label="Сценарии запуска"
            title="Показываем три рабочих сценария, а не бесконечный список обещаний."
            description="Каждый сценарий оформлен как продуктовый блок: короткий смысл, два ключевых эффекта и понятная механика внутри."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 xl:grid-cols-3">
          {featuredUseCases.map((useCase, index) => (
            <Reveal key={useCase.title} delay={index * 0.05}>
              <article className="section-plane flex h-full flex-col px-5 py-6 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">Сценарий {useCase.number}</p>
                  <span className="telemetry-chip">{useCase.outcome}</span>
                </div>

                <h3 className="mt-4 text-[1.55rem] font-semibold leading-tight text-[var(--foreground-strong)]">
                  {useCase.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-strong)]">
                  {useCase.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {useCase.bullets.slice(0, 2).map((item) => (
                    <span key={item} className="telemetry-chip">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="product-card mt-6 flex-1 px-4 py-4">
                  <div className="space-y-3">
                    {useCase.steps.map((step, stepIndex) => (
                      <div
                        key={step.title}
                        className="flex items-start gap-3 border-b border-[var(--line)] pb-3 last:border-0 last:pb-0"
                      >
                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] font-mono text-[11px] tracking-[0.18em] text-[var(--foreground)]">
                          0{stepIndex + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[var(--foreground)]">
                            {step.title}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-[var(--muted-strong)]">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
