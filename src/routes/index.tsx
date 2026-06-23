import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { PracticeAreasGrid } from "@/components/site/PracticeAreasGrid";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { TeamGrid } from "@/components/site/TeamGrid";
import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { Button } from "@/components/ui/button";
import { FIRM, mailto, waLink } from "@/lib/firm";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import aboutScales from "@/assets/about-scales.jpg";
import ctaCourthouse from "@/assets/cta-courthouse.jpg";

const FAQS = [
  {
    q: "Where is Machaya & Associates Legal Practitioners located?",
    a: "The firm is located at No. 7 Eastcourt Road, Belvedere, Harare, Zimbabwe.",
  },
  {
    q: "How can I contact Machaya & Associates?",
    a: "You can call (0242) 710173, WhatsApp 0772 990 567 or 0717 515 465, or email machayalawyers@machayaassociates.co.zw.",
  },
  {
    q: "What legal services does the firm provide?",
    a: "The firm provides services in estate administration, civil and criminal law, corporate and commercial law, conveyancing, notarial practice, family law, debt recovery, employment law, intellectual property, litigation, dispute resolution, and tax law.",
  },
  {
    q: "Can I request a consultation online?",
    a: "Yes. Visitors can request a consultation through WhatsApp, email, or the contact form.",
  },
  {
    q: "Does submitting a website enquiry create a lawyer-client relationship?",
    a: "No. A lawyer-client relationship is only created once the firm formally accepts an engagement.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${FIRM.name} | Law Firm in Harare, Zimbabwe` },
      {
        name: "description",
        content:
          "Machaya & Associates Legal Practitioners is a Harare-based law firm offering litigation, estates, corporate law, conveyancing, family law, employment law, intellectual property, tax law, and dispute resolution services.",
      },
      { property: "og:title", content: `${FIRM.name} | Law Firm in Harare, Zimbabwe` },
      {
        property: "og:description",
        content:
          "Trusted legal counsel in Harare, Zimbabwe. Litigation, estates, corporate, family, conveyancing, employment, IP, tax law, and dispute resolution.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />

      {/* Trust bar */}
      <section aria-label="Trust" className="relative border-y border-border bg-gradient-ivory">
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="container-prose grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4">
          {[
            { k: "Harare", v: "Belvedere chambers" },
            { k: "Multi-practice", v: "10 areas of law" },
            { k: "Direct access", v: "WhatsApp, email & phone" },
            { k: "Confidential", v: "Discreet consultations" },
          ].map((t, i) => (
            <div key={t.k} className={`px-2 text-center ${i > 0 ? "sm:border-l sm:border-gold/20" : ""}`}>
              <div className="font-serif text-lg text-navy-deep sm:text-xl">{t.k}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                {t.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="bg-background py-20 md:py-24">
        <div className="container-prose grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-3xl bg-gradient-gold opacity-25 blur-3xl"
              />
              <div className="relative overflow-hidden rounded-2xl shadow-elegant ring-1 ring-gold/30">
                <img
                  src={aboutScales}
                  alt="Brass scales of justice resting on antique leather-bound law books"
                  width={1280}
                  height={1024}
                  loading="lazy"
                  className="h-[320px] w-full object-cover sm:h-[460px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-5 left-4 right-4 rounded-xl border border-gold/40 bg-gradient-ivory px-5 py-4 text-navy-deep shadow-elegant sm:-bottom-6 sm:right-auto sm:left-auto sm:-right-6">
                <div className="text-[10px] uppercase tracking-[0.22em] text-gold-deep">Est. Harare</div>
                <div className="font-serif text-lg">Belvedere Chambers</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.22em] text-gold">About the firm</div>
            <h2 className="mt-4 font-serif text-3xl text-navy-deep sm:text-4xl">
              A Harare-based law firm built on integrity and service
            </h2>
            <span className="gold-divider mt-6" />
            <p className="mt-6 text-base leading-relaxed text-charcoal/80">
              Machaya &amp; Associates Legal Practitioners is a growing law firm based in
              Harare, Zimbabwe, dedicated to providing comprehensive legal and advisory
              services to a diverse clientele. Founded by Dambudzo Machaya — with
              associates Kenias Chimiti, Moffat Makuvatsine, and Bridget T. Chapepa — the
              firm is built on legal excellence, integrity, and client-centered service.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal/80">
              Our team brings experience drawn from the Office of the Prosecutor, the
              Attorney General's Office, and respected Zimbabwean law firms — giving us
              strong insight into both public and private legal practice.
            </p>
            <div className="mt-6">
              <Button asChild variant="outlineGold" size="lg">
  <Link to="/about">
                  Read more about us
                  <ArrowRight className="h-4 w-4" />
                </Link>
</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image band — courthouse */}
      <section className="relative h-[260px] overflow-hidden sm:h-[320px] md:h-[400px]">
        <img
          src={ctaCourthouse}
          alt="Neoclassical courthouse colonnade at golden hour"
          width={1600}
          height={900}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-midnight via-navy-deep/70 to-navy/20" />
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="container-prose relative flex h-full items-center">
          <div className="max-w-xl text-ivory">
            <div className="text-[10px] uppercase tracking-[0.22em] text-gold sm:text-xs">
              Committed to the rule of law
            </div>
            <h2 className="mt-3 font-serif text-2xl leading-tight text-ivory sm:text-3xl md:text-4xl">
              Practical counsel. Principled advocacy. <span className="gold-text">Real outcomes</span> for our clients.
            </h2>
          </div>
        </div>
      </section>

      <PracticeAreasGrid />
      <WhyChooseUs />
      <TeamGrid />

      <CTASection
        title="Schedule a confidential consultation"
        body="Speak with a legal practitioner about your matter. We respond promptly and discreetly through WhatsApp, email, and phone."
      />

      {/* Contact preview */}
      <section className="bg-background py-20 md:py-24">
        <div className="container-prose grid gap-10 lg:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-gold">Visit · Call · Write</div>
            <h2 className="mt-4 font-serif text-3xl text-navy-deep sm:text-4xl">
              Get in touch with our team
            </h2>
            <span className="gold-divider mt-6" />
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-gold" />
                <span className="text-charcoal/85">{FIRM.address.full}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-gold" />
                <a href={`tel:${FIRM.phone.tel}`} className="text-charcoal/85 hover:text-navy-deep">
                  {FIRM.phone.display}
                </a>
              </li>
              {FIRM.whatsapp.map((w) => (
                <li key={w.intl} className="flex gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 text-gold" />
                  <a
                    href={waLink(w.intl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal/85 hover:text-navy-deep"
                  >
                    WhatsApp {w.display}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-gold" />
                <a href={mailto()} className="break-all text-charcoal/85 hover:text-navy-deep">
                  {FIRM.emails.primary}
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <Button asChild variant="navy" size="lg">
  <Link to="/contact">
                  Full contact details
                  <ArrowRight className="h-4 w-4" />
                </Link>
</Button>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-gold">Frequently asked</div>
            <h2 className="mt-4 font-serif text-3xl text-navy-deep sm:text-4xl">
              Common questions
            </h2>
            <span className="gold-divider mt-6" />
            <div className="mt-8">
              <FAQAccordion items={FAQS} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
