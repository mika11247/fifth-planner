import { categories, groups } from "@/lib/mockData";
import { formatTime } from "@/lib/date";

export function ItemCard({ item, compact = false }) {
  const category = categories.find((entry) => entry.id === item.category_id);
  const group = groups.find((entry) => entry.id === item.group_id);
  const color = category?.color || "#38aee4";

  return (
    <article className="rounded-card border border-line bg-white/90 p-3">
      <div className="flex items-start gap-3">
        <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: color }} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold">{item.title}</h3>
            <span className="rounded-control bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand-700">
              {item.type}
            </span>
            {group ? (
              <span className="rounded-control px-2 py-1 text-[11px] font-semibold text-white" style={{ backgroundColor: group.color }}>
                {group.name}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-muted">
            {item.all_day ? "終日" : formatTime(item.start_at)}
            {item.completed ? " ・完了" : ""}
          </p>
          {!compact && item.memo ? <p className="mt-2 text-sm text-muted">{item.memo}</p> : null}
        </div>
      </div>
    </article>
  );
}
