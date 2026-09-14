import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminEmpty, AdminError, AdminPageHeader } from "@/components/admin/AdminUI";
import { supabase } from "@/lib/supabase";
import {
  fmtDate,
  fmtLKR,
  getCustomerAddresses,
  getCustomerOrders,
  listCustomers,
  type AdminCustomer,
} from "@/lib/admin-queries";

export const Route = createFileRoute("/admin/customers")({
  component: CustomersPage,
});

type CustomerRow = AdminCustomer & {
  orderCount: number;
  totalValue: number;
  lastOrder: string | undefined;
};

function CustomersPage() {
  const [rows, setRows] = useState<CustomerRow[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AdminCustomer | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const [custRes, ordersRes] = await Promise.all([
      listCustomers({ search }),
      supabase.from("orders").select("customer_id, total_amount, created_at").limit(2000),
    ]);
    if (custRes.error) {
      setError("Could not load customers. Check your RLS policies for customers.");
      setLoading(false);
      return;
    }
    const byCustomer = new Map<string, { count: number; total: number; last?: string }>();
    for (const o of ordersRes.data ?? []) {
      const cur = byCustomer.get(o.customer_id) ?? { count: 0, total: 0 };
      cur.count += 1;
      cur.total += Number(o.total_amount) || 0;
      if (!cur.last || o.created_at > cur.last) cur.last = o.created_at;
      byCustomer.set(o.customer_id, cur);
    }
    setLoading(false);
    setRows(
      ((custRes.data ?? []) as AdminCustomer[]).map((c) => ({
        ...c,
        orderCount: byCustomer.get(c.id)?.count ?? 0,
        totalValue: byCustomer.get(c.id)?.total ?? 0,
        lastOrder: byCustomer.get(c.id)?.last,
      })),
    );
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AdminPageHeader title="Customers" description="Everyone who has ordered from the website." />

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="Search name, contact or email…"
          className="h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm"
        />
        <button
          onClick={load}
          className="h-9 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Search
        </button>
      </div>

      {error ? (
        <AdminError message={error} onRetry={load} />
      ) : loading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading customers…</p>
      ) : rows.length === 0 ? (
        <AdminEmpty message="No customers found." />
      ) : (
        <div className="overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Contact</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Orders</th>
                <th className="px-3 py-2">Total Value</th>
                <th className="px-3 py-2">Last Order</th>
                <th className="px-3 py-2">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((c) => (
                <tr
                  key={c.id}
                  className="cursor-pointer hover:bg-accent/50"
                  onClick={() => setSelected(c)}
                >
                  <td className="px-3 py-2 font-semibold text-primary underline">
                    {c.first_name} {c.last_name}
                  </td>
                  <td className="px-3 py-2">{c.contact_no}</td>
                  <td className="px-3 py-2">{c.email ?? "—"}</td>
                  <td className="px-3 py-2">{c.orderCount}</td>
                  <td className="px-3 py-2 font-semibold">{fmtLKR(c.totalValue)}</td>
                  <td className="px-3 py-2 text-xs">{c.lastOrder ? fmtDate(c.lastOrder) : "—"}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {fmtDate(c.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && <CustomerDialog customer={selected} onClose={() => setSelected(null)} />}
    </div>
  );

  function CustomerDialog({ customer, onClose }: { customer: AdminCustomer; onClose: () => void }) {
    const [orders, setOrders] = useState<
      {
        id: string;
        order_number: number;
        total_amount: string | number;
        order_status: string;
        created_at: string;
      }[]
    >([]);
    const [addresses, setAddresses] = useState<
      {
        id: string;
        country: string;
        address_line_1: string;
        apartment_suite: string | null;
        city: string;
        postal_code: string;
        created_at: string;
      }[]
    >([]);

    useEffect(() => {
      getCustomerOrders(customer.id).then((r) => setOrders((r.data ?? []) as typeof orders));
      getCustomerAddresses(customer.id).then((r) =>
        setAddresses((r.data ?? []) as typeof addresses),
      );
    }, [customer.id]);

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          className="max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display text-lg font-extrabold">
                {customer.first_name} {customer.last_name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {customer.contact_no}
                {customer.email ? ` · ${customer.email}` : ""}
              </p>
            </div>
            <button onClick={onClose} className="text-sm text-muted-foreground underline">
              Close
            </button>
          </div>

          <h3 className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">
            Delivery addresses
          </h3>
          {addresses.length === 0 ? (
            <p className="mt-1 text-sm text-muted-foreground">No addresses recorded.</p>
          ) : (
            <ul className="mt-1 space-y-2 text-sm">
              {addresses.map((a) => (
                <li key={a.id} className="border border-border p-2">
                  {a.address_line_1}
                  {a.apartment_suite ? `, ${a.apartment_suite}` : ""}, {a.city} {a.postal_code},{" "}
                  {a.country}
                  <span className="block text-xs text-muted-foreground">
                    {fmtDate(a.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <h3 className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">
            Order history
          </h3>
          {orders.length === 0 ? (
            <p className="mt-1 text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            <ul className="mt-1 space-y-1 text-sm">
              {orders.map((o) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between border-b border-border py-1.5"
                >
                  <span className="font-semibold">#{o.order_number}</span>
                  <span>{fmtLKR(o.total_amount)}</span>
                  <span className="text-xs">{o.order_status}</span>
                  <span className="text-xs text-muted-foreground">{fmtDate(o.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
