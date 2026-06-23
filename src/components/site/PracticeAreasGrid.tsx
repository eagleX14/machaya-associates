import { Link } from "@tanstack/react-router";
import {
  Scroll,
  Gavel,
  Briefcase,
  Stamp,
  Users,
  Scale,
  UsersRound,
  ShieldCheck,
  Landmark,
  Calculator,
  ArrowUpRight,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { PRACTICE_AREAS } from "@/lib/practice-areas";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/firm";

const ICONS: Record<string, LucideIcon> = {
  scroll: Scroll,
  gavel: Gavel,
  briefcase: Briefcase,
  stamp: Stamp,
  users: Users,
  scale: Scale,
  "users-round": UsersRound,
  "shield-check": ShieldCheck,
  landmark: Landmark,
  calculator: Calculator,
};

export function PracticeAreasGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-background py-20 md:py-24" id="practice-areas">
      <div className="container-prose">
        {heading && (
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.22em] text-gold">What we do</div>
            <h2 className="mt-4 font-serif text-3xl text-navy-deep sm:text-4xl">
              Comprehensive legal services
            </h2>
            <span className="gold-divider mx-auto mt-6" />
            <p className="mt-6 text-base text-charcoal/75">
              Practical, strategic counsel across the matters that affect individuals,
              families, companies, and institutions in Zimbabwe.
            </p>
          </div>
        )}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_AREAS.map((p) => {
            const Icon = ICONS[p.icon] ?? Scale;
            return (
              <article
                key={p.slug}
                className="premium-card group relative flex flex-col overflow-hidden p-6 sm:p-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-navy text-gold ring-1 ring-gold/40 shadow-soft transition-transform group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl text-navy-deep">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/75">{p.short}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 pt-1">
                  <Link
                    to="/practice-areas/$slug"
                    params={{ slug: p.slug }}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-navy-deep transition-colors hover:text-gold-deep"
                  >
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span className="h-3 w-px bg-border" />
                  <a
                    href={waLink(
                      undefined,
                      `Hello Machaya & Associates, I would like to request assistance with ${p.title}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-charcoal/75 hover:text-whatsapp"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Request assistance
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {heading && (
          <div className="mt-12 flex justify-center">
            <Button asChild variant="outlineGold" size="lg">
  <Link to="/practice-areas">
                Explore all practice areas
              </Link>
</Button>
          </div>
        )}
      </div>
    </section>
  );
}
