import { PageHeader } from "@/components/PageHeader";

export default function GuidePage() {
  return (
    <StaticPage
      title="使い方ガイド"
      paragraphs={[
        "TOPでは今日、今週、共有、メモを俯瞰できます。",
        "カレンダーは月・週・日で切り替えられます。",
        "共有管理では、個人予定と複数グループ予定を重ねて表示する設計にしています。"
      ]}
    />
  );
}

function StaticPage({ title, paragraphs }) {
  return (
    <div>
      <PageHeader title={title} />
      <section className="card space-y-3 p-5">
        {paragraphs.map((text) => <p key={text} className="text-sm text-muted">{text}</p>)}
      </section>
    </div>
  );
}
