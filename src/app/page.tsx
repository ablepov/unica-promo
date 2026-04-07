"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const nav = [
  ["Платформа", "#platform"],
  ["Сценарии", "#scenarios"],
  ["Архитектура", "#architecture"],
  ["Governance", "#governance"],
  ["Интеграции", "#integrations"],
  ["Стоимость", "#pricing"],
] as const;

const problems = [
  ["Разрозненные AI-пилоты", "Отдельные команды запускают отдельные решения, но не получают общую платформу, где сценарии, роли, данные и правила связаны между собой."],
  ["Слабый контроль доступа", "Без общего governance трудно объяснить, какие источники использовались, кто видел данные и по каким правилам был сформирован результат."],
  ["Нет связи с процессом", "Даже сильный ответ модели не решает задачу, если AI не встроен в workflow, роли, маршруты и действия бизнеса."],
] as const;

const scenarios = [
  "Внутренний поиск по знаниям и регламентам",
  "Ассистент для service desk и первой линии",
  "Извлечение данных из документов",
  "Контакт-центр и речевая аналитика",
  "AI-ассистенты для сотрудников",
  "Workflow-автоматизация поверх enterprise-систем",
] as const;

const integrations = [
  ["Модели и вычисления", "LLM, on-prem модели, внешние AI API"],
  ["Знания и хранилища", "DMS, SharePoint, Confluence, NAS / S3, Vector DB"],
  ["Корпоративные системы", "CRM, ERP, Service Desk, ECM, BI"],
  ["Доступ и коммуникации", "IAM, SSO, телефония, email, chat channels, API / HTTP / MCP"],
] as const;

const faq = [
  ["Чем Unica отличается от корпоративного чат-бота?", "Unica — это не просто интерфейс для диалога с LLM. Это enterprise AI-платформа, которая связывает знания, документы, интеграции, workflow, skills и agents в единый управляемый контур."],
  ["Можно ли развернуть Unica on-prem?", "Да. Платформа подходит для сценариев, где нужен собственный защищённый контур и контроль инфраструктуры."],
  ["Можно ли использовать разные модели?", "Да. Unica поддерживает гибкий подход к подключению LLM и помогает не зависеть от одного поставщика."],
  ["Как контролируется качество ответа?", "Через корпоративные источники, настройку сценариев, audit trail, роли, политики и управляемый orchestration-контур."],
  ["С чего лучше начать?", "Обычно — с одного или нескольких сценариев с быстрым эффектом: внутренний поиск, документы, service desk, речевая аналитика или автоматизация рутинных задач."],
] as const;

const heroIntegrations = [
  ["github", "GitHub"],
  ["drive", "Google Drive"],
  ["slack", "Slack"],
] as const;

const heroStackCards = [
  ["active", "incident", "Data Layer", "DMS / CRM / ERP", "Документы, знания и рабочий контекст."],
  ["muted", "target", "Governance", "RBAC / Policies / Audit", "Прозрачный путь от источника к результату."],
  ["muted", "panel", "Orchestration", "Skills / Routing / Actions", "Сценарии и workflow между шагами процесса."],
  ["muted", "panel", "Channels", "Search / UI / Voice / API", "Единый контур для сотрудников и сервисов."],
] as const;

const heroChecklist = [
  "Cloud, on-prem и hybrid",
  "RBAC, audit log и policy layer",
  "RAG, OCR, ASR, skills и workflow",
  "CRM, ERP, IAM, DMS, API и contact center",
] as const;

function Label({ children }: { children: string }) {
  return <p className="section-label">{children}</p>;
}

