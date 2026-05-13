import { DayCalendar } from "@/components/CalendarGrid";
import { FilterBar } from "@/components/FilterBar";
import { PageHeader } from "@/components/PageHeader";
import { formatDateLabel } from "@/lib/date";
import { plannerItems } from "@/lib/mockData";

const today = new Date("2026-05-13T09:00:00+09:00");

export default function DayPage() {
  return (
    <div>
      <PageHeader title="デイリー" description={`${formatDateLabel(today)} の予定、タスク、メモです。`} />
      <div className="mb-4">
        <FilterBar />
      </div>
      <DayCalendar date={today} items={plannerItems} />
    </div>
  );
}
