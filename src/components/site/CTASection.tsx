import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import { mailto, waLink } from "@/lib/firm";

interface CTAProps {
  title?: string;
  body?: string;
  variant?: "navy" | "ivory";
}

export function CTASection({
  title = "Speak to a Legal Practitioner",
  body = "Get confidential, practical advice from our team. We respond promptly through WhatsApp, email, and phone.",
  variant = "navy",
}: CTAProps) {
  const isNavy = variant === "navy";
  return (
    <section className={`relative overflow-hidden ${isNavy ? "bg-gradient-navy" : "bg-gradient-ivory"}`}>
      {isNavy && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-20 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 40%, transparent), transparent 65%)" }}
          />
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        </>
      )}
      <div className="container-prose relative grid gap-8 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:py-20">
        <div>
          <div className={`text-xs uppercase tracking-[0.22em] ${isNavy ? "text-gold" : "text-gold-deep"}`}>
            Speak with us
          </div>
          <h2
            className={`mt-3 font-serif text-3xl sm:text-4xl ${
              isNavy ? "text-ivory" : "text-navy-deep"
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-4 max-w-2xl text-base leading-relaxed ${
              isNavy ? "text-ivory/75" : "text-charcoal/75"
            }`}
          >
            {body}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
          <Button asChild variant="gold" size="lg" className="w-full sm:w-auto">
  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
</Button>
          <Button asChild
              variant={isNavy ? "outlineGold" : "navy"}
              size="lg"
              className={`w-full sm:w-auto ${isNavy ? "border-gold/60 text-ivory hover:text-navy-deep" : ""}`}
            >
  <a href={mailto()} className="w-full sm:w-auto">
              <Mail className="h-4 w-4" />
              Email
            </a>
</Button>
          <Button asChild variant="ghost" size="lg" className={`w-full sm:w-auto ${isNavy ? "text-ivory hover:bg-ivory/10 hover:text-ivory" : "text-navy-deep"}`}>
  <Link to="/contact" className="w-full sm:w-auto">
              Contact page
              <ArrowRight className="h-4 w-4" />
            </Link>
</Button>
        </div>
      </div>
    </section>
  );
}
