import { useTranslation } from "react-i18next";
import { Zap, Droplet, DollarSign, TrendingDown } from "lucide-react";

import { ConsumptionType } from "@/constants";
import type { StatsCardsProps } from "@/interfaces";

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const { t } = useTranslation();

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M VNĐ`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K VNĐ`;
    }
    return `${value} VNĐ`;
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-[#1f2937] bg-[#0b0c10] p-5 pb-6 pt-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm text-[#9ca3af]">
            {t("pages.overview.electricity")}
          </div>
          <div className="rounded-lg bg-[#13b8a6] p-2.5">
            <Zap className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="mb-2 text-2xl font-bold text-white">
          {stats[ConsumptionType.ELECTRICITY]} kWh
        </div>
        <div className="text-xs text-[#10b981]">
          +0% {t("pages.overview.comparedToLastMonth")}
        </div>
      </div>

      <div className="flex flex-col rounded-xl border border-[#1f2937] bg-[#0b0c10] p-5 pb-6 pt-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm text-[#9ca3af]">
            {t("pages.overview.water")}
          </div>
          <div className="rounded-lg bg-[#3b82f6] p-2.5">
            <Droplet className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="mb-2 text-2xl font-bold text-white">
          {stats[ConsumptionType.WATER]} m³
        </div>
        <div className="text-xs text-[#10b981]">
          +0% {t("pages.overview.comparedToLastMonth")}
        </div>
      </div>

      <div className="flex flex-col rounded-xl border border-[#1f2937] bg-[#0b0c10] p-5 pb-6 pt-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm text-[#9ca3af]">
            {t("pages.overview.totalBill")}
          </div>
          <div className="rounded-lg bg-[#8b5cf6] p-2.5">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="mb-2 text-2xl font-bold text-white">
          {formatCurrency(stats.totalBill)}
        </div>
        <div className="text-xs text-[#10b981]">
          -0% {t("pages.overview.comparedToLastMonth")}
        </div>
      </div>

      <div className="flex flex-col rounded-xl border border-[#1f2937] bg-[#0b0c10] p-5 pb-6 pt-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm text-[#9ca3af]">
            {t("pages.overview.savings")}
          </div>
          <div className="rounded-lg bg-[#10b981] p-2.5">
            <TrendingDown className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="mb-2 text-2xl font-bold text-white">
          {formatCurrency(stats.savings)}
        </div>
        <div className="text-xs text-[#10b981]">
          0% {t("pages.overview.consumptionReduction")}
        </div>
      </div>
    </div>
  );
};
