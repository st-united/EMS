export interface DailyChartsProps {
  stats: {
    electricityConsumption: number;
    waterConsumption: number;
  };
  dailyChartData: {
    chartData: {
      label: string;
      electricityConsumption: number;
      waterConsumption: number;
    }[];
    period: {
      from: string;
      to: string;
    };
    groupBy: string;
  };
}

export interface FiveMonthsChartProps {
  chartData: {
    chartData: {
      label: string;
      electricityConsumption: number;
      waterConsumption: number;
    }[];
    period: {
      from: string;
      to: string;
    };
    groupBy: string;
  };
}
