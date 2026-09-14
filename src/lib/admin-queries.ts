import { supabase } from "./supabase";

// ---------------------------------------------------------------------------
// Shared admin types (match the Supabase schema)
// ---------------------------------------------------------------------------

export const ORDER_STATUSES = [
  "New",
  "Contacted",
  "Confirmed",
  "Preparing",
  "Dispatched",
  "Delivered",
  "Cancelled",
] as const;
export const PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"] as const;
export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Converted",
  "Not Interested",
  "Cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type AdminOrder = {
  id: string;
  order_number: number;
  contact_no: string;
  subtotal: string | number;
  delivery_fee: string | number;
  total_amount: string | number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  notes: string | null;
  created_at: string;
  customers: { first_name: string; last_name: string; email: string | null } | null;
  customer_addresses: {
    country: string;
    address_line_1: string;
    apartment_suite: string | null;
    city: string;
    postal_code: string;
  } | null;
};

export type AdminOrderItem = {
  id: string;
  product_name: string;
  sku: string | null;
  quantity: number;
  unit_price: string | number;
  total_price: string | number;
};

export type AdminLead = {
  id: string;
  contact_no: string | null;
  product_name: string | null;
  quantity: number | null;
  message: string | null;
  source: string | null;
  lead_status: string;
  created_at: string;
  customers: { first_name: string; last_name: string } | null;
};

export type AdminCustomer = {
  id: string;
  first_name: string;
  last_name: string;
  contact_no: string;
  email: string | null;
  created_at: string;
};

export type AdminSavedContact = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  contact_no: string | null;
  email: string | null;
  city: string | null;
  source: string | null;
  created_at: string;
};

