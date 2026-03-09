import axios from "axios";

import { API_URL } from "@/constants";

export const getUserLocationsApi = (userId: string) =>
  axios.get(API_URL.GET_USER_LOCATIONS(userId));

export const getCurrentMonthStatsApi = (locationId: string) =>
  axios.get(API_URL.GET_CURRENT_MONTH_STATS(locationId));

export const getTodayOverviewStatsApi = (locationId: string) =>
  axios.get(API_URL.GET_TODAY_OVERVIEW_STATS(locationId));

export const getDailyElectricityChartApi = (locationId: string) =>
  axios.get(API_URL.GET_DAILY_ELECTRICITY_CHART(locationId));

export const getDailyWaterChartApi = (locationId: string) =>
  axios.get(API_URL.GET_DAILY_WATER_CHART(locationId));
