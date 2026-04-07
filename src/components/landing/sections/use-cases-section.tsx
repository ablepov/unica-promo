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
            title="Три сценария, с которых enterprise-команды заходят в AI уже сейчас."
            description="Мы не начинаем с абстрактной платформенной истории. Мы начинаем со сценариев, где ценность, контроль и следующий шаг видны за один экран."
          />
        </Reveal>

        <div className="mt-16 space-y-6">
          {featuredUseCases.map((useCase, index) => (
            <Reveal key={useCase.title} delay={index * 0.05}>
              <article className="section-plane overflow-hidden px-6 py-6 sm:px-8 sm:py-8">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-start">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <p className="eyebrow">Сценарий {useCase.number}</p>
                    <h3 className="display-title mt-4 text-[2.35rem] leading-[0.96] sm:text-[2.7rem]">
                      {useCase.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted-strong)]">
                      {useCase.description}
                    </p>

                    <ul className="mt-8 space-y-3 border-t border-[var(--line)] pt-6">
                      {useCase.bullets.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-7 text-[var(--foreground)]"
                        >
                          <span className="mt-2 inline-flex size-1.5 rounded-full bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-8 text-sm leading-7 text-[var(--muted-strong)]">
                      {useCase.outcome}
                    </p>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="metric-card relative overflow-hidden px-5 py-5 sm:px-6 sm:py-6">
                      <div className="absolute inset-y-6 left-7 w-px bg-[linear-gradient(180deg,rgba(240,235,223,0),rgba(240,235,223,0.3),rgba(240,235,223,0))]" />

                      <div className="relative ml-7 space-y-6">
                        {useCase.steps.map((step, stepIndex) => (
                          <div
                            key={step.title}
                            className="grid gap-4 border-b border-[var(--line)] pb-5 last:border-0 last:pb-0 sm:grid-cols-[auto_1fr]"
                          >
                            <div className="flex items-start gap-4">
                              <span className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--accent-soft)] font-mono text-[11px] tracking-[0.22em] text-[var(--foreground)]">
                                0{stepIndex + 1}
                              </span>
                            </div>
                            <div>
                              <p className="text-base font-semibold text-[var(--foreground-strong)]">
                                {step.title}
                              </p>
                              <p className="mt-2 text-sm leading-7 text-[var(--muted-strong)]">
                                {step.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
