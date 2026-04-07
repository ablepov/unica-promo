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
      <p className="eyebrow">{label}</p>
      <h2 className="display-title mt-5 text-[2.65rem] leading-[0.95] sm:text-5xl lg:text-[3.8rem]">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}
