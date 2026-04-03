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

import { ConsumptionType } from "@/constants";
import type { FiveMonthsChartProps } from "@/interfaces";
import { formatConsumption } from "@/utils/format";

export const FiveMonthsChart = ({ chartData }: FiveMonthsChartProps) => {
  const { t } = useTranslation();

  const chartData2 = chartData?.chartData ?? [];

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
            data={chartData2}
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
              tickFormatter={(v) => formatConsumption(v)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickCount={5}
              tickFormatter={(v) => formatConsumption(v)}
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
              formatter={(value, name) => {
                const key = String(name);
                const unit = key === ConsumptionType.ELECTRICITY ? "kWh" : "m³";
                const label =
                  key === ConsumptionType.ELECTRICITY
                    ? t("pages.overview.chart.electricity")
                    : t("pages.overview.chart.water");
                return [`${formatConsumption(value as number | string | undefined)} ${unit}`, label];
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => {
                const label =
                  value === ConsumptionType.ELECTRICITY
                    ? t("pages.overview.chart.electricity")
                    : t("pages.overview.chart.water");
                return <span className="text-xs text-[#9ca3af]">{label}</span>;
              }}
            />
            <Bar
              yAxisId="left"
              dataKey={ConsumptionType.ELECTRICITY}
              fill="#13b8a6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey={ConsumptionType.WATER}
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
