export const navItems: ReadonlyArray<{
  label: string;
  href: string;
  hasCaret?: boolean;
}> = [
  { label: "Что умеет", href: "#platform" },
  { label: "Для кого", href: "#scenarios" },
  { label: "Стоимость", href: "#roi" },
  { label: "О продукте", href: "#architecture" },
];

export const trustLogos = [
  {
    label: "Суды России",
    caption: "Суды России",
    src: "/designs/obsidian/logos/courts-russia-color.svg",
    height: 2.85,
    imageWidth: 366.943,
    imageHeight: 401.991,
    filter: "grayscale(1) brightness(1.1) contrast(1.08)",
    opacity: 0.96,
    variant: "icon-label",
  },
  {
    label: "МТС",
    src: "/designs/obsidian/logos/mts-color.svg",
    height: 2.7,
    imageWidth: 850.4,
    imageHeight: 850.4,
    filter: "grayscale(1) brightness(0.94) contrast(1.14)",
    opacity: 0.95,
    variant: "logo",
  },
  {
    label: "Правительство Татарстана",
    caption: "Правительство Татарстана",
    src: "/designs/obsidian/logos/tatarstan-government-color.svg",
    height: 2.55,
    imageWidth: 32,
    imageHeight: 32,
    filter: "grayscale(1) brightness(1.1) contrast(1.08)",
    opacity: 0.96,
    captionWidth: 6.2,
    variant: "icon-label",
  },
  {
    label: "ПРОМОМЕД",
    src: "/designs/obsidian/logos/promomed-color.svg",
    height: 2.7,
    imageWidth: 240,
    imageHeight: 67,
    filter: "grayscale(1) brightness(1.16) contrast(1.1)",
    opacity: 0.99,
    variant: "logo",
  },
  {
    label: "Нефтиса",
    src: "/designs/obsidian/logos/neftisa-color.svg",
    height: 2.7,
    imageWidth: 193,
    imageHeight: 64,
    filter: "grayscale(1) brightness(1.14) contrast(1.1)",
    opacity: 0.99,
    variant: "logo",
  },
] as const;

export const featureCards = [
  {
    kicker: "Сценарии для сотрудников",
    title: "Практические AI-сценарии уже сейчас",
    description:
      "Поиск по регламентам, сервис-деск, протоколы встреч, документы и речевая аналитика собираются в одном рабочем контуре.",
    imagePosition: "46% 28%",
    cta: "Смотреть сценарии",
    href: "#scenarios",
  },
  {
    kicker: "Governance и контроль",
    title: "AI под контролем ИТ, ИБ и бизнеса",
    description:
      "RBAC, аудит, роли, контроль источников и прозрачность использования встроены в платформу, а не добавлены поверх.",
    imagePosition: "82% 20%",
    cta: "Смотреть архитектуру",
    href: "#architecture",
  },
];

export const orchestratorHighlights = [
  {
    title: "Подключайте разные LLM",
    description:
      "Объединяйте облачные, on-prem и отечественные модели в одном контуре. Без жёсткой привязки к одному провайдеру.",
    icon: "models",
  },
  {
    title: "Управляйте логикой",
    description:
      "Собирайте сценарии из правил, ассистентов и действий. Меняйте логику без пересборки платформы.",
    icon: "workflows",
  },
  {
    title: "Контролируйте роли",
    description:
      "Разводите доступы по ролям и зонам ответственности. Сохраняйте контроль для ИТ, ИБ и бизнеса.",
    icon: "roles",
  },
] as const;

export const securityHighlights = [
  {
    title: "Построено под защищённые контуры",
    description:
      "Подходит для компаний и организаций, где критичны контроль данных, ролей и инфраструктуры.",
  },
  {
    title: "Security by default",
    description:
      "RBAC, аудит действий, журнал запросов и policy layer встроены в каждую рабочую схему.",
  },
  {
    title: "Прозрачность без визуального шума",
    description:
      "Решения, источники и расход ресурсов видимы для ИТ, ИБ и бизнес-заказчика.",
  },
];

