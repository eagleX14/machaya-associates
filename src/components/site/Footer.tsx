import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { FIRM, mailto, waLink } from "@/lib/firm";
import { PRACTICE_AREAS } from "@/lib/practice-areas";

export function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-navy text-ivory">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
      <div className="container-prose grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="font-serif text-2xl">{FIRM.short}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-gold">
            {FIRM.subtitle}
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/75">
            A Harare-based law firm providing client-focused legal, advisory, litigation,
            commercial, family, estate, employment, conveyancing, and dispute resolution
            services across Zimbabwe.
          </p>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-[0.18em] text-gold">Practice Areas</div>
          <ul className="mt-5 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {PRACTICE_AREAS.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/practice-areas/$slug"
                  params={{ slug: p.slug }}
                  className="text-ivory/80 transition-colors hover:text-gold"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-[0.18em] text-gold">Contact</div>
          <ul className="mt-5 space-y-3 text-sm text-ivory/85">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{FIRM.address.full}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${FIRM.phone.tel}`} className="hover:text-gold">
                {FIRM.phone.display}
              </a>
            </li>
            {FIRM.whatsapp.map((w) => (
              <li key={w.intl} className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={waLink(w.intl)} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  WhatsApp {w.display}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <div className="flex flex-col gap-1">
                <a href={mailto()} className="break-all hover:text-gold">
                  {FIRM.emails.primary}
                </a>
                {FIRM.emails.alternates.map((e) => (
                  <a key={e} href={mailto(e)} className="break-all text-ivory/65 hover:text-gold">
                    {e}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-prose flex flex-col gap-4 py-6 text-xs text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl leading-relaxed">
            Information on this website is provided for general information only and does
            not constitute legal advice. Contacting Machaya &amp; Associates Legal
            Practitioners through this website does not create a lawyer-client
            relationship until a formal engagement is confirmed.
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} {FIRM.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
