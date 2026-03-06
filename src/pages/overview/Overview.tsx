import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { StatsCards, FiveMonthsChart, DailyCharts } from "./components";
import {
  useCurrentMonthStats,
  use5MonthsChart,
  useCurrentMonthDailyChart,
} from "@/hooks/useLocation";

export const OverviewPage = () => {
  const { t } = useTranslation();
  const { id: locationId } = useParams<{ id: string }>();
  const { stats, isLoading, isError } = useCurrentMonthStats(locationId);
  const {
    chartData,
    isLoading: isChartLoading,
    isError: isChartError,
  } = use5MonthsChart(locationId);
  const {
    chartData: dailyChartData,
    isLoading: isDailyChartLoading,
    isError: isDailyChartError,
  } = useCurrentMonthDailyChart(locationId);

  if (isLoading || isChartLoading || isDailyChartLoading) {
    return (
      <div className="flex h-full items-center justify-center pt-20">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">
          {t("pages.overview.title", "Tổng quan")}
        </h1>
        <div className="text-white">{t("pages.overview.error")}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <StatsCards stats={stats} />
      {!isChartError && chartData && <FiveMonthsChart chartData={chartData} />}
      {!isDailyChartError && dailyChartData && (
        <DailyCharts stats={stats} dailyChartData={dailyChartData} />
      )}
    </div>
  );
};
