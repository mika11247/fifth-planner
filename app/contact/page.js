import { PageHeader } from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <div>
      <PageHeader title="お問い合わせ" />
      <section className="card p-5">
        <p className="text-sm text-muted">MVPでは問い合わせ先の表示枠のみ用意しています。公開時にメールアドレスまたはフォームを設定してください。</p>
      </section>
    </div>
  );
}
