export const OBSIDIAN_HERO_ARTBOARD = {
  width: 1912,
  height: 760,
} as const;

export type ObsidianHeroMockIcon =
  | "plus"
  | "sparkles"
  | "brain"
  | "file"
  | "chain"
  | "wand"
  | "sliders"
  | "slidersHorizontal"
  | "bars"
  | "chevron"
  | "chevronDown"
  | "chevronsUpDown"
  | "audio"
  | "lightning"
  | "download"
  | "close"
  | "at"
  | "paperclip"
  | "send"
  | "copy"
  | "ellipsis"
  | "unica";

export type ObsidianHeroMockVariant = "desktop" | "compact" | "narrow";

export type ObsidianHeroMockTextSegment = {
  text: string;
  highlight?: boolean;
  metadata?: boolean;
};

export type ObsidianHeroMockLine = {
  segments: readonly ObsidianHeroMockTextSegment[];
};

export type ObsidianHeroMockNavItem = {
  icon: ObsidianHeroMockIcon;
  label: string;
  count?: string;
  active?: boolean;
};

export type ObsidianHeroMockHistoryItem = {
  label: string;
  count?: string;
  active?: boolean;
  indent?: boolean;
  icon?: ObsidianHeroMockIcon;
};

export type ObsidianHeroMockWorkspaceAction = {
  label: string;
  active?: boolean;
};

export type ObsidianHeroMockChatBubbleKind = "assistantText" | "userFile";

export type ObsidianHeroMockChatBubble = {
  id: string;
  kind: ObsidianHeroMockChatBubbleKind;
  content?: string;
  title?: string;
  extension?: string;
  icon?: ObsidianHeroMockIcon;
};

export type ObsidianHeroMockSummarySection = {
  heading: string;
  body: string;
};

export type ObsidianHeroMockAiMenuItem = {
  id: string;
  label: string;
};

export type ObsidianHeroMockLoopPoint = {
  x: number;
  y: number;
};

export type ObsidianHeroMockLoopPhases = {
  idleEndMs: number;
  dragEndMs: number;
  processingEndMs: number;
  readyEndMs: number;
  transcriptHoverEndMs: number;
  inspectorOpenEndMs: number;
  actionButtonEndMs: number;
  actionPickEndMs: number;
  rewriteEndMs: number;
  finalBubbleEndMs: number;
  pauseEndMs: number;
  newChatHoverEndMs: number;
  resetEndMs: number;
  cycleEndMs: number;
};

export type ObsidianHeroMockScene = {
  variant: ObsidianHeroMockVariant;
  sidebar: {
    workspaceName: string;
    workspacePlan: string;
    primaryNav: readonly ObsidianHeroMockNavItem[];
    historyTitle: string;
    historyItems: readonly ObsidianHeroMockHistoryItem[];
    footer: {
      name: string;
      email: string;
    };
  };
  workspace: {
    title: string;
    loop: {
      cycleDurationMs: number;
      phases: ObsidianHeroMockLoopPhases;
      cursorTargets: {
        fileStart: ObsidianHeroMockLoopPoint;
        composerDrop: ObsidianHeroMockLoopPoint;
        transcriptAction: ObsidianHeroMockLoopPoint;
        aiActionButton: ObsidianHeroMockLoopPoint;
        aiActionMenuItem: ObsidianHeroMockLoopPoint;
        newChat: ObsidianHeroMockLoopPoint;
      };
    };
    fileCard: {
      title: string;
      extension: string;
      processingSteps: readonly string[];
      readyActions: readonly ObsidianHeroMockWorkspaceAction[];
    };
    chat: {
      idleAssistant: ObsidianHeroMockChatBubble;
      fileBubble: ObsidianHeroMockChatBubble;
      readyAssistant: ObsidianHeroMockChatBubble;
      summaryAssistant: ObsidianHeroMockChatBubble;
    };
    composer: {
      idleText: string;
      dropText: string;
    };
  };
  inspector: {
    title: string;
    actionLabel: string;
    rawLines: readonly ObsidianHeroMockLine[];
    summarySections: readonly ObsidianHeroMockSummarySection[];
    menuItems: readonly ObsidianHeroMockAiMenuItem[];
    hint: string;
    showDownload: boolean;
    showClose: boolean;
  };
};

