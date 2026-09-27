import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatProductPrice } from "@/lib/product-display";
import type { Product } from "@/lib/site";
import { cn } from "@/lib/utils";

export type ProductCardProps = {
  product: Product;
  className?: string;
  imageLoading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

export function ProductCard({
  product,
  className,
  imageLoading = "lazy",
  fetchPriority,
}: ProductCardProps) {
  const { add, setOpen } = useCart();

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden border border-border bg-card shadow-card transition-[box-shadow,border-color] duration-300 hover:border-primary/35 hover:shadow-lift",
        className,
      )}
    >
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="block bg-surface/60 p-2.5 sm:p-4"
      >
        <div className="relative aspect-square w-full overflow-hidden">
          <SmartImage
            src={product.image}
            alt={`${product.name} — ${product.brand}, available from Ceylon Platinum Trading`}
            loading={imageLoading}
            fetchPriority={fetchPriority}
            className="size-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      <div className="flex min-h-0 flex-1 flex-col px-2.5 pb-2.5 sm:px-4 sm:pb-4">
        <p className="text-[10px] font-semibold tracking-wider text-primary uppercase sm:text-xs">
          {product.brand}
        </p>
        <h3 className="mt-0.5 min-h-[2.5rem] font-display text-sm leading-snug font-extrabold sm:min-h-[2.75rem] sm:text-base">
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="line-clamp-2 break-words hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1.5 font-display text-base font-extrabold tracking-tight sm:mt-2 sm:text-lg">
          {formatProductPrice(product.price)}
        </p>

        <Badge
          variant="secondary"
          className="mt-1.5 w-fit border border-primary/20 bg-accent px-1.5 py-0 text-[9px] font-bold tracking-wide text-primary uppercase sm:mt-2 sm:px-2 sm:text-[10px]"
        >
          FREE ISLANDWIDE DELIVERY
        </Badge>

        <div className="mt-auto flex flex-col gap-1.5 pt-2.5 sm:gap-2 sm:pt-3">
          <Button
            className="min-h-11 w-full touch-manipulation font-display text-[11px] font-bold tracking-wide uppercase sm:text-sm"
            onClick={() => {
              add(product.slug);
              setOpen(true);
            }}
          >
            <ShoppingCart className="size-4 shrink-0" aria-hidden />
            Add to Cart
          </Button>
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="py-0.5 text-center text-[11px] font-semibold text-muted-foreground transition-colors hover:text-primary sm:text-xs"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
