import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminEmpty, AdminError, AdminPageHeader } from "@/components/admin/AdminUI";
import {
  fmtDate,
  fmtLKR,
  listProducts,
  toggleProductActive,
  upsertProduct,
  type AdminProduct,
} from "@/lib/admin-queries";

export const Route = createFileRoute("/admin/products")({
  component: ProductsPage,
});

const EMPTY_FORM = {
  id: undefined as string | undefined,
  product_name: "",
  sku: "",
  brand: "",
  category: "",
  price: 0,
  stock_quantity: 0,
  is_active: true,
};

function ProductsPage() {
  const [rows, setRows] = useState<AdminProduct[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<typeof EMPTY_FORM | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    const res = await listProducts({ search });
    setLoading(false);
    if (res.error) {
      setError("Could not load products. Check your RLS policies for products.");
      return;
    }
    setRows((res.data ?? []) as AdminProduct[]);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save() {
    if (!form || !form.product_name.trim() || saving) return;
    setSaving(true);
    const res = await upsertProduct({
      ...form,
      product_name: form.product_name.trim(),
      price: Number(form.price) || 0,
      stock_quantity: Math.max(0, Math.floor(Number(form.stock_quantity) || 0)),
    });
    setSaving(false);
    if (res.error) {
      setError("Could not save the product.");
      return;
    }
    setForm(null);
    load();
  }

  async function toggleActive(p: AdminProduct) {
    const res = await toggleProductActive(p.id, !p.is_active);
    if (!res.error)
      setRows((prev) => prev.map((r) => (r.id === p.id ? { ...r, is_active: !p.is_active } : r)));
  }

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Database product catalogue (independent of the public website catalogue)."
      >
        <button
          onClick={() => setForm({ ...EMPTY_FORM })}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Add product
        </button>
      </AdminPageHeader>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="Search name, SKU, brand or category…"
          className="h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm"
        />
        <button
          onClick={load}
          className="h-9 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Search
        </button>
      </div>

      {error && <AdminError message={error} onRetry={load} />}

      {form && (
        <ProductForm
          form={form}
          setForm={setForm}
          saving={saving}
          onSave={save}
          onCancel={() => setForm(null)}
        />
      )}

      {loading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading products…</p>
      ) : rows.length === 0 ? (
        <AdminEmpty message="No products in the database yet. Use 'Add product' to create the first one." />
      ) : (
        <ProductsTable rows={rows} onToggle={toggleActive} onEdit={setForm} />
      )}
    </div>
  );

  function ProductsTable({
    rows,
    onToggle,
    onEdit,
  }: {
    rows: AdminProduct[];
    onToggle: (p: AdminProduct) => void;
    onEdit: (form: typeof EMPTY_FORM) => void;
  }) {
    return (
      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">SKU</th>
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Stock</th>
              <th className="px-3 py-2">Active</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((p) => (
              <tr key={p.id}>
                <td className="px-3 py-2 font-semibold">{p.product_name}</td>
                <td className="px-3 py-2">{p.sku ?? "—"}</td>
                <td className="px-3 py-2">{p.brand ?? "—"}</td>
                <td className="px-3 py-2">{p.category ?? "—"}</td>
                <td className="px-3 py-2">{fmtLKR(p.price)}</td>
                <td className="px-3 py-2">{p.stock_quantity}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => onToggle(p)}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      p.is_active ? "bg-green-100 text-green-800" : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {p.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">{fmtDate(p.created_at)}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() =>
                      onEdit({
                        id: p.id,
                        product_name: p.product_name,
                        sku: p.sku ?? "",
                        brand: p.brand ?? "",
                        category: p.category ?? "",
                        price: Number(p.price),
                        stock_quantity: p.stock_quantity,
                        is_active: p.is_active,
                      })
                    }
                    className="rounded border border-input px-2 py-1 text-xs font-semibold hover:bg-accent"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function ProductForm({
    form,
    setForm,
    saving,
    onSave,
    onCancel,
  }: {
    form: typeof EMPTY_FORM;
    setForm: (f: typeof EMPTY_FORM) => void;
    saving: boolean;
    onSave: () => void;
    onCancel: () => void;
  }) {
    const field = (label: string, key: keyof typeof EMPTY_FORM, opts?: { type?: string }) => (
      <div>
        <label className="text-xs font-semibold">{label}</label>
        <input
          type={opts?.type ?? "text"}
          value={String(form[key] ?? "")}
          onChange={(e) =>
            setForm({
              ...form,
              [key]: opts?.type === "number" ? Number(e.target.value) : e.target.value,
            })
          }
          className="mt-0.5 h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
        />
      </div>
    );

    return (
      <div className="mb-4 border border-border bg-card p-4">
        <h3 className="font-display text-sm font-extrabold">
          {form.id ? "Edit product" : "Add product"}
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {field("Product name *", "product_name")}
          {field("SKU", "sku")}
          {field("Brand", "brand")}
          {field("Category", "category")}
          {field("Price (Rs.)", "price", { type: "number" })}
          {field("Stock quantity", "stock_quantity", { type: "number" })}
          <label className="flex items-center gap-2 self-end text-sm">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="size-4 accent-primary"
            />
            Active
          </label>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save product"}
          </button>
          <button
            onClick={onCancel}
            className="rounded-md border border-input px-4 py-1.5 text-sm font-medium hover:bg-accent"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
