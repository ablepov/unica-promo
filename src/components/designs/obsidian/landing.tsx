"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";

import {
  architectureCaptions,
  architectureLayers,
  faqItems,
  featureCards,
  growthRail,
  integrationGroups,
  navItems,
  pricingPlans,
  roiCards,
  scaleRail,
  securityHighlights,
  trustLogos,
  useCases,
} from "./content";
import { ObsidianLeadForm } from "./lead-form";
import styles from "./obsidian.module.css";

const screenSrc = "/designs/obsidian/screen.png";
const stoneLeftSrc = "/designs/obsidian/stone-left.avif";
const stoneRightSrc = "/designs/obsidian/stone-right.avif";
const stoneRightSizes =
  "(min-width: 1280px) 1377px, (min-width: 810px) and (max-width: 1279.98px) 1377px, (max-width: 399.98px) 1155px, (min-width: 400px) and (max-width: 809.98px) 1155px";
const stoneLeftSizes =
  "(min-width: 1280px) 844px, (min-width: 810px) and (max-width: 1279.98px) 844px, (max-width: 399.98px) 640px, (min-width: 400px) and (max-width: 809.98px) 640px";
const heroMockupSizes =
  "(min-width: 1280px) 1118px, (min-width: 810px) and (max-width: 1279.98px) 752px, (max-width: 809.98px) 100vw";