const PRIMARY_NAV: readonly ObsidianHeroMockNavItem[] = [
  { icon: "plus", label: "Новый чат", active: true },
  { icon: "sparkles", label: "Ассистенты" },
  { icon: "brain", label: "База знаний", count: "25" },
] as const;

const HISTORY_ITEMS: readonly ObsidianHeroMockHistoryItem[] = [
  { label: "Встречи", count: "18", active: true, icon: "sparkles" },
  { label: "Регламенты", count: "5", icon: "wand" },
  { label: "Документы", count: "98", icon: "wand" },
  { label: "Договоры", count: "3", icon: "wand" },
  { label: "Поддержка", count: "82", icon: "wand" },
  { label: "Протоколы", count: "26", icon: "wand" },
  { label: "Закупки", count: "57", icon: "wand" },
  { label: "Бухгалтерия", count: "3", icon: "wand" },
  { label: "Поручения", count: "2", icon: "wand" },
  { label: "Клиенты", count: "986", icon: "wand" },
  { label: "Дизайн", count: "81", icon: "wand" },
  { label: "Логистика", count: "62", icon: "wand" },
  { label: "Код", count: "1", icon: "wand" },
] as const;

const RAW_TRANSCRIPT_LINES: readonly ObsidianHeroMockLine[] = [
  {
    segments: [
      { text: "[Анна, 11:03:00-11:03:16]: ", metadata: true },
      {
        text:
          "Коллеги, давайте зафиксируем, что показываем «СеверЛогистику» на встрече в четверг, потому что после созвона мне нужно отправить клиенту письмо с договоренностями.",
      },
    ],
  },
  {
    segments: [
      { text: "[Игорь, 11:03:17-11:03:39]: ", metadata: true },
      {
        text:
          "У них главный запрос не про красивый интерфейс, а про скорость. Руководитель клиентского отдела хочет открыть одну рабочую страницу и сразу понять, что происходит по сделке, по договору и по последним письмам.",
      },
    ],
  },
  {
    segments: [
      { text: "[Анна, 11:03:40-11:03:55]: ", metadata: true },
      {
        text:
          "Да, и для них ключевая формулировка — единое окно. Они несколько раз повторили это почти одними и теми же словами, значит именно через это и надо строить весь показ.",
      },
    ],
  },
  {
    segments: [
      { text: "[Мария, 11:03:56-11:04:18]: ", metadata: true },
      {
        text:
          "Я бы первым сценарием дала вопрос по клиенту, потом поиск по договору, потом краткий пересказ длинной переписки, чтобы они сразу увидели, что не нужно читать двадцать писем руками.",
      },
    ],
  },
  {
    segments: [
      { text: "[Дмитрий, 11:04:19-11:04:40]: ", metadata: true },
      {
        text:
          "По данным на первом этапе берем систему продаж и хранилище документов. Почту лучше сейчас не обещать, иначе мы уйдем в подготовку подключения и снова потеряем неделю.",
      },
    ],
  },
  {
    segments: [
      { text: "[Ольга, 11:05:01-11:05:23]: ", metadata: true },
      {
        text:
          "Еще надо заранее снять возражение юристов. Они вернулись к теме прав доступа и спросили, увидит ли отдел продаж внутренние комментарии по договору и служебные пометки.",
      },
    ],
  },
  {
    segments: [
      { text: "[Игорь, 11:05:24-11:05:45]: ", metadata: true },
      {
        text:
          "Тогда в показе делаем отдельную сцену: один и тот же вопрос от менеджера и от юриста, чтобы было видно, что ответы разные и зависят от роли человека.",
      },
    ],
  },
  {
    segments: [
      { text: "[Анна, 11:07:20-11:07:46]: ", metadata: true },
      {
        text:
          "Тогда договорились так: Мария собирает сценарий показа, Игорь готовит примеры вопросов, Ольга описывает разграничение доступа, а я к вечеру отправляю клиенту письмо с планом пробного запуска.",
      },
    ],
  },
] as const;

const SUMMARY_SECTIONS: readonly ObsidianHeroMockSummarySection[] = [
  {
    heading: "Контекст",
    body: "Команда готовит демонстрацию для клиента «СеверЛогистик» и обсуждает, как показать скорость работы Unica в едином окне.",
  },
  {
    heading: "Основная мысль",
    body: "Клиенту нужен не красивый интерфейс сам по себе, а быстрый путь от вопроса к ответу по сделке, договору и переписке.",
  },
  {
    heading: "Решение",
    body: "В показе акцент делают на разные роли, понятные источники ответа и отдельный визуальный сценарий для транскрипции внутри рабочего чата.",
  },
  {
    heading: "Следующий шаг",
    body: "Собрать сценарий показа, примеры вопросов и краткое письмо клиенту с планом пробного запуска.",
  },
] as const;

