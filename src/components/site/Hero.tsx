import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, ArrowRight, MapPin } from "lucide-react";
import { FIRM, mailto, waLink } from "@/lib/firm";
import heroChambers from "@/assets/hero-chambers.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-navy text-ivory">
      {/* radial gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 35%, transparent), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--navy) 80%, transparent), transparent 65%)" }}
      />
      {/* dotted pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--ivory) 1px, transparent 1px), radial-gradient(circle at 80% 60%, var(--gold) 1px, transparent 1px)",
          backgroundSize: "44px 44px, 60px 60px",
        }}
      />
      <div className="container-prose relative grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ivory/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold backdrop-blur-sm sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_var(--gold)]" />
            Harare · Zimbabwe · Est. Belvedere
          </div>
          <h1 className="mt-6 font-serif text-[2.25rem] leading-[1.05] text-ivory sm:text-5xl lg:text-[4rem]">
            Trusted Legal Counsel in <span className="gold-text italic">Harare, Zimbabwe</span>
          </h1>
          <span className="gold-divider mt-7" />
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ivory/80 sm:text-lg">
            {FIRM.name} provides discreet, client-focused legal, advisory, litigation,
            commercial, family, estate, employment, conveyancing, and dispute
            resolution services.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
</Button>
            <Button asChild variant="outlineGold" size="xl" className="w-full border-gold/50 text-ivory hover:text-navy-deep sm:w-auto">
  <a href={mailto()} className="w-full sm:w-auto">
                <Mail className="h-5 w-5" />
                Email Our Legal Team
              </a>
</Button>
            <Button asChild variant="ghost" size="xl" className="w-full text-ivory/90 hover:bg-ivory/10 hover:text-ivory sm:w-auto">
  <Link to="/practice-areas" className="w-full sm:w-auto">
                Practice Areas
                <ArrowRight className="h-4 w-4" />
              </Link>
</Button>
          </div>

          <ul className="mt-10 grid max-w-xl grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            {["Harare-based", "Client-centered", "Court & advisory experience"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-ivory/75">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-3xl bg-gradient-gold opacity-30 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-2xl shadow-elegant ring-1 ring-gold/30">
              <img
                src={heroChambers}
                alt="Elegant law firm chambers with mahogany desk, brass scales of justice, and antique law books"
                width={1024}
                height={1536}
                className="h-[380px] w-full object-cover sm:h-[520px] lg:h-[640px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-navy-deep/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory sm:p-8">
                <span className="hairline-gold" />
                <div className="mt-4 text-[10px] uppercase tracking-[0.22em] text-gold">
                  Visit our chambers
                </div>
                <div className="mt-2 font-serif text-lg leading-snug sm:text-2xl">
                  No. 7 Eastcourt Road, Belvedere, Harare
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-ivory/80">
                  <MapPin className="h-3.5 w-3.5 text-gold" />
                  Zimbabwe
                </div>
                <Button asChild variant="gold" size="default">
  <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex"
                >
                    <MessageCircle className="h-4 w-4" />
                    Start on WhatsApp
                  </a>
</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
