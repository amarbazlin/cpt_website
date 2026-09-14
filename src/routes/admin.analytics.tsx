import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminError, AdminPageHeader, StatCard } from "@/components/admin/AdminUI";
import { fmtLKR, getAnalytics, type AnalyticsData } from "@/lib/admin-queries";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    const res = await getAnalytics();
    if (res.error) {
      setError("Could not load analytics. Check your RLS policies for read access.");
      return;
    }
    setData(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  const maxValue = Math.max(1, ...(data?.ordersByDay.map((d) => d.count) ?? [0]));

  return (
    <div>
      <AdminPageHeader
        title="Analytics"
        description="Real data from the last 14 days — no estimates."
      />

      {error ? (
        <AdminError message={error} onRetry={load} />
      ) : !data ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading analytics…</p>
      ) : (
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-lg font-extrabold">Orders over time</h2>
            <div className="mt-3 flex h-40 items-end gap-1.5 border-b border-border">
              {data.ordersByDay.map((d) => (
                <div
                  key={d.day}
                  className="group relative flex-1"
                  title={`${d.day}: ${d.count} orders`}
                >
                  <div
                    className="w-full rounded-t bg-primary/80"
                    style={{ height: `${Math.max(2, (d.count / maxValue) * 150)}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1 flex gap-1 text-[9px] text-muted-foreground">
              {data.ordersByDay.map((d) => (
                <span key={d.day} className="flex-1 text-center">
                  {d.day.slice(8)}
                </span>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-lg font-extrabold">Orders by status</h2>
              <StatusBars data={data.ordersByStatus} />
            </div>
            <div>
              <h2 className="font-display text-lg font-extrabold">Leads by status</h2>
              <StatusBars data={data.leadsByStatus} />
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-extrabold">Best-selling products</h2>
            {data.bestSellers.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No order items yet — this fills in as orders come in.
              </p>
            ) : (
              <table className="mt-3 w-full max-w-xl text-left text-sm">
                <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="py-1">Product</th>
                    <th className="py-1">Units sold</th>
                    <th className="py-1">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.bestSellers.map((b) => (
                    <tr key={b.product_name}>
                      <td className="py-1.5">{b.product_name}</td>
                      <td className="py-1.5 font-semibold">{b.qty}</td>
                      <td className="py-1.5">{fmtLKR(b.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function StatusBars({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data);
  const max = Math.max(1, ...entries.map(([, v]) => v));
  if (entries.length === 0) {
    return <p className="mt-2 text-sm text-muted-foreground">No data yet.</p>;
  }
  return (
    <div className="mt-3 space-y-2">
      {entries.map(([status, count]) => (
        <div key={status}>
          <div className="flex justify-between text-xs">
            <span className="font-semibold">{status}</span>
            <span>{count}</span>
          </div>
          <div className="h-2 rounded bg-muted">
            <div className="h-2 rounded bg-primary" style={{ width: `${(count / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
