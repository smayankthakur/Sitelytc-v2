import { Container } from "@/components/ui/Container";

const items = [
  "ISO 9001",
  "OWASP-aligned",
  "DPDPA 2023 ready",
  "GDPR aligned",
  "CVSS-scored",
];

export function Recognition() {
  return (
    <section className="reveal border-y border-white/10 bg-surface py-14">
      <Container>
        <div className="flex justify-center">
          <p className="eyebrow">recognition &amp; standards</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {items.map((i) => (
            <span key={i} className="font-display text-lg font-semibold text-ink-300">
              {i}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
