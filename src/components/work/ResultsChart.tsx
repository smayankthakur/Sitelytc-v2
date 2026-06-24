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

export function ResultsChart({
  label,
  data,
}: {
  label: string;
  data: { name: string; value: number }[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-6 shadow-sm">
      <p className="text-sm font-semibold text-white">{label}</p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="results" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="name"
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
              fill="url(#results)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