function HeroIcon({ kind }: { kind: "github" | "drive" | "slack" | "incident" | "target" | "panel" }) {
  if (kind === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18c-3.5 1-3.5-2-5-2" />
        <path d="M20 16.5v-2.3a4.1 4.1 0 0 0-1.1-2.85c1.05-3.2-.1-4.35-.1-4.35a3.4 3.4 0 0 0-2.4.95 11.8 11.8 0 0 0-6.8 0A3.4 3.4 0 0 0 7.2 7c0 .0-1.15 1.15-.1 4.35A4.1 4.1 0 0 0 6 14.2v2.3A2.5 2.5 0 0 0 8.5 19h7A2.5 2.5 0 0 0 18 16.5" />
      </svg>
    );
  }

  if (kind === "drive") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 4 3 5.2-5.1 8.8H3.2L9 4Z" />
        <path d="m15 4 5.8 10.1h-4.7L10.4 4H15Z" />
        <path d="m7 18 2.3-3.9H21L18.7 18H7Z" />
      </svg>
    );
  }

  if (kind === "slack") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4.5a2 2 0 1 1 4 0v3.25H8A2.25 2.25 0 0 1 8 4.5Z" />
        <path d="M4.5 8a2 2 0 1 1 0 4h3.25V8A2.25 2.25 0 0 1 4.5 8Z" />
        <path d="M16 19.5a2 2 0 1 1-4 0v-3.25h4A2.25 2.25 0 0 1 16 19.5Z" />
        <path d="M19.5 16a2 2 0 1 1 0-4h-3.25v4A2.25 2.25 0 0 1 19.5 16Z" />
        <path d="M16 4.5a2 2 0 1 0-4 0v3.25h4A2.25 2.25 0 0 0 16 4.5Z" />
        <path d="M19.5 8a2 2 0 1 0 0 4h-3.25V8A2.25 2.25 0 0 0 19.5 8Z" />
        <path d="M8 19.5a2 2 0 1 0 4 0v-3.25H8A2.25 2.25 0 0 0 8 19.5Z" />
        <path d="M4.5 16a2 2 0 1 0 0-4h3.25v4A2.25 2.25 0 0 0 4.5 16Z" />
      </svg>
    );
  }

  if (kind === "incident") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
        <path d="m5.5 5.5 2.5 2.5" />
        <path d="m16 16 2.5 2.5" />
      </svg>
    );
  }

  if (kind === "target") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M15.75 8.25 20 4" />
        <path d="M16 4h4v4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6.5h14" />
      <path d="M5 12h14" />
      <path d="M5 17.5h9" />
      <path d="M9 9.25v5.5" />
    </svg>
  );
}

