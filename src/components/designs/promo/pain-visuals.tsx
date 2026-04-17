import Image from "next/image";

import styles from "./promo.module.css";

type PainVisualItem = {
  imageAlt: string;
  imagePosition: string;
  imageSrc: string;
};

type PromoPainVisualProps = {
  index: number;
  isActive: boolean;
  item: PainVisualItem;
  priority?: boolean;
};

function ConfluenceMark() {
  return (
    <svg viewBox="0 0 36 36" className={styles.painIconSvg} aria-hidden="true">
      <path
        d="M6 20.7c2.5-3.8 4.9-6.1 7.2-6.8 1.9-.6 3.9-.4 6.1.8l-4.6 5.5 7.4 6.1c-2.9 2.5-5.6 3.4-8.1 2.7-2.7-.8-5.4-3.6-8-8.3Z"
        fill="url(#confluence-a)"
      />
      <path
        d="M30.1 14.9c-2.5 3.8-4.9 6.1-7.2 6.8-1.9.6-3.9.4-6.1-.8l4.6-5.5-7.4-6.1c2.9-2.5 5.6-3.4 8.1-2.7 2.7.8 5.4 3.6 8 8.3Z"
        fill="url(#confluence-b)"
      />
      <defs>
        <linearGradient id="confluence-a" x1="4" y1="10" x2="21" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0E74FF" />
          <stop offset="1" stopColor="#2A55E3" />
        </linearGradient>
        <linearGradient id="confluence-b" x1="15" y1="4" x2="31" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E8DFF" />
          <stop offset="1" stopColor="#1E4FE0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DiskMark() {
  return (
    <svg viewBox="0 0 36 36" className={styles.painIconSvg} aria-hidden="true">
      <ellipse cx="18" cy="18" rx="12.5" ry="8.3" transform="rotate(-18 18 18)" fill="#0E74FF" />
      <ellipse cx="18" cy="18" rx="7.5" ry="4.8" transform="rotate(-18 18 18)" fill="#22201f" />
    </svg>
  );
}

function DocumentMark() {
  return (
    <svg viewBox="0 0 36 36" className={styles.painIconSvg} aria-hidden="true">
      <path d="M10 5h11l5 5v21H10V5Z" fill="#5C8DFF" />
      <path d="M21 5v6h6" fill="#AFC7FF" />
      <path d="M14 15.5h8" stroke="#F4F6FF" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M14 20.5h8" stroke="#F4F6FF" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M14 25.5h6" stroke="#F4F6FF" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function TelegramMark() {
  return (
    <svg viewBox="0 0 36 36" className={styles.painIconSvg} aria-hidden="true">
      <circle cx="18" cy="18" r="14" fill="#2CA5E0" />
      <path d="m11.2 17.8 12.4-4.8c.6-.2 1.1.2.9.8l-2 9.5c-.1.6-.5.7-.9.5l-3.1-2.3-1.5 1.4c-.2.2-.3.3-.7.3l.2-3.3 6.1-5.5c.3-.2-.1-.4-.4-.2l-7.5 4.8-3.2-1c-.7-.2-.7-.7.1-1Z" fill="#fff" />
    </svg>
  );
}

function PainKnowledgeVisual({ isActive, item }: { isActive: boolean; item: PainVisualItem }) {
  return (
    <div
      aria-hidden={!isActive}
      aria-label={isActive ? item.imageAlt : undefined}
      className={styles.painGraphicScene}
      role={isActive ? "img" : undefined}
    >
      <div className={styles.painSceneGlow} />
      <div className={styles.painKnowledgeCard}>
        <svg viewBox="0 0 100 100" className={styles.painKnowledgePath} aria-hidden="true">
          <path d="M30 35V23c0-5.5 4.5-10 10-10h19" />
          <path d="M70 35V23c0-5.5-4.5-10-10-10H41" />
        </svg>

        <div className={`${styles.painIconBubble} ${styles.painBubbleTop}`}>
          <DiskMark />
        </div>
        <div className={`${styles.painIconBubble} ${styles.painBubbleLeft}`}>
          <ConfluenceMark />
        </div>
        <div className={`${styles.painIconBubble} ${styles.painBubbleCenter}`}>
          <TelegramMark />
        </div>
        <div className={`${styles.painIconBubble} ${styles.painBubbleRight}`}>
          <DocumentMark />
        </div>

        <div className={`${styles.painKnowledgeTitle} ${styles.display}`}>
          Знания из любых источников в едином месте
        </div>
        <div className={styles.painKnowledgeSubtitle}>Внешних и внутренних</div>
        <div className={styles.painKnowledgeButton}>Подключить знания</div>
      </div>
    </div>
  );
}

function PainRolloutVisual({ isActive, item }: { isActive: boolean; item: PainVisualItem }) {
  return (
    <div
      aria-hidden={!isActive}
      aria-label={isActive ? item.imageAlt : undefined}
      className={styles.painGraphicScene}
      role={isActive ? "img" : undefined}
    >
      <div className={styles.painSceneGlow} />
      <div className={`${styles.painRolloutTitle} ${styles.display}`}>
        Сценарий доходит
        <br />
        до рабочего
        <br />
        процесса
      </div>

      <svg viewBox="0 0 100 100" className={styles.painRolloutArrows} aria-hidden="true">
        <defs>
          <marker
            id="pain-arrow-head"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto-start-reverse"
          >
            <path d="M0 0 6 3 0 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </marker>
        </defs>
        <path d="M20 76C38 76 47 61 50 52" markerEnd="url(#pain-arrow-head)" />
        <path d="M61 50c18 0 27-9 30-22" markerEnd="url(#pain-arrow-head)" />
      </svg>

      <div className={`${styles.painFlowPill} ${styles.painFlowPillPilot}`}>Пилот</div>
      <div className={`${styles.painFlowPill} ${styles.painFlowPillScenario}`}>Сценарий</div>
      <div className={`${styles.painFlowPill} ${styles.painFlowPillProduction}`}>Продуктив</div>
    </div>
  );
}

function PainAccessVisual({ isActive, item }: { isActive: boolean; item: PainVisualItem }) {
  return (
    <div
      aria-hidden={!isActive}
      aria-label={isActive ? item.imageAlt : undefined}
      className={styles.painGraphicScene}
      role={isActive ? "img" : undefined}
    >
      <div className={styles.painSceneGlow} />

      <svg viewBox="0 0 100 100" className={styles.painAccessPaths} aria-hidden="true">
        <path d="M17 0V27c0 4 3 7 7 7h9" />
        <path d="M74 50h9c4 0 7 3 7 7v43" />
      </svg>

      <div className={styles.painAccessCard}>
        <div className={styles.painAccessUserRow}>
          <div className={styles.painAccessAvatar}>ЮС</div>
          <div>
            <div className={styles.painAccessUserName}>Юрьев Сергей</div>
            <div className={styles.painAccessUserRole}>Юрист</div>
          </div>
        </div>

        <div className={styles.painAccessList}>
          <div className={styles.painAccessRow}>
            <span>Базы знаний</span>
            <strong>Доступно</strong>
          </div>
          <div className={styles.painAccessRow}>
            <span>Чат</span>
            <strong>Доступно</strong>
          </div>
          <div className={styles.painAccessRow}>
            <span>Транскрипция</span>
            <strong>Закрыто</strong>
          </div>
        </div>

        <div className={styles.painAccessButton}>История действий</div>
      </div>
    </div>
  );
}

export function PromoPainVisual({
  index,
  isActive,
  item,
  priority = false,
}: PromoPainVisualProps) {
  switch (index) {
    case 0:
      return <PainKnowledgeVisual isActive={isActive} item={item} />;
    case 1:
      return <PainRolloutVisual isActive={isActive} item={item} />;
    case 2:
      return <PainAccessVisual isActive={isActive} item={item} />;
    default:
      return (
        <Image
          src={item.imageSrc}
          alt={isActive ? item.imageAlt : ""}
          fill
          sizes="(max-width: 1100px) calc(100vw - 2rem), 58vw"
          className={styles.painVisualImage}
          style={{ objectPosition: item.imagePosition }}
          priority={priority}
        />
      );
  }
}
