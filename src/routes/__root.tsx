import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type CSSProperties, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { MobileSearchSheet } from "@/components/MobileSearchSheet";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileUiProvider, MOBILE_BOTTOM_INSET } from "@/lib/mobile-ui";
import { business } from "@/lib/site";
import {
  faqSchema,
  jsonLdScripts,
  organizationSchema,
  SITE_NAME,
  socialImageMeta,
  websiteSchema,
} from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-extrabold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/*
 * Site-wide structured data lives in `src/lib/seo.ts`:
 *   organizationSchema — HardwareStore / LocalBusiness / Organization
 *   websiteSchema      — WebSite + SearchAction (catalogue search)
 *   faqSchema          — FAQPage built from the site's existing FAQ copy
 */

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_NAME },
      {
        name: "description",
        content:
          "Power tools, paints, hardware, machinery and pumps from Bosch, Tolsen, Humhon and more.",
      },
      { name: "author", content: business.name },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:site_name", content: business.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_LK" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#A61C1C" },
      // Default link preview (overridden per page, e.g. with the product image).
      ...socialImageMeta("/hero01.png", "Ceylon Platinum Trading promotion banner"),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/icon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        // Inter variable font: one file covers 400-800 (body, labels, prices,
        // sub-headings and hero headings) with optical sizing for display text.
        href: "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&display=swap",
      },
    ],
    scripts: jsonLdScripts([organizationSchema, websiteSchema, faqSchema]),
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-LK">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <MobileUiProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col overflow-x-hidden">
            <SiteHeader />
            <main
              className="flex-1 max-md:pb-[var(--main-bottom-pad)]"
              style={{ "--main-bottom-pad": MOBILE_BOTTOM_INSET } as CSSProperties}
            >
              {/* Required: nested routes render here. */}
              <Outlet />
            </main>
            <SiteFooter />
          </div>
          <CartDrawer />
          <MobileSearchSheet />
          <MobileBottomNav />
          <FloatingWhatsApp />
        </CartProvider>
      </MobileUiProvider>
    </QueryClientProvider>
  );
}
