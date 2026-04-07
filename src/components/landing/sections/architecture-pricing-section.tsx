import { Reveal } from "@/components/landing/reveal";
import { SectionIntro } from "@/components/landing/ui";
import {
  architectureLayers,
  integrationGroups,
  pricingPlans,
  roiPoints,
} from "@/lib/landing-content";

export function ArchitecturePricingSection() {
  return (
    <>
      <section id="architecture" className="scroll-mt-28 border-b border-white/8 py-24">
        <div className="page-shell">
          <Reveal>
            <SectionIntro
              label="Архитектура платформы"
              title="Как Unica встраивается в корпоративную архитектуру AI"
              description="Главный блок сайта: на одной схеме видно, как инфраструктура, сервисы Unica, бизнес-логика и пользовательские каналы собираются в управляемую архитектуру."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="surface-panel mt-14 overflow-hidden p-4 sm:p-6 lg:p-8">
              <div className="grid gap-4">
                {architectureLayers.map((layer, index) => (
                  <div
                    key={layer.title}
                    className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(90deg,rgba(8,16,28,0.94),rgba(13,24,40,0.88),rgba(8,16,28,0.94))] p-5 sm:p-6"
                  >
                    <div className="absolute inset-y-0 left-0 w-1 rounded-full bg-[linear-gradient(180deg,rgba(76,239,214,0.85),rgba(32,114,255,0.72))]" />
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="max-w-lg pl-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                          Layer 0{index + 1}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold text-white">
                          {layer.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                          {layer.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3 lg:max-w-[44rem] lg:justify-end">
                        {layer.items.map((item) => (
                          <span key={item} className="architecture-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  "Подключаем данные, модели и системы",
                  "Оркестрируем логику и действия",
                  "Даём сотрудникам понятный интерфейс",
                  "Контролируем качество, безопасность и использование",
                ].map((item) => (
                  <div key={item} className="surface-subtle p-4 text-sm text-slate-100">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-28 border-b border-white/8 py-24">
        <div className="page-shell grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div>
              <SectionIntro
                label="Гибкость и интеграции"
                title="Работает с вашим стеком"
                description="LLM, базы знаний, документы, CRM, ERP, IAM, телефония и внешние сервисы. Unica встраивается в привычную инфраструктуру, а не заставляет менять её."
              />
              <div className="mt-10 space-y-5">
                {integrationGroups.map((group) => (
                  <div key={group.title} className="surface-panel p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-xs">
                        <h3 className="text-lg font-semibold text-white">
                          {group.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {group.items.map((item) => (
                          <span key={item} className="integration-pill">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="surface-panel p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                Стоимость и ROI
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-white">
                Корпоративный AI уже можно запускать прагматично
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
                Платформа окупается не в абстрактных инновациях, а в
                производительности: меньше ручной рутины, быстрее поиск,
                обработка данных и принятие решений.
              </p>

              <div className="mt-8 grid gap-4">
                {pricingPlans.map((plan) => (
                  <div key={plan.name} className="surface-subtle p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                          {plan.name}
                        </p>
                        <p className="mt-3 text-4xl font-semibold text-white">
                          {plan.price}
                        </p>
                      </div>
                      <p className="max-w-sm text-sm leading-6 text-[var(--muted-strong)]">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4">
                {roiPoints.map((item) => (
                  <div key={item.title} className="surface-subtle p-4">
                    <h4 className="text-base font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-6 text-[var(--muted)]">
                Финальная стоимость зависит от модели поставки, модулей,
                интеграций, требований к безопасности, поддержки и объёма
                использования.
              </p>

              <a href="#lead-form" className="btn-primary mt-8 inline-flex">
                Заказать демо
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
