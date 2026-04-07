import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/ui";
import { deliveryModes, governancePoints } from "@/lib/landing-content";

const controlRows = [
  { label: "Источники", value: "под контролем" },
  { label: "Маршруты", value: "под наблюдением" },
  { label: "Роли и доступ", value: "применяются" },
  { label: "Аудит", value: "включён" },
];

export function PlatformSecuritySection() {
  return (
    <section id="security" className="scroll-mt-28 border-b border-[var(--line)] py-24">
      <div className="page-shell">
        <Reveal>
          <SectionHeading
            label="Контур запуска"
            title="Запускается там, где проходит ваше согласование и живут ваши правила."
            description="Unica не заставляет выбирать между скоростью старта и требованиями ИБ. Контур запуска подстраивается под инфраструктуру, а не наоборот."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="section-plane h-full px-6 py-6 sm:px-8 sm:py-8">
              <p className="eyebrow">Режимы развёртывания</p>
              <div className="mt-5 space-y-5">
                {deliveryModes.map((mode, index) => (
                  <div
                    key={mode.title}
                    className={`${index > 0 ? "section-rule pt-5" : ""}`}
                  >
                    <div className="grid gap-3 sm:grid-cols-[8rem_1fr]">
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {mode.title}
                      </p>
                      <p className="text-sm leading-7 text-[var(--muted-strong)]">
                        {mode.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="section-plane h-full px-6 py-6 sm:px-8 sm:py-8">
              <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                <div>
                  <p className="eyebrow">Операционный контроль</p>
                  <div className="mt-5 space-y-4">
                    {controlRows.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between gap-5 border-b border-[var(--line)] pb-3 text-sm last:border-0 last:pb-0"
                      >
                        <span className="text-[var(--muted-strong)]">{row.label}</span>
                        <span className="text-[var(--foreground)]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="eyebrow">Блок контроля</p>
                  <div className="mt-5 grid gap-3">
                    {governancePoints.map((item) => (
                      <div
                        key={item}
                        className="metric-card flex items-start gap-3 px-4 py-4 text-sm leading-6 text-[var(--foreground)]"
                      >
                        <span className="mt-2 inline-flex size-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
