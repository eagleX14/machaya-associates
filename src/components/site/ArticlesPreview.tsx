import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mailto } from "@/lib/firm";

export function ArticlesPreview() {
  return (
    <section className="bg-ivory py-20 md:py-24">
      <div className="container-prose">
        <div className="grid gap-10 rounded-2xl border border-border bg-card p-8 shadow-soft md:grid-cols-12 md:p-10">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold">
              <BookOpen className="h-4 w-4" />
              Legal insights
            </div>
            <h2 className="mt-4 font-serif text-3xl text-navy-deep sm:text-4xl">
              Articles and legal updates coming soon
            </h2>
            <span className="gold-divider mt-5" />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-charcoal/80">
              The firm may publish legal articles, updates, and guidance from time to time.
              This section is ready for future content when articles are supplied.
            </p>
          </div>

          <div className="flex items-center md:col-span-4 md:justify-end">
            <Button asChild variant="outlineGold" size="lg">
              <a href={mailto(undefined, "Article Submission / Website Update")}>
                Send article content
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
