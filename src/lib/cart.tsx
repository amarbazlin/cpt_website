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

export function buildWhatsAppMessage(lines: CartLine[], location: string, note: string) {
  const items = lines.map((l, i) => {
    const p = products.find((x) => x.slug === l.slug);
    const name = p ? `${p.name}${p.brand !== "To be confirmed" ? ` (${p.brand})` : ""}` : l.slug;
    return `${i + 1}. ${name} — Qty: ${l.qty}`;
  });

  const parts = [
    `*New Order — ${business.name}*`,
    "",
    "*Items:*",
    ...items,
    "",
    `*Delivery location:* ${location.trim() || "Not provided"}`,
  ];
  if (note.trim()) parts.push(`*Notes:* ${note.trim()}`);
  parts.push("", "Please confirm availability, price and delivery. Thank you.");
  return parts.join("\n");
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
