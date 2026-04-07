import { LeadForm } from "@/components/landing/lead-form";
import { Reveal } from "@/components/landing/reveal";
import { ChatBubble, SectionIntro } from "@/components/landing/ui";
import { faqItems } from "@/lib/landing-content";

export function ClosingSection() {
  return (
    <>
      <section className="border-b border-white/8 py-24">
        <div className="page-shell">
          <Reveal>
            <div className="surface-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
              <div className="hero-grid absolute inset-0 opacity-35" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(76,239,214,0.16),transparent_20%),radial-gradient(circle_at_88%_20%,rgba(32,114,255,0.18),transparent_22%)]" />
              <div className="relative max-w-4xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Миссия
                </p>
                <h2 className="mt-6 text-4xl leading-tight font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  Мы помогаем компаниям и государству кратно увеличивать
                  производительность труда за счёт запуска безопасного
                  искусственного интеллекта.
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted-strong)]">
                  AI должен не просто впечатлять, а приносить измеримую пользу в
                  реальных процессах. Поэтому Unica создаётся как платформа,
                  которая делает знания, документы, речь и бизнес-логику частью
                  новой цифровой рабочей силы: управляемой, безопасной и полезной
                  для экономики.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="lead-form" className="scroll-mt-28 py-24">
        <div className="page-shell grid gap-10 xl:grid-cols-[0.96fr_1.04fr]">
          <Reveal>
            <div>
              <SectionIntro
                label="FAQ"
                title="Частые вопросы"
                description="Сайт должен закрывать ключевые возражения ещё до разговора с менеджером: чем платформа отличается от чат-бота, как контролируется качество и возможен ли on-prem."
              />
              <div className="mt-10 space-y-4">
                {faqItems.map((item) => (
                  <details key={item.question} className="surface-panel group p-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                      <span className="text-base font-semibold text-white">
                        {item.question}
                      </span>
                      <span className="mt-1 text-cyan-100 transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted-strong)]">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="surface-panel relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(76,239,214,0.14),transparent_22%),radial-gradient(circle_at_12%_90%,rgba(32,114,255,0.18),transparent_24%)]" />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Финальный CTA
                </p>
                <h2 className="mt-4 text-4xl leading-tight font-semibold tracking-[-0.04em] text-white">
                  Покажите нам вашу задачу. Мы предложим, как реализовать её на
                  Unica.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted-strong)]">
                  Опишите сценарий, и мы покажем, как он может работать в облаке
                  или on-prem. Форму уже подготовил так, чтобы её можно было
                  быстро подключить к email-сбору лидов.
                </p>

                <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                  <div className="surface-subtle p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                      Обсудить с AI-ассистентом
                    </p>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      Место под пресейл-ассистента уже заложено в композицию
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                      Во второй итерации сюда можно встроить диалоговый виджет
                      Unica, который соберёт контекст задачи, предложит сценарий
                      реализации и подготовит лида менеджеру.
                    </p>
                    <div className="mt-5 space-y-3">
                      <ChatBubble
                        speaker="Unica"
                        tone="assistant"
                        message="Расскажите, какие источники нужно подключить и в каком контуре должен работать AI."
                      />
                      <ChatBubble
                        speaker="Вы"
                        tone="user"
                        message="Нужен pilot для внутренних знаний и сервис-деска."
                      />
                    </div>
                  </div>

                  <LeadForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
