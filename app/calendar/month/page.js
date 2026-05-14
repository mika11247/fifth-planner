"use client";

import { useEffect, useState } from "react";
import { MonthCalendar } from "@/components/CalendarGrid";
import { FilterBar } from "@/components/FilterBar";
import { PageHeader } from "@/components/PageHeader";
import { createClient } from "@/lib/supabase/browser";

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

export default function MonthPage() {
  const supabase = createClient();
  const [items, setItems] = useState([]);

  useEffect(() => {
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

    fetchItems();
  }, []);

  return (
    <div>
      <PageHeader
        title="マンスリー"
        description="個人と共有グループの予定を重ねて表示する月表示です。"
      />

      <div className="mb-4">
        <FilterBar />
      </div>

      <MonthCalendar date={today} items={items} />
    </div>
  );
}