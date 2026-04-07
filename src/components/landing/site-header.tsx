const navigation = [
  { label: "Сценарии", href: "#scenarios" },
  { label: "Платформа", href: "#platform" },
  { label: "Безопасность", href: "#security" },
  { label: "Архитектура", href: "#architecture" },
  { label: "Стоимость", href: "#pricing" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[rgba(4,10,16,0.72)] backdrop-blur-xl">
      <div className="page-shell flex h-20 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3 text-white">
          <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-cyan-400/22 bg-[linear-gradient(180deg,rgba(28,58,90,0.9),rgba(7,17,28,0.9))] font-mono text-sm font-semibold tracking-[0.22em]">
            U
          </span>
          <span>
            <span className="block text-sm font-medium uppercase tracking-[0.26em] text-[var(--muted)]">
              Unica AI
            </span>
            <span className="block text-sm text-slate-100">
              Enterprise orchestration platform
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-[var(--muted-strong)] lg:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#lead-form" className="btn-secondary hidden sm:inline-flex">
          Заказать демо
        </a>
      </div>
    </header>
  );
}
