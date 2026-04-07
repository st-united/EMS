import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";

import { formatConsumption, formatVnd } from "@/utils/format";

export interface ElectricityTier {
  tierName: string;
  consumption: number;
  unitPrice: number;
  amount: number;
  color: string;
}

export interface ElectricityTierCardsProps {
  tiers?: ElectricityTier[];
  pricingModel?: string;
  loading: boolean;
}

const getTierColor = (tier: ElectricityTier, index: number): string => {
  if (tier.color) return tier.color;
  const fallback = ["#f59e0b", "#10b981", "#ef4444"];
  return fallback[index % fallback.length];
};

export const ElectricityTierCards: FC<ElectricityTierCardsProps> = ({
  tiers,
  pricingModel,
  loading,
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-5 w-5 bg-zinc-800 rounded animate-pulse" />
          <div className="h-5 w-64 bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="h-4 w-32 bg-zinc-800 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-xl h-40 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!tiers || tiers.length === 0) return null;

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <Clock className="w-5 h-5 text-zinc-400" />
        <h3 className="text-lg font-bold text-white">
          {t("pages.tracking.tierDetail.title")}
        </h3>
      </div>
      {pricingModel && (
        <p className="text-zinc-500 text-sm mb-6 ml-8">{pricingModel}</p>
      )}

      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier, index) => {
          const color = getTierColor(tier, index);

          return (
            <div
              key={index}
              className="relative bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 group"
              style={{ borderLeftColor: color, borderLeftWidth: "3px" }}
            >
              {/* Subtle gradient glow at top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, ${color}, transparent)`,
                }}
              />

              {/* Tier Name */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-semibold text-zinc-200">
                  {tier.tierName}
                </span>
              </div>

              {/* Consumption */}
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-zinc-500 text-sm">
                  {t("pages.tracking.tierDetail.consumption")}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">
                    {formatConsumption(tier.consumption)}
                  </span>
                  <span className="text-zinc-500 text-xs italic">kWh</span>
                </div>
              </div>

              {/* Unit Price */}
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-zinc-500 text-sm">
                  {t("pages.tracking.tierDetail.unitPrice")}
                </span>
                <span className="text-sm text-zinc-300">
                  {formatVnd(tier.unitPrice)}
                </span>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800/60">
                <span className="text-zinc-500 text-sm">
                  {t("pages.tracking.tierDetail.amount")}
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color }}
                >
                  {formatVnd(tier.amount)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
