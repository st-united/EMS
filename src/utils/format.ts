export const formatCurrency = (value?: number | string | null) => {
  if (value === undefined || value === null) return "—";
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat("vi-VN").format(num);
};
