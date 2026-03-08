import { Table, Space } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import type { Invoice } from "@/interfaces";
import "../styles.css"; // We will add some custom css for Antd dark table if needed

interface InvoiceTableProps {
  data: Invoice[];
  isLoading: boolean;
  page: number;
  take: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
}

export const InvoiceTable = ({
  data,
  isLoading,
  page,
  take,
  total,
  onPageChange,
}: InvoiceTableProps) => {
  const { t } = useTranslation();

  const formatCurrency = (value: string | number) => {
    return new Intl.NumberFormat("vi-VN").format(Number(value)) + " đ";
  };

  const columns: ColumnsType<Invoice> = [
    {
      title: t("pages.invoice.table.invoiceNumber", "Mã hóa đơn"),
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      render: (text) => <span className="text-[#d1d5db]">{text}</span>,
    },
    {
      title: t("pages.invoice.table.type", "Loại"),
      dataIndex: "invoiceType",
      key: "invoiceType",
      render: (type: string) => {
        const isDien =
          type.toLowerCase().includes("điện") ||
          type.toLowerCase().includes("electricity");
        if (isDien) {
          return (
            <span className="inline-block bg-[#064e3b] text-[#34d399] px-3 py-1 rounded align-middle text-sm font-medium">
              Điện
            </span>
          );
        }
        return (
          <span className="inline-block bg-[#1e3a8a] text-[#60a5fa] px-3 py-1 rounded align-middle text-sm font-medium">
            Nước
          </span>
        );
      },
    },
    {
      title: t("pages.invoice.table.period", "Kỳ hạn"),
      key: "period",
      render: (_, record) => {
        // Derive period from issueDate or notificationTitle
        const date = dayjs(record.issueDate);
        return (
          <span className="text-[#9ca3af]">Tháng {date.format("M/YYYY")}</span>
        );
      },
    },
    {
      title: t("pages.invoice.table.consumption", "Tiêu thụ"),
      dataIndex: "consumedKwh",
      key: "consumedKwh",
      render: (val, record) => {
        const isDien =
          record.invoiceType.toLowerCase().includes("điện") ||
          record.invoiceType.toLowerCase().includes("electricity");
        const unit = isDien ? "kWh" : "m³";
        return (
          <span className="text-[#d1d5db]">
            {val} {unit}
          </span>
        );
      },
    },
    {
      title: t("pages.invoice.table.amount", "Số tiền"),
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (val) => (
        <span className="text-[#d1d5db] font-medium tabular-nums">
          {formatCurrency(val)}
        </span>
      ),
    },
    {
      title: t("pages.invoice.table.status", "Trạng thái"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const isPending = status === "PENDING" || status === "UNPAID";
        if (isPending) {
          return (
            <span className="inline-block border border-[#ca8a04] bg-transparent text-[#facc15] px-3 py-0.5 rounded-full align-middle text-sm font-medium">
              Chưa thanh toán
            </span>
          );
        }
        return (
          <span className="inline-block border border-[#16a34a] bg-transparent text-[#4ade80] px-3 py-0.5 rounded-full align-middle text-sm font-medium">
            Đã thanh toán
          </span>
        );
      },
    },
    {
      title: t("pages.invoice.table.dueDate", "Hạn thanh toán"),
      key: "dueDate",
      render: (_, record) => {
        return (
          <div className="flex flex-col">
            <span className="text-[#d1d5db]">
              {dayjs(record.dueDate).format("DD/MM/YYYY")}
            </span>
            {record.status !== "PENDING" && record.status !== "UNPAID" && (
              <span className="text-xs text-[#6b7280]">
                Đã thanh toán: {dayjs(record.issueDate).format("DD/MM/YYYY")}
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: t("pages.invoice.table.action", "Hành động"),
      key: "action",
      render: (_, record) => {
        const isPending =
          record.status === "PENDING" || record.status === "UNPAID";
        return (
          <Space size="middle">
            <button
              aria-label={t("pages.invoice.table.view", "Xem chi tiết")}
              className="p-2 cursor-pointer bg-transparent border-none text-current"
            >
              <EyeOutlined className="text-[#9ca3af] hover:text-white text-lg" />
            </button>
            <button
              aria-label={t("pages.invoice.table.download", "Tải xuống")}
              className="p-2 cursor-pointer bg-transparent border-none text-current"
            >
              <DownloadOutlined className="text-[#9ca3af] hover:text-white text-lg" />
            </button>
            {isPending && (
              <button className="bg-[#14b8a6] hover:bg-[#0d9488] transition-colors border-none text-white px-4 py-1.5 rounded-md font-medium cursor-pointer">
                Thanh toán
              </button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="mt-6 rounded-xl border border-[#1f2937] bg-[#0b0c10] overflow-hidden">
      <div className="p-6 border-b border-[#1f2937] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white text-pretty">
            {t("pages.invoice.list.title", "Danh sách hóa đơn")}
          </h2>
          <p className="text-sm text-[#9ca3af] mt-1">
            {t(
              "pages.invoice.list.subtitle",
              "Quản lý và thanh toán hóa đơn của bạn",
            )}
          </p>
        </div>
        <Space>
          {/* Add Selects here if needed, or pass them from parent */}
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: take,
          total: total,
          onChange: onPageChange,
          showSizeChanger: false,
          className: "px-6 py-4",
        }}
        className="invoice-dark-table"
        scroll={{ x: 1000 }}
      />
    </div>
  );
};