export const painSection = {
  title: "Почему корпоративный AI часто не доходит до результата",
  titleLines: ["Почему корпоративный AI", "часто не доходит", "до результата"],
  description:
    "Во многих компаниях AI уже интересен бизнесу, но не становится промышленным инструментом. Данные и знания разрознены, документы и коммуникации живут в разных системах, пилоты не переходят в масштаб, а отдельные AI-инструменты не собираются в единую управляемую архитектуру.",
} as const;

export const painPoints = [
  {
    title: "Разрозненные данные и знания",
    description:
      "Документы, базы знаний, переписки, звонки и внутренние системы не соединены в единый AI-контур.",
    imageSrc: "/designs/obsidian/pain/pain-point-1.png",
    imageAlt: "Disconnected systems layered over a rocky landscape.",
    imagePosition: "50% 50%",
  },
  {
    title: "Пилоты без выхода в продуктив",
    description:
      "Команды пробуют AI точечно, но не получают масштабируемый рабочий инструмент.",
    imageSrc: "/designs/obsidian/pain/pain-point-2.png",
    imageAlt: "A dashboard floating over a waterfall landscape.",
    imagePosition: "50% 50%",
  },
  {
    title: "Нет контроля и прозрачности",
    description:
      "Сложно понять, кто к чему имеет доступ, на чём основан ответ и как расходуются ресурсы.",
    imageSrc: "/designs/obsidian/pain/pain-point-3.png",
    imageAlt: "A dark analytics card with a green line chart in front of a stone backdrop.",
    imagePosition: "50% 42%",
  },
  {
    title: "Зоопарк решений вместо платформы",
    description:
      "Разные инструменты для поиска, документов, речи и автоматизации не дают единого результата.",
    imageSrc: "/designs/obsidian/pain/pain-point-4.png",
    imageAlt: "Multiple interface fragments split around a stone background.",
    imagePosition: "50% 32%",
  },
] as const;

export const useCases = [
  {
    title: "Умный поиск по внутренней базе знаний",
    description:
      "Ответы по регламентам, инструкциям, документам и внутренним базам с опорой на источники.",
    imagePosition: "22% 24%",
    accent: "Источники и цитаты",
  },
  {
    title: "Ассистенты техподдержки и сервис-деска",
    description:
      "Подсказки сотрудникам, ускорение первой линии и маршрутизация обращений без потери контекста.",
    imagePosition: "46% 34%",
    accent: "Маршрутизация и draft-ответ",
  },
  {
    title: "Извлечение данных из документов",
    description:
      "OCR, классификация, извлечение полей и запуск следующих шагов процесса в корпоративных системах.",
    imagePosition: "83% 24%",
    accent: "Документы и поля",
  },
  {
    title: "Речевая аналитика контакт-центра",
    description:
      "Транскрипция, контроль качества, поиск нарушений, инсайтов и управленческих сигналов.",
    imagePosition: "84% 18%",
    accent: "ASR и контроль качества",
  },
  {
    title: "Протоколы встреч и совещаний",
    description:
      "Фиксация решений, поручений, итогов и follow-up по деловым коммуникациям и совещаниям.",
    imagePosition: "52% 18%",
    accent: "Саммари и поручения",
  },
  {
    title: "Автоматизация рутинных задач",
    description:
      "AI-агенты и workflow выполняют последовательность действий по правилам компании и в нужном контуре.",
    imagePosition: "16% 58%",
    accent: "Workflow и actions",
  },
];

export const platformPoints = [
  "Подключает разные LLM и внутренние источники данных.",
  "Управляет логикой сценариев, агентами и действиями.",
  "Контролирует роли, аудит, источники и потребление.",
  "Переводит AI из экспериментов в рабочий инструмент.",
];

export const advantages = [
  {
    title: "Закрытая и суверенная платформа",
    description:
      "Подходит для компаний и организаций с высокими требованиями к контуру, данным и контролю.",
  },
  {
    title: "Гибкость по моделям",
    description:
      "Подключение разных LLM без привязки к одному поставщику или одной модели.",
  },
  {
    title: "Управляемый результат",
    description:
      "Платформа помогает получать предсказуемый и воспроизводимый AI-результат.",
  },
  {
    title: "Ответы с опорой на ваши данные",
    description:
      "RAG и корпоративные источники вместо ответов из воздуха и ручных склеек.",
  },
  {
    title: "Единый контур вместо набора инструментов",
    description:
      "Документы, речь, знания, ассистенты, агенты и интеграции работают в одной системе.",
  },
  {
    title: "Прозрачность использования",
    description:
      "Видно, кто использует платформу, какие сценарии работают и как расходуются ресурсы.",
  },
];

