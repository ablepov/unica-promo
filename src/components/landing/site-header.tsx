const navigation = [
  { label: "Сценарии", href: "#scenarios" },
  { label: "Платформа", href: "#platform" },
  { label: "Контур", href: "#security" },
  { label: "Архитектура", href: "#architecture" },
  { label: "Стоимость", href: "#pricing" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="page-shell">
        <div className="mt-4 flex h-16 items-center justify-between gap-4 rounded-full border border-white/8 bg-[rgba(5,8,12,0.72)] px-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-3 text-white">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] font-mono text-sm font-medium tracking-[0.28em] text-slate-100">
              U
            </span>
            <span className="min-w-0">
              <span className="block truncate font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                Unica AI
              </span>
              <span className="block truncate text-sm text-slate-100">
                Enterprise AI orchestration
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-[var(--muted-strong)] xl:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white">
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
