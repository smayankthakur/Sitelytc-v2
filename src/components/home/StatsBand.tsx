import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/fx/Counter";

export type BandStat = {
  label: string;
  static?: string;
  prefix?: string;
  value?: number;
  suffix?: string;
};

export function StatsBand({
  stats,
  eyebrow = "by the numbers",
  title,
}: {
  stats: BandStat[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="reveal relative overflow-hidden border-y border-white/10 bg-ink-950 py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,190,82,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(239,190,82,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
        }}
      />
      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow">{eyebrow}</p>
          {title ? (
            <h2 className="font-display mt-3 max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
          ) : null}
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="reveal reveal-scale text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
                {s.static ? (
                  s.static
                ) : (
                  <Counter value={s.value ?? 0} prefix={s.prefix} suffix={s.suffix} />
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
