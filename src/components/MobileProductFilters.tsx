import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { categories } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  brand: string;
  browseBrands: readonly string[];
  onCategory: (slug: string) => void;
  onBrand: (value: string) => void;
  onClear: () => void;
};

export function MobileProductFilters({
  open,
  onOpenChange,
  category,
  brand,
  browseBrands,
  onCategory,
  onBrand,
  onClear,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="flex w-[min(100vw,22rem)] flex-col gap-0 p-0">
        <SheetTitle className="flex items-center gap-2 border-b border-border px-4 py-3 pr-12 font-display font-extrabold">
          <SlidersHorizontal className="size-5 text-primary" aria-hidden />
          Filter
        </SheetTitle>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <h2 className="font-display text-xs font-bold tracking-widest uppercase">Category</h2>
          <div className="mt-2 flex flex-col gap-1.5">
            {[{ slug: "all", name: "All products" }, ...categories].map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => onCategory(c.slug)}
                className={cn(
                  "min-h-11 rounded-md border px-3 py-2 text-left font-display text-sm font-semibold transition-colors",
                  category === c.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                {c.name}
              </button>
            ))}
          </div>

          <h2 className="mt-6 font-display text-xs font-bold tracking-widest uppercase">Brand</h2>
          <div className="mt-2 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => onBrand("all")}
              className={cn(
                "min-h-11 rounded-md border px-3 py-2 text-left font-display text-sm font-semibold transition-colors",
                brand === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              All brands
            </button>
            {browseBrands.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => onBrand(b)}
                className={cn(
                  "min-h-11 rounded-md border px-3 py-2 text-left font-display text-sm font-semibold transition-colors",
                  brand === b
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button className="min-h-11 w-full font-display font-bold" onClick={() => onOpenChange(false)}>
            Show results
          </Button>
          <Button variant="outline" className="min-h-11 w-full" onClick={onClear}>
            Clear filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
