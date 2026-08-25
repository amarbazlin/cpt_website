import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { buildWhatsAppMessage, useCart, whatsappUrl } from "@/lib/cart";
import { business, products } from "@/lib/site";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, clear } = useCart();
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [touched, setTouched] = useState(false);

  const empty = lines.length === 0;
  const locationMissing = location.trim().length < 3;

  function checkout() {
    setTouched(true);
    if (empty || locationMissing) return;
    const url = whatsappUrl(buildWhatsAppMessage(lines, location, note));
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetTitle className="border-b border-border px-5 py-4 font-display text-lg font-extrabold">
          Your Order
        </SheetTitle>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingCart className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Your cart is empty. Add products from our catalogue and send the order to our WhatsApp
              team.
            </p>
            <Button asChild onClick={() => setOpen(false)}>
              <Link to="/products">Browse products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {lines.map((l) => {
                  const p = products.find((x) => x.slug === l.slug);
                  if (!p) return null;
                  return (
                    <li key={l.slug} className="flex gap-3 border-b border-border pb-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="size-16 shrink-0 rounded border border-border bg-surface object-contain p-1"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-bold">{p.name}</p>
                        <p className="text-xs text-muted-foreground">Price on request</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(l.slug, l.qty - 1)}
                          >
                            <Minus className="size-3.5" />
                          </Button>
                          <span className="w-8 text-center text-sm font-bold">{l.qty}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            aria-label="Increase quantity"
                            onClick={() => setQty(l.slug, l.qty + 1)}
                          >
                            <Plus className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto size-8 text-muted-foreground"
                            aria-label={`Remove ${p.name}`}
                            onClick={() => remove(l.slug)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 space-y-4">
                <div>
                  <Label htmlFor="cart-location">Delivery location / address *</Label>
                  <Input
                    id="cart-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. No. 12, Beliatta Road, Tangalle"
                    className="mt-1.5"
                  />
                  {touched && locationMissing && (
                    <p className="mt-1 text-xs text-destructive">
                      Please enter where the order should be delivered.
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cart-note">Notes (optional)</Label>
                  <Textarea
                    id="cart-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Contact name, preferred delivery date, specifications…"
                    className="mt-1.5"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-border p-5">
              <p className="text-xs text-muted-foreground">
                No online payment. Your order opens in WhatsApp ({business.whatsappDisplay}) and our
                team confirms price, stock and delivery.
              </p>
              <Button className="w-full" size="lg" onClick={checkout}>
                Send order on WhatsApp
              </Button>
              <Button variant="ghost" className="w-full" onClick={clear}>
                Clear cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
