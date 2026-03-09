import type { ChartData, TodayOverviewData } from "./location.interface";

export interface TrackingSummaryCardsProps {
  data?: TodayOverviewData;
  loading: boolean;
}

export interface ConsumptionChartProps {
  title: string;
  subtitle: string;
  data?: ChartData;
  loading: boolean;
  consumptionLabel: string;
  costLabel: string;
  lineColor: string;
  costLineColor: string;
}
