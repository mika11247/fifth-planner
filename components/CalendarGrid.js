import { getMonthDays, getWeekDays, isSameDate, weekdayName } from "@/lib/date";
import { ItemCard } from "@/components/ItemCard";

export function MonthCalendar({ date, items }) {
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
          const dayItems = items.filter((item) => item.start_at && isSameDate(item.start_at, day));
          const muted = day.getMonth() !== currentMonth;
          return (
            <div key={day.toISOString()} className="min-h-28 border-b border-r border-line bg-white/72 p-2 last:border-r-0">
              <p className={`mb-2 text-xs font-semibold ${muted ? "text-muted/50" : "text-ink"}`}>
                {day.getDate()}
              </p>
              <div className="space-y-1">
                {dayItems.slice(0, 2).map((item) => (
                  <div key={item.id} className="truncate rounded-control bg-brand-50 px-2 py-1 text-[11px] text-brand-700">
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function WeekCalendar({ date, items }) {
  const days = getWeekDays(date);

  return (
    <section className="grid gap-3 md:grid-cols-7">
      {days.map((day) => {
        const dayItems = items.filter((item) => item.start_at && isSameDate(item.start_at, day));
        return (
          <div key={day.toISOString()} className="card min-h-48 p-3">
            <p className="text-sm font-semibold">{day.getDate()}日 {weekdayName(day)}</p>
            <div className="mt-3 space-y-2">
              {dayItems.length ? (
                dayItems.map((item) => <ItemCard key={item.id} item={item} compact />)
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

export function DayCalendar({ date, items }) {
  const dayItems = items.filter((item) => item.start_at && isSameDate(item.start_at, date));

  return (
    <section className="card p-4">
      <div className="grid gap-3">
        {dayItems.length ? (
          dayItems.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p className="text-sm text-muted">今日の予定はまだありません。</p>
        )}
      </div>
    </section>
  );
}
