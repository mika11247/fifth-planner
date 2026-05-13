import { MonthCalendar } from "@/components/CalendarGrid";
import { FilterBar } from "@/components/FilterBar";
import { PageHeader } from "@/components/PageHeader";
import { plannerItems } from "@/lib/mockData";

export default function MonthPage() {
  return (
    <div>
      <PageHeader title="マンスリー" description="個人と共有グループの予定を重ねて表示する月表示です。" />
      <div className="mb-4">
        <FilterBar />
      </div>
      <MonthCalendar date={new Date("2026-05-13T09:00:00+09:00")} items={plannerItems} />
    </div>
  );
}
