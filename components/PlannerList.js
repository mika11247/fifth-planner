"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export function PlannerList({ refreshKey }) {
  const supabase = createClient();

  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [editType, setEditType] = useState("event");
  const [editCategory, setEditCategory] = useState("");
  const [editColor, setEditColor] = useState("#7dd3fc");
  const [editNote, setEditNote] = useState("");

  async function fetchItems() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("planner_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setItems(data || []);
  }

  useEffect(() => {
  fetchItems();
}, [refreshKey]);

  function startEdit(item) {
    setEditingId(item.id);
    setEditTitle(item.title || "");
    setEditDate(item.date || "");
    setEditStartTime(item.start_time || "");
    setEditEndTime(item.end_time || "");
    setEditType(item.type || "event");
    setEditCategory(item.category || "");
    setEditColor(item.color || "#7dd3fc");
    setEditNote(item.note || "");
  }

  async function updateItem(id) {
    const { error } = await supabase
      .from("planner_items")
      .update({
        title: editTitle,
        date: editDate || null,
        start_time: editStartTime || null,
        end_time: editEndTime || null,
        type: editType,
        category: editCategory || null,
        color: editColor,
        note: editNote || null,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("更新に失敗しました");
      return;
    }

    setEditingId(null);
    fetchItems();
  }

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

  async function deleteItem(id) {
    if (!confirm("この予定を削除しますか？")) return;

    const { error } = await supabase
      .from("planner_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("削除に失敗しました");
      return;
    }

    fetchItems();
  }

  return (
    <section className="card p-5">
      <h2 className="mb-4 text-lg font-semibold">保存された予定</h2>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted">まだ予定がありません。</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-control border border-line bg-white p-3"
            >
              {editingId === item.id ? (
                <div className="space-y-3">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="focus-ring w-full rounded-control border border-line px-3 py-2 text-sm"
                  />

                  <div className="grid gap-2 sm:grid-cols-3">
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="focus-ring rounded-control border border-line px-3 py-2 text-sm"
                    />
                    <input
                      type="time"
                      value={editStartTime}
                      onChange={(e) => setEditStartTime(e.target.value)}
                      className="focus-ring rounded-control border border-line px-3 py-2 text-sm"
                    />
                    <input
                      type="time"
                      value={editEndTime}
                      onChange={(e) => setEditEndTime(e.target.value)}
                      className="focus-ring rounded-control border border-line px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3">
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="focus-ring rounded-control border border-line px-3 py-2 text-sm"
                    >
                      <option value="event">予定</option>
                      <option value="task">タスク</option>
                      <option value="note">メモ</option>
                    </select>

                    <input
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      placeholder="カテゴリ"
                      className="focus-ring rounded-control border border-line px-3 py-2 text-sm"
                    />

                    <input
                      type="color"
                      value={editColor}
                      onChange={(e) => setEditColor(e.target.value)}
                      className="h-10 rounded-control border border-line bg-white px-2"
                    />
                  </div>

                  <textarea
  value={editNote}
  onChange={(e) => setEditNote(e.target.value)}
  placeholder="メモ"
  rows={3}
  className="focus-ring w-full rounded-control border border-line px-3 py-2 text-sm"
/>

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateItem(item.id)}
                      className="rounded-control bg-brand-500 px-3 py-2 text-xs font-semibold text-white"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-control border border-line px-3 py-2 text-xs font-semibold text-muted"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color || "#7dd3fc" }}
                    />
                    <div className={`min-w-0 flex-1 ${
  item.completed ? "opacity-50" : ""
}`}>
                      <div className="flex items-center gap-2">
  {item.type === "task" && (
    <input
      type="checkbox"
      checked={!!item.completed}
      onChange={() => toggleComplete(item)}
      className="h-4 w-4"
    />
  )}

  <p className={`font-medium ${
    item.completed ? "line-through" : ""
  }`}>
    {item.title}
  </p>
</div>
                      <p className="mt-1 text-xs text-muted">
                        {item.date || "日付なし"}
                        {item.start_time ? ` ${item.start_time.slice(0, 5)}` : ""}
                        {item.end_time ? `〜${item.end_time.slice(0, 5)}` : ""}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {item.type || "event"}
                        {item.category ? ` / ${item.category}` : ""}                        
                      </p>
                      {item.note && (
  <p className="mt-2 whitespace-pre-wrap text-sm text-muted">
    {item.note}
  </p>
)}
                    </div>
                  </div>

                  {item.type === "task" && (
  <button
    onClick={() => toggleComplete(item)}
    className={`rounded-control px-3 py-2 text-xs font-semibold ${
      item.completed
        ? "bg-green-100 text-green-700"
        : "border border-line text-ink"
    }`}
  >
    {item.completed ? "完了済み" : "完了"}
  </button>
)}

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="rounded-control border border-line px-3 py-2 text-xs font-semibold text-ink"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="rounded-control border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600"
                    >
                      削除
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}