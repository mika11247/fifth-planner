import { getMonthDays, getWeekDays, isSameDate, weekdayName } from "@/lib/date";
import { ItemCard } from "@/components/ItemCard";

export function MonthCalendar({ date, items, onDateClick, onItemClick }) {
  const days = getMonthDays(date);
  const currentMonth = new Date(date).getMonth();

  return (
    <section className="card overflow-hidden">
      <div className="grid grid-cols-7 border-b border-line bg-brand-50/80 text-center text-xs font-semibold text-muted">
        {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
          <div key={day} className="px-2 py-3">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dayItems = items.filter(
  (item) =>
    item.type === "event" &&
    item.start_at &&
    isSameDate(item.start_at, day)
);
          const muted = day.getMonth() !== currentMonth;
          const isToday = isSameDate(day, new Date());
          return (
            <div
  key={day.toISOString()}
  onClick={() => onDateClick?.(day)}
  className="min-h-28 border-b border-r border-line bg-white/72 p-2 text-left last:border-r-0 hover:bg-brand-50/60"
>
              <p
  onClick={() => onDateClick?.(day)}
  className={`mb-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-xs font-semibold ${
    isToday
      ? "bg-brand-500 text-white"
      : muted
        ? "text-muted/50"
        : "text-ink"
  }`}
>
  {day.getDate()}
</p>
              <div className="space-y-1">
                {dayItems.slice(0, 2).map((item) => (
  <button
    key={item.id}
    type="button"
    onClick={(event) => {
      event.stopPropagation();
      onItemClick?.(item);
    }}
    className="block w-full truncate rounded-control px-2 py-1 text-left text-[11px] text-white"
style={{
  backgroundColor: item.color || "#7dd3fc",
}}
  >
    {item.title}
  </button>
))}
              </div>
            </div
            >
          );
        })}
      </div>
    </section>
  );
}

export function WeekCalendar({
  date,
  items,
  onToggleComplete,
  onDateClick,
  onItemClick,
  onDayAdd,
}) {

  const days = getWeekDays(date);

  return (
    <section className="grid gap-3 md:grid-cols-7">
      {days.map((day) => {
        const dayItems = items.filter((item) => item.start_at && isSameDate(item.start_at, day));
        return (
          <div
  key={day.toISOString()}
  onDoubleClick={() => onDayAdd?.(day)}
  className="card min-h-48 cursor-pointer p-3"
>
            <p
  onClick={() => onDateClick?.(day)}
  className="cursor-pointer text-sm font-semibold hover:text-brand-500"
>
  {day.getDate()}日 {weekdayName(day)}
</p>
            <div className="mt-3 space-y-2">
              {dayItems.length ? (
                dayItems.map((item) => 
                <div
  key={item.id}
  onClick={() => onItemClick?.(item)}
  className="cursor-pointer"
>
  <ItemCard
    item={item}
    compact
    onToggleComplete={onToggleComplete}
  />
</div>)
              ) : (
                <p className="text-xs text-muted">予定なし</p>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export function DayCalendar({
  date,
  items,
  onItemClick,
  onToggleComplete,
}) {
  const dayItems = items.filter((item) => item.start_at && isSameDate(item.start_at, date));

  return (
    <section className="card p-4">
      <div className="grid gap-3">
        {dayItems.length ? (
          dayItems.map((item) => (
  <div
  key={item.id}
  onClick={() => onItemClick?.(item)}
  className="cursor-pointer"
>
  <ItemCard
    item={item}
    onToggleComplete={onToggleComplete}
  />
</div>
))
        ) : (
          <p className="text-sm text-muted">今日の予定はまだありません。</p>
        )}
      </div>
    </section>
  );
}
