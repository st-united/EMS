import { Col, Row, Space } from 'antd';
import { useTranslation } from 'react-i18next';

type SummaryLike = {
  totalConsumption?: number | string | null;
  subtotal?: number | string | null;
  vatRate?: number | string | null;
  vatAmount?: number | string | null;
  totalAmount?: number | string | null;
  wastewaterRate?: number | string | null;
  wastewaterAmount?: number | string | null;
};

type TariffTotals = {
  kwh: number;
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
};

interface Props {
  summary: SummaryLike;
  tariffTotals?: TariffTotals | null;
  translationKeyPrefix?: string;
}

const SummarySection: React.FC<Props> = ({
  summary,
  tariffTotals,
  translationKeyPrefix,
}) => {
  const { t } = useTranslation();
  const keyPrefix = translationKeyPrefix ?? 'pages.invoice.detail';

  const formatRate = (rate?: number | string | null) => {
    if (rate === undefined || rate === null) return '—';
    if (typeof rate === 'string') return rate;
    const percent = rate <= 1 ? rate * 100 : rate;
    return `${Number(percent.toFixed(2))}%`;
  };

  const subtotal = tariffTotals?.subtotal ?? summary.subtotal;
  const vatRate = formatRate(tariffTotals?.vatRate ?? summary.vatRate);
  const vatAmount = tariffTotals?.vatAmount ?? summary.vatAmount;
  const totalAmount = tariffTotals?.total ?? summary.totalAmount;
  const wastewaterRateRaw = summary.wastewaterRate;
  const wastewaterAmount = summary.wastewaterAmount;
  const hasWastewaterRate =
    wastewaterRateRaw !== undefined && wastewaterRateRaw !== null;
  const hasWastewaterAmount =
    wastewaterAmount !== undefined && wastewaterAmount !== null;
  const wastewaterRate = hasWastewaterRate
    ? formatRate(wastewaterRateRaw)
    : null;

  const formatVndDot = (value?: number | string | null) => {
    const num =
      value === undefined || value === null
        ? NaN
        : Number(String(value).replace(/,/g, ''));
    if (!Number.isFinite(num)) return value == null ? '—' : String(value);
    // Dot thousands, no decimals: 85.649
    return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(
      num,
    );
  };

  return (
    <Space direction='vertical' className='w-full justify-center border-t pt-4'>
      <Row className='w-full px-4'>
        <Col span={12} offset={4}>
          {t(`${keyPrefix}.subtotalLabel`, 'Tiền điện trước thuế (VNĐ):')}
        </Col>
        <Col>{formatVndDot(subtotal)}</Col>
      </Row>

      <Row className='w-full px-4'>
        <Col span={12} offset={4}>
          {t(`${keyPrefix}.vatRateLabel`, 'Thuế suất GTGT:')}
        </Col>
        <Col>{vatRate}</Col>
      </Row>

      <Row className='w-full px-4'>
        <Col span={12} offset={4}>
          {t(`${keyPrefix}.vatAmountLabel`, 'Thuế GTGT:')}
        </Col>
        <Col>{formatVndDot(vatAmount)}</Col>
      </Row>

      {hasWastewaterRate && (
        <Row className='w-full px-4'>
          <Col span={12} offset={4}>
            {t(`${keyPrefix}.wastewaterRate`, 'Tỷ lệ phí nước thải')}
          </Col>
          <Col>{wastewaterRate}</Col>
        </Row>
      )}

      {hasWastewaterAmount && (
        <Row className='w-full px-4'>
          <Col span={12} offset={4}>
            {t(`${keyPrefix}.wastewaterAmount`, 'Phí nước thải')}
          </Col>
          <Col>{formatVndDot(wastewaterAmount)}</Col>
        </Row>
      )}

      <Row className='flex h-10 w-full items-center bg-[#ECF3FF] px-4 text-lg font-bold'>
        <Col span={12} offset={4} className='text-md md:text-lg'>
          {t(`${keyPrefix}.totalAmountLabel`, 'Tổng tiền thanh toán:')}
        </Col>
        <Col>{formatVndDot(totalAmount)} VND</Col>
      </Row>
    </Space>
  );
};

export default SummarySection;
