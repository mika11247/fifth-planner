"use client";

import { useState } from "react";
import { filterOptions } from "@/lib/mockData";

export function FilterBar() {
  const [active, setActive] = useState(["personal", "family", "work", "yoga"]);

  function toggle(id) {
    setActive((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  return (
    <div className="card flex flex-wrap items-center gap-2 p-3">
      <span className="px-2 text-xs font-semibold text-muted">表示</span>
      {filterOptions.map((filter) => {
        const selected = active.includes(filter.id);
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => toggle(filter.id)}
            className={`focus-ring rounded-control border px-3 py-2 text-xs font-semibold transition ${
              selected ? "border-transparent text-white" : "border-line bg-white text-muted"
            }`}
            style={selected ? { backgroundColor: filter.color } : undefined}
          >
            {filter.name}
          </button>
        );
      })}
    </div>
  );
}
