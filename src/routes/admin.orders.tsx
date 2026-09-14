import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminEmpty, AdminError, AdminPageHeader, StatusBadge } from "@/components/admin/AdminUI";
import {
  fmtDate,
  fmtLKR,
  getOrderItems,
  listOrders,
  updateOrder,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  type AdminOrder,
  type AdminOrderItem,
} from "@/lib/admin-queries";

export const Route = createFileRoute("/admin/orders")({
  component: OrdersPage,
});

function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<{ order: AdminOrder; items: AdminOrderItem[] } | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const res = await listOrders({ search, status });
    setLoading(false);
    if (res.error) {
      setError("Could not load orders. Check your RLS policies for the orders table.");
      return;
    }
    setOrders((res.data ?? []) as AdminOrder[]);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function openDetail(order: AdminOrder) {
    const items = await getOrderItems(order.id);
    setDetail({ order, items: (items.data ?? []) as AdminOrderItem[] });
  }

  async function setOrderStatus(order: AdminOrder, order_status: string) {
    const res = await updateOrder(order.id, {
      order_status: order_status as (typeof ORDER_STATUSES)[number],
    });
    if (!res.error)
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, order_status } : o)));
  }

  async function setPaymentStatus(order: AdminOrder, payment_status: string) {
    const res = await updateOrder(order.id, {
      payment_status: payment_status as (typeof PAYMENT_STATUSES)[number],
    });
    if (!res.error)
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, payment_status } : o)));

    return (
      <div>
        <AdminPageHeader title="Orders" description="Manage customer orders and statuses." />

        <div className="mb-4 flex flex-wrap gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()}
            placeholder="Search order number or contact…"
            className="h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-9 cursor-pointer rounded-md border border-input bg-background px-3 text-sm"
            aria-label="Filter by order status"
          >
            <option value="all">All statuses</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
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
          <p className="py-10 text-center text-sm text-muted-foreground">Loading orders…</p>
        ) : orders.length === 0 ? (
          <AdminEmpty message="No orders found." />
        ) : (
          <div className="overflow-x-auto border border-border bg-card">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Order</th>
                  <th className="px-3 py-2">Customer</th>
                  <th className="px-3 py-2">Contact</th>
                  <th className="px-3 py-2">City</th>
                  <th className="px-3 py-2">Total</th>
                  <th className="px-3 py-2">Payment</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((o) => (
                  <tr key={o.id} className="align-top">
                    <td className="px-3 py-2 font-bold">#{o.order_number}</td>
                    <td className="px-3 py-2">
                      {o.customers?.first_name ?? "—"} {o.customers?.last_name ?? ""}
                    </td>
                    <td className="px-3 py-2">{o.contact_no}</td>
                    <td className="px-3 py-2">{o.customer_addresses?.city ?? "—"}</td>
                    <td className="px-3 py-2 font-semibold">{fmtLKR(o.total_amount)}</td>
                    <td className="px-3 py-2">
                      <select
                        value={o.payment_status}
                        onChange={(e) => setPaymentStatus(o, e.target.value)}
                        className="rounded border border-input bg-background px-1.5 py-1 text-xs"
                        aria-label={`Payment status for order ${o.order_number}`}
                      >
                        {PAYMENT_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={o.order_status}
                        onChange={(e) => setOrderStatus(o, e.target.value)}
                        className="rounded border border-input bg-background px-1.5 py-1 text-xs"
                        aria-label={`Order status for order ${o.order_number}`}
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <span className="mt-1 block">
                        <StatusBadge status={o.order_status} />
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">
                      {fmtDate(o.created_at)}
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => openDetail(o)}
                        className="rounded border border-input px-2 py-1 text-xs font-semibold hover:bg-accent"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {detail && (
          <OrderDetailDialog
            order={detail.order}
            items={detail.items}
            onClose={() => setDetail(null)}
          />
        )}
      </div>
    );
  }

  function OrderDetailDialog({
    order,
    items,
    onClose,
  }: {
    order: AdminOrder;
    items: AdminOrderItem[];
    onClose: () => void;
  }) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          className="max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6 shadow-lift"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between">
            <h2 className="font-display text-lg font-extrabold">Order #{order.order_number}</h2>
            <button onClick={onClose} className="text-sm text-muted-foreground underline">
              Close
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Customer</h3>
              <p className="mt-1 text-sm">
                {order.customers?.first_name} {order.customers?.last_name}
              </p>
              <p className="text-sm">{order.contact_no}</p>
              {order.customers?.email && <p className="text-sm">{order.customers.email}</p>}
            </section>
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Delivery</h3>
              <p className="mt-1 text-sm">{order.customer_addresses?.country}</p>
              <p className="text-sm">{order.customer_addresses?.address_line_1}</p>
              {order.customer_addresses?.apartment_suite && (
                <p className="text-sm">{order.customer_addresses.apartment_suite}</p>
              )}
              <p className="text-sm">
                {order.customer_addresses?.city} {order.customer_addresses?.postal_code}
              </p>
            </section>
          </div>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-widest text-primary">
            Products
          </h3>
          <table className="mt-2 w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-1">Product</th>
                <th className="py-1">Qty</th>
                <th className="py-1">Unit</th>
                <th className="py-1">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((it) => (
                <tr key={it.id}>
                  <td className="py-1.5">
                    {it.product_name}
                    {it.sku && (
                      <span className="block text-xs text-muted-foreground">{it.sku}</span>
                    )}
                  </td>
                  <td className="py-1.5">{it.quantity}</td>
                  <td className="py-1.5">{fmtLKR(it.unit_price)}</td>
                  <td className="py-1.5 font-semibold">{fmtLKR(it.total_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <dl className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{fmtLKR(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Delivery fee</dt>
              <dd>{fmtLKR(order.delivery_fee)}</dd>
            </div>
            <div className="flex justify-between font-bold">
              <dt>Total amount</dt>
              <dd>{fmtLKR(order.total_amount)}</dd>
            </div>
          </dl>

          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <p>
              <span className="font-semibold">Payment method:</span> {order.payment_method}
            </p>
            <p>
              <span className="font-semibold">Payment status:</span> {order.payment_status}
            </p>
            <p>
              <span className="font-semibold">Order status:</span> {order.order_status}
            </p>
            <p>
              <span className="font-semibold">Created:</span> {fmtDate(order.created_at)}
            </p>
          </div>
          {order.notes && (
            <p className="mt-3 border border-border bg-surface p-3 text-sm">
              <span className="font-semibold">Notes:</span> {order.notes}
            </p>
          )}
        </div>
      </div>
    );
  }
}
