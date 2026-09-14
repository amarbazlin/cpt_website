import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AdminEmpty,
  AdminError,
  AdminPageHeader,
  StatCard,
  StatusBadge,
} from "@/components/admin/AdminUI";
import {
  fmtDate,
  fmtLKR,
  getDashboardStats,
  getRecentLeads,
  getRecentOrders,
  type AdminLead,
  type AdminOrder,
  type DashboardStats,
} from "@/lib/admin-queries";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    const [s, o, l] = await Promise.all([getDashboardStats(), getRecentOrders(), getRecentLeads()]);
    if (s.error || o.error || l.error) {
      setError("Could not load dashboard data. Check your database connection and RLS policies.");
      return;
    }
    setStats(s.data);
    setOrders((o.data ?? []) as AdminOrder[]);
    setLeads((l.data ?? []) as AdminLead[]);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <AdminPageHeader title="Dashboard" description="Live overview of CPT website activity." />

      {error ? (
        <AdminError message={error} onRetry={load} />
      ) : !stats ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading stats…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <StatCard label="Total Orders" value={stats.totalOrders} />
            <StatCard label="New Orders" value={stats.ordersByStatus["New"] ?? 0} />
            <StatCard label="Confirmed" value={stats.ordersByStatus["Confirmed"] ?? 0} />
            <StatCard
              label="Pending Payment"
              value={stats.ordersByStatus["Pending"] ?? 0}
              hint="payment"
            />
            <StatCard label="Delivered Orders" value={stats.ordersByStatus["Delivered"] ?? 0} />
            <StatCard label="Total Leads" value={stats.totalLeads} />
            <StatCard label="New Leads" value={stats.newLeads} />
            <StatCard label="Customers" value={stats.totalCustomers} />
            <StatCard label="Saved Contacts" value={stats.totalSavedContacts} />
            <StatCard label="Products" value={stats.totalProducts} />
            <StatCard label="Active Products" value={stats.activeProducts} />
          </div>

          <h2 className="mt-8 font-display text-lg font-extrabold">Today</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Orders" value={stats.todayOrders} />
            <StatCard label="WhatsApp Leads" value={stats.todayLeads} />
            <StatCard label="New Customers" value={stats.todayCustomers} />
            <StatCard label="Saved Contacts" value={stats.todaySavedContacts} />
          </div>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-extrabold">Recent orders</h2>
                <Link to="/admin/orders" className="text-sm font-semibold text-primary underline">
                  View all
                </Link>
              </div>
              {orders.length === 0 ? (
                <AdminEmpty message="No orders yet." />
              ) : (
                <ul className="divide-y divide-border border border-border bg-card">
                  {orders.map((o) => (
                    <li key={o.id} className="flex items-center justify-between gap-3 p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          #{o.order_number} — {o.customers?.first_name ?? "—"}{" "}
                          {o.customers?.last_name ?? ""}
                        </p>
                        <p className="text-xs text-muted-foreground">{fmtDate(o.created_at)}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold">{fmtLKR(o.total_amount)}</p>
                        <StatusBadge status={o.order_status} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-extrabold">Recent WhatsApp leads</h2>
                <Link to="/admin/leads" className="text-sm font-semibold text-primary underline">
                  View all
                </Link>
              </div>
              {leads.length === 0 ? (
                <AdminEmpty message="No WhatsApp leads yet." />
              ) : (
                <ul className="divide-y divide-border border border-border bg-card">
                  {leads.map((l) => (
                    <li key={l.id} className="flex items-center justify-between gap-3 p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{l.product_name ?? "—"}</p>
                        <p className="text-xs text-muted-foreground">
                          {l.contact_no ?? "—"} · {fmtDate(l.created_at)}
                        </p>
                      </div>
                      <StatusBadge status={l.lead_status} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
