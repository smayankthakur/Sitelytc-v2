import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/fx/Counter";

type Stat = {
  label: string;
  static?: string;
  prefix?: string;
  value?: number;
  suffix?: string;
  lead?: boolean; // trionn-style leading-zero numeral
};

const stats: Stat[] = [
  { prefix: "€", value: 550, suffix: "k+", label: "Client revenue generated" },
  { value: 650, suffix: "%", lead: true, label: "Revenue growth (BabyDocShop)" },
  { value: 100, suffix: "+", label: "Projects delivered" },
  { static: "ISO 9001", label: "Certified quality management" },
];

export function OutcomeStats() {
  return (
    <section className="reveal relative overflow-hidden border-y border-white/10 bg-elevate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"
      />
      <Container className="relative py-20">
        <div className="flex justify-center">
          <p className="eyebrow">key facts</p>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="reveal reveal-scale text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
                {s.static ? (
                  s.static
                ) : (
                  <>
                    {s.lead ? <span className="lead-zero">0</span> : null}
                    <Counter value={s.value ?? 0} prefix={s.prefix} suffix={s.suffix} />
                  </>
                )}
              </dd>
              <p className="mt-3 text-sm font-medium text-ink-400">{s.label}</p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