export default function Home() {
  const [headerPinned, setHeaderPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderPinned(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <main>
      <div className="shell header-shell">
        <header className={`hero-nav${headerPinned ? " is-pinned" : ""}`}>
          <div className="brand-wrap">
            <Image src="/unica-logo.svg" alt="Unica" width={42} height={42} className="h-[42px] w-[42px]" />
          </div>
          <nav className="nav-links">
            {nav.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <a href="#contact" className="nav-cta">Запросить демо</a>
        </header>
      </div>

      <section className="hero-section">
        <div className="shell">
          <div className="hero-layout">
            <div>
              <Label>Enterprise AI Platform</Label>
              <h1 className="hero-title">Unica — AI-платформа для управляемого запуска AI в enterprise-контуре</h1>
              <p className="hero-copy">
                Не просто интерфейс к LLM, а единая enterprise AI-платформа, которая связывает
                знания, документы, модели, orchestration, governance и бизнес-действия в рабочий контур.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="primary-button hero-button">
                  <span>Запросить демо</span>
                  <span className="button-arrow" aria-hidden="true">→</span>
                </a>
                <a href="#architecture" className="secondary-button hero-button">
                  <span>Смотреть архитектуру</span>
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-shell">
                <div className="hero-orbit" />
                <div className="hero-node-cluster">
                  {heroIntegrations.map(([icon, label], index) => (
                    <div key={label} className={`hero-node hero-node-${index + 1}`}>
                      <div className="hero-node-icon">
                        <HeroIcon kind={icon} />
                      </div>
                      <span className="sr-only">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="hero-stack">
                  {heroStackCards.map(([tone, icon, eyebrow, title, text], index) => (
                    <article key={title} className={`hero-stack-card ${tone} card-${index + 1}`}>
                      <div className="hero-stack-icon">
                        <HeroIcon kind={icon} />
                      </div>
                      <div className="hero-stack-copy">
                        <small>{eyebrow}</small>
                        <strong>{title}</strong>
                        <p>{text}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <article className="hero-query-card">
                  <ul className="hero-query-list">
                    {heroChecklist.map((item) => (
                      <li key={item}>
                        <span className="hero-check">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="shell">
          <div className="section-head">
            <div>
              <Label>Почему это важно</Label>
              <h2>Enterprise нужен не ещё один AI-чат, а управляемый AI-контур</h2>
            </div>
            <p>AI уже появился во многих компаниях, но не стал частью рабочей системы. Unica помогает перейти от отдельных пилотов к платформе, которую можно масштабировать, защищать и развивать.</p>
          </div>
          <div className="card-grid three">
            {problems.map(([title, text]) => (
              <article key={title} className="info-card"><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="white-section">
        <div className="shell split">
          <div>
            <Label>Что такое Unica</Label>
            <h2>Unica — это не просто AI-ассистент, а платформа для enterprise AI</h2>
            <p className="section-copy">Unica объединяет данные, знания, модели, skills, orchestration, workflow и governance в единую платформу, на которой можно запускать рабочие AI-сценарии для сотрудников, команд и бизнес-функций.</p>
            <div className="stack-list">
              <div>Подключает знания, документы и системы в единый AI-layer</div>
              <div>Оркестрирует сценарии, а не только генерирует ответы</div>
              <div>Учитывает роли, ограничения, аудит и enterprise-безопасность</div>
              <div>Связывает AI с реальными действиями, workflow и следующими шагами</div>
            </div>
          </div>
          <div className="dark-panel">
            <div className="card-grid two">
              <article className="glass-module"><h3>Knowledge Layer</h3><p>Документы, базы знаний, политики, CRM и DMS становятся рабочим контекстом.</p></article>
              <article className="glass-module"><h3>Orchestration</h3><p>Маршрутизация, правила, skills, инструменты и agentic flow между этапами.</p></article>
              <article className="glass-module"><h3>Control</h3><p>Роли, аудит, качество ответов, источники и прозрачный путь от запроса к действию.</p></article>
              <article className="glass-module"><h3>Channels</h3><p>Web UI, search, service channels, телефония, chat-интерфейсы и API-поверхность.</p></article>
            </div>
          </div>
        </div>
      </section>

      <section id="scenarios" className="light-section">
        <div className="shell">
          <div className="section-head">
            <div>
              <Label>Сценарии</Label>
              <h2>Unica закрывает не один use case, а целый контур enterprise AI-сценариев</h2>
            </div>
            <p>Ниже — базовые сценарии, с которых можно стартовать и масштабироваться дальше.</p>
          </div>
          <div className="card-grid three">
            {scenarios.map((item) => (
              <article key={item} className="scenario-card"><span>Use case</span><h3>{item}</h3></article>
            ))}
          </div>
        </div>
      </section>

      <section id="governance" className="dark-section">
        <div className="shell split">
          <div>
            <Label>Governance</Label>
            <h2>AI, который можно показать не только пользователю, но и ИТ, ИБ и руководству</h2>
            <p className="section-copy dark">Для enterprise важно не только что говорит модель, но и как формируется ответ, кто имеет доступ к данным и какие действия происходят дальше.</p>
            <div className="stack-list dark">
              <div>RBAC и разграничение доступа по ролям</div>
              <div>Аудит действий, запросов и результатов</div>
              <div>Контроль источников, маршрутов и политик ответа</div>
              <div>Наблюдаемость за сценариями и качеством AI</div>
              <div>Политики для ограничений и enterprise-требований</div>
            </div>
          </div>
          <div className="ambient-grid">
            <article className="ambient-card gold"><h3>Role Policies</h3></article>
            <article className="ambient-card blue"><h3>Audit Trail</h3></article>
            <article className="ambient-card green"><h3>Answer Control</h3></article>
            <article className="ambient-card violet"><h3>Monitoring</h3></article>
          </div>
        </div>
      </section>

      <section id="architecture" className="white-section">
        <div className="shell">
          <Label>Архитектура</Label>
          <h2>Архитектура, которая связывает foundation, Unica core, business logic и каналы</h2>
          <div className="arch-grid">
            <article><strong>01 Foundation</strong><p>LLM, on-prem модели, отечественные поставщики, storage и enterprise API.</p></article>
            <article><strong>02 Unica Core</strong><p>RAG, OCR, ASR, knowledge layer, orchestration, skills, agents и routing.</p></article>
            <article><strong>03 Business Logic</strong><p>Workflow, automation, правила, роли, monitoring и governance.</p></article>
            <article><strong>04 Channels</strong><p>Web UI, поиск, сервисные команды, телефония, contact center и другие интерфейсы.</p></article>
          </div>
        </div>
      </section>

      <section id="integrations" className="dark-section">
        <div className="shell">
          <Label>Интеграции</Label>
          <h2>Unica подключается к существующему enterprise-ландшафту</h2>
          <div className="card-grid four">
            {integrations.map(([title, text]) => (
              <article key={title} className="integration-card"><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="white-section">
        <div className="shell split">
          <div>
            <Label>Стоимость и ROI</Label>
            <h2>Стоимость зависит от контура, модулей и масштаба запуска</h2>
            <p className="section-copy">Unica — это enterprise AI-платформа. Стоимость зависит от модели поставки, состава модулей, интеграций, требований к безопасности и объёма использования.</p>
            <div className="stack-list">
              <div>Быстрый запуск AI без нового зоопарка решений</div>
              <div>Повторно используемая платформенная основа для новых сценариев</div>
              <div>Снижение ручной нагрузки и ускорение процессов</div>
              <div>Контроль и прозрачность для ИТ, ИБ и бизнеса</div>
            </div>
          </div>
          <div className="price-grid">
            <article className="price-card"><strong>Standard</strong><span>от 650 000 ₽</span><p>Для первого управляемого сценария и пилота.</p></article>
            <article className="price-card"><strong>Enterprise</strong><span>от 4,5 млн ₽</span><p>Для закрытых сред, сложных интеграций и расширенных модулей.</p></article>
          </div>
        </div>
      </section>

      <section id="faq" className="light-section">
        <div className="shell">
          <Label>FAQ</Label>
          <h2>Частые вопросы</h2>
          <div className="faq-list">
            {faq.map(([question, answer]) => (
              <details key={question} className="faq-item"><summary>{question}</summary><p>{answer}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="dark-section">
        <div className="shell cta-box">
          <div>
            <Label>Следующий шаг</Label>
            <h2>Покажите ваш процесс, контур и ограничения — мы предложим формат запуска AI на базе Unica</h2>
            <p className="section-copy dark">Этого достаточно, чтобы предложить пилот, набор модулей, интеграций и следующий шаг без длинного предварительного проекта.</p>
          </div>
          <form className="contact-form">
            <input className="form-field" placeholder="Имя" />
            <input className="form-field" placeholder="Компания" />
            <input className="form-field" placeholder="Email или телефон" />
            <select className="form-field"><option>Cloud</option><option>On-prem</option><option>Hybrid</option></select>
            <textarea className="form-field textarea" placeholder="Сценарий или задача" />
            <button type="button" className="submit-button">Запросить демо</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-row">
          <div>
            <Image src="/unica-logo.svg" alt="Unica" width={112} height={24} className="h-6 w-auto" />
            <p>Enterprise AI platform for controlled rollout.</p>
          </div>
          <div className="footer-links">
            {nav.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}


