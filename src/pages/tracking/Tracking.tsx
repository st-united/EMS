import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  useTodayOverviewStats,
  useDailyElectricityChart,
  useDailyWaterChart,
} from "@/hooks";
import { TrackingSummaryCards } from "./components/TrackingSummaryCards";
import { ConsumptionChart } from "./components/ConsumptionChart";

export const TrackingPage = () => {
  const { t } = useTranslation();
  const { id: locationId } = useParams<{ id: string }>();

  const { todayOverview, isLoading: isLoadingOverview } =
    useTodayOverviewStats(locationId);
  const { chartData: electricityChart, isLoading: isLoadingElectricity } =
    useDailyElectricityChart(locationId);
  const { chartData: waterChart, isLoading: isLoadingWater } =
    useDailyWaterChart(locationId);

  return (
    <div>
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          {t("pages.tracking.title")}
        </h1>
        <p className="text-zinc-400">{t("pages.tracking.subtitle.header")}</p>
      </div>

      <TrackingSummaryCards data={todayOverview} loading={isLoadingOverview} />

      <div className="grid grid-cols-1 gap-6">
        <ConsumptionChart
          title={t("pages.tracking.electricityChart.title")}
          subtitle={t("pages.tracking.electricityChart.subtitle")}
          data={electricityChart}
          loading={isLoadingElectricity}
          consumptionLabel={t("pages.tracking.electricityChart.consumption")}
          costLabel={t("pages.tracking.electricityChart.cost")}
          lineColor="#10b981"
          costLineColor="#f59e0b"
        />

        <ConsumptionChart
          title={t("pages.tracking.waterChart.title")}
          subtitle={t("pages.tracking.waterChart.subtitle")}
          data={waterChart}
          loading={isLoadingWater}
          consumptionLabel={t("pages.tracking.waterChart.consumption")}
          costLabel={t("pages.tracking.waterChart.cost")}
          lineColor="#3b82f6"
          costLineColor="#ec4899"
        />
      </div>
    </div>
  );
};
