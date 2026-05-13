import { FilterBar } from "@/components/FilterBar";
import { PageHeader } from "@/components/PageHeader";
import { groups } from "@/lib/mockData";

export default function SharePage() {
  return (
    <div>
      <PageHeader title="共有管理" description="group_id方式で、家族・仕事・ヨガなど複数グループを切り替える想定です。" />
      <div className="mb-4">
        <FilterBar />
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        {groups.map((group) => (
          <article key={group.id} className="card p-5">
            <span className="mb-4 block h-3 w-12 rounded-control" style={{ backgroundColor: group.color }} />
            <h2 className="text-lg font-semibold">{group.name}</h2>
            <p className="mt-2 text-sm text-muted">メンバー、共有予定、表示ON/OFFをここで管理する設計です。</p>
          </article>
        ))}
      </section>
    </div>
  );
}
