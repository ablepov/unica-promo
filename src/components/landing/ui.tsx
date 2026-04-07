export function SectionIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
        {label}
      </p>
      <h2 className="mt-5 text-4xl leading-tight font-semibold tracking-[-0.04em] text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-strong)]">
        {description}
      </p>
    </div>
  );
}

export function StageCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="surface-panel p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
        {title}
      </p>
      <p className="mt-4 text-xl font-semibold text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-[var(--muted-strong)]">
        {note}
      </p>
    </div>
  );
}

export function ChatBubble({
  speaker,
  tone,
  message,
}: {
  speaker: string;
  tone: "assistant" | "user";
  message: string;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border px-4 py-4 text-sm leading-6 ${
        tone === "assistant"
          ? "border-cyan-400/16 bg-cyan-400/10 text-slate-100"
          : "border-white/8 bg-white/4 text-[var(--muted-strong)]"
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
        {speaker}
      </p>
      <p className="mt-2">{message}</p>
    </div>
  );
}