export const governanceCards = [
  "RBAC и разграничение доступа",
  "Аудит действий и журнал запросов",
  "Контроль источников и поведения ассистентов",
  "Контроль потребления ресурсов",
  "Работа в защищённом контуре",
  "Поддержка корпоративных требований к безопасности",
];

export const architectureLayers = [
  {
    title: "Инфраструктура и модели",
    items: [
      "LLM",
      "On-prem модели",
      "Отечественные модели",
      "Векторные базы",
      "Файловые хранилища",
      "Корпоративные API",
    ],
  },
  {
    title: "Сервисы Unica",
    items: [
      "RAG",
      "OCR",
      "ASR",
      "Knowledge layer",
      "Orchestration",
      "Skills",
      "Agents",
      "Routing",
    ],
  },
  {
    title: "Бизнес-логика и контроль",
    items: [
      "Workflow",
      "Автоматизация",
      "Сценарии",
      "Роли",
      "Правила",
      "Мониторинг",
    ],
  },
  {
    title: "Пользователи и каналы",
    items: [
      "Сотрудники",
      "Техподдержка",
      "Руководители",
      "Контакт-центр",
      "Web UI",
      "Чаты",
      "Телефония",
    ],
  },
];

export const architectureCaptions = [
  "Подключаем данные, модели и системы",
  "Оркестрируем логику и действия",
  "Даём сотрудникам понятный интерфейс",
  "Контролируем качество, безопасность и использование",
];

export const workforceSteps = [
  "Задача",
  "Анализ контекста",
  "Вызов skills",
  "Работа с источниками",
  "Действие в системе",
  "Результат",
];

export const pricingPlans = [
  {
    title: "Standard",
    price: "от 650 000 ₽ / год",
    description:
      "Для запуска базовых корпоративных AI-сценариев и первых продуктивных сценариев без долгой разработки.",
  },
  {
    title: "Enterprise",
    price: "от 4,5 млн ₽ / год",
    description:
      "Для закрытых контуров, расширенных модулей, сложных интеграций и enterprise-требований к безопасности.",
  },
];

export const roiCards = [
  {
    title: "Запуск без долгой разработки",
    description: "Быстрее путь от задачи до пилота и первых продуктивных сценариев.",
  },
  {
    title: "Экономия времени сотрудников",
    description: "AI берёт на себя поиск, обработку, извлечение и часть рутинных действий.",
  },
  {
    title: "Окупаемость за месяцы",
    description: "Для типовых сценариев эффект можно увидеть уже на первых этапах внедрения.",
  },
];

export const faqItems = [
  {
    question: "Чем Unica отличается от корпоративного чат-бота?",
    answer:
      "Unica — это не просто интерфейс для диалога с LLM. Это платформа и оркестратор, который подключает данные, документы, речь, workflow, интеграции и агентов в единый управляемый контур.",
  },
  {
    question: "Можно ли развернуть Unica on-prem?",
    answer:
      "Да. Платформа подходит для сценариев, где нужен собственный защищённый контур и полный контроль инфраструктуры.",
  },
  {
    question: "Можно ли использовать разные модели?",
    answer:
      "Да. Unica поддерживает гибкий подход к подключению LLM и помогает не зависеть от одного поставщика моделей.",
  },
  {
    question: "Как контролируется качество ответа?",
    answer:
      "Через работу с корпоративными источниками, настройку логики сценариев, аудит и управляемый orchestration-контур.",
  },
  {
    question: "Как считается стоимость?",
    answer:
      "Стоимость зависит от модели поставки, состава модулей, интеграций, требований к безопасности, поддержки и объёма использования.",
  },
  {
    question: "С чего лучше начать?",
    answer:
      "Обычно с одного или нескольких сценариев с быстрым эффектом: внутренний поиск, документы, речевая аналитика, сервис-деск или автоматизация рутины.",
  },
];
