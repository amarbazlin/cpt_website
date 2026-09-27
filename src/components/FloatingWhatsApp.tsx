import { useRouterState } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Phone } from "lucide-react";
import { MOBILE_BOTTOM_INSET } from "@/lib/mobile-ui";
import { SmartImage } from "@/components/SmartImage";
import { business } from "@/lib/site";
import { cn } from "@/lib/utils";

const whatsappHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
  "Hello, I'd like help with an order from Ceylon Platinum Trading.",
)}`;

/**
 * Client's own WhatsApp logo (cropped from the supplied 1920px artwork and
 * generated at 512px, served as WebP by the image pipeline). It is the artwork
 * for the floating button at every size — on phones it is the only control,
 * from md up the two-button stack is used. The artwork is a full-bleed green
 * rounded square, so it carries its own colour and corner radius: no button
 * background or clip is needed behind it.
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
        "fixed z-20 flex flex-col items-end md:gap-2",
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
        className="inline-flex size-12 items-center justify-center transition-transform active:scale-95 md:size-11 md:rounded-xl md:shadow-lift md:hover:scale-105 md:active:scale-100"
      >
        <SmartImage
          src={WHATSAPP_LOGO}
          alt=""
          aria-hidden
          className="size-12 drop-shadow-[0_6px_16px_rgba(0,0,0,0.28)] md:size-11"
        />
      </a>
      {/* Tablet and up only — the phone button is dropped from the mobile view. */}
      <a
        href={`tel:${business.phoneIntl}`}
        aria-label={`Call ${business.phone}`}
        className="hidden size-12 items-center justify-center bg-white text-charcoal transition-colors hover:bg-surface active:bg-muted md:inline-flex md:size-11 md:rounded-xl md:shadow-lift"
      >
        <Phone className="size-5" aria-hidden />
      </a>
    </div>
  );
}
