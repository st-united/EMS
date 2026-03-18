import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { API_URL, ACCESS_TOKEN, QueryKeys } from "@/constants";
import { getStorageData } from "@/configs/storages";
import { type Location } from "@/interfaces";
import {
  getTodayOverviewStatsApi,
  getDailyElectricityChartApi,
  getDailyWaterChartApi,
} from "@/services";

const getUserLocationsApi = (userId: string) =>
  axios.get(API_URL.GET_USER_LOCATIONS(userId));

const getUserIdFromToken = (): string | null => {
  try {
    const token = getStorageData(ACCESS_TOKEN);
    if (!token) return null;

    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.sub || decoded.id || null;
  } catch {
    return null;
  }
};

export const useUserLocations = () => {
  const userId = getUserIdFromToken();

  const locationsQuery = useQuery<Location[]>({
    queryKey: [QueryKeys.USER_LOCATIONS, userId],
    queryFn: async () => {
      const { data } = await getUserLocationsApi(userId!);
      return data.data;
    },
    enabled: !!userId,
  });

  return {
    locations: locationsQuery.data ?? [],
    isLoading: locationsQuery.isLoading,
    isError: locationsQuery.isError,
  };
};

export const useCurrentMonthStats = (locationId?: string) => {
  const statsQuery = useQuery({
    queryKey: [QueryKeys.CURRENT_MONTH_STATS, locationId],
    queryFn: async () => {
      if (!locationId) throw new Error("Location ID is required");
      const { data } = await axios.get(
        API_URL.GET_CURRENT_MONTH_STATS(locationId),
      );
      const stats = data.data as {
        electricityConsumption?: number;
        waterConsumption?: number;
        totalBill?: number;
        savings?: number;
        currentMonth?: string;
      };

      // Backend is documented as kWh/m³ but some deployments return Wh/L.
      // Heuristic: for monthly totals, values in the tens of thousands are likely base units.
      const electricityConsumption =
        typeof stats.electricityConsumption === "number" &&
        stats.electricityConsumption >= 10_000
          ? stats.electricityConsumption / 1000
          : (stats.electricityConsumption ?? 0);

      const waterConsumption =
        typeof stats.waterConsumption === "number" && stats.waterConsumption >= 10_000
          ? stats.waterConsumption / 1000
          : (stats.waterConsumption ?? 0);

      return {
        ...stats,
        electricityConsumption,
        waterConsumption,
      };
    },
    enabled: !!locationId,
  });

  return {
    stats: statsQuery.data,
    isLoading: statsQuery.isLoading,
    isError: statsQuery.isError,
  };
};

export const use5MonthsChart = (locationId?: string) => {
  const chartQuery = useQuery({
    queryKey: [QueryKeys.FIVE_MONTHS_CHART, locationId],
    queryFn: async () => {
      if (!locationId) throw new Error("Location ID is required");
      const { data } = await axios.get(API_URL.GET_5_MONTHS_CHART(locationId));
      return data.data;
    },
    enabled: !!locationId,
  });

  return {
    chartData: chartQuery.data,
    isLoading: chartQuery.isLoading,
    isError: chartQuery.isError,
  };
};

export const useCurrentMonthDailyChart = (locationId?: string) => {
  const chartQuery = useQuery({
    queryKey: [QueryKeys.CURRENT_MONTH_DAILY_CHART, locationId],
    queryFn: async () => {
      if (!locationId) throw new Error("Location ID is required");
      const { data } = await axios.get(
        API_URL.GET_CURRENT_MONTH_DAILY_CHART(locationId),
      );
      return data.data;
    },
    enabled: !!locationId,
  });

  return {
    chartData: chartQuery.data,
    isLoading: chartQuery.isLoading,
    isError: chartQuery.isError,
  };
};

export const useTodayOverviewStats = (locationId?: string) => {
  const statsQuery = useQuery({
    queryKey: [QueryKeys.LOCATION_STATS, locationId, "today-overview"],
    queryFn: async () => {
      if (!locationId) throw new Error("Location ID is required");
      const { data } = await getTodayOverviewStatsApi(locationId);
      return data.data;
    },
    enabled: !!locationId,
  });

  return {
    todayOverview: statsQuery.data,
    isLoading: statsQuery.isLoading,
    isError: statsQuery.isError,
  };
};

export const useDailyElectricityChart = (locationId?: string) => {
  const chartQuery = useQuery({
    queryKey: [QueryKeys.LOCATION_STATS, locationId, "electricity-chart"],
    queryFn: async () => {
      if (!locationId) throw new Error("Location ID is required");
      const { data } = await getDailyElectricityChartApi(locationId);
      return data.data;
    },
    enabled: !!locationId,
  });

  return {
    chartData: chartQuery.data,
    isLoading: chartQuery.isLoading,
    isError: chartQuery.isError,
  };
};

export const useDailyWaterChart = (locationId?: string) => {
  const chartQuery = useQuery({
    queryKey: [QueryKeys.LOCATION_STATS, locationId, "water-chart"],
    queryFn: async () => {
      if (!locationId) throw new Error("Location ID is required");
      const { data } = await getDailyWaterChartApi(locationId);
      return data.data;
    },
    enabled: !!locationId,
  });

  return {
    chartData: chartQuery.data,
    isLoading: chartQuery.isLoading,
    isError: chartQuery.isError,
  };
};
