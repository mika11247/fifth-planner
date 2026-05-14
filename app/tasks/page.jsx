"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { FilterBar } from "@/components/FilterBar";
import { EditPlannerModal } from "@/components/EditPlannerModal";
import { createClient } from "@/lib/supabase/browser";

function toDateLabel(dateString) {
  if (!dateString) return "日付なし";

  const date = new Date(`${dateString}T00:00:00`);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function isToday(dateString) {
  const today = new Date();
  const target = new Date(`${dateString}T00:00:00`);

  return (
    today.getFullYear() === target.getFullYear() &&
    today.getMonth() === target.getMonth() &&
    today.getDate() === target.getDate()
  );
}

function isPast(dateString) {
  if (!dateString) return false;

  const today = new Date();
  const target = new Date(`${dateString}T00:00:00`);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  return target < today;
}

export default function TasksPage() {
  const supabase = createClient();

  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);

  async function fetchItems() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("planner_items")
      .select("*")
      .eq("type", "task")
      .order("completed", { ascending: true })
      .order("date", { ascending: true, nullsFirst: false })
      .order("start_time", { ascending: true, nullsFirst: false });

    if (error) {
      console.error(error);
      return;
    }

    setItems(data || []);
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

  const visibleItems = items.filter((item) => showCompleted || !item.completed);

  const todayItems = visibleItems.filter(
    (item) => !item.completed && item.date && isToday(item.date)
  );

  const overdueItems = visibleItems.filter(
    (item) => !item.completed && item.date && isPast(item.date)
  );

  const upcomingItems = visibleItems.filter(
    (item) =>
      !item.completed &&
      (!item.date || (!isToday(item.date) && !isPast(item.date)))
  );

  const completedItems = visibleItems.filter((item) => item.completed);

  function TaskCard({ item }) {
    return (
      <button
        type="button"
        onClick={() => setEditingItem(item)}
        className={`w-full rounded-card border bg-white p-4 text-left shadow-sm transition ${
          item.completed
            ? "border-line opacity-50"
            : isPast(item.date)
              ? "border-red-200"
              : isToday(item.date)
                ? "border-brand-200"
                : "border-line"
        }`}
      >
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={!!item.completed}
            onChange={(event) => {
              event.stopPropagation();
              toggleComplete(item);
            }}
            onClick={(event) => event.stopPropagation()}
            className="mt-1 h-4 w-4"
          />

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] ${
                  isPast(item.date) && !item.completed
                    ? "bg-red-50 text-red-500"
                    : isToday(item.date) && !item.completed
                      ? "bg-brand-50 text-brand-600"
                      : "bg-slate-50 text-slate-500"
                }`}
              >
                {item.date ? toDateLabel(item.date) : "日付なし"}
              </span>

              {item.start_time && (
                <span className="text-xs text-muted">{item.start_time}</span>
              )}
            </div>

            <p
              className={`font-medium text-main ${
                item.completed ? "line-through" : ""
              }`}
            >
              {item.title || "無題のタスク"}
            </p>

            {item.memo && (
              <p className="mt-1 line-clamp-2 text-sm text-muted">
                {item.memo}
              </p>
            )}
          </div>
        </div>
      </button>
    );
  }

  function Section({ title, items, emptyText }) {
    return (
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted">{title}</h2>

        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item) => (
              <TaskCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-line bg-white p-4 text-sm text-muted">
            {emptyText}
          </div>
        )}
      </section>
    );
  }

  return (
    <div>
      <PageHeader
        title="タスク一覧"
        description="未完了のタスクを時系列で確認できます。"
      />

      <div className="mb-4">
        <FilterBar />
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

      <div className="space-y-6">
        <Section title="今日" items={todayItems} emptyText="今日のタスクはありません。" />

        <Section
          title="期限切れ"
          items={overdueItems}
          emptyText="期限切れのタスクはありません。"
        />

        <Section title="今後" items={upcomingItems} emptyText="今後のタスクはありません。" />

        {showCompleted && (
          <Section
            title="完了済み"
            items={completedItems}
            emptyText="完了済みタスクはありません。"
          />
        )}
      </div>

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
    </div>
  );
}