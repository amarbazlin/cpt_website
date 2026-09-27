import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { business, products } from "./site";

export type CartLine = { slug: string; qty: number };

type CartContext = {
  lines: CartLine[];
  count: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartContext | null>(null);
const KEY = "cpt-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug);
      if (found) return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { slug, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      add,
      setQty,
      remove,
      clear,
      open,
      setOpen,
    }),
    [lines, add, setQty, remove, clear, open],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export type OrderDetails = {
  contact: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
  saveInfo: boolean;
};

export type SavedDeliveryInfo = Pick<
  OrderDetails,
  "contact" | "firstName" | "lastName" | "address" | "apartment" | "city" | "postalCode"
>;

const SAVED_INFO_KEY = "cpt-delivery-info-v1";

export function loadSavedDeliveryInfo(): SavedDeliveryInfo | null {
  try {
    const raw = localStorage.getItem(SAVED_INFO_KEY);
    return raw ? (JSON.parse(raw) as SavedDeliveryInfo) : null;
  } catch {
    return null;
  }
}

export function saveDeliveryInfo(info: SavedDeliveryInfo) {
  try {
    localStorage.setItem(SAVED_INFO_KEY, JSON.stringify(info));
  } catch {
    /* ignore */
  }
}

export function buildOrderMessage(lines: CartLine[], d: OrderDetails) {
  const items = lines.map((l, i) => {
    const p = products.find((x) => x.slug === l.slug);
    const productName = p ? p.name : l.slug;
    const price = p?.price ? ` @ Rs. ${p.price.toLocaleString("en-LK")}` : "";
    return `${i + 1}. ${productName}${price} — Qty: ${l.qty}`;
  });

  const allPriced = lines.every((l) => products.find((x) => x.slug === l.slug)?.price);
  const total = lines.reduce((n, l) => {
    const p = products.find((x) => x.slug === l.slug);
    return n + (p?.price ?? 0) * l.qty;
  }, 0);

  const parts = [
    `*New Order — ${business.name}*`,
    "",
    "*Items:*",
    ...items,
    "",
    "*Contact:*",
    `*Contact No.:* ${d.contact.trim() || "Not provided"}`,
    "",
    "*Delivery details:*",
    `*Country:* ${d.country || "Sri Lanka"}`,
    `*First name:* ${d.firstName.trim() || "Not provided"}`,
    `*Last name:* ${d.lastName.trim() || "Not provided"}`,
    `*Address:* ${d.address.trim() || "Not provided"}`,
    `*Apartment, suite, etc.:* ${d.apartment.trim() || "-"}`,
    `*City:* ${d.city.trim() || "Not provided"}`,
    `*Postal Code:* ${d.postalCode.trim() || "Not provided"}`,
    `*Save this information for next time:* ${d.saveInfo ? "Yes" : "No"}`,
    "",
    `*Payment method:* ${d.paymentMethod}`,
    "",
    allPriced
      ? `*Delivery:* Free\n*Total:* Rs. ${total.toLocaleString("en-LK")}`
      : "*Delivery:* Free (total to be confirmed)",
    "",
    "Please confirm availability, price and delivery. Thank you.",
  ];
  return parts.join("\n");
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
