import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/ui";
import { featuredUseCases } from "@/lib/landing-content";

export function UseCasesSection() {
  return (
    <section id="scenarios" className="scroll-mt-28 border-b border-white/8 py-24">
      <div className="page-shell">
        <Reveal>
          <SectionHeading
            label="Сценарии запуска"
            title="Три сценария, с которых enterprise-команды начинают уже сейчас"
            description="В первой версии лендинга фокус на сценариях, где ценность понятна за один экран: знания, сервисные процессы и документы."
          />
        </Reveal>

        <div className="mt-16 space-y-16">
          {featuredUseCases.map((useCase, index) => (
            <Reveal key={useCase.title} delay={index * 0.04}>
              <article className="group border-t border-white/8 pt-10">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--muted)]">
                      Use case {useCase.number}
                    </p>
                    <h3 className="mt-4 text-4xl leading-tight font-semibold tracking-[-0.05em] text-white">
                      {useCase.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-8 text-[var(--muted-strong)]">
                      {useCase.description}
                    </p>

                    <ul className="mt-8 space-y-3">
                      {useCase.bullets.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-6 text-slate-100"
                        >
                          <span className="mt-2 inline-flex size-1.5 rounded-full bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                      {useCase.outcome}
                    </p>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="section-plane relative overflow-hidden px-6 py-7 transition duration-500 group-hover:border-cyan-300/18 group-hover:bg-white/[0.04] sm:px-8 sm:py-8">
                      <div className="hero-grid absolute inset-0 opacity-20" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(115,179,255,0.12),transparent_24%),radial-gradient(circle_at_12%_88%,rgba(76,239,214,0.06),transparent_24%)]" />
                      <div className="absolute left-8 top-8 bottom-8 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(115,179,255,0.55),rgba(255,255,255,0))]" />

                      <div className="relative ml-5 space-y-8">
                        {useCase.steps.map((step, stepIndex) => (
                          <div key={step.title} className="grid gap-4 sm:grid-cols-[auto_1fr]">
                            <div className="flex items-start gap-4">
                              <span className="inline-flex size-9 items-center justify-center rounded-full border border-cyan-300/24 bg-cyan-400/[0.08] font-mono text-[11px] tracking-[0.22em] text-cyan-100">
                                0{stepIndex + 1}
                              </span>
                            </div>
                            <div>
                              <p className="text-base font-semibold text-white">
                                {step.title}
                              </p>
                              <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--muted-strong)]">
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
