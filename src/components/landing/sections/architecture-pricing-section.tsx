"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/ui";
import { architectureLayers, integrationGroups } from "@/lib/landing-content";

export function ArchitecturePricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const canvasY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [54, -54],
  );
  const beamOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [0.55, 0.55, 0.55] : [0.24, 0.72, 0.28],
  );

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="scroll-mt-28 border-b border-white/8 py-24"
    >
      <div className="page-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              label="Архитектура"
              title="Встраивается в существующий enterprise-стек, а не заменяет его"
              description="На одной схеме видно, как инфраструктура, сервисы Unica, бизнес-логика и пользовательские каналы собираются в управляемый AI-контур."
            />

            <div className="mt-10 space-y-5 border-t border-white/8 pt-8">
              {integrationGroups.map((group) => (
                <div key={group.title}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                    {group.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-100">
                    {group.items.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div style={{ y: canvasY }} className="relative">
          <div className="section-plane relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
            <div className="architecture-grid absolute inset-0 opacity-35" />
            <motion.div
              style={{ opacity: beamOpacity }}
              className="absolute inset-y-8 left-8 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(115,179,255,0.9),rgba(255,255,255,0))]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(115,179,255,0.12),transparent_24%),radial-gradient(circle_at_14%_86%,rgba(76,239,214,0.05),transparent_24%)]" />

            <div className="relative space-y-4">
              {architectureLayers.map((layer, index) => (
                <article
                  key={layer.title}
                  className="architecture-layer ml-5 overflow-hidden rounded-[1.9rem] border border-white/8 bg-[linear-gradient(90deg,rgba(11,16,24,0.95),rgba(11,16,24,0.82))] px-5 py-5 sm:px-6"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,rgba(91,168,255,0.92),rgba(91,168,255,0.24))]" />
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
                    <div className="pl-2">
                      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                        Layer 0{index + 1}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                        {layer.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                        {layer.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 lg:justify-end">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
