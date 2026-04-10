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

export type ObsidianHeroMockChatRole = "assistant" | "user";

export type ObsidianHeroMockChatMessage = {
  id: string;
  role: ObsidianHeroMockChatRole;
  content: string;
  timestamp: string;
  startMs: number;
  streamDurationMs?: number;
  utilityActions?: readonly ObsidianHeroMockIcon[];
};

export type ObsidianHeroMockWorkspaceAction = {
  label: string;
  active?: boolean;
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
    contextCard: {
      title: string;
      excerpt: string;
      actions: readonly ObsidianHeroMockWorkspaceAction[];
    };
    chat: {
      cycleDurationMs: number;
      fadeOutMs: number;
      messages: readonly ObsidianHeroMockChatMessage[];
    };
    composer: {
      draft: string;
    };
  };
  inspector: {
    title: string;
    actionLabel: string;
    tabs: {
      primary: string;
      secondaryIcon: "plus";
    };
    lines: readonly ObsidianHeroMockLine[];
    hint: string;
    showDownload: boolean;
    showClose: boolean;
  };
};

const PRIMARY_NAV: readonly ObsidianHeroMockNavItem[] = [
  { icon: "plus", label: "Новый чат", active: true },
  { icon: "sparkles", label: "Ассистенты" },
  { icon: "brain", label: "Базы знаний", count: "25" },
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

const TRANSCRIPT_LINES: readonly ObsidianHeroMockLine[] = [
  {
    segments: [
      {
        text: "[Анна, 11:03:00-11:03:16]: ",
        metadata: true,
      },
      {
        text:
          "Коллеги, давайте зафиксируем, что показываем «СеверЛогистику» на встрече в четверг, потому что после созвона мне нужно отправить клиенту письмо с договоренностями.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Игорь, 11:03:17-11:03:39]: ",
        metadata: true,
      },
      {
        text:
          "У них главный запрос не про красивый интерфейс, а про скорость. Руководитель клиентского отдела хочет открыть одну рабочую страницу и сразу понять, что происходит по сделке, по договору и по последним письмам.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Анна, 11:03:40-11:03:55]: ",
        metadata: true,
      },
      {
        text: "Да, и для них ключевая формулировка — ",
      },
      {
        text: "единое окно",
      },
      {
        text:
          ". Они несколько раз повторили это почти одними и теми же словами, значит именно через это и надо строить весь показ.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Мария, 11:03:56-11:04:18]: ",
        metadata: true,
      },
      {
        text:
          "Я бы первым сценарием дала вопрос по клиенту, потом поиск по договору, потом краткий пересказ длинной переписки, чтобы они сразу увидели, что не нужно читать двадцать писем руками.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Дмитрий, 11:04:19-11:04:40]: ",
        metadata: true,
      },
      {
        text:
          "По данным на первом этапе берем систему продаж и хранилище документов. Почту лучше сейчас не обещать, иначе мы уйдем в подготовку подключения и снова потеряем неделю.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Анна, 11:04:41-11:05:00]: ",
        metadata: true,
      },
      {
        text:
          "Согласна. Лучше честно сказать, что в пробном запуске мы берем два источника, а переписку подключаем следующим шагом, когда они подтвердят полезность на живых вопросах.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Ольга, 11:05:01-11:05:23]: ",
        metadata: true,
      },
      {
        text:
          "Еще надо заранее снять возражение юристов. Они вчера два раза вернулись к теме прав доступа и спросили, увидит ли отдел продаж внутренние комментарии по договору и служебные пометки.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Игорь, 11:05:24-11:05:45]: ",
        metadata: true,
      },
      {
        text:
          "Тогда в показе делаем отдельную сцену: один и тот же вопрос от менеджера и от юриста, чтобы было видно, что ответы разные и зависят от роли человека.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Мария, 11:05:46-11:06:10]: ",
        metadata: true,
      },
      {
        text:
          "И давайте без общих слов вроде «ускоряем работу». Им нужны понятные цифры: сколько времени уходит на поиск нужной версии договора сейчас и сколько будет уходить после запуска.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Анна, 11:06:11-11:06:33]: ",
        metadata: true,
      },
      {
        text:
          "Хорошо, я тогда попрошу аналитиков посчитать на их примере путь от входящего письма до согласования ответа. Если у нас будет живая оценка по минутам, разговор станет намного предметнее.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Дмитрий, 11:06:34-11:06:56]: ",
        metadata: true,
      },
      {
        text:
          "По составу встречи с их стороны будут коммерческий директор, руководитель направления и человек из отдела технологий. Значит, нам надо держать баланс: без лишней технической глубины, но с понятным ответом, где хранятся данные и как они обновляются.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Ольга, 11:06:57-11:07:19]: ",
        metadata: true,
      },
      {
        text:
          "Еще важно показать удобный рабочий путь, а не просто поиск. Они боятся «еще одной системы», в которую сотрудники не зайдут. Значит, надо показать цепочку целиком: спросил, получил ответ, открыл источник, переслал коллеге.",
      },
    ],
  },
  {
    segments: [
      {
        text: "[Анна, 11:07:20-11:07:46]: ",
        metadata: true,
      },
      {
        text:
          "Тогда договорились так: Мария собирает сценарий показа, Игорь готовит примеры вопросов, Ольга описывает разграничение доступа, Дмитрий формулирует короткое объяснение по хранению данных, а я к вечеру отправляю клиенту письмо с планом пробного запуска на две недели.",
      },
    ],
  },
] as const;

const CHAT_MESSAGES: readonly ObsidianHeroMockChatMessage[] = [
  {
    id: "hello-user",
    role: "user",
    timestamp: "12:27",
    startMs: 0,
    content: "Привет",
  },
  {
    id: "greeting",
    role: "assistant",
    timestamp: "12:27",
    startMs: 300,
    content: "Привет! Чем помочь?",
  },
  {
    id: "request-1",
    role: "user",
    timestamp: "12:27",
    startMs: 800,
    content: "Расшифруй мне запись выше",
  },
  {
    id: "response-1",
    role: "assistant",
    timestamp: "12:27",
    startMs: 1500,
    content:
      "Вот что удалось разобрать из записи:\n\n>[00:00:00-00:00:29]\n>«Мысль была в том, чтобы как-то самолётик на обычное сообщение, а на сообщение с транскрибацией сделать что-то с эквалайзером. Анимашка была, потому что там в момент...»\n\nПоследняя фраза обрывается на слове «Хо...», дальше речь неразборчива или запись обрезана.\n\nЕсли хочешь, я могу:\n\n1. оформить это как чистый текст без таймкода,\n2. сделать более литературную редакцию,\n3. попробовать восстановить неясные места по смыслу.",
  },
  {
    id: "request-2",
    role: "user",
    timestamp: "12:27",
    startMs: 2200,
    content: "Какая основная мысль?",
  },
  {
    id: "response-2",
    role: "assistant",
    timestamp: "12:27",
    startMs: 2800,
    content:
      "Основная мысль такая:\n\nобсуждается идея визуально по-разному оформлять разные типы сообщений.\n\n- для обычного сообщения использовать значок самолётика,\n- для сообщения с транскрибацией — что-то связанное с эквалайзером или аудио-визуализацией.\n\nТо есть смысл в том, чтобы разделить типы сообщений через разную анимацию или визуальный символ.",
  },
] as const;

export function getObsidianHeroMockScene(hostWidth: number): ObsidianHeroMockScene {
  const variant: ObsidianHeroMockVariant =
    hostWidth > 0 && hostWidth < 540
      ? "narrow"
      : hostWidth > 0 && hostWidth < 820
        ? "compact"
        : "desktop";
  const chatMessages =
    variant === "narrow" ? CHAT_MESSAGES.slice(0, 3) : variant === "compact" ? CHAT_MESSAGES : CHAT_MESSAGES;
  const cycleDurationMs = variant === "narrow" ? 6800 : 11200;

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
      contextCard: {
        title: "audio_2026-03-01_21-06-39.ogg",
        excerpt: "",
        actions: [
          { label: "Транскрипция", active: true },
          { label: "Матрица фактов" },
          { label: "Редактор" },
          { label: "Сводка" },
        ],
      },
      chat: {
        cycleDurationMs,
        fadeOutMs: 520,
        messages: chatMessages,
      },
      composer: {
        draft: "Привет",
      },
    },
    inspector: {
      title: "Транскрипция",
      actionLabel: "AI-действия",
      tabs: {
        primary: "Транскрипция",
        secondaryIcon: "plus",
      },
      lines: variant === "narrow" ? TRANSCRIPT_LINES.slice(0, 4) : TRANSCRIPT_LINES,
      hint: "Введите текст или нажмите «/», чтобы открыть команды",
      showDownload: variant !== "narrow",
      showClose: true,
    },
  };
}
