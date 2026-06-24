import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const posts = [
  {
    slug: "vapt-checklist-2026",
    title: "VAPT Checklist for Indian Startups in 2026",
    excerpt:
      "The 15-point VAPT checklist we run on every client site before launch — and why DPDPA 2023 makes it non-optional for Indian SaaS.",
    date: "Jun 20, 2026",
    readTime: "8 min read",
    tag: "Cybersecurity",
  },
  {
    slug: "next-js-sub-2s-loads",
    title: "How We Hit Sub-2-Second Loads on Every Build",
    excerpt:
      "The exact Next.js rendering, caching, and image strategy we use to keep LCP under 2.5s without sacrificing rich design.",
    date: "Jun 12, 2026",
    readTime: "6 min read",
    tag: "Performance",
  },
];

export function BlogPreview() {
  return (
    <Section className="bg-elevate">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="From the blog" title="Field notes" />
        <Link
          href="/blog"
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-300 sm:inline-flex"
        >
          All posts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group card-lift flex flex-col rounded-2xl border border-white/10 bg-surface p-7 hover:border-gold-500/30"
          >
            <span className="inline-flex w-fit rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-ink-300">
              {post.tag}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-white group-hover:text-gold-300">
              {post.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-300">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-ink-400">
              <span>{post.date}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
