export interface LocationDevice {
  id: string;
  device: {
    id: string;
    name: string;
  };
}

export interface LocationType {
  id: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
  locationType: LocationType;
  locationDevices: LocationDevice[];
  workspace: {
    id: string;
  };
}

export interface LocationResponse {
  data: Location[];
  message: string;
}

export interface ResourceStats {
  today: number;
  todayFormatted?: string;
  yesterday: number;
  yesterdayFormatted?: string;
  percentChange: number;
  percentChangeFormatted?: string;
  sevenDayAverage: number;
  sevenDayAverageFormatted?: string;
  unit: string;
}

export interface TodayOverviewData {
  electricity: ResourceStats;
  water: ResourceStats;
}

export interface TodayOverviewResponse {
  data: TodayOverviewData;
  message: string;
}

export interface ChartDataItem {
  label: string;
  consumption: number;
  cost: number;
}

export interface ChartData {
  chartData: ChartDataItem[];
  unit: string;
}

export interface ChartResponse {
  data: ChartData;
  message: string;
}
