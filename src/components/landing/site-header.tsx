const navigation = [
  { label: "Платформа", href: "#platform" },
  { label: "Архитектура", href: "#architecture" },
  { label: "Сценарии", href: "#scenarios" },
  { label: "Контур запуска", href: "#security" },
  { label: "Стоимость", href: "#pricing" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="page-shell">
        <div className="mt-4 flex min-h-18 items-center justify-between gap-4 rounded-[1.6rem] border border-[var(--line)] bg-[rgba(7,11,18,0.82)] px-4 py-3 shadow-[0_20px_64px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-3 text-[var(--foreground)]">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[rgba(240,235,223,0.03)] font-mono text-sm tracking-[0.28em] text-[var(--foreground-strong)]">
              U
            </span>
            <span className="min-w-0">
              <span className="eyebrow block truncate">Unica AI</span>
              <span className="block truncate text-sm text-[var(--muted-strong)]">
                Управляемый запуск AI
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-[var(--muted-strong)] xl:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-transparent pb-0.5 hover:border-[var(--line-strong)] hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#lead-form" className="btn-secondary hidden sm:inline-flex">
            Запросить демо
          </a>
        </div>
      </div>
    </header>
  );
}
