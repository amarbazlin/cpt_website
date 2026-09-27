import { supabase, supabaseConfigured } from "./supabase";
import { products } from "./site";
import type { CartLine, OrderDetails } from "./cart";

export type SaveOrderResult =
  { ok: true; orderNumber: number | null } | { ok: false; error: string };

/**
 * Normalises Sri Lankan phone numbers so `0771234567`, `+94771234567`,
 * `94771234567` and `077 123 4567` all become the same canonical value
 * (`0771234567`). Returns null when the input isn't a plausible number.
 */
export function normalizeLKPhone(raw: string): string | null {
  const digits = raw.replace(/[^\d]/g, "");
  if (digits.length === 10 && digits.startsWith("0")) return digits;
  if (digits.length === 9 && (digits.startsWith("7") || digits.startsWith("1")))
    return `0${digits}`;
  if (digits.length === 11 && digits.startsWith("94")) return `0${digits.slice(2)}`;
  return digits.length >= 7 && digits.length <= 15 ? digits : null;
}

/** Friendly, customer-safe error; the technical message goes to the console. */
function friendlyError(err: unknown, context: string): SaveOrderResult {
  console.error(`[orders] ${context}:`, err);
  return { ok: false, error: "We couldn't save your order to our system." };
}

/** Finds a customer by normalised contact number, or creates a new record. */
export async function findOrCreateCustomer(input: {
  contactNo: string;
  firstName: string;
  lastName: string;
  email?: string;
}): Promise<{ id: string } | { error: unknown }> {
  const normalized = normalizeLKPhone(input.contactNo);
  if (!normalized) return { error: new Error("Invalid contact number") };

  // Prefer a SECURITY DEFINER RPC (works under strict RLS where anon cannot
  // select from customers). Falls back to a direct select/insert.
  const rpc = await supabase.rpc("find_or_create_customer", {
    p_contact_no: normalized,
    p_first_name: input.firstName.trim(),
    p_last_name: input.lastName.trim(),
    p_email: input.email?.trim() ? input.email.trim() : null,
  });
  if (!rpc.error && rpc.data?.id) return { id: rpc.data.id as string };

  const existing = await supabase
    .from("customers")
    .select("id")
    .eq("contact_no", normalized)
    .maybeSingle();
  if (existing.data?.id) {
    // Top up name/email if we now know more than before.
    await supabase
      .from("customers")
      .update({
        first_name: input.firstName.trim(),
        last_name: input.lastName.trim(),
        ...(input.email?.trim() ? { email: input.email.trim() } : {}),
      })
      .eq("id", existing.data.id);
    return { id: existing.data.id as string };
  }

  const inserted = await supabase
    .from("customers")
    .insert({
      contact_no: normalized,
      first_name: input.firstName.trim(),
      last_name: input.lastName.trim(),
      ...(input.email?.trim() ? { email: input.email.trim() } : {}),
    })
    .select("id")
    .single();
  if (inserted.error) return { error: inserted.error };
  return { id: inserted.data.id as string };
}

/** Creates the delivery address used for THIS order (addresses can change). */
export async function createAddress(
  customerId: string,
  d: Pick<
    OrderDetails,
    "country" | "firstName" | "lastName" | "address" | "apartment" | "city" | "postalCode"
  >,
): Promise<{ id: string } | { error: unknown }> {
  const res = await supabase
    .from("customer_addresses")
    .insert({
      customer_id: customerId,
      country: d.country || "Sri Lanka",
      first_name: d.firstName.trim(),
      last_name: d.lastName.trim(),
      address_line_1: d.address.trim(),
      apartment_suite: d.apartment.trim() || null,
      city: d.city.trim(),
      postal_code: d.postalCode.trim(),
    })
    .select("id")
    .single();
  return res.error ? { error: res.error } : { id: res.data.id as string };
}

/**
 * Computes order totals from the bundled catalogue — the browser only sends
 * product slugs and quantities, never prices, so the stored amounts can't be
 * tampered with via devtools.
 */
export function computeOrderTotals(lines: CartLine[]) {
  const items = lines.map((line) => {
    const product = products.find((p) => p.slug === line.slug);
    const quantity = Math.max(1, Math.floor(line.qty));
    const unitPrice = product?.price ?? 0;
    return {
      // Local catalogue entries are not DB rows, so product_id stays NULL;
      // the slug is kept in `sku` for reconciliation with the products table.
      productId: null,
      productName: product?.name ?? line.slug,
      sku: line.slug,
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
    };
  });
  const subtotal = items.reduce((n, x) => n + x.totalPrice, 0);
  const deliveryFee = 0; // CPT offers free delivery
  return { items, subtotal, deliveryFee, totalAmount: subtotal + deliveryFee };
}

/** Creates the order row (Pending payment, New order). */
export async function createOrder(input: {
  customerId: string;
  deliveryAddressId: string;
  contactNo: string;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: string;
  notes?: string | undefined;
}): Promise<{ id: string; orderNumber: number | null } | { error: unknown }> {
  const res = await supabase
    .from("orders")
    .insert({
      customer_id: input.customerId,
      delivery_address_id: input.deliveryAddressId,
      contact_no: input.contactNo,
      subtotal: input.subtotal,
      delivery_fee: input.deliveryFee,
      total_amount: input.totalAmount,
      payment_method: input.paymentMethod,
      payment_status: "Pending",
      order_status: "New",
      notes: input.notes?.trim() ? input.notes.trim() : null,
    })
    .select("id, order_number")
    .single();
  if (res.error) return { error: res.error };
  return {
    id: res.data.id as string,
    orderNumber: (res.data.order_number as number) ?? null,
  };
}

