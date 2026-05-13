import { WeekCalendar } from "@/components/CalendarGrid";
import { FilterBar } from "@/components/FilterBar";
import { PageHeader } from "@/components/PageHeader";
import { plannerItems } from "@/lib/mockData";

export default function WeekPage() {
  return (
    <div>
      <PageHeader title="ウィークリー" description="1週間の役割と予定を見渡す表示です。" />
      <div className="mb-4">
        <FilterBar />
      </div>
      <WeekCalendar date={new Date("2026-05-13T09:00:00+09:00")} items={plannerItems} />
    </div>
  );
}
