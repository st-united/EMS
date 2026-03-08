import { useTranslation } from "react-i18next";

import type { ProfileStatsProps } from "@/interfaces";

export const ProfileStats = ({ stats, isLoading }: ProfileStatsProps) => {
  const { t } = useTranslation();

  const formatCurrency = (value: number) => {
    return (value / 1000000).toFixed(1) + "M VNĐ";
  };

  return (
    <div className="rounded-2xl border border-[#1f2937] bg-[#0b0c10] p-6 shadow-sm">
      <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
        {t("pages.profile.stats.title")}
      </h2>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-[#9ca3af] mb-1">
            {t("pages.profile.stats.totalInvoices")}
          </p>
          <p className="text-3xl font-bold text-white tabular-nums">
            {isLoading ? "…" : stats?.totalInvoices || 0}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-[#9ca3af] mb-1">
            {t("pages.profile.stats.paid")}
          </p>
          <p className="text-3xl font-bold text-[#10b981] tabular-nums">
            {isLoading ? "…" : stats?.paidInvoices || 0}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-[#9ca3af] mb-1">
            {t("pages.profile.stats.unpaid")}
          </p>
          <p className="text-3xl font-bold text-[#f59e0b] tabular-nums">
            {isLoading ? "…" : stats?.unpaidInvoices || 0}
          </p>
        </div>

        <div className="pt-6 border-t border-[#1f2937]">
          <p className="text-sm font-medium text-[#9ca3af] mb-1">
            {t("pages.profile.stats.totalSpending")}
          </p>
          <p className="text-3xl font-bold text-white tabular-nums">
            {isLoading
              ? "…"
              : formatCurrency(stats?.totalSpendingThisYear || 0)}
          </p>
        </div>
      </div>
    </div>
  );
};
