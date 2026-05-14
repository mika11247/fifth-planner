"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export function EditPlannerModal({
  item,
  onClose,
  onSaved,
}) {
  const supabase = createClient();

  const [title, setTitle] = useState(item.title || "");
  const [date, setDate] = useState(item.date || "");
  const [startTime, setStartTime] = useState(item.start_time || "");
  const [endTime, setEndTime] = useState(item.end_time || "");
  const [type, setType] = useState(item.type || "event");
  const [category, setCategory] = useState(item.category || "");
  const [note, setNote] = useState(item.note || "");
  const [color, setColor] = useState(item.color || "#7dd3fc");
  const [message, setMessage] = useState("");

  async function handleUpdate(event) {
    event.preventDefault();

    const { error } = await supabase
      .from("planner_items")
      .update({
        title,
        date: date || null,
        start_time: startTime || null,
        end_time: endTime || null,
        type,
        category: category || null,
        note: note || null,
        color,
      })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      setMessage("更新に失敗しました");
      return;
    }

    onSaved?.();
  }

  async function handleDelete() {
    const confirmed = confirm("削除しますか？");

    if (!confirmed) return;

    const { error } = await supabase
      .from("planner_items")
      .delete()
      .eq("id", item.id);

    if (error) {
      console.error(error);
      setMessage("削除に失敗しました");
      return;
    }

    onSaved?.();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-card bg-white p-4 shadow-soft"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            予定を編集
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted"
          >
            閉じる
          </button>
        </div>

        <form onSubmit={handleUpdate} className="grid gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="予定タイトル"
            className="focus-ring w-full rounded-control border border-line bg-white px-4 py-3 text-sm"
            required
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="focus-ring rounded-control border border-line bg-white px-4 py-3 text-sm"
            />

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="focus-ring rounded-control border border-line bg-white px-4 py-3 text-sm"
            />

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="focus-ring rounded-control border border-line bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="focus-ring rounded-control border border-line bg-white px-4 py-3 text-sm"
            >
              <option value="event">予定</option>
              <option value="task">タスク</option>
              <option value="note">メモ</option>
            </select>

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="カテゴリ"
              className="focus-ring rounded-control border border-line bg-white px-4 py-3 text-sm"
            />

            <textarea
  value={note}
  onChange={(e) => setNote(e.target.value)}
  placeholder="メモ"
  rows={4}
  className="focus-ring w-full rounded-control border border-line bg-white px-4 py-3 text-sm"
/>

            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-12 rounded-control border border-line bg-white px-2"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button className="focus-ring rounded-control bg-brand-500 px-4 py-3 text-sm font-semibold text-white">
              保存
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="focus-ring rounded-control bg-red-500 px-4 py-3 text-sm font-semibold text-white"
            >
              削除
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-3 text-sm text-muted">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}