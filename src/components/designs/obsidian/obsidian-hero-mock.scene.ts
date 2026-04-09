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
  | "sliders"
  | "bars"
  | "chevron"
  | "audio"
  | "lightning"
  | "download"
  | "close"
  | "at"
  | "paperclip"
  | "send"
  | "copy";

export type ObsidianHeroMockVariant = "desktop" | "compact" | "narrow";

export type ObsidianHeroMockTextSegment = {
  text: string;
  highlight?: boolean;
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
    floatingAudio: {
      title: string;
      extension: string;
      duration: string;
    };
    chat: {
      cycleDurationMs: number;
      fadeOutMs: number;
      messages: readonly ObsidianHeroMockChatMessage[];
    };
    composer: {
      placeholder: string;
      chip: string;
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
  { icon: "brain", label: "База знаний", count: "12" },
] as const;

const HISTORY_ITEMS: readonly ObsidianHeroMockHistoryItem[] = [
  { label: "Unica AI", count: "3" },
  { label: "Стенограммы", count: "4", active: true, indent: true },
  { label: "1. Предложения", count: "2" },
  { label: "Unica AI", count: "1" },
  { label: "Судебная практика", count: "0" },
  { label: "HR-Роспартнер", count: "0" },
  { label: "РЖД", count: "0" },
  { label: "ДИПЛОМ", count: "0" },
  { label: "2. User Stories", count: "0" },
  { label: "Монк Документация", count: "0" },
  { label: "тест монк", count: "0" },
  { label: "тест Мелехин", count: "0" },
  { label: "Qwen3.5-4B", count: "0" },
  { label: "СТЕНО_НЬЮ", count: "0" },
  { label: "Стенограммы_2", count: "0" },
] as const;

const TRANSCRIPT_LINES: readonly ObsidianHeroMockLine[] = [
  {
    segments: [
      { text: "[SPEAKER_00, 00:00:00-00:00:29]: Мысль была в том, чтобы как-то самолётик на обычное" },
    ],
  },
  {
    segments: [
      { text: "сообщение, а на сообщение-транскребация сделать что-то с эквалайзером. " },
      { text: "Анимашка", highlight: true },
      { text: " была," },
    ],
  },
  {
    segments: [{ text: "потому что там в момент... Хотя нет, анимашка там, по-моему, всегда Там сначала" }],
  },
  {
    segments: [{ text: "блокируется отправка типа в момент, когда он в меню грузится. После того, как в меню" }],
  },
  {
    segments: [{ text: "загрузился, он становится активным. Ну, может, саму анимацию имеет смысл убрать, не" }],
  },
  {
    segments: [{ text: "знаю, короче." }],
  },
] as const;

const CHAT_MESSAGES: readonly ObsidianHeroMockChatMessage[] = [
  {
    id: "greeting",
    role: "assistant",
    timestamp: "12:27",
    startMs: 0,
    content: "Привет! Чем помочь?",
    utilityActions: ["copy", "download"],
  },
  {
    id: "request-1",
    role: "user",
    timestamp: "12:27",
    startMs: 1200,
    content: "Расшифруй мне запись выше",
  },
  {
    id: "response-1",
    role: "assistant",
    timestamp: "12:27",
    startMs: 2100,
    streamDurationMs: 2900,
    utilityActions: ["copy", "download"],
    content:
      "Вот что удалось разобрать из записи:\n\n“[00:00–00:29]\n«Мысль была в том, чтобы как-то самолётик на обычное сообщение, а на сообщение-транскребация сделать что-то с эквалайзером...»”\n\nПоследняя фраза обрывается, дальше речь становится менее разборчивой.\n\nЕсли хочешь, я могу:\n1. оформить это как чистый текст,\n2. сделать более литературную редакцию,\n3. выделить основные выводы.",
  },
  {
    id: "request-2",
    role: "user",
    timestamp: "12:27",
    startMs: 6100,
    content: "Какая основная мысль?",
  },
  {
    id: "response-2",
    role: "assistant",
    timestamp: "12:27",
    startMs: 7000,
    streamDurationMs: 2500,
    utilityActions: ["copy", "download"],
    content:
      "Основная мысль такая:\n\nобсуждается идея визуально по-разному оформлять разные типы сообщений.\n\n• для обычного сообщения использовать один символ,\n• для сообщения с транскрибацией — аудио или эквалайзер.\n\nТо есть смысл в том, чтобы разделить типы сообщений через разную анимацию или визуальный знак.",
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
        name: "Антон",
        email: "ablepov@gmail.com",
      },
    },
    workspace: {
      title: "audio 2026-03-01 21-06-39",
      floatingAudio: {
        title: "audio_2026-03-01_21-06-39.ogg",
        extension: "ogg",
        duration: "11:14",
      },
      chat: {
        cycleDurationMs,
        fadeOutMs: 520,
        messages: chatMessages,
      },
      composer: {
        placeholder: "Спросите что угодно",
        chip: "@ audio_2026-03-...",
      },
    },
    inspector: {
      title: "audio_2026-03-01_21-06-39.ogg",
      actionLabel: "Действия",
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
