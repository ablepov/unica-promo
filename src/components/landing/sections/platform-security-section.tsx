import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/ui";
import { deliveryModes, governancePoints } from "@/lib/landing-content";

export function PlatformSecuritySection() {
  return (
    <section id="security" className="scroll-mt-28 border-b border-white/8 py-24">
      <div className="page-shell grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal>
          <div className="lg:pr-10">
            <SectionHeading
              label="Контур запуска"
              title="Разворачивается там, где проходит ваше согласование"
              description="Unica не заставляет выбирать между скоростью старта и требованиями ИБ. Платформа поддерживает cloud, on-prem и гибридные сценарии."
            />
            <div className="mt-8 space-y-4 text-sm leading-7 text-[var(--muted-strong)]">
              <p>
                Это важно для команд, у которых AI должен работать рядом с
                корпоративными системами, чувствительными данными и понятными
                политиками доступа.
              </p>
              <p>
                Контроль не прячется в презентации: роли, аудит, источники и
                расход ресурсов видны как часть рабочего контура.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="section-plane relative overflow-hidden px-6 py-6 sm:px-8 sm:py-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_16%,rgba(115,179,255,0.12),transparent_24%),radial-gradient(circle_at_12%_84%,rgba(76,239,214,0.06),transparent_20%)]" />

            <div className="relative">
              <div className="space-y-6">
                {deliveryModes.map((mode, index) => (
                  <div
                    key={mode.title}
                    className={`${index > 0 ? "border-t border-white/8 pt-6" : ""}`}
                  >
                    <div className="grid gap-3 sm:grid-cols-[10rem_1fr]">
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
                        {mode.title}
                      </p>
                      <p className="text-sm leading-7 text-slate-100">{mode.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 border-t border-white/8 pt-8 sm:grid-cols-2">
                {governancePoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-100"
                  >
                    <span className="mt-2 inline-flex size-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
