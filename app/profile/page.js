import { AuthPanel } from "@/components/AuthPanel";
import { PageHeader } from "@/components/PageHeader";

export default function ProfilePage() {
  return (
    <div>
      <PageHeader title="マイページ" description="Supabase Authのメールログイン、Googleログイン、ログアウトを試せます。" />
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <AuthPanel />
        <section className="card p-5">
          <h2 className="text-lg font-semibold">プロフィール設定</h2>
          <p className="mt-2 text-sm text-muted">
            表示名、テーマ、既定カレンダー、カテゴリ管理を将来ここへ追加できます。
          </p>
        </section>
      </div>
    </div>
  );
}
