"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Image from "next/image";

import {
  architectureCaptions,
  architectureLayers,
  faqItems,
  featureCards,
  navItems,
  orchestratorHighlights,
  painPoints,
  painSection,
  pricingPlans,
  roiCards,
  securityHighlights,
  trustLogos,
  useCases,
} from "./content";
import { ObsidianHeroInterface } from "./obsidian-hero-interface";
import { ObsidianLeadForm } from "./lead-form";
import styles from "./obsidian.module.css";

const screenSrc = "/designs/obsidian/screen.png";
const stoneLeftSrc = "/designs/obsidian/stone-left.avif";
const stoneRightSrc = "/designs/obsidian/stone-right.avif";
const headerLogoSrc = "/designs/obsidian/logo.svg";
const stoneRightSizes =
  "(min-width: 1280px) 1377px, (min-width: 810px) and (max-width: 1279.98px) 1377px, (max-width: 399.98px) 1155px, (min-width: 400px) and (max-width: 809.98px) 1155px";
const stoneLeftSizes =
  "(min-width: 1280px) 844px, (min-width: 810px) and (max-width: 1279.98px) 844px, (max-width: 399.98px) 640px, (min-width: 400px) and (max-width: 809.98px) 640px";
const painAutoplayMs = 4800;
const desktopNavigationMinWidthPx = 810;
const mobileMenuCloseDelayMs = 160;

function OrchestratorIcon({
  kind,
}: {
  kind: (typeof orchestratorHighlights)[number]["icon"];
}) {
  switch (kind) {
    case "models":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={styles.orchestratorIcon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="5.5" cy="12" r="2.5" />
          <circle cx="18.5" cy="6" r="2.5" />
          <circle cx="18.5" cy="18" r="2.5" />
          <path d="M8 10.8 16.1 7.1" />
          <path d="M8 13.2 16.1 16.9" />
        </svg>
      );
    case "workflows":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={styles.orchestratorIcon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 5.5h8.5a2.5 2.5 0 0 1 2.5 2.5v1.5" />
          <path d="M17 17.5V19a2.5 2.5 0 0 1-2.5 2.5H6" />
          <path d="M17 9.5v5" />
          <path d="m14.5 12 2.5 2.5 2.5-2.5" />
          <path d="m17 9.5 2.5-2.5" />
        </svg>
      );
    case "roles":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={styles.orchestratorIcon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3.75 6.5 6v5.4c0 4.05 2.3 7.73 5.5 8.85 3.2-1.12 5.5-4.8 5.5-8.85V6L12 3.75Z" />
          <path d="M9.4 11.7 11 13.3l3.6-3.6" />
        </svg>
      );
  }

  return null;
}

