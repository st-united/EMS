import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { FiveMonthsChartProps } from "@/interfaces";

export const FiveMonthsChart = ({ chartData }: FiveMonthsChartProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-4 rounded-xl border border-[#1f2937] bg-[#0b0c10] p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">
          {t("pages.overview.chart.title")}
        </h2>
        <p className="text-sm text-[#9ca3af]">
          {t("pages.overview.chart.subtitle")}
        </p>
      </div>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData?.chartData || []}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            barSize={40}
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f2937"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#1f2937" }}
            />
            <YAxis
              yAxisId="left"
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickCount={5}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickCount={5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
              cursor={{ fill: "#1f2937", opacity: 0.4 }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => {
                const label =
                  value === "electricityConsumption"
                    ? t("pages.overview.chart.electricity")
                    : t("pages.overview.chart.water");
                return <span className="text-xs text-[#9ca3af]">{label}</span>;
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="electricityConsumption"
              fill="#13b8a6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="waterConsumption"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
