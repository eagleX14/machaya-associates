import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FIRM, waLink } from "@/lib/firm";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/practice-areas", label: "Practice Areas" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 shadow-[0_1px_0_0_color-mix(in_oklab,var(--gold)_15%,transparent)] backdrop-blur-md">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="container-prose grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 sm:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-gradient-navy text-gold shadow-soft ring-1 ring-gold/30">
            <span className="font-serif text-lg tracking-wider">M&amp;A</span>
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate font-serif text-base font-semibold text-navy-deep sm:text-lg">
              {FIRM.short}
            </div>
            <div className="truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
              {FIRM.subtitle}
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="px-3 py-2 text-sm font-medium text-charcoal transition-colors hover:text-navy data-[status=active]:text-navy-deep data-[status=active]:underline data-[status=active]:decoration-gold data-[status=active]:decoration-2 data-[status=active]:underline-offset-8"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 hidden md:inline-flex"
          >
            <Button variant="gold" size="default">
              <MessageCircle className="h-4 w-4" />
              WhatsApp Consultation
            </Button>
          </a>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-1 grid h-10 w-10 place-items-center rounded-md text-navy-deep lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="container-prose flex flex-col py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-charcoal hover:bg-muted data-[status=active]:bg-muted data-[status=active]:text-navy-deep"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3"
              onClick={() => setOpen(false)}
            >
              <Button variant="gold" size="lg" className="w-full">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Consultation
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