export type AdminProduct = {
  id: string;
  product_name: string;
  sku: string | null;
  brand: string | null;
  category: string | null;
  description: string | null;
  price: string | number;
  stock_quantity: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/** Formats a numeric/decimal column coming from PostgREST as LKR. */
export function fmtLKR(v: string | number | null | undefined): string {
  const n = Number(v ?? 0);
  return `Rs. ${n.toLocaleString("en-LK", { maximumFractionDigits: 2 })}`;
}

export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-LK", { dateStyle: "medium", timeStyle: "short" });
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

const ORDER_SELECT = `
  id, order_number, contact_no, subtotal, delivery_fee, total_amount,
  payment_method, payment_status, order_status, notes, created_at,
  customers(first_name, last_name, email),
  customer_addresses(country, address_line_1, apartment_suite, city, postal_code)
`;

export async function listOrders(opts: { search?: string; status?: string } = {}) {
  let q = supabase
    .from("orders")
    .select(ORDER_SELECT)
    .order("created_at", { ascending: false })
    .limit(200);
  if (opts.status && opts.status !== "all") q = q.eq("order_status", opts.status);
  if (opts.search?.trim()) {
    const s = opts.search.trim();
    q = q.or(`order_number.eq.${Number(s) || -1},contact_no.ilike.%${s}%`);
  }
  const { data, error } = await q;
  return {
    data: (data ?? null) as unknown as AdminOrder[] | null,
    error: error ? { message: error.message } : null,
  };
}

export async function getOrderItems(orderId: string) {
  const { data, error } = await supabase
    .from("order_items")
    .select("id, product_name, sku, quantity, unit_price, total_price")
    .eq("order_id", orderId)
    .order("created_at");
  return {
    data: (data ?? null) as unknown as AdminOrderItem[] | null,
    error: error ? { message: error.message } : null,
  };
}

export async function updateOrder(
  id: string,
  patch: { order_status?: OrderStatus; payment_status?: PaymentStatus },
) {
  return supabase.from("orders").update(patch).eq("id", id);
}

// ---------------------------------------------------------------------------
// WhatsApp leads
// ---------------------------------------------------------------------------

export async function listLeads(opts: { search?: string; status?: string } = {}) {
  let q = supabase
    .from("whatsapp_leads")
    .select(
      "id, contact_no, product_name, quantity, message, source, lead_status, created_at, customers(first_name, last_name)",
    )
    .order("created_at", { ascending: false })
    .limit(200);
  if (opts.status && opts.status !== "all") q = q.eq("lead_status", opts.status);
  if (opts.search?.trim()) {
    const s = opts.search.trim();
    q = q.or(`contact_no.ilike.%${s}%,product_name.ilike.%${s}%`);
  }
  const { data, error } = await q;
  return {
    data: (data ?? null) as unknown as AdminLead[] | null,
    error: error ? { message: error.message } : null,
  };
}

export async function updateLeadStatus(id: string, lead_status: LeadStatus) {
  return supabase.from("whatsapp_leads").update({ lead_status }).eq("id", id);
}

// ---------------------------------------------------------------------------
// Customers (aggregate order history client-side — small datasets)
// ---------------------------------------------------------------------------

export async function listCustomers(opts: { search?: string } = {}) {
  let q = supabase
    .from("customers")
    .select("id, first_name, last_name, contact_no, email, created_at")
    .order("created_at", { ascending: false })
    .limit(500);
  if (opts.search?.trim()) {
    const s = opts.search.trim();
    q = q.or(
      `first_name.ilike.%${s}%,last_name.ilike.%${s}%,contact_no.ilike.%${s}%,email.ilike.%${s}%`,
    );
  }
  const { data, error } = await q;
  return {
    data: (data ?? null) as unknown as AdminCustomer[] | null,
    error: error ? { message: error.message } : null,
  };
}

export async function getCustomerOrders(customerId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("id, order_number, total_amount, order_status, created_at")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  return {
    data: (data ?? null) as unknown as
      | {
          id: string;
          order_number: number;
          total_amount: string | number;
          order_status: string;
          created_at: string;
        }[]
      | null,
    error: error ? { message: error.message } : null,
  };
}

export async function getCustomerAddresses(customerId: string) {
  const { data, error } = await supabase
    .from("customer_addresses")
    .select(
      "id, country, first_name, last_name, address_line_1, apartment_suite, city, postal_code, created_at",
    )
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  return {
    data: (data ?? null) as unknown as
      | {
          id: string;
          country: string;
          address_line_1: string;
          apartment_suite: string | null;
          city: string;
          postal_code: string;
          created_at: string;
        }[]
      | null,
    error: error ? { message: error.message } : null,
  };
}

// ---------------------------------------------------------------------------
// Saved contacts
// ---------------------------------------------------------------------------

export async function listSavedContacts(
  opts: { search?: string; city?: string; since?: string | undefined } = {},
) {
  let q = supabase
    .from("saved_contacts")
    .select("id, first_name, last_name, contact_no, email, city, source, created_at")
    .order("created_at", { ascending: false })
    .limit(500);
  if (opts.city && opts.city !== "all") q = q.eq("city", opts.city);
  if (opts.since) q = q.gte("created_at", opts.since);
  if (opts.search?.trim()) {
    const s = opts.search.trim();
    q = q.or(
      `first_name.ilike.%${s}%,last_name.ilike.%${s}%,contact_no.ilike.%${s}%,email.ilike.%${s}%`,
    );
  }
  const { data, error } = await q;
  return {
    data: (data ?? null) as unknown as AdminSavedContact[] | null,
    error: error ? { message: error.message } : null,
  };
}

// ---------------------------------------------------------------------------
// Products (DB-backed admin catalogue; the public site keeps the bundled one)
// ---------------------------------------------------------------------------

export async function listProducts(opts: { search?: string } = {}) {
  let q = supabase
    .from("products")
    .select(
      "id, product_name, sku, brand, category, description, price, stock_quantity, image_url, is_active, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(500);
  if (opts.search?.trim()) {
    const s = opts.search.trim();
    q = q.or(`product_name.ilike.%${s}%,sku.ilike.%${s}%,brand.ilike.%${s}%,category.ilike.%${s}%`);
  }
  const { data, error } = await q;
  return {
    data: (data ?? null) as unknown as AdminProduct[] | null,
    error: error ? { message: error.message } : null,
  };
}

export async function upsertProduct(
  p: Omit<Partial<AdminProduct>, "id"> & { id?: string | undefined; product_name: string },
) {
  const values = {
    product_name: p.product_name,
    sku: p.sku || null,
    brand: p.brand || null,
    category: p.category || null,
    description: p.description || null,
    price: p.price ?? 0,
    stock_quantity: p.stock_quantity ?? 0,
    image_url: p.image_url || null,
    is_active: p.is_active ?? true,
  };
  if (p.id) return supabase.from("products").update(values).eq("id", p.id);
  return supabase.from("products").insert(values);
}

export async function toggleProductActive(id: string, is_active: boolean) {
  return supabase.from("products").update({ is_active }).eq("id", id);
}

// ---------------------------------------------------------------------------
// Dashboard & analytics aggregates
// ---------------------------------------------------------------------------

function countFor(table: string, filters: Record<string, string> = {}, since?: Date) {
  let q = supabase.from(table).select("id", { count: "exact", head: true });
  for (const [col, val] of Object.entries(filters)) q = q.eq(col, val);
  if (since) q = q.gte("created_at", since.toISOString());
  return q;
}

export type DashboardStats = {
  totalOrders: number;
  ordersByStatus: Record<string, number>;
  todayOrders: number;
  totalLeads: number;
  newLeads: number;
  todayLeads: number;
  totalCustomers: number;
  todayCustomers: number;
  totalSavedContacts: number;
  todaySavedContacts: number;
  totalProducts: number;
  activeProducts: number;
};

async function one(table: string, filters: Record<string, string> = {}, since?: Date) {
  const { count } = await countFor(table, filters, since);
  return count ?? 0;
}

export async function getDashboardStats(): Promise<{
  data: DashboardStats | null;
  error: { message: string } | null;
}> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const statusEntries = await Promise.all(
    ORDER_STATUSES.map(async (s) => {
      const { count } = await countFor("orders", { order_status: s });
      return [s, count ?? 0] as const;
    }),
  );

  const [
    totalOrders,
    todayOrders,
    totalLeads,
    newLeads,
    todayLeads,
    totalCustomers,
    todayCustomers,
    totalSavedContacts,
    todaySavedContacts,
    totalProducts,
    activeProducts,
  ] = await Promise.all([
    one("orders"),
    one("orders", {}, startOfDay),
    one("whatsapp_leads"),
    one("whatsapp_leads", { lead_status: "New" }),
    one("whatsapp_leads", {}, startOfDay),
    one("customers"),
    one("customers", {}, startOfDay),
    one("saved_contacts"),
    one("saved_contacts", {}, startOfDay),
    one("products"),
    one("products", { is_active: "true" }),
  ]);

  return {
    data: {
      totalOrders,
      ordersByStatus: Object.fromEntries(statusEntries),
      todayOrders,
      totalLeads,
      newLeads,
      todayLeads,
      totalCustomers,
      todayCustomers,
      totalSavedContacts,
      todaySavedContacts,
      totalProducts,
      activeProducts,
    },
    error: null,
  };
}

export type AnalyticsData = {
  ordersByDay: { day: string; count: number; value: number }[];
  ordersByStatus: Record<string, number>;
  leadsByStatus: Record<string, number>;
  bestSellers: { product_name: string; qty: number; revenue: number }[];
};

export async function getAnalytics(): Promise<{
  data: AnalyticsData | null;
  error: { message: string } | null;
}> {
  const since = new Date();
  since.setDate(since.getDate() - 13);
  since.setHours(0, 0, 0, 0);

  const [ordersRes, itemsRes, leadsRes] = await Promise.all([
    supabase
      .from("orders")
      .select("total_amount, order_status, created_at")
      .gte("created_at", since.toISOString())
      .limit(1000),
    supabase.from("order_items").select("product_name, quantity, total_price").limit(2000),
    supabase.from("whatsapp_leads").select("lead_status").limit(2000),
  ]);

  const ordersByDay = new Map<string, { count: number; value: number }>();
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    ordersByDay.set(d.toISOString().slice(0, 10), { count: 0, value: 0 });
  }
  for (const o of ordersRes.data ?? []) {
    const bucket = ordersByDay.get(String(o.created_at).slice(0, 10));
    if (bucket) {
      bucket.count += 1;
      bucket.value += Number(o.total_amount) || 0;
    }
  }

  const ordersByStatus: Record<string, number> = {};
  for (const o of ordersRes.data ?? []) {
    ordersByStatus[o.order_status] = (ordersByStatus[o.order_status] ?? 0) + 1;
  }

  const leadsByStatus: Record<string, number> = {};
  for (const l of leadsRes.data ?? []) {
    leadsByStatus[l.lead_status] = (leadsByStatus[l.lead_status] ?? 0) + 1;
  }

  const sellers = new Map<string, { qty: number; revenue: number }>();
  for (const it of itemsRes.data ?? []) {
    const cur = sellers.get(it.product_name) ?? { qty: 0, revenue: 0 };
    cur.qty += it.quantity ?? 0;
    cur.revenue += Number(it.total_price) || 0;
    sellers.set(it.product_name, cur);
  }
  const bestSellers = [...sellers.entries()]
    .map(([product_name, v]) => ({ product_name, ...v }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 8);

  return {
    data: {
      ordersByDay: [...ordersByDay.entries()].map(([day, v]) => ({ day, ...v })),
      ordersByStatus,
      leadsByStatus,
      bestSellers,
    },
    error:
      ordersRes.error || itemsRes.error || leadsRes.error
        ? { message: "One or more analytics queries failed" }
        : null,
  };
}

export async function getRecentOrders(limit = 8) {
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_SELECT)
    .order("created_at", { ascending: false })
    .limit(limit);
  return {
    data: (data ?? null) as unknown as AdminOrder[] | null,
    error: error ? { message: error.message } : null,
  };
}

export async function getRecentLeads(limit = 8) {
  const { data, error } = await supabase
    .from("whatsapp_leads")
    .select(
      "id, contact_no, product_name, quantity, lead_status, created_at, customers(first_name, last_name)",
    )
    .order("created_at", { ascending: false })
    .limit(limit);
  return {
    data: (data ?? null) as unknown as AdminLead[] | null,
    error: error ? { message: error.message } : null,
  };
}
