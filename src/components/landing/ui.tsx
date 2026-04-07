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
    <div className="max-w-2xl">
      <p className="eyebrow">{label}</p>
      <h2 className="display-title mt-4 text-[2.15rem] leading-[0.95] sm:text-[2.8rem] lg:text-[3.2rem]">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-[0.98rem] leading-7 text-[var(--muted-strong)] sm:text-base">
        {description}
      </p>
    </div>
  );
}
