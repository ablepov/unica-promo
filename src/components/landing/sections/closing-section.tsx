import { LeadForm } from "@/components/landing/lead-form";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/ui";
import { ctaPoints, faqItems, pricingNote, pricingPlans } from "@/lib/landing-content";

export function ClosingSection() {
  return (
    <>
      <section id="pricing" className="scroll-mt-28 border-b border-[var(--line)] py-24">
        <div className="page-shell">
          <Reveal>
            <div className="section-plane px-6 py-8 sm:px-10 sm:py-10">
              <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
                <div className="max-w-xl">
                  <p className="eyebrow">Стоимость</p>
                  <h2 className="display-title mt-4 text-[2.7rem] leading-[0.95] sm:text-[3.35rem]">
                    Старт не должен превращаться в отдельный проект по сборке AI.
                  </h2>
                  <p className="mt-5 text-base leading-8 text-[var(--muted-strong)]">
                    {pricingNote}
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {pricingPlans.map((plan) => (
                    <div key={plan.name} className="metric-card px-5 py-6">
                      <p className="eyebrow">{plan.name}</p>
                      <p className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--foreground-strong)]">
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
                label="Запросить демо"
                title="Покажите процесс, контур и ограничения. Мы соберём следующий шаг."
                description="Первая задача лендинга проста: быстро собрать корректный enterprise-лид без маркетингового шума и лишнего трения на входе."
              />
              <div className="mt-10 space-y-4">
                {ctaPoints.map((item) => (
                  <div key={item} className="section-rule pt-4">
                    <p className="text-sm leading-7 text-[var(--foreground)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <LeadForm />
          </Reveal>
        </div>

        <div className="page-shell mt-20 border-t border-[var(--line)] pt-16">
          <Reveal>
            <SectionHeading
              label="FAQ"
              title="Ключевые вопросы, которые обычно звучат до первого звонка."
              description="Эта часть снимает базовые enterprise-возражения ещё до разговора с менеджером."
            />
          </Reveal>

          <div className="mt-10 max-w-4xl">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                className={`group ${index > 0 ? "border-t border-[var(--line)]" : ""}`}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left">
                  <span className="text-lg font-semibold text-[var(--foreground-strong)]">
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
