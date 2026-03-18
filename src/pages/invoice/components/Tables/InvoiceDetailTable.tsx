import { Table } from "antd";
import type { TableProps, ColumnsType } from "antd/es/table";
import type React from "react";
import { useTranslation } from "react-i18next";

import { formatNumber, formatVnd } from "@/utils/format";

import "./InvoiceDetailTable.scss";

const tableComponents = {
  header: {
    cell: (
      props: React.HTMLAttributes<HTMLTableCellElement> & {
        children?: React.ReactNode;
      }
    ) => (
      <th
        {...props}
        style={{
          border: "none",
          borderBottom: "5px solid #000",
          background: "transparent",
          fontWeight: 600,
          color: "#111",
          ...(props.style || {}),
        }}
      >
        {props.children}
      </th>
    ),
  },
  body: {
    cell: (
      props: React.TdHTMLAttributes<HTMLTableCellElement> & {
        children?: React.ReactNode;
      }
    ) => (
      <td
        {...props}
        style={{
          border: "none",
          color: "#111",
          ...(props.style || {}),
        }}
      >
        {props.children}
      </td>
    ),
  },
};

export type StyledTableProps<T extends object> = Omit<
  TableProps<T>,
  "components" | "size" | "pagination"
> & {
  columns: ColumnsType<T>;
  pagination?: TableProps<T>["pagination"];
  size?: TableProps<T>["size"];
};

export const Tou3ConsumptionTable: React.FC<{
  meters: Array<{
    meterName: string;
    tariffs: Array<{ code: string; start: number; end: number; kwh: number }>;
  }>;
}> = ({ meters }) => {
  const { t } = useTranslation();

  const order: string[] = ["BT", "CD", "TD"];

  type Row = {
    meterName: string;
    _tariffs: Array<{ code: string; start?: number; end?: number; kwh?: number }>;
  };

  const rows: Row[] = meters.map((m) => ({
    meterName: m.meterName,
    _tariffs: order.map((c) => {
      const found = m.tariffs.find((x) => x.code === c);
      return { code: c, start: found?.start, end: found?.end, kwh: found?.kwh };
    }),
  }));

  const columns: ColumnsType<Row> = [
    {
      title: t("pages.invoice.detail.meterName", "Công tơ"),
      dataIndex: "meterName",
      key: "meterName",
    },
    {
      title: t("pages.invoice.detail.startIndex", "Chỉ số đầu"),
      key: "start",
      render: (_, r) => (
        <div className="leading-5">
          {r._tariffs.map((x) => (
            <div key={`s-${r.meterName}-${x.code}`}>
              {x.code} -{" "}
              {x.start !== undefined ? formatNumber(x.start) : "—"}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: t("pages.invoice.detail.endIndex", "Chỉ số cuối"),
      key: "end",
      render: (_, r) => (
        <div className="leading-5">
          {r._tariffs.map((x) => (
            <div key={`e-${r.meterName}-${x.code}`}>
              {x.code} - {x.end !== undefined ? formatNumber(x.end) : "—"}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: t("pages.invoice.detail.consumptionKwh", "Tiêu thụ (kWh)"),
      key: "kwh",
      render: (_, r) => (
        <div className="leading-5">
          {r._tariffs.map((x) => (
            <div key={`k-${r.meterName}-${x.code}`}>
              {x.code} -{" "}
              {x.kwh !== undefined
                ? formatNumber(x.kwh, { maximumFractionDigits: 0 })
                : "—"}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <InvoiceDetailTable<Row>
      dataSource={rows}
      columns={columns}
      rowKey={(r) => r.meterName}
    />
  );
};

export const Tou3PricingTable: React.FC<{
  rows: Array<{
    label: string;
    code: string;
    kwh: number;
    unitPrice: number;
    amount: number;
  }>;
  totals: {
    kwh: number;
    subtotal: number;
    vatRate: number;
    vatAmount: number;
    total: number;
  };
}> = ({ rows }) => {
  const { t } = useTranslation();

  const columns: ColumnsType<(typeof rows)[number]> = [
    {
      title: t("pages.invoice.detail.timeFrame", "Khung/Bậc"),
      dataIndex: "label",
      key: "label",
    },
    {
      title: t("pages.invoice.detail.unitPrice", "Đơn giá"),
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (v) => formatVnd(v),
    },
    {
      title: t("pages.invoice.detail.consumptionKwh", "Tiêu thụ (kWh)"),
      dataIndex: "kwh",
      key: "kwh",
      render: (v) => formatNumber(v, { maximumFractionDigits: 0 }),
    },
    {
      title: t("pages.invoice.detail.amount", "Thành tiền"),
      dataIndex: "amount",
      key: "amount",
      render: (v) => formatVnd(v),
    },
  ];

  return (
    <InvoiceDetailTable<(typeof rows)[number]>
      dataSource={rows}
      columns={columns}
      rowKey={(r) => r.code}
    />
  );
};

export function InvoiceDetailTable<T extends object>({
  columns,
  dataSource,
  rowKey,
  pagination = false,
  size = "small",
  ...rest
}: StyledTableProps<T>) {
  return (
    <Table<T>
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey as any}
      pagination={pagination}
      size={size}
      components={tableComponents}
      {...rest}
    />
  );
}

export default InvoiceDetailTable;

