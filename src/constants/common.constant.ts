export const ConsumptionType = {
  ELECTRICITY: "electricityConsumption",
  WATER: "waterConsumption",
} as const;

export type ConsumptionType =
  (typeof ConsumptionType)[keyof typeof ConsumptionType];

export const InvoiceStatus = {
  PENDING: "PENDING",
  UNPAID: "UNPAID",
  PAID: "PAID",
  CANCELLED: "CANCELLED",
} as const;

export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];

export const InvoiceTypeEnum = {
  ELECTRICITY_VI: "điện",
  ELECTRICITY_EN: "electricity",
  WATER_VI: "nước",
  WATER_EN: "water",
} as const;

export type InvoiceTypeEnum =
  (typeof InvoiceTypeEnum)[keyof typeof InvoiceTypeEnum];