const AI_ACTION_MENU_ITEMS: readonly ObsidianHeroMockAiMenuItem[] = [
  { id: "summary", label: "Сделать сводку" },
  { id: "minutes", label: "Оформить протокол" },
  { id: "risks", label: "Выделить риски" },
  { id: "email", label: "Подготовить письмо" },
] as const;

const LOOP_PHASES: ObsidianHeroMockLoopPhases = {
  idleEndMs: 1000,
  dragEndMs: 2400,
  processingEndMs: 3800,
  readyEndMs: 4600,
  transcriptHoverEndMs: 5200,
  inspectorOpenEndMs: 5900,
  actionButtonEndMs: 6700,
  actionPickEndMs: 7400,
  rewriteEndMs: 9200,
  finalBubbleEndMs: 10100,
  pauseEndMs: 11200,
  newChatHoverEndMs: 12300,
  resetEndMs: 13000,
  cycleEndMs: 15000,
};

const CURSOR_TARGETS = {
  fileStart: { x: 1218, y: 188 },
  composerDrop: { x: 1014, y: 664 },
  transcriptAction: { x: 878, y: 329 },
  aiActionButton: { x: 1730, y: 230 },
  aiActionMenuItem: { x: 1642, y: 302 },
  newChat: { x: 96, y: 138 },
} as const;

export function getObsidianHeroMockScene(hostWidth: number): ObsidianHeroMockScene {
  const variant: ObsidianHeroMockVariant =
    hostWidth > 0 && hostWidth < 540
      ? "narrow"
      : hostWidth > 0 && hostWidth < 820
        ? "compact"
        : "desktop";

  return {
    variant,
    sidebar: {
      workspaceName: "Unica AI",
      workspacePlan: "Enterprise",
      primaryNav: PRIMARY_NAV,
      historyTitle: "История чатов",
      historyItems: variant === "narrow" ? HISTORY_ITEMS.slice(0, 10) : HISTORY_ITEMS,
      footer: {
        name: "Антон Петров",
        email: "petrov@email.ru",
      },
    },
    workspace: {
      title: "audio 2026-03-01 21-06-39",
      loop: {
        cycleDurationMs: LOOP_PHASES.cycleEndMs,
        phases: LOOP_PHASES,
        cursorTargets: CURSOR_TARGETS,
      },
      fileCard: {
        title: "audio_2026-03-01_21-06-39.ogg",
        extension: "ogg",
        processingSteps: ["Загрузка", "Распознавание", "Готово"],
        readyActions: [
          { label: "Транскрипция", active: true },
          { label: "Матрица фактов" },
          { label: "Редактор" },
          { label: "Сводка" },
        ],
      },
      chat: {
        idleAssistant: {
          id: "assistant-idle",
          kind: "assistantText",
          content: "Перетащите запись, и я сделаю расшифровку или сводку.",
        },
        fileBubble: {
          id: "user-file",
          kind: "userFile",
          title: "audio_2026-03-01_21-06-39.ogg",
          extension: "ogg",
          icon: "audio",
        },
        readyAssistant: {
          id: "assistant-ready",
          kind: "assistantText",
          content: "Запись распознана. Откройте транскрипцию или примените AI-действие.",
        },
        summaryAssistant: {
          id: "assistant-summary",
          kind: "assistantText",
          content:
            "Главное: команда обсуждает, как различать обычные сообщения и транскрипции. Решение и следующий шаг выделены.",
        },
      },
      composer: {
        idleText: "",
        dropText: "Отпустите, чтобы загрузить",
      },
    },
    inspector: {
      title: "Транскрипция",
      actionLabel: "AI-действия",
      rawLines: variant === "narrow" ? RAW_TRANSCRIPT_LINES.slice(0, 5) : RAW_TRANSCRIPT_LINES,
      summarySections: SUMMARY_SECTIONS,
      menuItems: AI_ACTION_MENU_ITEMS,
      hint: "Введите текст или нажмите «/», чтобы открыть команды",
      showDownload: variant !== "narrow",
      showClose: true,
    },
  };
}
