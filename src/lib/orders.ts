import { supabase, supabaseConfigured } from "./supabase";
import { products } from "./site";
import type { CartLine, OrderDetails } from "./cart";

export type SaveOrderResult =
  { ok: true; orderNumber: number | null } | { ok: false; error: string };

/**
 * Persists a completed order to Supabase:
 *  1. finds (by contact_no) or creates the customer
 *  2. inserts the delivery address
 *  3. inserts the order (COD, Pending, New)
 *  4. inserts one order_items row per cart line
 *
 * Best-effort: the WhatsApp order still opens even if the DB write fails,
 * so a network hiccup never blocks the customer.
 */
export async function saveOrder(
  lines: CartLine[],
  d: OrderDetails,
  notes?: string,
): Promise<SaveOrderResult> {
  if (!supabaseConfigured) return { ok: false, error: "Supabase is not configured" };
  if (lines.length === 0) return { ok: false, error: "Cart is empty" };

  try {
    // 1. Customer — reuse an existing record with the same contact number.
    const contactNo = d.contact.trim();
    const firstName = d.firstName.trim();
    const lastName = d.lastName.trim();

    let customerId: string | null = null;
    const existing = await supabase
      .from("customers")
      .select("id")
      .eq("contact_no", contactNo)
      .maybeSingle();

    if (existing.data?.id) {
      customerId = existing.data.id as string;
    } else {
      const inserted = await supabase
        .from("customers")
        .insert({
          contact_no: contactNo,
          first_name: firstName,
          last_name: lastName,
        })
        .select("id")
        .single();
      if (inserted.error) throw inserted.error;
      customerId = inserted.data.id as string;
    }

    // 2. Delivery address.
    const address = await supabase
      .from("customer_addresses")
      .insert({
        customer_id: customerId,
        country: d.country || "Sri Lanka",
        first_name: firstName,
        last_name: lastName,
        address_line_1: d.address.trim(),
        apartment_suite: d.apartment.trim() || null,
        city: d.city.trim(),
        postal_code: d.postalCode.trim(),
      })
      .select("id")
      .single();
    if (address.error) throw address.error;
    const addressId = address.data.id as string;

    // 3. Order totals from the catalogue prices.
    const detailed = lines.map((line) => {
      const product = products.find((p) => p.slug === line.slug);
      const unitPrice = product?.price ?? 0;
      return {
        // Local catalogue entries are not DB rows, so product_id stays NULL;
        // the slug is kept in `sku` for reconciliation with the products table.
        productId: null,
        productName: product?.name ?? line.slug,
        sku: line.slug,
        quantity: line.qty,
        unitPrice,
        totalPrice: unitPrice * line.qty,
      };
    });
    const subtotal = detailed.reduce((n, x) => n + x.totalPrice, 0);
    const deliveryFee = 0; // free delivery
    const totalAmount = subtotal + deliveryFee;

    const order = await supabase
      .from("orders")
      .insert({
        customer_id: customerId,
        delivery_address_id: addressId,
        contact_no: contactNo,
        subtotal,
        delivery_fee: deliveryFee,
        total_amount: totalAmount,
        payment_method: "Cash on Delivery",
        payment_status: "Pending",
        order_status: "New",
        notes: notes?.trim() ? notes.trim() : null,
      })
      .select("id, order_number")
      .single();
    if (order.error) throw order.error;
    const orderId = order.data.id as string;
    const orderNumber = (order.data.order_number as number) ?? null;

    // 4. Order items.
    const { error: itemsError } = await supabase.from("order_items").insert(
      detailed.map((x) => ({
        order_id: orderId,
        product_id: x.productId,
        product_name: x.productName,
        sku: x.sku,
        quantity: x.quantity,
        unit_price: x.unitPrice,
        total_price: x.totalPrice,
      })),
    );
    if (itemsError) throw itemsError;

    return { ok: true, orderNumber };
  } catch (err) {
    console.error("[orders] Failed to save order to Supabase:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown database error",
    };
  }
}

/** Logs a WhatsApp lead (best-effort, never blocks the redirect). */
export async function logWhatsappLead(
  lines: CartLine[],
  contactNo: string,
  message: string,
): Promise<void> {
  if (!supabaseConfigured) return;
  try {
    const rows = lines.map((line) => {
      const product = products.find((p) => p.slug === line.slug);
      return {
        contact_no: contactNo.trim() || null,
        // Local catalogue entries are not DB rows, so product_id stays NULL.
        product_id: null,
        product_name: product?.name ?? line.slug,
        quantity: line.qty,
        message: message.slice(0, 5000),
        source: "Website",
        lead_status: "New",
      };
    });
    const { error } = await supabase.from("whatsapp_leads").insert(rows);
    if (error) throw error;
  } catch (err) {
    console.error("[orders] Failed to log WhatsApp lead:", err);
  }
}
