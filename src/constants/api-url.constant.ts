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
};
