export const ConsumptionType = {
  ELECTRICITY: "electricityConsumption",
  WATER: "waterConsumption",
} as const;

export type ConsumptionType =
  (typeof ConsumptionType)[keyof typeof ConsumptionType];
