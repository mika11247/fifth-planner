import { PageHeader } from "@/components/PageHeader";

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader title="プライバシーポリシー" />
      <section className="card space-y-3 p-5 text-sm text-muted">
        <p>本アプリは、予定、タスク、メモ、共有グループ情報をプランナー機能の提供のために扱います。</p>
        <p>認証情報はSupabase Authを利用して管理します。正式公開前に、運営者情報、問い合わせ先、保存期間、第三者提供の有無を追記してください。</p>
      </section>
    </div>
  );
}