export function ObsidianLanding() {
  const headerInnerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePainIndex, setActivePainIndex] = useState(0);
  const [painCycleKey, setPainCycleKey] = useState(0);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 18);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(min-width: ${desktopNavigationMinWidthPx}px)`,
    );
    const handleChange = (event?: MediaQueryListEvent) => {
      if (event?.matches ?? mediaQuery.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (painPoints.length < 2) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setActivePainIndex(
        (currentIndex) => (currentIndex + 1) % painPoints.length,
      );
      setPainCycleKey((currentKey) => currentKey + 1);
    }, painAutoplayMs);

    return () => window.clearTimeout(timeoutId);
  }, [activePainIndex, painCycleKey]);

  const handlePainSelect = (index: number) => {
    setActivePainIndex(index);
    setPainCycleKey((currentKey) => currentKey + 1);
  };

  const navigateToAnchor = (href: string) => {
    if (!href.startsWith("#")) {
      return false;
    }

    if (href === "#top") {
      window.history.replaceState(null, "", href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return true;
    }

    const anchorElement = document.getElementById(href.slice(1));

    if (!anchorElement) {
      return false;
    }

    const headerHeight =
      headerInnerRef.current?.getBoundingClientRect().height ?? 76;
    const top =
      anchorElement.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      24;

    window.history.replaceState(null, "", href);
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    return true;
  };

  const handleAnchorNavigation = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenuAfterNavigation = false,
  ) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();

    const navigate = () => {
      if (!navigateToAnchor(href)) {
        window.location.hash = href;
      }
    };

    if (closeMenuAfterNavigation) {
      setIsMobileMenuOpen(false);
      window.setTimeout(navigate, mobileMenuCloseDelayMs);
      return;
    }

    navigate();
  };

  return (
    <div className={styles.page}>
      <button
        type="button"
        aria-label="Закрыть меню"
        aria-hidden={!isMobileMenuOpen}
        tabIndex={isMobileMenuOpen ? 0 : -1}
        className={`${styles.mobileMenuBackdrop} ${
          isMobileMenuOpen ? styles.mobileMenuBackdropVisible : ""
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <header className={styles.header}>
        <div
          ref={headerInnerRef}
          className={`${styles.headerInner} ${
            isScrolled || isMobileMenuOpen
              ? styles.headerInnerScrolled
              : styles.headerInnerTop
          } ${isMobileMenuOpen ? styles.headerInnerMenuOpen : ""}`}
        >
          <a
            href="#top"
            className={styles.brand}
            onClick={(event) =>
              handleAnchorNavigation(event, "#top", isMobileMenuOpen)
            }
          >
            <Image
              src={headerLogoSrc}
              alt="Unica"
              width={54}
              height={54}
              priority
              className={styles.brandLogo}
            />
            <span className={styles.brandWordmark}>Unica</span>
          </a>

          <nav className={styles.nav} aria-label="Section navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.navLink}
                onClick={(event) => handleAnchorNavigation(event, item.href)}
              >
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

          <a
            href="#contact"
            className={styles.headerButton}
            onClick={(event) => handleAnchorNavigation(event, "#contact")}
          >
            Заказать демо
          </a>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="obsidian-mobile-menu"
            className={`${styles.mobileMenuButton} ${
              isMobileMenuOpen ? styles.mobileMenuButtonOpen : ""
            }`}
            onClick={() => setIsMobileMenuOpen((currentState) => !currentState)}
          >
            <span className={styles.mobileMenuButtonBars} aria-hidden="true">
              <span className={styles.mobileMenuBar} />
              <span className={styles.mobileMenuBar} />
              <span className={styles.mobileMenuBar} />
            </span>
          </button>
        </div>

        <div
          id="obsidian-mobile-menu"
          aria-hidden={!isMobileMenuOpen}
          className={`${styles.mobileMenuPanel} ${
            isMobileMenuOpen ? styles.mobileMenuPanelOpen : ""
          }`}
        >
          <div className={styles.mobileMenuCard}>
            <nav
              className={styles.mobileNav}
              aria-label="Mobile section navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={(event) =>
                    handleAnchorNavigation(event, item.href, true)
                  }
                >
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main id="top" className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroViewport}>
            <div
              className={`${styles.heroRock} ${styles.heroRockLeft}`}
              aria-hidden="true"
            >
              <Image
                src={stoneLeftSrc}
                alt=""
                fill
                priority
                sizes={stoneLeftSizes}
                className={styles.heroRockImage}
              />
            </div>
            <div
              className={`${styles.heroRock} ${styles.heroRockRight}`}
              aria-hidden="true"
            >
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
                Модели, корпоративные знания, документы, речь, агенты и
                интеграции в одной управляемой среде для cloud, on-prem и
                hybrid.
              </p>

              <div className={styles.buttonRow}>
                <a
                  href="#contact"
                  className={`${styles.primaryButton} ${styles.heroPrimaryButton}`}
                >
                  Заказать демо
                </a>
              </div>
            </div>

            <div className={styles.heroStage}>
              <ObsidianHeroInterface />
            </div>
          </div>
        </section>

        <section className={styles.trustSection}>
          <div className={styles.trustSurface}>
            <div className={styles.trustCaption}>
              Нам доверяют крупные команды и госсектор
            </div>
            <div className={styles.logoRow}>
              {trustLogos.map((logo) => (
                <span
                  key={logo.label}
                  className={`${styles.logoItem} ${
                    logo.variant === "icon-label"
                      ? styles.logoItemIconLabel
                      : styles.logoItemLogo
                  }`}
                >
                  <Image
                    src={logo.src}
                    alt={logo.label}
                    width={logo.imageWidth}
                    height={logo.imageHeight}
                    sizes="(max-width: 809px) 160px, 240px"
                    className={styles.logoImage}
                    style={
                      {
                        width: "auto",
                        height: `${logo.height}rem`,
                        filter: logo.filter,
                        opacity: logo.opacity,
                      } as CSSProperties
                    }
                  />
                  {"caption" in logo ? (
                    <span
                      className={styles.logoText}
                      style={
                        "captionWidth" in logo
                          ? ({
                              maxWidth: `${logo.captionWidth}rem`,
                            } as CSSProperties)
                          : undefined
                      }
                    >
                      {logo.caption}
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.shell}>
          <section
            id="pain"
            className={`${styles.ruleSection} ${styles.painSection}`}
          >
            <div className={styles.painGrid}>
              <div className={styles.painHeadingBlock}>
                <h2 className={`${styles.display} ${styles.painTitle}`}>
                  {painSection.titleLines.map((line) => (
                    <span key={line} className={styles.painTitleLine}>
                      {line}
                    </span>
                  ))}
                </h2>
              </div>

              <div className={styles.painContent}>
                <div className={styles.painIntroBlock}>
                  <p className={styles.painIntro}>{painSection.description}</p>
                </div>

                <div className={styles.painRail} aria-label={painSection.title}>
                  {painPoints.map((item, index) => {
                    const isActive = index === activePainIndex;

                    return (
                      <button
                        key={item.title}
                        type="button"
                        className={`${styles.painRailButton} ${
                          isActive ? styles.painRailButtonActive : ""
                        }`}
                        aria-pressed={isActive}
                        aria-controls={`pain-preview-${index}`}
                        onClick={() => handlePainSelect(index)}
                        onMouseEnter={() => {
                          if (!isActive) {
                            handlePainSelect(index);
                          }
                        }}
                        onFocus={() => {
                          if (!isActive) {
                            handlePainSelect(index);
                          }
                        }}
                      >
                        {isActive ? (
                          <span
                            className={styles.painRailProgress}
                            aria-hidden="true"
                          >
                            <span
                              key={`${activePainIndex}-${painCycleKey}`}
                              className={styles.painRailProgressFill}
                              style={{
                                animationDuration: `${painAutoplayMs}ms`,
                              }}
                            />
                          </span>
                        ) : null}
                        <span className={styles.painRailLabel}>
                          {item.title}
                        </span>
                        {isActive ? (
                          <span className={styles.painRailDescription}>
                            {item.description}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.painVisual}>
                <div className={styles.painVisualFrame}>
                  {painPoints.map((item, index) => {
                    const isActive = index === activePainIndex;

                    return (
                      <div
                        key={item.title}
                        id={`pain-preview-${index}`}
                        className={`${styles.painVisualLayer} ${
                          isActive ? styles.painVisualLayerActive : ""
                        }`}
                        aria-hidden={!isActive}
                      >
                        <Image
                          src={item.imageSrc}
                          alt={isActive ? item.imageAlt : ""}
                          fill
                          sizes="(max-width: 1100px) calc(100vw - 2rem), 58vw"
                          className={styles.painVisualImage}
                          style={{ objectPosition: item.imagePosition }}
                          priority={index === 0}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section
            className={`${styles.ruleSection} ${styles.orchestratorSection}`}
          >
            <div className={styles.orchestratorRow}>
              <div className={styles.orchestratorHeader}>
                <h2 className={`${styles.display} ${styles.orchestratorTitle}`}>
                  Умный оркестратор корпоративного AI
                </h2>
              </div>

              <div className={styles.orchestratorGrid}>
                {orchestratorHighlights.map((item) => (
                  <article key={item.title} className={styles.orchestratorCard}>
                    <OrchestratorIcon kind={item.icon} />
                    <div className={styles.orchestratorCardBody}>
                      <h3 className={styles.orchestratorCardTitle}>
                        {item.title}
                      </h3>
                      <p className={styles.orchestratorCardText}>
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="platform"
            className={`${styles.ruleSection} ${styles.chapterSection} ${styles.platformSection}`}
          >
            <div className={styles.chapterGrid}>
              <div className={styles.chapterLead}>
                <div className={styles.chapterLeadCopy}>
                  <h2 className={`${styles.display} ${styles.sectionTitle}`}>
                    Запускайте AI
                    <br />
                    в реальных
                    <br />
                    процессах
                  </h2>
                  <p className={styles.chapterIntro}>
                    От внутреннего поиска и сервис-деска до документов, речи и
                    workflow-сценариев в одном рабочем контуре.
                  </p>
                </div>
              </div>

              <div className={styles.chapterBody}>
                <div className={styles.featureGrid}>
                  {featureCards.map((card) => (
                    <article key={card.title} className={styles.featureCard}>
                      <div className={styles.featureVisual}>
                        <div
                          className={`${styles.stone} ${styles.featureStone}`}
                        />
                        <Image
                          src={screenSrc}
                          alt={card.title}
                          fill
                          sizes="(max-width: 1100px) calc(100vw - 2rem), 42vw"
                          className={styles.shotImage}
                          style={{ objectPosition: card.imagePosition }}
                        />
                      </div>
                      <div className={styles.featureCardBody}>
                        <h3
                          className={`${styles.display} ${styles.featureCardTitle}`}
                        >
                          {card.title}
                        </h3>
                        <p className={styles.featureCardText}>
                          {card.description}
                        </p>
                        <a href={card.href} className={styles.ghostButton}>
                          {card.cta}
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

                <div id="scenarios" className={styles.useCaseLineup}>
                  {useCases.map((item, index) => (
                    <div key={item.title} className={styles.useCaseItem}>
                      <span className={styles.useCaseNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="architecture"
            className={`${styles.ruleSection} ${styles.chapterSection} ${styles.architectureSection}`}
          >
            <div className={styles.chapterGrid}>
              <div className={styles.chapterLead}>
                <div className={styles.chapterLeadCopy}>
                  <h2 className={`${styles.display} ${styles.sectionTitle}`}>
                    Создано для
                    <br />
                    защищённых
                    <br />
                    контуров
                  </h2>
                  <p className={styles.chapterIntro}>
                    Для команд, которым нужен закрытый контур, управляемое
                    подключение моделей, прозрачный security layer и контроль
                    ролей по умолчанию.
                  </p>
                </div>
              </div>

              <div
                className={`${styles.chapterBody} ${styles.architectureBody}`}
              >
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
                      <div className={styles.architectureLayerTitle}>
                        {layer.title}
                      </div>
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
              </div>
            </div>
          </section>

          <section
            id="roi"
            className={`${styles.ruleSection} ${styles.chapterSection} ${styles.roiSection}`}
          >
            <div className={styles.chapterGrid}>
              <div className={styles.chapterLead}>
                <div className={styles.chapterLeadCopy}>
                  <h2 className={`${styles.display} ${styles.sectionTitle}`}>
                    Корпоративный AI
                    <br />
                    уже не дорогой
                  </h2>
                  <p className={styles.chapterIntro}>
                    Быстрый старт, предсказуемая стоимость и понятный путь от
                    пилота к продуктивному сценарию без долгой кастомной
                    разработки.
                  </p>
                </div>
              </div>

              <div className={`${styles.chapterBody} ${styles.roiBody}`}>
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

                <p className={`${styles.pricingNote} ${styles.chapterNote}`}>
                  Финальная стоимость зависит от модели поставки, модулей,
                  интеграций, требований к безопасности, поддержки и объёма
                  использования.
                </p>

                <div className={styles.missionBlock}>
                  <h3 className={`${styles.display} ${styles.missionTitle}`}>
                    Мы помогаем компаниям и государству кратно увеличивать
                    производительность труда за счёт запуска безопасного AI.
                  </h3>
                  <p className={styles.missionText}>
                    Unica создаётся как платформа, которая делает знания,
                    документы, речь и бизнес-логику частью новой цифровой
                    рабочей силы — управляемой, безопасной и полезной для
                    экономики.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="contact"
            className={`${styles.ruleSection} ${styles.section} ${styles.contactSection}`}
          >
            <div className={styles.conversionShell}>
              <div className={styles.conversionGrid}>
                <div className={styles.conversionLeadPanel}>
                  <span className={styles.conversionEyebrow}>
                    Запуск под ваш контур
                  </span>
                  <h2 className={`${styles.display} ${styles.conversionTitle}`}>
                    Покажем ваш сценарий в работе
                  </h2>
                  <p className={styles.conversionLead}>
                    Оставьте контакт и пару слов о задаче. Подготовим демо под
                    ваш контур и сценарий пилота.
                  </p>
                </div>

                <ObsidianLeadForm />
              </div>
            </div>
          </section>

          <section
            className={`${styles.ruleSection} ${styles.section} ${styles.faqSection}`}
          >
            <div className={styles.faqSectionGrid}>
              <div className={styles.faqSectionIntro}>
                <h2 className={`${styles.display} ${styles.sectionTitle}`}>
                  Частые вопросы
                </h2>
              </div>

              <div className={styles.faqBlock}>
                <div className={styles.faqList}>
                  {faqItems.map((item) => (
                    <details key={item.question} className={styles.faqItem}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerInner}`}>
          <span>Unica AI</span>
          <span>AI-платформа для корпоративных команд</span>
        </div>
      </footer>
    </div>
  );
}
