import { useRouterState } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { MOBILE_BOTTOM_INSET } from "@/lib/mobile-ui";
import { business } from "@/lib/site";
import { cn } from "@/lib/utils";

const whatsappHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
  "Hello, I'd like help with an order from Ceylon Platinum Trading.",
)}`;

export function FloatingWhatsApp() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname.startsWith("/admin")) return null;

  const onProduct = pathname.startsWith("/products/") && pathname !== "/products/";
  const onOrder = pathname === "/order";

  return (
    <div
      className={cn(
        "fixed z-20 flex flex-col overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10",
        "right-4 max-md:bottom-[var(--wa-float-bottom)] md:bottom-6",
        onOrder && "max-md:hidden",
      )}
      style={
        {
          "--wa-float-bottom": onProduct
            ? `calc(${MOBILE_BOTTOM_INSET} + 4.25rem)`
            : MOBILE_BOTTOM_INSET,
        } as CSSProperties
      }
      role="group"
      aria-label="Contact CPT"
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="inline-flex size-12 items-center justify-center bg-[#25D366] text-white transition-colors hover:bg-[#20bd5a] active:bg-[#1da851] md:size-11"
      >
        <MessageCircle className="size-6 md:size-5" aria-hidden />
      </a>
      <a
        href={`tel:${business.phoneIntl}`}
        aria-label={`Call ${business.phone}`}
        className="inline-flex size-12 items-center justify-center border-t border-black/10 bg-white text-charcoal transition-colors hover:bg-surface active:bg-muted md:size-11"
      >
        <Phone className="size-5" aria-hidden />
      </a>
    </div>
  );
}
