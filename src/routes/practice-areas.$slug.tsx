import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { Button } from "@/components/ui/button";
import { PRACTICE_AREAS, getPracticeArea } from "@/lib/practice-areas";
import { FIRM, mailto, waLink } from "@/lib/firm";
import { ArrowRight, Check, Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/practice-areas/$slug")({
  loader: ({ params }) => {
    const area = getPracticeArea(params.slug);
    if (!area) throw notFound();
    return area;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [] };
    const title = `${loaderData.title} | ${FIRM.short} — Harare, Zimbabwe`;
    const desc = loaderData.short;
    const url = `/practice-areas/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Practice Areas", item: "/practice-areas" },
              { "@type": "ListItem", position: 3, name: loaderData.title, item: url },
            ],
          }),
        },
        ...(loaderData.faq.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: loaderData.faq.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-prose py-24 text-center">
      <h1 className="font-serif text-4xl text-navy-deep">Practice area not found</h1>
      <Link to="/practice-areas" className="mt-6 inline-block text-navy underline">
        View all practice areas
      </Link>
    </div>
  ),
  component: PracticeAreaPage,
});

function PracticeAreaPage() {
  const area = Route.useLoaderData();
  const params = Route.useParams();
  const related = PRACTICE_AREAS.filter((p) => p.slug !== params.slug).slice(0, 4);
  const waMsg = `Hello ${FIRM.short}, I would like to request assistance with ${area.title}.`;

  return (
    <>
      <section className="bg-ivory">
        <div className="container-prose py-14 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Practice Areas", to: "/practice-areas" },
              { label: area.title },
            ]}
          />
          <h1 className="mt-6 font-serif text-4xl text-navy-deep sm:text-5xl">
            {area.title}
          </h1>
          <span className="gold-divider mt-6" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-charcoal/80">
            {area.short}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
  <a href={waLink(undefined, waMsg)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Request assistance on WhatsApp
              </a>
</Button>
            <Button asChild variant="navy" size="lg">
  <a
              href={mailto(
                FIRM.emails.primary,
                `Enquiry: ${area.title}`,
                `Hello ${FIRM.short},\n\nI would like to request assistance regarding ${area.title}.\n\n`
              )}
            >
                <Mail className="h-4 w-4" />
                Email our team
              </a>
</Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container-prose grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.22em] text-gold">Overview</div>
            <h2 className="mt-3 font-serif text-3xl text-navy-deep">
              How we can help
            </h2>
            <span className="gold-divider mt-5" />
            <p className="mt-6 text-base leading-relaxed text-charcoal/80">
              {area.description}
            </p>
            <ul className="mt-8 space-y-3">
              {area.bullets.map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-base text-charcoal/85">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-gold">Get in touch</div>
              <h3 className="mt-3 font-serif text-2xl text-navy-deep">
                Speak to a practitioner
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
                Confidential. Direct. Professional. Reach us through your preferred
                channel and we will respond promptly.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild variant="whatsapp" size="lg" className="w-full justify-center">
  <a href={waLink(undefined, waMsg)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
</Button>
                <Button asChild variant="navy" size="lg" className="w-full justify-center">
  <a href={mailto(FIRM.emails.primary, `Enquiry: ${area.title}`)}>
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
</Button>
                <Button asChild variant="outlineGold" size="lg" className="w-full justify-center">
  <a href={`tel:${FIRM.phone.tel}`}>
                    Call {FIRM.phone.display}
                  </a>
</Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {area.faq.length > 0 && (
        <section className="bg-ivory py-20 md:py-24">
          <div className="container-prose grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="text-xs uppercase tracking-[0.22em] text-gold">FAQ</div>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                Frequently asked questions
              </h2>
              <span className="gold-divider mt-5" />
            </div>
            <div className="lg:col-span-8">
              <FAQAccordion items={area.faq} />
            </div>
          </div>
        </section>
      )}

      <section className="bg-background py-20 md:py-24">
        <div className="container-prose">
          <div className="text-xs uppercase tracking-[0.22em] text-gold">More from our practice</div>
          <h2 className="mt-3 font-serif text-3xl text-navy-deep">Related areas</h2>
          <span className="gold-divider mt-5" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/practice-areas/$slug"
                params={{ slug: r.slug }}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-elegant"
              >
                <h3 className="font-serif text-lg text-navy-deep">{r.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-charcoal/75">{r.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={`Need help with ${area.title.toLowerCase()}?`} />
    </>
  );
}
