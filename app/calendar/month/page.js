"use client";

import { useEffect, useState } from "react";
import { MonthCalendar } from "@/components/CalendarGrid";
import { FilterBar } from "@/components/FilterBar";
import { PageHeader } from "@/components/PageHeader";
import { createClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import { PlannerForm } from "@/components/PlannerForm";
import { useSwipeable } from "react-swipeable";

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

export default function MonthPage() {
  const supabase = createClient();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const next = new Date(currentDate);
      next.setMonth(next.getMonth() + 1);
      setCurrentDate(next);
    },
  
    onSwipedRight: () => {
      const prev = new Date(currentDate);
      prev.setMonth(prev.getMonth() - 1);
      setCurrentDate(prev);
    },
  
    preventScrollOnSwipe: true,
    trackMouse: false,
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

  return (
    <div {...handlers}>
      
      <PageHeader
        title="マンスリー"
        description="個人と共有グループの予定を重ねて表示する月表示です。"
      />

      <div className="mb-4">
        <FilterBar />
      </div>

      <div className="mb-4 flex items-center justify-between rounded-card border border-line bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => {
            const prev = new Date(currentDate);
            prev.setMonth(prev.getMonth() - 1);
            setCurrentDate(prev);
          }}
          className="rounded-control border border-line px-3 py-1 text-sm"
        >
          ← 前月
        </button>

        <button
          type="button"
          onClick={() => setCurrentDate(new Date())}
          className="rounded-control bg-brand-500 px-3 py-1 text-sm text-white"
        >
          今日
        </button>

        <h2 className="text-lg font-semibold">
          {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
        </h2>

        <button
          type="button"
          onClick={() => {
            const next = new Date(currentDate);
            next.setMonth(next.getMonth() + 1);
            setCurrentDate(next);
          }}
          className="rounded-control border border-line px-3 py-1 text-sm"
        >
          次月 →
        </button>
      </div>

      <MonthCalendar
        date={currentDate}
        items={items}
        onDateClick={(day) => {
          router.push(`/calendar/day?date=${toDateString(day)}`);
        }}
      />

      <button
        type="button"
        onClick={() => {
          setSelectedDate(toDateString(currentDate));
          setIsOpen(true);
        }}
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
              defaultDate={selectedDate || toDateString(currentDate)}
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