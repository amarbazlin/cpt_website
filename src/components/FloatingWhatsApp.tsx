import { useRouterState } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { MOBILE_BOTTOM_INSET } from "@/lib/mobile-ui";
import { SmartImage } from "@/components/SmartImage";
import { business } from "@/lib/site";
import { cn } from "@/lib/utils";

const whatsappHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
  "Hello, I'd like help with an order from Ceylon Platinum Trading.",
)}`;

/**
 * Client's own WhatsApp logo (cropped from the supplied 1920px artwork and
 * generated at 512px, served as WebP by the image pipeline). Used for the
 * single floating button on phones; from md up the two-button stack is used.
 */
const WHATSAPP_LOGO = "/whatsapp-logo.png";

export function FloatingWhatsApp() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname.startsWith("/admin")) return null;

  const onProduct = pathname.startsWith("/products/") && pathname !== "/products/";
  const onOrder = pathname === "/order";

  return (
    <div
      className={cn(
        "fixed z-20 flex flex-col items-end md:overflow-hidden md:rounded-2xl md:shadow-lg md:ring-1 md:ring-black/10",
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
        aria-label={`Chat on WhatsApp, ${business.whatsappDisplay}`}
        className="inline-flex size-12 items-center justify-center transition-transform active:scale-95 md:size-11 md:bg-[#25D366] md:text-white md:transition-colors md:hover:bg-[#20bd5a] md:active:scale-100 md:active:bg-[#1da851]"
      >
        {/* Phones: the client's WhatsApp logo, sized to the 48px tap target. */}
        <SmartImage
          src={WHATSAPP_LOGO}
          alt=""
          aria-hidden
          className="size-12 drop-shadow-[0_6px_16px_rgba(0,0,0,0.28)] md:hidden"
        />
        <MessageCircle className="hidden size-5 md:block" aria-hidden />
      </a>
      {/* Tablet and up only — the phone button is dropped from the mobile view. */}
      <a
        href={`tel:${business.phoneIntl}`}
        aria-label={`Call ${business.phone}`}
        className="hidden size-12 items-center justify-center border-t border-black/10 bg-white text-charcoal transition-colors hover:bg-surface active:bg-muted md:inline-flex md:size-11"
      >
        <Phone className="size-5" aria-hidden />
      </a>
    </div>
  );
}
