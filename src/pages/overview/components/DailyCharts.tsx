import { useTranslation } from "react-i18next";
import { Zap, Droplet } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { DailyChartsProps } from "@/interfaces";

export const DailyCharts = ({ stats, dailyChartData }: DailyChartsProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-[#1f2937] bg-[#0b0c10] p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              {t("pages.overview.dailyChart.electricityTitle")}
            </h2>
            <p className="text-sm text-[#9ca3af]">
              {t("pages.overview.dailyChart.electricitySubtitle")}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-[#13b8a6]/20 px-3 py-1.5 text-sm font-medium text-[#13b8a6]">
            <Zap className="h-4 w-4" />
            {stats.electricityConsumption} kWh
          </div>
        </div>
        <div className="h-64 min-h-[256px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyChartData?.chartData || []}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1f2937"
                vertical={true}
                horizontal={true}
              />
              <XAxis
                dataKey="label"
                stroke="#9ca3af"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#1f2937" }}
                tickFormatter={(value) => value.replace("Ngày ", "")}
              />
              <YAxis
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
                cursor={{ stroke: "#1f2937", strokeWidth: 1 }}
                labelFormatter={(value) => value}
              />
              <Line
                type="monotone"
                dataKey="electricityConsumption"
                stroke="#13b8a6"
                strokeWidth={2}
                dot={{ fill: "#13b8a6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#13b8a6" }}
                name={t("pages.overview.chart.electricity")}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-[#1f2937] bg-[#0b0c10] p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              {t("pages.overview.dailyChart.waterTitle")}
            </h2>
            <p className="text-sm text-[#9ca3af]">
              {t("pages.overview.dailyChart.waterSubtitle")}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-[#3b82f6]/20 px-3 py-1.5 text-sm font-medium text-[#3b82f6]">
            <Droplet className="h-4 w-4" />
            {stats.waterConsumption} m³
          </div>
        </div>
        <div className="h-64 min-h-[256px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyChartData?.chartData || []}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1f2937"
                vertical={true}
                horizontal={true}
              />
              <XAxis
                dataKey="label"
                stroke="#9ca3af"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#1f2937" }}
                tickFormatter={(value) => value.replace("Ngày ", "")}
              />
              <YAxis
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
                cursor={{ stroke: "#1f2937", strokeWidth: 1 }}
                labelFormatter={(value) => value}
              />
              <Line
                type="monotone"
                dataKey="waterConsumption"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#3b82f6" }}
                name={t("pages.overview.chart.water")}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
