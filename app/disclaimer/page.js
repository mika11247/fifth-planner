import { PageHeader } from "@/components/PageHeader";

export default function DisclaimerPage() {
  return (
    <div>
      <PageHeader title="免責事項" />
      <section className="card space-y-3 p-5 text-sm text-muted">
        <p>本アプリの情報管理、予定管理、共有機能の利用により生じた損害について、運営者は法令で認められる範囲で責任を負いません。</p>
        <p>重要な予定や期限は、必要に応じて別手段でも確認してください。</p>
      </section>
    </div>
  );
}
