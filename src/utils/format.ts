const parseNumberLike = (value: number | string) => {
  if (typeof value === "number") return value;
  // Try plain parse first (works for "27072.56", "1000", etc.)
  const direct = Number(value);
  if (Number.isFinite(direct)) return direct;

  const s = String(value).trim();

  // Handle vi-VN style "27.072,56" or "27072,56"
  // - thousands separator: "."
  // - decimal separator: ","
  if (s.includes(",") && (!s.includes(".") || s.lastIndexOf(",") > s.lastIndexOf("."))) {
    const normalized = s.replace(/\./g, "").replace(",", ".");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : NaN;
  }

  // Handle en-US style "27,072.56"
  // - thousands separator: ","
  // - decimal separator: "."
  if (s.includes(",") && s.includes(".")) {
    const normalized = s.replace(/,/g, "");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : NaN;
  }

  // Handle "27,072" (comma thousands, no decimals)
  if (s.includes(",") && !s.includes(".")) {
    const normalized = s.replace(/,/g, "");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : NaN;
  }

  return NaN;
};

export const formatNumber = (
  value?: number | string | null,
  opts: Intl.NumberFormatOptions = { maximumFractionDigits: 2 },
) => {
  if (value === undefined || value === null) return "—";
  const num = parseNumberLike(
    typeof value === "string" || typeof value === "number" ? value : String(value),
  );
  if (!Number.isFinite(num)) return String(value);
  // Use comma for thousands, dot for decimals (en-US style)
  return new Intl.NumberFormat("en-US", opts).format(num);
};

export const formatVnd = (value?: number | string | null) => {
  const formatted = formatNumber(value, { maximumFractionDigits: 0 });
  return formatted === "—" ? formatted : `${formatted} đ`;
};

export const formatConsumption = (
  value?: number | string | null,
  maximumFractionDigits = 2,
) => {
  return formatNumber(value, { maximumFractionDigits });
};
