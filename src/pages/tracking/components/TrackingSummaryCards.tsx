import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Zap, Droplets, Calendar } from "lucide-react";

import type { TrackingSummaryCardsProps } from "@/interfaces";

export const TrackingSummaryCards: FC<TrackingSummaryCardsProps> = ({
  data,
  loading,
}) => {
  const { t } = useTranslation();

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-32 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const { electricity, water } = data;

  const cards = [
    {
      title: t("pages.tracking.electricityToday"),
      value: `${electricity.today} ${electricity.unit}`,
      comparison: `${t("pages.tracking.vsYesterday")} ${electricity.yesterday} ${electricity.unit}`,
      percent: electricity.percentChange,
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      iconBg: "bg-emerald-500/10",
    },
    {
      title: t("pages.tracking.waterToday"),
      value: `${water.today} ${water.unit}`,
      comparison: `${t("pages.tracking.vsYesterday")} ${water.yesterday} ${water.unit}`,
      percent: water.percentChange,
      icon: <Droplets className="w-6 h-6 text-blue-400" />,
      iconBg: "bg-blue-500/10",
    },
    {
      title: t("pages.tracking.averageElectricity"),
      value: `${electricity.sevenDayAverage} ${electricity.unit}`,
      comparison: t("pages.tracking.last7Days"),
      icon: <Calendar className="w-6 h-6 text-purple-400" />,
      iconBg: "bg-purple-500/10",
    },
    {
      title: t("pages.tracking.averageWater"),
      value: `${water.sevenDayAverage} ${water.unit}`,
      comparison: t("pages.tracking.last7Days"),
      icon: <Calendar className="w-6 h-6 text-cyan-400" />,
      iconBg: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`${card.iconBg} p-3 rounded-xl`}>{card.icon}</div>
            {card.percent !== undefined && (
              <div
                className={`flex items-center text-sm font-medium ${
                  card.percent >= 0 ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {card.percent >= 0 ? "+" : ""}
                {card.percent}%
              </div>
            )}
          </div>
          <div>
            <p className="text-zinc-400 text-sm mb-1">{card.title}</p>
            <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
            <p className="text-zinc-500 text-xs">{card.comparison}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
