import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ContactForm } from "@/components/site/ContactForm";
import { Button } from "@/components/ui/button";
import { FIRM, mailto, waLink } from "@/lib/firm";
import { AlertTriangle, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact ${FIRM.short} | Harare Law Firm` },
      {
        name: "description",
        content:
          "Contact Machaya & Associates Legal Practitioners. Call (0242) 710173, WhatsApp 0772 990 567 / 0717 515 465, email machayalawyers@machayaassociates.co.zw, or visit No. 7 Eastcourt Road, Belvedere, Harare.",
      },
      { property: "og:title", content: `Contact ${FIRM.short}` },
      {
        property: "og:description",
        content: "Get in touch with our Harare-based legal team by WhatsApp, email, or phone.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="bg-ivory">
        <div className="container-prose py-14 md:py-20">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          <h1 className="mt-6 font-serif text-4xl text-navy-deep sm:text-5xl lg:text-6xl">
            Contact our legal team
          </h1>
          <span className="gold-divider mt-6" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-charcoal/80">
            Reach out through the channel that suits you best. We respond promptly and
            discreetly to all enquiries.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="container-prose grid gap-8 lg:grid-cols-2">
          <ContactCard
            tone="navy"
            icon={<MessageCircle className="h-5 w-5 text-gold" />}
            label="WhatsApp"
            title="Message us directly"
          >
            <div className="flex flex-col gap-3">
              {FIRM.whatsapp.map((w) => (
                <a
                  key={w.intl}
                  href={waLink(w.intl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-md border border-ivory/15 px-4 py-3 text-ivory/90 transition-colors hover:border-gold/60 hover:text-gold"
                >
                  <span>{w.display}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-gold">Open</span>
                </a>
              ))}
            </div>
          </ContactCard>

          <ContactCard
            icon={<Phone className="h-5 w-5 text-gold" />}
            label="Telephone"
            title="Call our chambers"
          >
            <a
              href={`tel:${FIRM.phone.tel}`}
              className="font-serif text-2xl text-navy-deep hover:text-navy"
            >
              {FIRM.phone.display}
            </a>
            <p className="mt-3 text-sm text-charcoal/70">
              Monday to Friday during business hours.
            </p>
          </ContactCard>

          <ContactCard
            icon={<Mail className="h-5 w-5 text-gold" />}
            label="Email"
            title="Write to us"
          >
            <a
              href={mailto()}
              className="break-all font-serif text-lg text-navy-deep hover:text-navy"
            >
              {FIRM.emails.primary}
            </a>
            <div className="mt-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Alternative contacts
              </div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {FIRM.emails.alternates.map((e) => (
                  <li key={e}>
                    <a href={mailto(e)} className="break-all text-charcoal/80 hover:text-navy">
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ContactCard>

          <ContactCard
            icon={<MapPin className="h-5 w-5 text-gold" />}
            label="Office"
            title="Visit our chambers"
          >
            <p className="font-serif text-lg text-navy-deep">
              {FIRM.address.line1}
              <br />
              {FIRM.address.line2}
            </p>
          </ContactCard>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-20">
        <div className="container-prose grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.22em] text-gold">Send an enquiry</div>
            <h2 className="mt-3 font-serif text-3xl text-navy-deep sm:text-4xl">
              Tell us about your matter
            </h2>
            <span className="gold-divider mt-5" />
            <p className="mt-5 text-base leading-relaxed text-charcoal/80">
              Complete the form and we will respond through your preferred channel. For
              urgent matters, WhatsApp or call us directly.
            </p>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-gold/40 bg-gold-soft/40 p-4 text-sm text-navy-deep">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-navy-deep" />
              <div>
                <div className="font-semibold">Urgent legal assistance?</div>
                <p className="mt-1 text-charcoal/80">
                  For urgent matters such as bail applications, please call or WhatsApp
                  us directly so we can attend to you without delay.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild variant="navy" size="sm">
  <a href={`tel:${FIRM.phone.tel}`}>
                      Call now
                    </a>
</Button>
                  <Button asChild variant="whatsapp" size="sm">
  <a href={waLink()} target="_blank" rel="noopener noreferrer">
                      WhatsApp now
                    </a>
</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="container-prose">
          <div className="text-xs uppercase tracking-[0.22em] text-gold">Find us</div>
          <h2 className="mt-3 font-serif text-3xl text-navy-deep">Office location</h2>
          <span className="gold-divider mt-5" />
          <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-soft">
            <iframe
              title="Map to Machaya & Associates Legal Practitioners"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                "No. 7 Eastcourt Road, Belvedere, Harare, Zimbabwe"
              )}&output=embed`}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon,
  label,
  title,
  tone,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  tone?: "navy";
  children: React.ReactNode;
}) {
  const navy = tone === "navy";
  return (
    <article
      className={`rounded-2xl border p-8 shadow-soft ${
        navy ? "border-navy bg-navy-deep text-ivory" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold">
        {icon}
        {label}
      </div>
      <h3
        className={`mt-3 font-serif text-xl ${
          navy ? "text-ivory" : "text-navy-deep"
        }`}
      >
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </article>
  );
}
