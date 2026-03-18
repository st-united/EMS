import { DownloadOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Spin, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import type {
  ElectricityInvoiceDetail,
  InvoiceDetailCommonMeterReading,
  InvoiceDetailCommonPricingDetail,
  WaterInvoiceDetail,
} from '@/interfaces';
import { useInvoiceDetail } from '@/hooks/useInvoice';
import { formatNumber, formatVnd } from '@/utils/format';

import InvoiceDetailHeader from './components/InvoiceDetailHeader';
import CustomerInfoList from './components/CustomerInfoList';
import SummarySection from './components/SummarySection';
import {
  InvoiceDetailTable,
  Tou3ConsumptionTable,
  Tou3PricingTable,
} from './components/Tables/InvoiceDetailTable';

const { Title, Text } = Typography;

export const InvoiceDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id: locationId, invoiceId } = useParams<{
    id: string;
    invoiceId: string;
  }>();

  const [searchParams] = useSearchParams();
  const invoiceType = searchParams.get('type') ?? undefined;
  const { detail, isLoading, isWater } = useInvoiceDetail(invoiceId, invoiceType);

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spin />
      </div>
    );
  }

  if (!detail) {
    return (
      <div className='p-6 text-[#9ca3af]'>
        {t('pages.invoice.detail.empty', 'Không tìm thấy hóa đơn')}
      </div>
    );
  }

  const electricity = detail as ElectricityInvoiceDetail;
  const water = detail as WaterInvoiceDetail;

  const invoiceNumber =
    (isWater ? water.invoiceNumber : electricity.invoiceNumber) ?? '';

  const meterColumns: ColumnsType<InvoiceDetailCommonMeterReading> = [
    {
      title: t('pages.invoice.detail.meterName', 'Công tơ'),
      dataIndex: 'meterName',
      key: 'meterName',
    },
    {
      title: t('pages.invoice.detail.startIndex', 'Chỉ số đầu'),
      dataIndex: 'startIndex',
      key: 'startIndex',
      render: (v) => formatNumber(v),
    },
    {
      title: t('pages.invoice.detail.endIndex', 'Chỉ số cuối'),
      dataIndex: 'endIndex',
      key: 'endIndex',
      render: (v) => formatNumber(v),
    },
    {
      title: isWater
        ? t('pages.invoice.detail.consumptionM3', 'Tiêu thụ (m³)')
        : t('pages.invoice.detail.consumptionKwh', 'Tiêu thụ (kWh)'),
      dataIndex: 'consumption',
      key: 'consumption',
      render: (v) => `${formatNumber(v)} ${isWater ? 'm³' : 'kWh'}`,
    },
  ];

  const pricingColumns: ColumnsType<InvoiceDetailCommonPricingDetail> = [
    {
      title: t('pages.invoice.detail.timeFrame', 'Khung/Bậc'),
      dataIndex: 'timeFrame',
      key: 'timeFrame',
    },
    {
      title: t('pages.invoice.detail.unitPrice', 'Đơn giá'),
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (v) =>
        isWater ? `${formatVnd(v)} / m³` : `${formatVnd(v)} / kWh`,
    },
    {
      title: isWater
        ? t('pages.invoice.detail.consumptionM3', 'Tiêu thụ (m³)')
        : t('pages.invoice.detail.consumptionKwh', 'Tiêu thụ (kWh)'),
      dataIndex: 'consumption',
      key: 'consumption',
      render: (v) =>
        `${formatNumber(v, { maximumFractionDigits: 0 })} ${isWater ? 'm³' : 'kWh'}`,
    },
    {
      title: t('pages.invoice.detail.amount', 'Thành tiền'),
      dataIndex: 'amount',
      key: 'amount',
      render: (v) => formatVnd(v),
    },
  ];

  const totalAmount = isWater
    ? water.summary?.totalAmount
    : electricity.summary?.totalAmountRaw;

  const tariff = isWater ? undefined : electricity.tariff;

  const isTou3 = String(tariff?.kind || '').toUpperCase() === 'TOU_3';

  return (
    <div className='p-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <Button
          type='text'
          icon={<LeftOutlined />}
          size='large'
          className='p-0! text-white! hover:text-white!'
          onClick={() => navigate(`/tenant/${locationId}/invoice`)}
        >
          {t('pages.invoice.detail.back', 'Quay lại danh sách')}
        </Button>
        <Button
          icon={<DownloadOutlined />}
          className='border-none bg-[#178371] p-5 text-lg text-white hover:bg-emerald-600! hover:text-teal-200!'
        >
          {t('pages.invoice.detail.export', 'Xuất hóa đơn')}
        </Button>
      </div>

      <div className='mx-auto max-w-full rounded-2xl border border-[#1f2937] bg-[#0b0c10] p-6 shadow-lg'>
        <div className='mb-6 flex flex-wrap items-start justify-between gap-6'>
          <InvoiceDetailHeader
            data={{
              invoiceMonth: isWater
                ? water.invoiceMonth
                : electricity.invoiceMonth,
              issueDate: isWater ? water.issueDate : electricity.issueDate,
              invoiceStatusCode: isWater
                ? water.invoiceStatusCode
                : electricity.invoiceStatusCode,
              invoiceNumber,
              dueDate: isWater ? water.dueDate : electricity.dueDate,
            }}
          />

          <div className='text-right'>
            <div className='inline-block'>
              <div className='inline-block bg-white px-8 py-3 text-black shadow'>
                <div className='flex items-center gap-3'>
                  <span className='text-lg tracking-wide opacity-90'>
                    {t('pages.invoice.detail.totalLabel', 'Tổng tiền')}
                  </span>
                  <span className='text-lg font-bold tracking-wide'>
                    {formatVnd(totalAmount)} VND
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Row gutter={24} align='top' className='mb-6'>
          <Col xs={24} md={12}>
            <div className='mb-3 text-sm font-semibold text-white'>
              {t('pages.invoice.detail.customerInfo', 'Khách hàng')}
            </div>
            <CustomerInfoList
              customer={detail.customer}
              location={detail.location}
            />
          </Col>
        </Row>

        <Divider style={{ borderColor: '#1f2937' }} />

        <div className='mb-4'>
          <Title level={5} className='text-white!'>
            {t(
              'pages.invoice.detail.energyTitle',
              isWater ? 'Tiêu thụ nước' : 'Tiêu thụ điện',
            )}
          </Title>
          <div className='my-2'>
            <Text className='text-white!'>
              {t('pages.invoice.detail.periodLabel', {
                from: detail.periodFrom,
                to: detail.periodTo,
              })}
            </Text>
            {isWater && water.pricingModel ? (
              <Text className='text-white! block mt-1'>
                {t('pages.invoice.detail.pricingModel', 'Mô hình tính giá')}:{" "}
                {t(
                  `pages.invoice.detail.pricingModels.${water.pricingModel}`,
                  water.pricingModel,
                )}
              </Text>
            ) : null}
            {isWater &&
            water.pricingModel === 'HOUSEHOLD_PER_PERSON' &&
            water.householdSize ? (
              <Text className='text-white! block mt-1'>
                {t('pages.invoice.detail.householdSize', 'Số nhân khẩu')}:{' '}
                {water.householdSize}
              </Text>
            ) : null}
          </div>
        </div>

        <div className='mt-4 space-y-8 text-sm text-[#d1d5db]'>
          <div>
            {isTou3 && tariff?.consumption?.meters?.length ? (
              <Tou3ConsumptionTable meters={tariff.consumption.meters} />
            ) : (
              <InvoiceDetailTable<InvoiceDetailCommonMeterReading>
                dataSource={
                  isWater ? water.meterReadings : electricity.meterReadings
                }
                columns={meterColumns}
                rowKey={(r) => r.meterName}
              />
            )}
          </div>

          <div>
            <div className='mb-3 text_sm font-semibold text_white'>
              {t('pages.invoice.detail.pricing', 'Chi tiết tính giá')}
            </div>
            {isTou3 && tariff?.pricing?.rows?.length ? (
              <Tou3PricingTable
                rows={tariff.pricing.rows}
                totals={
                  tariff.pricing.totals ?? {
                    kwh: 0,
                    subtotal: 0,
                    vatRate: 0,
                    vatAmount: 0,
                    total: 0,
                  }
                }
              />
            ) : (
              <InvoiceDetailTable<InvoiceDetailCommonPricingDetail>
                dataSource={
                  isWater ? water.pricingDetails : electricity.pricingDetails
                }
                columns={pricingColumns}
                rowKey={(r, idx) => `${r.timeFrame}-${idx}`}
              />
            )}
          </div>

          <SummarySection
            summary={
              isWater
                ? {
                    totalConsumption: water.summary.totalConsumption,
                    subtotal: water.summary.subtotal,
                    vatRate: water.summary.vatRate,
                    vatAmount: water.summary.vatAmount,
                    totalAmount: water.summary.totalAmount,
                    wastewaterRate: water.summary.wastewaterRate,
                    wastewaterAmount: water.summary.wastewaterAmount,
                  }
                : {
                    totalConsumption: electricity.summary.totalConsumptionRaw,
                    subtotal: electricity.summary.subtotalRaw,
                    vatRate: electricity.summary.vatRate,
                    vatAmount: electricity.summary.vatAmountRaw,
                    totalAmount: electricity.summary.totalAmountRaw,
                  }
            }
            tariffTotals={isTou3 ? (tariff?.pricing?.totals ?? null) : null}
          />
        </div>
      </div>
    </div>
  );
};
