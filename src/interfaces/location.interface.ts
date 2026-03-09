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
}

export interface LocationResponse {
  data: Location[];
  message: string;
}

export interface ResourceStats {
  today: number;
  yesterday: number;
  percentChange: number;
  sevenDayAverage: number;
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
