"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export function PlannerForm({ onSaved, defaultDate = "" }) {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [type, setType] = useState("event");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("#7dd3fc");
  const [message, setMessage] = useState("");

  const [note, setNote] = useState("");

  useEffect(() => {
  setDate(defaultDate);
}, [defaultDate]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!supabase) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("ログインしてください");
      return;
    }

    const { error } = await supabase.from("planner_items").insert({
      user_id: user.id,
      title,
      date: date || null,
      start_time: startTime || null,
      end_time: endTime || null,
      type,
      category: category || null,
      color,
      note: note || null,
    });

    if (error) {
      console.error(error);
      setMessage("保存に失敗しました");
      return;
    }

    setTitle("");
setDate(defaultDate || "");
setStartTime("");
setEndTime("");
setType("event");
setCategory("");
setNote("");
setColor("#7dd3fc");
setMessage("予定を追加しました！");
onSaved?.();
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">予定を追加</h2>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="予定タイトル"
          className="focus-ring w-full rounded-control border border-line bg-white px-4 py-3 text-sm"
          required
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="focus-ring rounded-control border border-line bg-white px-4 py-3 text-sm" />
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="focus-ring rounded-control border border-line bg-white px-4 py-3 text-sm" />
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="focus-ring rounded-control border border-line bg-white px-4 py-3 text-sm" />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <select value={type} onChange={(e) => setType(e.target.value)} className="focus-ring rounded-control border border-line bg-white px-4 py-3 text-sm">
            <option value="event">予定</option>
            <option value="task">タスク</option>
            <option value="note">メモ</option>
          </select>

          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="カテゴリ" className="focus-ring rounded-control border border-line bg-white px-4 py-3 text-sm" />

          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-12 rounded-control border border-line bg-white px-2" />

          <textarea
  value={note}
  onChange={(e) => setNote(e.target.value)}
  placeholder="メモ"
  rows={4}
  className="focus-ring w-full rounded-control border border-line bg-white px-4 py-3 text-sm"
/>

        </div>

        <button className="focus-ring rounded-control bg-brand-500 px-4 py-3 text-sm font-semibold text-white">
          保存
        </button>
      </form>

      {message && <p className="mt-3 text-sm text-muted">{message}</p>}
    </div>
  );
}