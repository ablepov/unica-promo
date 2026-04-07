import { Reveal } from "@/components/landing/reveal";
import { trustedBy, trustSignals } from "@/lib/landing-content";

export function TrustPainSection() {
  return (
    <section className="border-b border-[var(--line)] py-8 sm:py-10">
      <div className="page-shell">
        <Reveal>
          <div className="section-plane overflow-hidden px-6 py-6 sm:px-8 sm:py-7">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="eyebrow">Контур доверия</p>
                <p className="mt-4 max-w-md text-base leading-8 text-[var(--muted-strong)]">
                  Для команд, которым нужен не demo-бот, а управляемый запуск AI
                  рядом с корпоративными системами, ролями и требованиями ИБ.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm uppercase tracking-[0.22em] text-[var(--foreground)]">
                {trustedBy.map((company, index) => (
                  <div key={company} className="flex items-center gap-6">
                    <span>{company}</span>
                    {index !== trustedBy.length - 1 ? (
                      <span className="hidden h-4 w-px bg-[var(--line)] sm:inline-block" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="section-rule mt-7 grid gap-4 pt-6 sm:grid-cols-3">
              {trustSignals.map((item) => (
                <div key={item.label}>
                  <p className="eyebrow">{item.label}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
