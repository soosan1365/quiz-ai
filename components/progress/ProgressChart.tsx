"use client";

import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
} from "recharts";

type ChartData = {
attempt: string;
percentage: number;
};

type ProgressChartProps = {
data: ChartData[];
};
/**
 * Visualizes quiz scores over time.
 */
export default function ProgressChart({ data }: ProgressChartProps) {
return ( <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"> <h2 className="text-xl font-bold">Progress over time</h2>
  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
    Your percentage score for each attempt.
  </p>

  <div className="mt-5 h-52 w-full sm:h-56">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 12, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

        <XAxis
          dataKey="attempt"
          tick={{ fill: "#64748b", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          domain={[0, 100]}
          unit="%"
          tick={{ fill: "#64748b", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          formatter={(value) => [`${value}%`, "Score"]}
        />

        <Line
          type="monotone"
          dataKey="percentage"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 5, fill: "#2563eb" }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</section>

);
}
//  ه ProgressChart فقط data می‌دهیم. یعنی خودش کاری به تاریخچه ذخیره‌شده یا localStorage ندارد؛ فقط داده‌ها را دریافت می‌کند و نمودار را نمایش می‌دهد. این جداسازی، تست و نگهداری کد را ساده‌تر می‌کند.