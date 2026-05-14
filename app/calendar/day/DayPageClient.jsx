"use client";

import { useEffect, useState } from "react";
import { DayCalendar } from "@/components/CalendarGrid";
import { FilterBar } from "@/components/FilterBar";
import { PageHeader } from "@/components/PageHeader";
import { formatDateLabel } from "@/lib/date";
import { createClient } from "@/lib/supabase/browser";
import { useSearchParams } from "next/navigation";
import { EditPlannerModal } from "@/components/EditPlannerModal";
import { PlannerForm } from "@/components/PlannerForm";

function toDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

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

export default function DayPageClient() {
  const supabase = createClient();
  const searchParams = useSearchParams();

  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

  const [currentDate, setCurrentDate] = useState(() => {
    const queryDate = searchParams.get("date");

    return queryDate ? new Date(`${queryDate}T00:00:00`) : new Date();
  });

  async function fetchItems() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("planner_items")
      .select("*")
      .order("date", { ascending: true, nullsFirst: false })
      .order("start_time", { ascending: true, nullsFirst: false });

    if (error) {
      console.error(error);
      return;
    }

    setItems((data || []).map(toCalendarItem));
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function toggleComplete(item) {
    if (!supabase) return;

    await supabase
      .from("planner_items")
      .update({
        completed: !item.completed,
      })
      .eq("id", item.id);

    fetchItems();
  }

  const visibleItems = [...items]
    .filter((item) => showCompleted || !item.completed)
    .sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <div>
      <PageHeader
        title="デイリー"
        description={`${formatDateLabel(currentDate)} の予定、タスク、メモです。`}
      />

      <div className="mb-4">
        <FilterBar />
      </div>

      <div className="mb-4 flex items-center justify-between rounded-card border border-line bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => {
            const prev = new Date(currentDate);
            prev.setDate(prev.getDate() - 1);
            setCurrentDate(prev);
          }}
          className="rounded-control border border-line px-3 py-1 text-sm"
        >
          ← 前日
        </button>

        <button
          type="button"
          onClick={() => setCurrentDate(new Date())}
          className="rounded-control bg-brand-500 px-3 py-1 text-sm text-white"
        >
          今日
        </button>

        <button
          type="button"
          onClick={() => {
            const next = new Date(currentDate);
            next.setDate(next.getDate() + 1);
            setCurrentDate(next);
          }}
          className="rounded-control border border-line px-3 py-1 text-sm"
        >
          次日 →
        </button>
      </div>

      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setShowCompleted((prev) => !prev)}
          className="rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-medium text-brand-600 shadow-sm"
        >
          {showCompleted ? "完了済みを非表示" : "完了済みも表示"}
        </button>
      </div>

      <DayCalendar
        date={currentDate}
        items={visibleItems}
        onToggleComplete={toggleComplete}
        onItemClick={(item) => setEditingItem(item)}
      />

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-3xl text-white shadow-soft"
      >
        ＋
      </button>

      {editingItem && (
        <EditPlannerModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSaved={() => {
            fetchItems();
            setEditingItem(null);
          }}
        />
      )}

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
              <h2 className="text-lg font-semibold">予定を追加</h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted"
              >
                閉じる
              </button>
            </div>

            <PlannerForm
              defaultDate={toDateString(currentDate)}
              onSaved={() => {
                fetchItems();
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}