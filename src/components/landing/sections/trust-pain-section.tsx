import { Reveal } from "@/components/landing/reveal";
import { trustedBy, trustSignals } from "@/lib/landing-content";

export function TrustPainSection() {
  return (
    <section className="border-b border-[var(--line)] py-8 sm:py-10">
      <div className="page-shell">
        <Reveal>
          <div className="section-plane overflow-hidden px-5 py-5 sm:px-7 sm:py-6">
            <div className="grid gap-7 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
              <div>
                <p className="eyebrow">Контур доверия</p>
                <p className="mt-3 max-w-sm text-[0.98rem] leading-7 text-[var(--muted-strong)]">
                  Для команд, которым нужен не demo-бот, а управляемый запуск AI
                  рядом с корпоративными системами и правилами доступа.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm uppercase tracking-[0.2em] text-[var(--foreground)]">
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

            <div className="section-rule mt-6 grid gap-3 pt-5 sm:grid-cols-3">
              {trustSignals.map((item) => (
                <div key={item.label} className="metric-card px-4 py-4">
                  <p className="eyebrow">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
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
