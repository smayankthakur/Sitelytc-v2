import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes on web performance, cybersecurity, and AI automation from the Sitelytc team.",
  alternates: { canonical: "/blog" },
};

// ISR per page spec.
export const revalidate = 300;

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="reveal border-b border-white/10 bg-elevate">
        <Container className="py-16 sm:py-20">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Field notes
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-300">
            Practical writing on performance, security, and automation — the
            same thinking we apply to client work.
          </p>
        </Container>
      </section>

      <section className="reveal py-16 sm:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-ink-300">No posts yet — check back soon.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  {post.tags[0] ? (
                    <span className="inline-flex w-fit rounded-full bg-gold-500/10 px-3 py-1 text-xs font-semibold capitalize text-gold-300">
                      {post.tags[0]}
                    </span>
                  ) : null}
                  <h2 className="mt-4 text-xl font-semibold text-white group-hover:text-gold-300">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-300">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-xs text-ink-400">
                    <span>{formatDate(post.date)}</span>
                    <span aria-hidden>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
