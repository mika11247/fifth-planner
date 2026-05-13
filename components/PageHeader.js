export function PageHeader({ title, description, actions }) {
  return (
    <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-brand-700">Fifth planner</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-normal text-ink">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
