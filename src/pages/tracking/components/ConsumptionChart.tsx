import { useTranslation } from "react-i18next";
import { type FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import type { ConsumptionChartProps } from "@/interfaces";

export const ConsumptionChart: FC<ConsumptionChartProps> = ({
  title,
  subtitle,
  data,
  loading,
  consumptionLabel,
  costLabel,
  lineColor,
  costLineColor,
}) => {
  const { t } = useTranslation();

  if (loading || !data) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 h-100 animate-pulse mb-6">
        <div className="h-6 w-48 bg-zinc-800 rounded mb-2"></div>
        <div className="h-4 w-64 bg-zinc-800 rounded mb-8"></div>
        <div className="h-70 w-full bg-zinc-900/50 rounded"></div>
      </div>
    );
  }

  const chartData = data.chartData;

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6">
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-zinc-400 text-sm">{subtitle}</p>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: data.unit,
                angle: -90,
                position: "insideLeft",
                offset: -10,
                style: { fill: "#71717a", fontSize: 10 },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: t("common.currency"),
                angle: 90,
                position: "insideRight",
                offset: -10,
                style: { fill: "#71717a", fontSize: 10 },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#09090b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                color: "#fff",
              }}
              itemStyle={{ fontSize: "12px" }}
              labelStyle={{ color: "#71717a", marginBottom: "4px" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span style={{ color: "#71717a", fontSize: "12px" }}>
                  {value}
                </span>
              )}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="consumption"
              name={consumptionLabel}
              stroke={lineColor}
              strokeWidth={3}
              dot={{ r: 4, fill: lineColor, strokeWidth: 2, stroke: "#09090b" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cost"
              name={costLabel}
              stroke={costLineColor}
              strokeWidth={3}
              dot={{
                r: 4,
                fill: costLineColor,
                strokeWidth: 2,
                stroke: "#09090b",
              }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
