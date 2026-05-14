"use client";

import { useEffect, useState } from "react";
import { DayCalendar, MonthCalendar } from "@/components/CalendarGrid";
import { FilterBar } from "@/components/FilterBar";
import { ItemCard } from "@/components/ItemCard";
import { PageHeader } from "@/components/PageHeader";
import { PlannerForm } from "@/components/PlannerForm";
import { PlannerList } from "@/components/PlannerList";
import { createClient } from "@/lib/supabase/browser";
import { byStartAt, isSameDate } from "@/lib/date";

const today = new Date();

function toCalendarItem(item) {
  const startAt =
    item.date && item.start_time
      ? new Date(`${item.date}T${item.start_time}`)
      : item.date
        ? new Date(`${item.date}T00:00:00`)
        : null;

  return {
    ...item,
    start_at: startAt,
  };
}

export default function HomePage() {
  const supabase = createClient();

  const [refreshKey, setRefreshKey] = useState(0);
  const [plannerItems, setPlannerItems] = useState([]);

  async function fetchPlannerItems() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("planner_items")
      .select("*")
      .order("date", { ascending: true, nullsFirst: false })
      .order("start_time", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setPlannerItems((data || []).map(toCalendarItem));
  }

  useEffect(() => {
    fetchPlannerItems();
  }, [refreshKey]);

  const todayItems = plannerItems
    .filter((item) => item.start_at && isSameDate(item.start_at, today))
    .sort(byStartAt);

  const todayEvents = todayItems.filter((item) => item.type === "event");
  const todayTasks = todayItems.filter((item) => item.type === "task");
  const sharedItems = plannerItems.filter((item) => item.group_id);
  const recentNotes = plannerItems.filter((item) => item.type === "note");

  return (
    <div>
      <PageHeader
        title="人生を俯瞰するTOP"
        description="個人の予定、共有予定、タスク、メモを同じ画面で見渡せるMVPダッシュボードです。"
      />

      <div className="mb-4 space-y-4">
        <PlannerForm onSaved={() => setRefreshKey((key) => key + 1)} />
        <PlannerList refreshKey={refreshKey} />
      </div>

      <div className="mb-4">
        <FilterBar />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <div className="space-y-4">
          <MonthCalendar date={today} items={plannerItems} />

          <section className="card p-4">
            <h2 className="mb-3 text-lg font-semibold">今日の予定</h2>
            <DayCalendar date={today} items={todayEvents} />
          </section>
        </div>

        <div className="space-y-4">
          <Widget title="今日のタスク" items={todayTasks} />
          <Widget
            title="今週の予定"
            items={plannerItems.filter((item) => item.type === "event").sort(byStartAt)}
          />
          <Widget title="共有予定" items={sharedItems} />
          <Widget title="最近のメモ" items={recentNotes} />
        </div>
      </div>
    </div>
  );
}

function Widget({ title, items }) {
  return (
    <section className="card p-4">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>

      <div className="space-y-2">
        {items.length ? (
          items.map((item) => <ItemCard key={item.id} item={item} compact />)
        ) : (
          <p className="text-sm text-muted">まだありません。</p>
        )}
      </div>
    </section>
  );
}