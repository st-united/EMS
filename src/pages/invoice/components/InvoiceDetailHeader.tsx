import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import { InvoiceStatusTag } from "./InvoiceStatusTag";

const { Title } = Typography;

export interface InvoiceDetailHeaderData {
  invoiceMonth: string;
  issueDate: string;
  invoiceStatusCode?: string;
  invoiceNumber: string;
  dueDate: string;
  summary?: {
    totalAmount?: number | string;
  };
}

interface Props {
  data: InvoiceDetailHeaderData;
  translationKeyPrefix?: string;
}

const InvoiceDetailHeader: React.FC<Props> = ({
  data,
  translationKeyPrefix,
}) => {
  const { t } = useTranslation();
  const keyPrefix = translationKeyPrefix ?? "pages.invoice.detail";

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <Title
          level={1}
          className="m-0! font-bold! leading-none! text-white!"
        >
          {t(`${keyPrefix}.title`, {
            month: data.invoiceMonth,
            defaultValue: `Hóa đơn tháng ${data.invoiceMonth}`,
          })}
        </Title>
        <div className="h-3 flex-1 -skew-x-12 bg-white" />
      </div>
      <div className="mt-2 grid grid-cols-1 items-start gap-4 md:grid-cols-[1fr_auto]">
        <div className="text-md">
          <span className="mr-2 text-white">
            {t(`${keyPrefix}.date`, {
              date: data.issueDate,
              defaultValue: `Ngày xuất: ${data.issueDate}`,
            })}
          </span>
          <InvoiceStatusTag status={data.invoiceStatusCode} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailHeader;

