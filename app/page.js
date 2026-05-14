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
import { EditPlannerModal } from "@/components/EditPlannerModal";

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
  const [isOpen, setIsOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");

  const [editingItem, setEditingItem] = useState(null);

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

      <div className="mb-4">
  <PlannerList refreshKey={refreshKey} />
</div>

<button
  type="button"
  onClick={() => setIsOpen(true)}
  className="fixed bottom-24 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-3xl text-white shadow-soft"
>
  ＋
</button>

{isOpen && (
  <div
    className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-4 sm:items-center"
    onClick={() => setIsOpen(false)}
  >
    <div
      className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-card bg-white p-4 shadow-soft"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          予定を追加
        </h2>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-sm text-muted"
        >
          閉じる
        </button>
      </div>

      <PlannerForm
  defaultDate={selectedDate}
  onSaved={() => {
    setRefreshKey((key) => key + 1);
    setIsOpen(false);
    setSelectedDate("");
  }}
/>
    </div>
  </div>
)}

{editingItem && (
  <EditPlannerModal
    item={editingItem}
    onClose={() => setEditingItem(null)}
    onSaved={() => {
      setRefreshKey((key) => key + 1);
      setEditingItem(null);
    }}
  />
)}

      <div className="mb-4">
        <FilterBar />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <div className="space-y-4">
          <MonthCalendar
  date={today}
  items={plannerItems}
  onDateClick={(day) => {
    setSelectedDate(
      `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`
    );
    setIsOpen(true);
  }}
  onItemClick={(item) => setEditingItem(item)}
/>

          <section className="card p-4">
            <h2 className="mb-3 text-lg font-semibold">今日の予定</h2>
            <DayCalendar
  date={today}
  items={todayEvents}
  onItemClick={(item) => setEditingItem(item)}
/>
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