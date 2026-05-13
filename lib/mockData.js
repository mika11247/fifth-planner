export const filterOptions = [
  { id: "personal", name: "個人", color: "#38aee4" },
  { id: "family", name: "家族", color: "#f59ab2" },
  { id: "work", name: "仕事", color: "#5577d9" },
  { id: "yoga", name: "ヨガ", color: "#46c7a3" }
];

export const categories = [
  { id: "personal", name: "personal", color: "#38aee4", icon_key: "spark" },
  { id: "work", name: "work", color: "#5577d9", icon_key: "briefcase" },
  { id: "family", name: "family", color: "#f59ab2", icon_key: "home" },
  { id: "health", name: "health", color: "#46c7a3", icon_key: "leaf" },
  { id: "study", name: "study", color: "#f5b84b", icon_key: "book" },
  { id: "task", name: "task", color: "#7c91ff", icon_key: "check" },
  { id: "event", name: "event", color: "#20a4d8", icon_key: "calendar" },
  { id: "memo", name: "memo", color: "#9aa8b8", icon_key: "note" }
];

export const plannerItems = [
  {
    id: "1",
    user_id: "demo",
    group_id: null,
    type: "event",
    title: "朝のレビュー",
    memo: "価値観、役割、今日の優先順位を確認",
    category_id: "personal",
    start_at: "2026-05-13T08:00:00+09:00",
    end_at: "2026-05-13T08:30:00+09:00",
    all_day: false,
    completed: false
  },
  {
    id: "2",
    user_id: "demo",
    group_id: "family",
    type: "event",
    title: "夕食の買い出し",
    memo: "共有予定として家族カレンダーに表示",
    category_id: "family",
    start_at: "2026-05-13T18:30:00+09:00",
    end_at: "2026-05-13T19:15:00+09:00",
    all_day: false,
    completed: false
  },
  {
    id: "3",
    user_id: "demo",
    group_id: null,
    type: "task",
    title: "今週の3大タスクを決める",
    memo: "Franklin Planner風に重要度で並べる",
    category_id: "task",
    start_at: "2026-05-13T10:00:00+09:00",
    end_at: null,
    all_day: false,
    completed: false
  },
  {
    id: "4",
    user_id: "demo",
    group_id: "work",
    type: "event",
    title: "プロジェクト定例",
    memo: "仕事グループ",
    category_id: "work",
    start_at: "2026-05-14T11:00:00+09:00",
    end_at: "2026-05-14T12:00:00+09:00",
    all_day: false,
    completed: false
  },
  {
    id: "5",
    user_id: "demo",
    group_id: "yoga",
    type: "event",
    title: "ヨガクラス",
    memo: "健康カテゴリ",
    category_id: "health",
    start_at: "2026-05-15T07:30:00+09:00",
    end_at: "2026-05-15T08:30:00+09:00",
    all_day: false,
    completed: false
  },
  {
    id: "6",
    user_id: "demo",
    group_id: null,
    type: "note",
    title: "来月のテーマ",
    memo: "予定を詰めるより、余白を先に確保する。",
    category_id: "memo",
    start_at: "2026-05-12T21:00:00+09:00",
    end_at: null,
    all_day: false,
    completed: false
  }
];

export const groups = [
  { id: "family", name: "家族", color: "#f59ab2" },
  { id: "work", name: "仕事", color: "#5577d9" },
  { id: "yoga", name: "ヨガ", color: "#46c7a3" }
];
