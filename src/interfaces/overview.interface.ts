import { ConsumptionType } from "@/constants";

export interface DailyChartsProps {
  stats: Record<ConsumptionType, number>;
  dailyChartData: {
    chartData: ({
      label: string;
    } & Record<ConsumptionType, number>)[];
    period: {
      from: string;
      to: string;
    };
    groupBy: string;
  };
}

export interface FiveMonthsChartProps {
  chartData: {
    chartData: ({
      label: string;
    } & Record<ConsumptionType, number>)[];
    period: {
      from: string;
      to: string;
    };
    groupBy: string;
  };
}

export interface StatsCardsProps {
  stats: Record<ConsumptionType, number> & {
    totalBill: number;
    savings: number;
  };
}
