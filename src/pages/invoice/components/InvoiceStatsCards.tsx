import { Wallet, CalendarCheck, FileText } from "lucide-react";
import type { InvoiceStats } from "@/interfaces";
import { useTranslation } from "react-i18next";

interface InvoiceStatsCardsProps {
  stats?: InvoiceStats;
  isLoading?: boolean;
}

export const InvoiceStatsCards = ({
  stats,
  isLoading,
}: InvoiceStatsCardsProps) => {
  const { t } = useTranslation();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + " đ";
  };

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Chưa thanh toán (Unpaid) */}
      <div className="flex flex-col justify-between rounded-xl border border-[#ca8a04]/30 bg-[#422c10]/40 p-5 shadow-sm transition-all hover:bg-[#422c10]/60">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm font-medium text-[#facc15]">
            {t("pages.invoice.unpaid", "Chưa thanh toán")}
          </div>
          <div className="text-[#facc15]">
            <Wallet className="h-5 w-5" />
          </div>
        </div>
        <div>
          <div className="mb-1 text-2xl font-bold text-white tabular-nums">
            {isLoading ? "…" : formatCurrency(stats?.totalUnpaidAmount || 0)}
          </div>
          <div className="text-xs text-[#9ca3af] tabular-nums">
            {isLoading ? "…" : stats?.unpaidInvoicesCount || 0}{" "}
            {t("pages.invoice.invoiceCount", "hóa đơn")}
          </div>
        </div>
      </div>

      {/* Đã thanh toán tháng này (Paid this month) */}
      <div className="flex flex-col justify-between rounded-xl border border-[#16a34a]/30 bg-[#064e3b]/40 p-5 shadow-sm transition-all hover:bg-[#064e3b]/60">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm font-medium text-[#4ade80]">
            {t("pages.invoice.paidThisMonth", "Đã thanh toán tháng này")}
          </div>
          <div className="text-[#4ade80]">
            <CalendarCheck className="h-5 w-5" />
          </div>
        </div>
        <div>
          <div className="mb-1 text-2xl font-bold text-white tabular-nums">
            {isLoading ? "…" : formatCurrency(stats?.paidThisMonthAmount || 0)}
          </div>
          <div className="text-xs text-[#9ca3af]">
            {t("pages.invoice.month", "Tháng")} {currentMonth}/{currentYear}
          </div>
        </div>
      </div>

      {/* Tổng số hóa đơn (Total invoices) */}
      <div className="flex flex-col justify-between rounded-xl border border-[#2563eb]/30 bg-[#1e3a8a]/40 p-5 shadow-sm transition-all hover:bg-[#1e3a8a]/60">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm font-medium text-[#60a5fa]">
            {t("pages.invoice.totalInvoices", "Tổng số hóa đơn")}
          </div>
          <div className="text-[#60a5fa]">
            <FileText className="h-5 w-5" />
          </div>
        </div>
        <div>
          <div className="mb-1 text-2xl font-bold text-white tabular-nums">
            {isLoading ? "…" : stats?.totalInvoicesLast6Months || 0}
          </div>
          <div className="text-xs text-[#9ca3af]">
            {t("pages.invoice.last6Months", "6 tháng gần nhất")}
          </div>
        </div>
      </div>
    </div>
  );
};
