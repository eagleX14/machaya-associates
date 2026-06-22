import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp, MobileContactBar } from "@/components/site/FloatingActions";
import { FIRM } from "@/lib/firm";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-navy-deep">404</h1>
        <h2 className="mt-3 font-serif text-2xl text-navy-deep">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-ivory hover:bg-navy-deep"
        >
          Go home
        </Link>
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
    <div className="flex min-h-[70vh] items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-navy-deep">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Please try again or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-ivory hover:bg-navy-deep"
          >
            Try again
          </button>
          <a
            href={import.meta.env.BASE_URL}
            className="rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium text-navy-deep hover:bg-muted"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: FIRM.name,
  url: FIRM.url,
  email: FIRM.emails.primary,
  telephone: "+263 242 710173",
  areaServed: "Zimbabwe",
  address: {
    "@type": "PostalAddress",
    streetAddress: FIRM.address.line1,
    addressLocality: "Harare",
    addressRegion: "Harare",
    addressCountry: "ZW",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+263 772 990 567",
      contactType: "customer service",
      areaServed: "ZW",
      availableLanguage: ["English"],
    },
  ],
  serviceType: [
    "Civil Law",
    "Criminal Law",
    "Corporate Law",
    "Commercial Law",
    "Conveyancing",
    "Notarial Practice",
    "Family Law",
    "Debt Recovery",
    "Employment Law",
    "Intellectual Property Law",
    "Litigation",
    "Dispute Resolution",
    "Tax Law",
    "Estate Administration",
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0f1b3d" },
      { title: `${FIRM.name} | Law Firm in Harare, Zimbabwe` },
      {
        name: "description",
        content:
          "Machaya & Associates Legal Practitioners is a Harare-based law firm offering litigation, estates, corporate law, conveyancing, family law, employment law, intellectual property, tax law, and dispute resolution services.",
      },
      { name: "author", content: FIRM.name },
      { property: "og:site_name", content: FIRM.short },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Lovable App" },
      { property: "og:title", content: "Lovable App" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "description", content: "A professional, SEO-optimized website for Machaya & Associates Legal Practitioners, offering comprehensive legal services in Zimbabwe." },
      { property: "og:description", content: "A professional, SEO-optimized website for Machaya & Associates Legal Practitioners, offering comprehensive legal services in Zimbabwe." },
      { name: "twitter:description", content: "A professional, SEO-optimized website for Machaya & Associates Legal Practitioners, offering comprehensive legal services in Zimbabwe." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/135fcaed-32e0-4f8e-90af-d8a45d9ec76f/id-preview-0da0e5f1--3a90071a-7982-49de-9f7a-6dc1600515ef.lovable.app-1782167243465.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/135fcaed-32e0-4f8e-90af-d8a45d9ec76f/id-preview-0da0e5f1--3a90071a-7982-49de-9f7a-6dc1600515ef.lovable.app-1782167243465.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(orgJsonLd),
      },
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
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <Outlet />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <MobileContactBar />
      </div>
    </QueryClientProvider>
  );
}
