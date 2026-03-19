export const QueryKeys = {
  USER_LOCATIONS: "userLocations",
  CURRENT_MONTH_STATS: "currentMonthStats",
  FIVE_MONTHS_CHART: "5MonthsChart",
  CURRENT_MONTH_DAILY_CHART: "currentMonthDailyChart",
  USER_PROFILE: "userProfile",
  PROFILE_STATS: "profileStats",
  ME_LOCATIONS: "meLocations",
  INVOICE_STATS: "invoiceStats",
  INVOICES_LIST: "invoicesList",
  LOCATION_STATS: "locationStats",
  LOCATION_DETAIL: "locationDetail",
  BANK_ACCOUNT: "bankAccount",
} as const;

export type QueryKeys = (typeof QueryKeys)[keyof typeof QueryKeys];
