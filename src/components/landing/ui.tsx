export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
        {label}
      </p>
      <h2 className="mt-5 text-4xl leading-[0.96] font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-[3.55rem]">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}
