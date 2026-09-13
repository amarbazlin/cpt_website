import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/site";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, clear } = useCart();

  const empty = lines.length === 0;
  const detailed = lines
    .map((line) => ({ line, product: products.find((p) => p.slug === line.slug) }))
    .filter((x) => x.product);
  const allPriced = detailed.every((x) => x.product?.price);
  const subtotal = detailed.reduce((n, x) => n + (x.product?.price ?? 0) * x.line.qty, 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetTitle className="border-b border-border px-5 py-4 font-display text-lg font-extrabold">
          Your Cart
        </SheetTitle>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingCart className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Your cart is empty. Add products from our catalogue and proceed to order.
            </p>
            <Button asChild onClick={() => setOpen(false)}>
              <Link to="/products">Browse products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {detailed.map(({ line, product }) =>
                  product ? (
                    <li key={line.slug} className="flex gap-3 border-b border-border pb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="size-16 shrink-0 rounded border border-border bg-surface object-contain p-1"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-bold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.price
                            ? `Rs. ${(product.price * line.qty).toLocaleString("en-LK")}`
                            : "Price on request"}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.slug, line.qty - 1)}
                          >
                            <Minus className="size-3.5" />
                          </Button>
                          <span className="w-8 text-center text-sm font-bold">{line.qty}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.slug, line.qty + 1)}
                          >
                            <Plus className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto size-8 text-muted-foreground"
                            aria-label={`Remove ${product.name}`}
                            onClick={() => remove(line.slug)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ) : null,
                )}
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <p className="font-display text-sm font-bold">Subtotal</p>
                <p className="font-display text-lg font-extrabold">
                  {allPriced ? `Rs. ${subtotal.toLocaleString("en-LK")}` : "Price on request"}
                </p>
              </div>
              {!allPriced && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Some items need price confirmation — our team will confirm on WhatsApp.
                </p>
              )}
            </div>

            <div className="space-y-2 border-t border-border p-5">
              <Button
                asChild
                variant="destructive"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                <Link to="/order">Proceed to order</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={clear}>
                Clear cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
