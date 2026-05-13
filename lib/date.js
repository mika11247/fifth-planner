const jpWeekdays = ["日", "月", "火", "水", "木", "金", "土"];

export function formatTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function formatDateLabel(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "long",
    day: "numeric",
    weekday: "short"
  }).format(new Date(value));
}

export function isSameDate(left, right) {
  const a = new Date(left);
  const b = new Date(right);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function startOfWeek(value) {
  const date = new Date(value);
  const day = date.getDay();
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getWeekDays(value) {
  const first = startOfWeek(value);
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(first);
    day.setDate(first.getDate() + index);
    return day;
  });
}

export function getMonthDays(value) {
  const base = new Date(value);
  const first = new Date(base.getFullYear(), base.getMonth(), 1);
  const gridStart = startOfWeek(first);
  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    return day;
  });
}

export function weekdayName(date) {
  return jpWeekdays[new Date(date).getDay()];
}

export function byStartAt(a, b) {
  return new Date(a.start_at || a.created_at) - new Date(b.start_at || b.created_at);
}