/** Creates one order_items row per cart line. */
export async function createOrderItems(
  orderId: string,
  items: ReturnType<typeof computeOrderTotals>["items"],
): Promise<{ ok: true } | { error: unknown }> {
  const { error } = await supabase.from("order_items").insert(
    items.map((x) => ({
      order_id: orderId,
      product_id: x.productId,
      product_name: x.productName,
      sku: x.sku,
      quantity: x.quantity,
      unit_price: x.unitPrice,
      total_price: x.totalPrice,
    })),
  );
  return error ? { error } : { ok: true };
}

/**
 * Creates ONE WhatsApp lead for the whole cart (a multi-product order is one
 * lead whose message summarises the cart — not one fake lead per product).
 */
export async function createWhatsAppLead(input: {
  customerId: string | null;
  contactNo: string;
  lines: CartLine[];
  message: string;
}): Promise<{ ok: true } | { error: unknown }> {
  const names = input.lines.map((l) => products.find((p) => p.slug === l.slug)?.name ?? l.slug);
  const totalQty = input.lines.reduce((n, l) => n + Math.max(1, Math.floor(l.qty)), 0);
  const productName =
    input.lines.length === 1
      ? names[0]
      : `${input.lines.length} item(s): ${names.join(", ").slice(0, 240)}`;

  const { error } = await supabase.from("whatsapp_leads").insert({
    customer_id: input.customerId,
    contact_no: input.contactNo,
    product_id: null,
    product_name: productName,
    quantity: totalQty,
    message: input.message.slice(0, 5000),
    source: "Website",
    lead_status: "New",
  });
  return error ? { error } : { ok: true };
}

/** Upserts explicitly-saved details into `saved_contacts` (deduped by phone). */
export async function saveCustomerDetails(d: {
  contact: string;
  firstName: string;
  lastName: string;
  email?: string;
  city: string;
}): Promise<{ ok: true } | { error: unknown }> {
  const normalized = normalizeLKPhone(d.contact);
  if (!normalized) return { error: new Error("Invalid contact number") };
  const row = {
    first_name: d.firstName.trim(),
    last_name: d.lastName.trim(),
    contact_no: normalized,
    ...(d.email?.trim() ? { email: d.email.trim() } : {}),
    city: d.city.trim(),
    source: "Website",
  };

  // Prefer the SECURITY DEFINER RPC; fall back to select-then-insert/update.
  const rpc = await supabase.rpc("save_saved_contact", { p_row: row });
  if (!rpc.error) return { ok: true };

  const existing = await supabase
    .from("saved_contacts")
    .select("id")
    .eq("contact_no", normalized)
    .maybeSingle();
  if (existing.data?.id) {
    const { error } = await supabase.from("saved_contacts").update(row).eq("id", existing.data.id);
    return error ? { error } : { ok: true };
  }
  const { error } = await supabase.from("saved_contacts").insert(row);
  return error ? { error } : { ok: true };
}

/** Short cart summary stored on the lead (the full text goes to WhatsApp). */
function buildLeadSummaryMessage(d: OrderDetails, orderNumber: number | null): string {
  return [
    `Website order${orderNumber ? ` #${orderNumber}` : ""}`,
    `${d.firstName} ${d.lastName} — ${d.contact}`,
    `${d.address}${d.apartment ? `, ${d.apartment}` : ""}, ${d.city} ${d.postalCode}`,
    d.country,
    "Payment: Cash on Delivery",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Orchestrator — full checkout persistence
// ---------------------------------------------------------------------------

/**
 * Persists a completed order to Supabase:
 *  1. finds (by normalised contact_no) or creates the customer
 *  2. creates the delivery address used for this order
 *  3. inserts the order (COD, Pending, New) — never "Confirmed" from the web
 *  4. inserts one order_items row per cart line
 *  5. creates a single WhatsApp lead for the cart
 *
 * Prices come from the bundled catalogue, never from the browser form.
 * The caller opens WhatsApp regardless of the result so a network hiccup
 * never blocks the customer — but must NOT claim the order was recorded
 * when this fails.
 */
export async function saveOrder(
  lines: CartLine[],
  d: OrderDetails,
  notes?: string,
): Promise<SaveOrderResult> {
  if (!supabaseConfigured) {
    console.error("[orders] Supabase is not configured");
    return { ok: false, error: "We couldn't reach our order system. Please try again." };
  }
  if (lines.length === 0) {
    return { ok: false, error: "Your cart is empty." };
  }

  try {
    const customer = await findOrCreateCustomer({
      contactNo: d.contact,
      firstName: d.firstName,
      lastName: d.lastName,
    });
    if ("error" in customer) return friendlyError(customer.error, "findOrCreateCustomer");

    const address = await createAddress(customer.id, d);
    if ("error" in address) return friendlyError(address.error, "createAddress");

    const totals = computeOrderTotals(lines);
    const order = await createOrder({
      customerId: customer.id,
      deliveryAddressId: address.id,
      contactNo: normalizeLKPhone(d.contact) ?? d.contact.trim(),
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      totalAmount: totals.totalAmount,
      paymentMethod: d.paymentMethod,
      notes,
    });
    if ("error" in order) return friendlyError(order.error, "createOrder");

    const items = await createOrderItems(order.id, totals.items);
    if ("error" in items) return friendlyError(items.error, "createOrderItems");

    const lead = await createWhatsAppLead({
      customerId: customer.id,
      contactNo: d.contact,
      lines,
      message: buildLeadSummaryMessage(d, order.orderNumber),
    });
    if ("error" in lead) return friendlyError(lead.error, "createWhatsAppLead");

    return { ok: true, orderNumber: order.orderNumber };
  } catch (err) {
    return friendlyError(err, "saveOrder");
  }
}
