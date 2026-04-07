export const API_URL = {
  USERS: (workspaceId: string) => `/users/${workspaceId}/all`,
  CREATE_USER: (workspaceId: string) => `/users/${workspaceId}`,
  UPDATE_USER: (workspaceId: string, userId: string) =>
    `/users/${workspaceId}/${userId}`,
  GET_USER: (userId: string) => `/users/${userId}`,
  ASSIGN_PERMISSION: "/users/assign-permission",
  LOGIN: "/auth/login",
  REFRESH_TOKEN: "/auth/refresh",
  ACTIVATE_ACCOUNT: "/auth/activate",
  GET_PROFILE: "/users/me",
  GET_PROFILE_STATS: "/users/me/stats",
  GET_ME_LOCATIONS: "/users/me/locations",
  UPDATE_PROFILE: "/users/profile",
  UPLOAD_AVATAR: "/users/avatar",
  REMOVE_AVATAR: "/users/avatar",
  CHANGE_PASSWORD: "/users/change-password",
  RESET_PASSWORD: "users/reset-password",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  LOGOUT: "/auth/logout",
  GET_USER_LOCATIONS: (userId: string) => `/locations/user/${userId}/locations`,
  GET_CURRENT_MONTH_STATS: (locationId: string) =>
    `/locations/${locationId}/current-month-stats`,
  GET_5_MONTHS_CHART: (locationId: string) =>
    `/locations/${locationId}/consumption/5-months-chart`,
  GET_CURRENT_MONTH_DAILY_CHART: (locationId: string) =>
    `/locations/${locationId}/consumption/current-month-daily-chart`,
  GET_INVOICE_STATS: (locationId: string) =>
    `/locations/${locationId}/invoices/summary-stats`,
  GET_INVOICES: (locationId: string) => `/locations/${locationId}/invoices`,
  GET_ELECTRICITY_INVOICE_DETAIL: (invoiceId: string) =>
    `/invoices/detail/${invoiceId}`,
  GET_WATER_INVOICE_DETAIL: (invoiceId: string) =>
    `/water-invoices/detail/${invoiceId}`,
  GET_ELECTRICITY_INVOICE_PDF: (invoiceId: string) => `/invoices/${invoiceId}/pdf`,
  GET_WATER_INVOICE_PDF: (invoiceId: string) => `/water-invoices/${invoiceId}/pdf`,
  CREATE_ELECTRICITY_INVOICE_PAYMENT_LINK: (invoiceId: string) =>
    `/invoices/${invoiceId}/payment-link`,
  CREATE_WATER_INVOICE_PAYMENT_LINK: (invoiceId: string) =>
    `/water-invoices/${invoiceId}/payment-link`,
  GET_TODAY_OVERVIEW_STATS: (locationId: string) =>
    `/locations/${locationId}/statistics/today-overview`,
  GET_DAILY_ELECTRICITY_CHART: (locationId: string) =>
    `/locations/${locationId}/statistics/daily-electricity-chart`,
  GET_DAILY_WATER_CHART: (locationId: string) =>
    `/locations/${locationId}/statistics/daily-water-chart`,
  GET_ELECTRICITY_TIER_DETAIL: (locationId: string) =>
    `/locations/${locationId}/statistics/electricity-tier-detail`,
  GET_LOCATION_DETAIL: (locationId: string) => `/locations/${locationId}`,
  GET_BANK_ACCOUNT: (workspaceId: string) =>
    `/workspaces/${workspaceId}/bank-account`,
};
