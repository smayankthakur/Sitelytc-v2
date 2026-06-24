"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const revenue = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 18 },
  { month: "Mar", value: 27 },
  { month: "Apr", value: 41 },
  { month: "May", value: 63 },
  { month: "Jun", value: 90 },
];

export function FeaturedCaseStudy() {
  return (
    <Section className="bg-elevate">
      <SectionHeading
        eyebrow="Featured case study"
        title="BabyDocShop — 650% revenue growth in 6 months"
        lede="A rebuild that turned a slow, leaky storefront into a fast, secure conversion machine."
      />

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        {/* Story */}
        <div>
          <div className="space-y-5 text-ink-200">
            <p>
              <span className="font-semibold text-white">The problem.</span>{" "}
              A 4-second load time, no structured checkout, and zero security
              hardening were bleeding sales on every visit.
            </p>
            <p>
              <span className="font-semibold text-white">What we did.</span>{" "}
              Rebuilt on Next.js with sub-2s loads, a streamlined checkout,
              Razorpay + Stripe payments, and a full VAPT pass before launch.
            </p>
            <p>
              <span className="font-semibold text-white">The result.</span> 3
              clients. 6 months. 650% revenue growth and a measurably faster,
              safer store.
            </p>
          </div>

          <figure className="mt-8 border-l-2 border-gold-500 pl-5">
            <blockquote className="text-pretty text-base italic text-ink-100">
              “Sitelytc didn’t just redesign our site — they re-engineered how
              the business runs. The numbers speak for themselves.”
            </blockquote>
            <figcaption className="mt-3 text-sm text-ink-400">
              <span className="font-semibold text-white">Priya Nair</span> ·
              Founder, BabyDocShop
            </figcaption>
          </figure>

          <a
            href="https://babydocshop.sitelytc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-300"
          >
            Read the full case study
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Revenue chart card (device-mockup styled) */}
        <div className="card-lift rounded-2xl border border-white/10 bg-surface p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">
              Monthly revenue index
            </p>
            <span className="rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-400">
              ▲ 650%
            </span>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ stroke: "#3a3f4f" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "#11131d",
                    color: "#eef0f7",
                    fontSize: 13,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fill="url(#rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Section>
  );
}
