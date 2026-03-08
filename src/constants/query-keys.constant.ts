export const QueryKeys = {
  USER_LOCATIONS: "userLocations",
  CURRENT_MONTH_STATS: "currentMonthStats",
  FIVE_MONTHS_CHART: "5MonthsChart",
  CURRENT_MONTH_DAILY_CHART: "currentMonthDailyChart",
  USER_PROFILE: "userProfile",
  INVOICE_STATS: "invoiceStats",
  INVOICES_LIST: "invoicesList",
} as const;

export type QueryKeys = (typeof QueryKeys)[keyof typeof QueryKeys];
