import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/CartDrawer";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { business, faqs } from "@/lib/site";

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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HardwareStore", "Organization"],
  name: business.name,
  alternateName: "CPT Matara",
  description:
    "Ceylon Platinum Trading (PVT) Ltd is a hardware distribution company in Matara, Sri Lanka, supplying power tools, hand tools, paints and coatings, door and window hardware, machinery, compressors, sealants and adhesives to homeowners, contractors, builders and hardware retailers island-wide.",
  slogan: business.tagline,
  telephone: business.phoneIntl,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.street,
    addressLocality: business.city,
    postalCode: business.postalCode,
    addressRegion: "Southern Province",
    addressCountry: "LK",
  },
  areaServed: "Sri Lanka",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  brand: [
    "Bosch",
    "Tolsen",
    "Humhon",
    "Lesso",
    "Asian Paints",
    "Causeway",
    "Bellucci",
    "OMAC",
    "Giant",
    "Wipro",
    "Multibond",
    "As-Ron",
  ].map((b) => ({ "@type": "Brand", name: b })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ceylon Platinum Trading (PVT) Ltd | Hardware Distributors, Matara" },
      {
        name: "description",
        content:
          "Hardware distribution in Matara, Sri Lanka. Power tools, paints, hardware, machinery and sealants from Bosch, Tolsen, Humhon and more.",
      },
      { name: "author", content: business.name },
      { property: "og:site_name", content: business.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_LK" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#A61C1C" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusinessSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            {/* Required: nested routes render here. */}
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <CartDrawer />
      </CartProvider>
    </QueryClientProvider>
  );
}
