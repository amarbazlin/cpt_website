import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SmartImage } from "@/components/SmartImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  buildOrderMessage,
  loadSavedDeliveryInfo,
  saveDeliveryInfo,
  useCart,
  whatsappUrl,
} from "@/lib/cart";
import { saveCustomerDetails, saveOrder } from "@/lib/orders";
import { absoluteUrl } from "@/lib/seo";
import { business, products } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order | Ceylon Platinum Trading (PVT) Ltd, Matara" },
      {
        name: "description",
        content:
          "Complete your order details — contact, delivery address and payment method — and send it straight to our WhatsApp team in Matara.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Your Order | Ceylon Platinum Trading (PVT) Ltd" },
      { property: "og:url", content: absoluteUrl("/order") },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/order") }],
  }),
  component: OrderPage,
});

const COUNTRIES = ["Sri Lanka"] as const;
const PAYMENT_METHOD = "Cash on Delivery (COD)";
const PAYMENT_BANK = "Bank Transfer";

function OrderPage() {
  const { lines, setQty, remove } = useCart();

  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState<string>(COUNTRIES[0]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [payment, setPayment] = useState(PAYMENT_METHOD);
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [savedOk, setSavedOk] = useState(false);

  // Prefill from the details the customer chose to save last time.
  useEffect(() => {
    const saved = loadSavedDeliveryInfo();
    if (!saved) return;
    setContact(saved.contact ?? "");
    setFirstName(saved.firstName ?? "");
    setLastName(saved.lastName ?? "");
    setAddress(saved.address ?? "");
    setApartment(saved.apartment ?? "");
    setCity(saved.city ?? "");
    setPostalCode(saved.postalCode ?? "");
  }, []);

  const empty = lines.length === 0;
  const detailed = lines
    .map((line) => ({ line, product: products.find((p) => p.slug === line.slug) }))
    .filter((x) => x.product);
  const allPriced = detailed.every((x) => x.product?.price);
  const subtotal = detailed.reduce((n, x) => n + (x.product?.price ?? 0) * x.line.qty, 0);

  const contactMissing = contact.trim().length < 7;
  const firstNameMissing = firstName.trim().length < 2;
  const lastNameMissing = lastName.trim().length < 2;
  const addressMissing = address.trim().length < 4;
  const cityMissing = city.trim().length < 2;
  const postalMissing = postalCode.trim().length < 3;
  const invalid =
    contactMissing ||
    firstNameMissing ||
    lastNameMissing ||
    addressMissing ||
    cityMissing ||
    postalMissing;

  async function send() {
    setTouched(true);
    if (empty || invalid || sending) return;
    setSending(true);
    setDbError(null);
    if (saveInfo) {
      saveDeliveryInfo({ contact, firstName, lastName, address, apartment, city, postalCode });
    }
    const message = buildOrderMessage(lines, {
      contact,
      country,
      firstName,
      lastName,
      address,
      apartment,
      city,
      postalCode,
      paymentMethod: payment,
      saveInfo,
    });

    // Persist everything to Supabase first: customer → address → order →
    // order_items → WhatsApp lead. The WhatsApp window opens afterwards.
    const url_ = whatsappUrl(message);
    const saved = await saveOrder(
      lines,
      {
        contact,
        country,
        firstName,
        lastName,
        address,
        apartment,
        city,
        postalCode,
        paymentMethod: payment,
        saveInfo,
      },
      undefined,
    );

    if (!saved.ok) {
      // Do NOT pretend the order was recorded. Friendly message; technical
      // detail stays in the browser console only.
      setDbError(saved.error);
      setSavedOk(false);
      setSending(false);
      window.open(url_, "_blank", "noopener,noreferrer");
      return;
    }

    if (saveInfo) {
      await saveCustomerDetails({ contact, firstName, lastName, email, city });
    }
    setDbError(
      saved.orderNumber
        ? `Order #${saved.orderNumber} created successfully. Opening WhatsApp…`
        : "Order created successfully. Opening WhatsApp…",
    );
    setSavedOk(true);
    window.open(url_, "_blank", "noopener,noreferrer");
    setSending(false);
  }

  const error = (show: boolean, text: string) =>
    show ? <p className="mt-1 text-xs text-destructive">{text}</p> : null;

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
          <p className="eyebrow">Checkout</p>
          <h1 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Your order
          </h1>
          <p className="mt-3 text-muted-foreground">
            Fill in your contact and delivery details — your order is sent straight to our WhatsApp
            team ({business.whatsappDisplay}). Pay cash on delivery or by bank transfer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
        {empty ? (
          <div className="border border-dashed border-border bg-card p-10 text-center">
            <ShoppingCart className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-4 font-display text-lg font-bold">Your cart is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add products from our catalogue first, then come back to place your order.
            </p>
            <Button asChild className="mt-6">
              <Link to="/products">Browse products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="order-form space-y-6">
              {/* 1. Contact */}
              <div className="border border-border bg-card p-4 shadow-card sm:p-6">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  1. Contact
                </p>
                <h2 className="mt-2 font-display text-lg font-extrabold">Contact information</h2>
                <div className="mt-4">
                  <Label htmlFor="order-contact">Contact No. *</Label>
                  <Input
                    id="order-contact"
                    type="tel"
                    inputMode="tel"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. 077 123 4567"
                    className="order-control mt-1.5"
                  />
                  {error(touched && contactMissing, "Please enter a valid contact number.")}
                </div>
                <div className="mt-4">
                  <Label htmlFor="order-email">Email (optional)</Label>
                  <Input
                    id="order-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. you@example.com"
                    className="order-control mt-1.5"
                  />
                </div>
              </div>
              {/* 2. Delivery */}
              <div className="border border-border bg-card p-4 shadow-card sm:p-6">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  2. Delivery
                </p>
                <h2 className="mt-2 font-display text-lg font-extrabold">Delivery address</h2>

                <div className="mt-4">
                  <Label htmlFor="order-country">Country *</Label>
                  <select
                    id="order-country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="order-control mt-1.5 h-9 w-full cursor-pointer rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring sm:h-9"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="order-first-name">First name *</Label>
                    <Input
                      id="order-first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Kamal"
                      className="order-control mt-1.5"
                    />
                    {error(touched && firstNameMissing, "Please enter your first name.")}
                  </div>
                  <div>
                    <Label htmlFor="order-last-name">Last name *</Label>
                    <Input
                      id="order-last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Perera"
                      className="order-control mt-1.5"
                    />
                    {error(touched && lastNameMissing, "Please enter your last name.")}
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="order-address">Address *</Label>
                  <Input
                    id="order-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. No. 12, Beliatta Road"
                    className="order-control mt-1.5"
                  />
                  {error(touched && addressMissing, "Please enter your street address.")}
                </div>

                <div className="mt-4">
                  <Label htmlFor="order-apartment">Apartment, suite, etc. (optional)</Label>
                  <Input
                    id="order-apartment"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="e.g. Apt 4B, Galaxy Plaza"
                    className="order-control mt-1.5"
                  />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="order-city">City *</Label>
                    <Input
                      id="order-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Matara"
                      className="order-control mt-1.5"
                    />
                    {error(touched && cityMissing, "Please enter your city.")}
                  </div>
                  <div>
                    <Label htmlFor="order-postal">Postal Code *</Label>
                    <Input
                      id="order-postal"
                      inputMode="numeric"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. 81000"
                      className="order-control mt-1.5"
                    />
                    {error(touched && postalMissing, "Please enter your postal code.")}
                  </div>
                </div>

                <label className="mt-5 flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="size-4 cursor-pointer accent-primary"
                  />
                  Save this information for next time
                </label>
              </div>
              {/* 3. Payment method */}
              <div className="border border-border bg-card p-4 shadow-card sm:p-6">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  3. Payment method
                </p>
                <h2 className="mt-2 font-display text-lg font-extrabold">
                  How would you like to pay?
                </h2>
                <div className="mt-4 space-y-3">
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3 border p-4 transition-colors",
                      payment === PAYMENT_METHOD
                        ? "border-primary bg-surface"
                        : "border-border bg-card hover:border-primary/50",
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === PAYMENT_METHOD}
                      onChange={() => setPayment(PAYMENT_METHOD)}
                      className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-sm font-bold">
                        Cash on Delivery (COD)
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        Pay in cash when your order is delivered. Our team confirms the total on
                        WhatsApp before dispatch.
                      </span>
                    </span>
                  </label>

                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3 border p-4 transition-colors",
                      payment === PAYMENT_BANK
                        ? "border-primary bg-surface"
                        : "border-border bg-card hover:border-primary/50",
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === PAYMENT_BANK}
                      onChange={() => setPayment(PAYMENT_BANK)}
                      className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-sm font-bold">Bank Transfer</span>
                      <span className="block text-xs text-muted-foreground">
                        Transfer the total to our bank account, then send the order. Our team
                        confirms receipt and dispatches on WhatsApp.
                      </span>
                    </span>
                  </label>
                </div>

                {payment === PAYMENT_BANK && (
                  <div className="mt-4 border border-primary/25 bg-accent/50 p-4">
                    <p className="font-display text-sm font-extrabold text-primary uppercase">
                      Bank transfer details
                    </p>
                    <dl className="mt-3 space-y-2 text-sm">
                      {[
                        ["Account name", business.bankAccountName],
                        ["Bank", business.bankName],
                        ["Account number", business.bankAccountNumber],
                        ["Branch", business.bankBranch],
                      ].map(([label, value]) => (
                        <div key={label} className="flex flex-wrap gap-x-2">
                          <dt className="font-semibold text-muted-foreground">{label}:</dt>
                          <dd className="font-semibold break-all text-foreground">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Please send the exact order total and include your contact number as the
                      transfer reference so we can match your payment.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order summary */}
            <div className="border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                Your cart
              </p>
              <h2 className="mt-2 font-display text-lg font-extrabold">
                {lines.reduce((n, l) => n + l.qty, 0)} item(s) in this order
              </h2>

              <ul className="mt-4 space-y-4">
                {detailed.map(({ line, product }) =>
                  product ? (
                    <li key={line.slug} className="flex gap-3 border-b border-border pb-4">
                      <SmartImage
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="size-14 shrink-0 rounded border border-border bg-surface object-contain p-1"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-bold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.price
                            ? `Rs. ${product.price.toLocaleString("en-LK")} each`
                            : "Price on request"}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-7"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.slug, line.qty - 1)}
                          >
                            <Minus className="size-3" />
                          </Button>
                          <span className="w-7 text-center text-sm font-bold">{line.qty}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-7"
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.slug, line.qty + 1)}
                          >
                            <Plus className="size-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto size-7 text-muted-foreground"
                            aria-label={`Remove ${product.name}`}
                            onClick={() => remove(line.slug)}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ) : null,
                )}
              </ul>

              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-bold">Subtotal</p>
                  <p className="text-sm font-bold">
                    {allPriced ? `Rs. ${subtotal.toLocaleString("en-LK")}` : "Price on request"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-bold">Delivery</p>
                  <p className="text-sm font-bold text-primary">Free</p>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-2">
                  <p className="font-display text-base font-extrabold">Total</p>
                  <p className="font-display text-lg font-extrabold">
                    {allPriced ? `Rs. ${subtotal.toLocaleString("en-LK")}` : "Price on request"}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">Enjoy free delivery on every order.</p>
              </div>
              {!allPriced && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Some items need price confirmation — our team will confirm on WhatsApp.
                </p>
              )}

              <Button className="mt-5 w-full" size="lg" onClick={send} disabled={sending}>
                <MessageCircle className="size-4" />
                {sending ? "Sending…" : "Send Order via WhatsApp"}
              </Button>
              {dbError && (
                <p
                  className={`mt-2 text-center text-xs ${
                    savedOk ? "font-semibold text-green-700" : "text-destructive"
                  }`}
                >
                  {dbError}
                </p>
              )}
              <p className="mt-2 text-center text-xs text-muted-foreground">
                No online payment on this website. Your order opens in WhatsApp (
                {business.whatsappDisplay}) and our team confirms stock, price and delivery.
              </p>
              {touched && invalid && (
                <p className="mt-2 text-center text-xs text-destructive">
                  Please complete the required fields above before sending.
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
