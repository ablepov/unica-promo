import { LeadForm } from "@/components/landing/lead-form";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/ui";
import { ctaPoints, faqItems, pricingNote, pricingPlans } from "@/lib/landing-content";

export function ClosingSection() {
  return (
    <>
      <section id="pricing" className="scroll-mt-28 border-b border-white/8 py-24">
        <div className="page-shell">
          <Reveal>
            <div className="section-plane relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_14%,rgba(115,179,255,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />

              <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div className="max-w-xl">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
                    Стоимость
                  </p>
                  <h2 className="mt-4 text-4xl leading-[0.96] font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                    Старт не должен превращаться в отдельный проект по сборке AI.
                  </h2>
                  <p className="mt-5 text-base leading-8 text-[var(--muted-strong)]">
                    {pricingNote}
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {pricingPlans.map((plan) => (
                    <div
                      key={plan.name}
                      className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] px-5 py-6"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                        {plan.name}
                      </p>
                      <p className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
                        {plan.price}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
                        {plan.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="lead-form" className="scroll-mt-28 py-24">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal>
            <div className="lg:pr-8">
              <SectionHeading
                label="Request demo"
                title="Покажите контур, процессы и ограничения. Мы предложим формат пилота."
                description="Основная цель первой версии лендинга — быстро собрать корректный enterprise-лид без лишнего маркетингового шума."
              />
              <div className="mt-10 space-y-4">
                {ctaPoints.map((item) => (
                  <div key={item} className="border-t border-white/8 pt-4">
                    <p className="text-sm leading-7 text-slate-100">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <LeadForm />
          </Reveal>
        </div>

        <div className="page-shell mt-20 border-t border-white/8 pt-16">
          <Reveal>
            <SectionHeading
              label="FAQ"
              title="Частые вопросы"
              description="Эта часть закрывает базовые enterprise-возражения ещё до разговора с менеджером."
            />
          </Reveal>

          <div className="mt-10 max-w-4xl">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                className={`group ${index > 0 ? "border-t border-white/8" : ""}`}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left">
                  <span className="text-lg font-semibold text-white">
                    {item.question}
                  </span>
                  <span className="mt-1 font-mono text-sm text-[var(--muted)] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pb-6 text-sm leading-7 text-[var(--muted-strong)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
