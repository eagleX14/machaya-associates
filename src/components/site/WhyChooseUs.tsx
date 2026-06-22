import { HeartHandshake, Award, Compass, Phone, Target } from "lucide-react";

const POINTS = [
  {
    icon: HeartHandshake,
    title: "Client-centered approach",
    body: "We listen carefully, explain clearly, and build a strategy around your actual objectives.",
  },
  {
    icon: Award,
    title: "Professional excellence",
    body: "Disciplined preparation, ethical practice, and meticulous attention to detail on every matter.",
  },
  {
    icon: Compass,
    title: "Strategic & practical",
    body: "Solutions that work in the real world — commercially sound, legally rigorous, and actionable.",
  },
  {
    icon: Phone,
    title: "Responsive & accessible",
    body: "Direct access to your legal practitioner through phone, WhatsApp, email, and office visits.",
  },
  {
    icon: Target,
    title: "Results-driven",
    body: "We focus on outcomes that protect and advance our clients' interests at every stage.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-navy py-20 text-ivory md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 30%, transparent), transparent 65%)" }}
      />
      <div className="container-prose relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-gold">Why clients choose us</div>
          <h2 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
            A firm built on <span className="gold-text">trust</span> and results
          </h2>
          <span className="gold-divider mx-auto mt-6" />
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="group relative flex flex-col rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-gold/40 hover:bg-ivory/[0.07]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-navy-deep shadow-gold ring-1 ring-gold-deep/30">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-lg text-ivory">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/70">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