export function ObsidianLanding() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.add("obsidian-route");
    return () => document.body.classList.remove("obsidian-route");
  }, []);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 18);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div
          className={`${styles.headerInner} ${
            isScrolled ? styles.headerInnerScrolled : styles.headerInnerTop
          }`}
        >
          <a href="#top" className={styles.brand}>
            <span className={styles.brandMark}>U</span>
            <span>
              <strong className={styles.brandName}>Unica</strong>
            </span>
          </a>

          <nav className={styles.nav} aria-label="Section navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
                {item.hasCaret ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 12"
                    className={styles.navCaret}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 4.5 6 7.5 9 4.5" />
                  </svg>
                ) : null}
              </a>
            ))}
          </nav>

          <a href="#contact" className={styles.headerButton}>
            Заказать демо
          </a>
        </div>
      </header>

      <main id="top" className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroViewport}>
          <div className={`${styles.heroRock} ${styles.heroRockLeft}`} aria-hidden="true">
            <Image
              src={stoneLeftSrc}
              alt=""
              fill
              priority
              sizes={stoneLeftSizes}
              className={styles.heroRockImage}
            />
          </div>
          <div className={`${styles.heroRock} ${styles.heroRockRight}`} aria-hidden="true">
            <Image
              src={stoneRightSrc}
              alt=""
              fill
              priority
              sizes={stoneRightSizes}
              className={styles.heroRockImage}
            />
          </div>

          <div className={styles.heroCenter}>
            <h1 className={`${styles.display} ${styles.heroTitle}`}>
              Единая AI-платформа
              <br />
              для корпоративных команд
            </h1>
            <p className={styles.heroLead}>
              Модели, корпоративные знания, документы, речь, агенты и интеграции в одной
              управляемой среде для cloud, on-prem и hybrid.
            </p>

            <div className={styles.buttonRow}>
              <a href="#contact" className={`${styles.primaryButton} ${styles.heroPrimaryButton}`}>
                Заказать демо
              </a>
            </div>
          </div>

          <div className={styles.heroStage}>
            <div className={styles.heroPanel}>
              <div className={styles.heroShot}>
                <Image
                  src={screenSrc}
                  alt="Интерфейс Unica с чатом, транскрипцией и рабочими панелями"
                  fill
                  priority
                  loading="eager"
                  sizes={heroMockupSizes}
                  className={styles.shotImage}
                />
              </div>
            </div>
          </div>
          </div>
        </section>

        <section className={styles.trustSection}>
          <div className={styles.trustSurface}>
          <div className={styles.trustCaption}>Нам доверяют команды из enterprise и госсектора</div>
          <div className={styles.logoRow}>
            {trustLogos.map((logo) => (
              <span
                key={logo.label}
                className={`${styles.logoItem} ${
                  logo.variant === "emblem" ? styles.logoItemEmblem : styles.logoItemWordmark
                }`}
              >
                <span
                  role="img"
                  aria-label={logo.label}
                  className={styles.logoMark}
                  style={
                    {
                      "--logo-width": `${logo.width}rem`,
                      "--logo-ratio": logo.ratio,
                      "--logo-mask": `url("${logo.src}")`,
                    } as CSSProperties
                  }
                />
              </span>
            ))}
          </div>
          </div>
        </section>

        <div className={styles.shell}>
        <section id="platform" className={`${styles.ruleSection} ${styles.section}`}>
          <div className={styles.sectionLeadRow}>
            <h2 className={`${styles.display} ${styles.sectionTitle}`}>
              Запускайте AI
              <br />
              в реальных
              <br />
              процессах
            </h2>
          </div>

          <div className={styles.featureGrid}>
            {featureCards.map((card) => (
              <article key={card.title} className={styles.featureCard}>
                <div className={styles.featureVisual}>
                  <div className={`${styles.stone} ${styles.featureStone}`} />
                  <Image
                    src={screenSrc}
                    alt={card.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.shotImage}
                    style={{ objectPosition: card.imagePosition }}
                  />
                </div>
                <div className={styles.featureCardBody}>
                  <div className={styles.featureCardKicker}>{card.kicker}</div>
                  <h3 className={`${styles.display} ${styles.featureCardTitle}`}>{card.title}</h3>
                  <p className={styles.featureCardText}>{card.description}</p>
                  <a href={card.href} className={styles.ghostButton}>
                    {card.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.useCaseLineup}>
            {useCases.map((item, index) => (
              <div key={item.title} className={styles.useCaseItem}>
                <span className={styles.useCaseNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="scenarios" className={`${styles.ruleSection} ${styles.editorialSection}`}>
          <div className={styles.editorialGrid}>
            <div className={styles.editorialTitleBlock}>
              <span className={styles.eyebrow}>{scaleRail.eyebrow}</span>
              <h2 className={`${styles.display} ${styles.editorialTitle}`}>{scaleRail.title}</h2>
            </div>
            <div className={styles.editorialRail}>
              <div className={styles.editorialIntro}>{scaleRail.description}</div>
              <div className={styles.railList}>
                {scaleRail.items.map((item) => (
                  <article
                    key={item.title}
                    className={`${styles.railItem} ${item.active ? styles.railItemActive : ""}`}
                  >
                    <h3 className={styles.railItemTitle}>{item.title}</h3>
                    <p className={styles.railItemDescription}>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.ruleSection} ${styles.editorialSection}`}>
          <div className={styles.editorialGrid}>
            <div className={styles.editorialTitleBlock}>
              <span className={styles.eyebrow}>{growthRail.eyebrow}</span>
              <h2 className={`${styles.display} ${styles.editorialTitle}`}>{growthRail.title}</h2>
            </div>
            <div className={styles.editorialRail}>
              <div className={styles.editorialIntro}>{growthRail.description}</div>
              <div className={styles.railList}>
                {growthRail.items.map((item) => (
                  <article
                    key={item.title}
                    className={`${styles.railItem} ${item.active ? styles.railItemActive : ""}`}
                  >
                    <h3 className={styles.railItemTitle}>{item.title}</h3>
                    <p className={styles.railItemDescription}>{item.description}</p>
                  </article>
                ))}
              </div>

              <div className={styles.integrationRows}>
                {integrationGroups.map((group) => (
                  <div key={group.title} className={styles.integrationRow}>
                    <span className={styles.integrationRowTitle}>{group.title}</span>
                    <div className={styles.integrationPills}>
                      {group.items.map((item) => (
                        <span key={item} className={styles.pill}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="architecture" className={`${styles.ruleSection} ${styles.section}`}>
          <div className={styles.sectionLeadRow}>
            <h2 className={`${styles.display} ${styles.sectionTitle}`}>
              Создано для
              <br />
              защищённых
              <br />
              контуров
            </h2>
          </div>

          <div className={styles.securityGrid}>
            {securityHighlights.map((item) => (
              <article key={item.title} className={styles.securityCard}>
                <h3 className={styles.securityTitle}>{item.title}</h3>
                <p className={styles.securityText}>{item.description}</p>
              </article>
            ))}
          </div>

          <div className={styles.architectureBoard}>
            {architectureLayers.map((layer) => (
              <div key={layer.title} className={styles.architectureLayer}>
                <div className={styles.architectureLayerTitle}>{layer.title}</div>
                <div className={styles.architectureItems}>
                  {layer.items.map((item) => (
                    <span key={item} className={styles.pill}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className={styles.captionRow}>
              {architectureCaptions.map((item) => (
                <div key={item} className={styles.captionCard}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roi" className={`${styles.ruleSection} ${styles.section}`}>
          <div className={styles.sectionLeadRow}>
            <h2 className={`${styles.display} ${styles.sectionTitle}`}>
              Корпоративный AI
              <br />
              уже не дорогой
            </h2>
          </div>

          <div className={styles.pricingGrid}>
            {pricingPlans.map((plan) => (
              <article key={plan.title} className={styles.pricingCard}>
                <div className={styles.pricingTitle}>{plan.title}</div>
                <div className={styles.pricingValue}>{plan.price}</div>
                <p className={styles.pricingText}>{plan.description}</p>
              </article>
            ))}
          </div>

          <div className={styles.roiGrid}>
            {roiCards.map((card) => (
              <article key={card.title} className={styles.roiCard}>
                <h3 className={styles.roiTitle}>{card.title}</h3>
                <p className={styles.roiText}>{card.description}</p>
              </article>
            ))}
          </div>

          <p className={styles.pricingNote}>
            Финальная стоимость зависит от модели поставки, модулей, интеграций,
            требований к безопасности, поддержки и объёма использования.
          </p>

          <div className={styles.missionBlock}>
            <h3 className={`${styles.display} ${styles.missionTitle}`}>
              Мы помогаем компаниям и государству кратно увеличивать производительность
              труда за счёт запуска безопасного AI.
            </h3>
            <p className={styles.missionText}>
              Unica создаётся как платформа, которая делает знания, документы, речь и
              бизнес-логику частью новой цифровой рабочей силы — управляемой,
              безопасной и полезной для экономики.
            </p>
          </div>
        </section>

        <section id="contact" className={`${styles.ruleSection} ${styles.section}`}>
          <div className={styles.conversionShell}>
            <div className={styles.faqBlock}>
              <span className={styles.eyebrow}>FAQ</span>
              <h2 className={`${styles.display} ${styles.sectionTitle}`}>Частые вопросы</h2>
              <div className={styles.faqList}>
                {faqItems.map((item) => (
                  <details key={item.question} className={styles.faqItem}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className={styles.conversionGrid}>
              <div className={styles.assistantPanel}>
                <div className={styles.assistantHeader}>
                  <div>
                    <div className={styles.assistantLabel}>Presale assistant</div>
                    <div className={styles.assistantTitle}>Обсудить задачу с AI-ассистентом</div>
                  </div>
                  <span className={styles.signalChip}>powered by Unica</span>
                </div>

                <div className={styles.chatStack}>
                  <div className={styles.chatBubble}>
                    Опишите процесс, данные и контур. Я соберу вводные и предложу
                    вариант пилота.
                  </div>
                  <div className={styles.chatBubbleMuted}>
                    Нужен внутренний поиск по регламентам и сервис-деск в закрытом
                    контуре.
                  </div>
                  <div className={styles.chatBubble}>
                    Предварительно подходит on-prem запуск с knowledge layer, RBAC,
                    ASR/OCR и маршрутизацией обращений.
                  </div>
                </div>

                <div className={styles.assistantFooter}>
                  <div className={styles.railRow}>
                    <span className={styles.signalChip}>Pilot scope</span>
                    <span className={styles.signalChip}>Контур запуска</span>
                  </div>
                  <div className={styles.assistantInput}>
                    <span>Ассистента подключим на следующем этапе</span>
                    <span>→</span>
                  </div>
                </div>
              </div>

              <ObsidianLeadForm />
            </div>
          </div>
        </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerInner}`}>
          <span>Experimental route: /designs/obsidian</span>
          <span>Unica AI concept for Russian enterprise audience</span>
        </div>
      </footer>
    </div>
  );
}
