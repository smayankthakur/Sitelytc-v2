import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  author: string;
  tags: string[];
  readTime: string;
};

export type Post = PostMeta & { content: string };

function readDir(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
}

function toMeta(file: string): PostMeta {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    author: String(data.author ?? "Sitelytc"),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    readTime: String(data.readTime ?? "5 min read"),
  };
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return readDir()
    .map(toMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { content } = matter(raw);
  return { ...toMeta(`${slug}.mdx`), content };
}

export function getAllSlugs(): string[] {
  return readDir().map((f) => f.replace(/\.mdx$/, ""));
}
