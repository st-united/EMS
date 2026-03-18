import { Tag } from "antd";
import { useTranslation } from "react-i18next";

import { InvoiceStatus } from "@/constants";

const STATUS_COLOR: Record<(typeof InvoiceStatus)[keyof typeof InvoiceStatus], string> = {
  [InvoiceStatus.PENDING]: "processing",
  [InvoiceStatus.UNPAID]: "processing",
  [InvoiceStatus.PAID]: "success",
  [InvoiceStatus.CANCELLED]: "default",
};

export const InvoiceStatusTag = ({ status }: { status: string | undefined }) => {
  const { t } = useTranslation();

  if (!status) return null;

  const normalized = status.toUpperCase() as keyof typeof InvoiceStatus;
  const mapped =
    InvoiceStatus[normalized] ??
    (Object.values(InvoiceStatus).includes(status as any)
      ? (status as (typeof InvoiceStatus)[keyof typeof InvoiceStatus])
      : InvoiceStatus.PENDING);

  const label =
    mapped === InvoiceStatus.PAID
      ? t("pages.invoice.status.paid", "Đã thanh toán")
      : mapped === InvoiceStatus.CANCELLED
        ? t("pages.invoice.status.cancelled", "Đã hủy")
        : t("pages.invoice.status.unpaid", "Chưa thanh toán");

  return <Tag color={STATUS_COLOR[mapped] || "default"}>{label}</Tag>;
};

