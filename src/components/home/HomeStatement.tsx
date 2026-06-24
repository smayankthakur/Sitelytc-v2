import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/fx/SplitText";

export function HomeStatement() {
  return (
    <Section>
      <p className="eyebrow">about</p>
      <h2 className="font-display mt-6 max-w-5xl text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
        <SplitText text="We engineer digital that lasts — clarity first, craft always, secure by default, and built to scale." />
      </h2>
      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-xl text-lg leading-relaxed text-ink-300">
          One studio for websites, AI automation, and security — so your product,
          your operations, and your defences are engineered to the same standard.
        </p>
        <Link
          href="/about"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-300"
        >
          more about us
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
