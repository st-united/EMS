import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, QRCode } from 'antd';
import { CopyOutlined, WalletOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { useInvoiceStats, useInvoices } from '@/hooks/useInvoice';
import { useGetBankAccount } from '@/hooks';
import type { Invoice } from '@/interfaces';
import { API_URL, InvoiceTypeEnum } from '@/constants';
import { formatConsumption, formatVnd } from '@/utils/format';
import { InvoiceStatsCards } from './components/InvoiceStatsCards';
import { InvoiceTable } from './components/InvoiceTable';
import { useLocationDetail } from '@/hooks/useLocation';

export const InvoicePage = () => {
  const { t } = useTranslation();
  const { id: locationId } = useParams<{ id: string }>();

  const [page, setPage] = useState(1);
  const [take] = useState(10);
  const [payingInvoice, setPayingInvoice] = useState<Invoice | null>(null);

  const { stats, isLoading: isStatsLoading } = useInvoiceStats(locationId);
  const { invoicesData, isLoading: isInvoicesLoading } = useInvoices(
    locationId,
    {
      page,
      take,
    },
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const { location } = useLocationDetail(locationId);
  const { data: bankAccount } = useGetBankAccount(location?.workspace?.id);

  const [paymentLink, setPaymentLink] = useState<{
    orderCode?: number | null;
    qrCode: string;
    checkoutUrl: string;
  } | null>(null);
  const [isCreatingPaymentLink, setIsCreatingPaymentLink] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!payingInvoice) {
        setPaymentLink(null);
        return;
      }

      setIsCreatingPaymentLink(true);
      setPaymentLink(null);

      try {
        const lowerType = (payingInvoice.invoiceType ?? '').toLowerCase();
        const isElectricity =
          lowerType.includes(InvoiceTypeEnum.ELECTRICITY_VI) ||
          lowerType.includes(InvoiceTypeEnum.ELECTRICITY_EN);

        const url = isElectricity
          ? API_URL.CREATE_ELECTRICITY_INVOICE_PAYMENT_LINK(payingInvoice.id)
          : API_URL.CREATE_WATER_INVOICE_PAYMENT_LINK(payingInvoice.id);

        const { data } = await axios.post(url);
        const payload = (data?.data ?? null) as
          | { orderCode?: number | null; qrCode: string; checkoutUrl: string }
          | null;

        if (!payload?.qrCode || !payload?.checkoutUrl) {
          throw new Error('Invalid payment link response');
        }

        if (!cancelled) setPaymentLink(payload);
      } catch {
        if (!cancelled) {
          toast.error(
            t(
              'pages.invoice.payment.createPaymentLinkFailed',
              'Không thể tạo mã thanh toán. Vui lòng thử lại.',
            ),
          );
        }
      } finally {
        if (!cancelled) setIsCreatingPaymentLink(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [payingInvoice, t]);

  const handleCopy = async (value?: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      toast.success(t('common.copied', 'Đã sao chép'));
    } catch {
      toast.error(t('common.copyFailed', 'Không thể sao chép'));
    }
  };

  return (
    <div className='p-4 sm:p-6'>
      <div className='mb-4 sm:mb-6'>
        <InvoiceStatsCards stats={stats} isLoading={isStatsLoading} />
      </div>

      <InvoiceTable
        data={invoicesData?.data || []}
        isLoading={isInvoicesLoading}
        page={invoicesData?.meta.page || 1}
        take={invoicesData?.meta.take || 10}
        total={invoicesData?.meta.itemCount || 0}
        onPageChange={handlePageChange}
        onPay={(invoice) => setPayingInvoice(invoice)}
      />

      <Modal
        open={!!payingInvoice}
        onCancel={() => setPayingInvoice(null)}
        footer={null}
        centered
        width={'min(760px, 92vw)'}
        title={
          <div className='flex items-center gap-2 text-white min-w-0'>
            <span className='text-base font-semibold truncate'>
              <WalletOutlined className='text-[#2fb8a6]!' />{' '}
              {t('pages.invoice.payment.title', 'Thanh toán hóa đơn')}
            </span>
          </div>
        }
        className='invoice-payment-modal '
      >
        {payingInvoice && (
          <div className='space-y-4'>
            <div className='rounded-xl border border-[#1f2937] bg-[#0f172a]! p-4'>
              <div className='flex items-center justify-between'>
                <div className='text-white font-semibold'>
                  {t(
                    'pages.invoice.payment.invoiceInfo.title',
                    'Thông tin hóa đơn',
                  )}
                </div>
                <span className='inline-block bg-[#1e3a8a] text-[#60a5fa] px-3 py-1 rounded text-xs font-medium'>
                  {(() => {
                    const lowerType = (
                      payingInvoice.invoiceType ?? ''
                    ).toLowerCase();
                    const isDien =
                      lowerType.includes(InvoiceTypeEnum.ELECTRICITY_VI) ||
                      lowerType.includes(InvoiceTypeEnum.ELECTRICITY_EN);
                    return isDien
                      ? t('pages.invoice.table.electricity', 'Điện')
                      : t('pages.invoice.table.water', 'Nước');
                  })()}
                </span>
              </div>

              <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
                <div>
                  <div className='text-[#94a3b8]'>
                    {t(
                      'pages.invoice.payment.invoiceInfo.invoiceNumber',
                      'Mã hóa đơn',
                    )}
                  </div>
                  <div className='text-[#e5e7eb]'>
                    {payingInvoice.invoiceNumber}
                  </div>
                </div>
                <div>
                  <div className='text-[#94a3b8]'>
                    {t('pages.invoice.payment.invoiceInfo.period', 'Kỳ hạn')}
                  </div>
                  <div className='text-[#e5e7eb]'>
                    {t('pages.invoice.table.monthPrefix', 'Tháng')}{' '}
                    {dayjs(payingInvoice.issueDate).format('M/YYYY')}
                  </div>
                </div>
                <div>
                  <div className='text-[#94a3b8]'>
                    {t(
                      'pages.invoice.payment.invoiceInfo.consumption',
                      'Lượng tiêu thụ',
                    )}
                  </div>
                  <div className='text-[#e5e7eb]'>
                    {(() => {
                      const lowerType = (
                        payingInvoice.invoiceType ?? ''
                      ).toLowerCase();
                      const isDien =
                        lowerType.includes(InvoiceTypeEnum.ELECTRICITY_VI) ||
                        lowerType.includes(InvoiceTypeEnum.ELECTRICITY_EN);
                      const unit = isDien ? 'kWh' : 'm³';
                      return `${formatConsumption(payingInvoice.consumedKwh)} ${unit}`;
                    })()}
                  </div>
                </div>
                <div>
                  <div className='text-[#94a3b8]'>
                    {t(
                      'pages.invoice.payment.invoiceInfo.dueDate',
                      'Hạn thanh toán',
                    )}
                  </div>
                  <div className='text-[#e5e7eb]'>
                    {dayjs(payingInvoice.dueDate).format('DD/MM/YYYY')}
                  </div>
                </div>
              </div>

              <div className='mt-4 flex items-center justify-between border-t border-[#1f2937] pt-4'>
                <div className='text-[#94a3b8]'>
                  {t(
                    'pages.invoice.payment.invoiceInfo.totalPay',
                    'Tổng tiền thanh toán',
                  )}
                </div>
                <div className='text-[#2dd4bf] font-semibold tabular-nums'>
                  {formatVnd(payingInvoice.totalAmount)}
                </div>
              </div>
            </div>

            <div className='rounded-xl border border-[#1f2937] bg-[#0f172a] p-4'>
              <div className='text-white font-semibold'>
                {t(
                  'pages.invoice.payment.transferInfo.title',
                  'Thông tin chuyển khoản',
                )}
              </div>

              <div className='mt-3 grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-3'>
                  {!bankAccount && (
                    <div className='rounded-lg border border-[#3f3f1f] bg-[#1a170b] px-3 py-2 text-sm text-[#facc15]'>
                      {t(
                        'pages.invoice.payment.transferInfo.notConfigured',
                        'Chưa cấu hình tài khoản ngân hàng cho tòa nhà/workspace.',
                      )}
                    </div>
                  )}
                  <div>
                    <div className='text-[#94a3b8] text-sm'>
                      {t(
                        'pages.invoice.payment.transferInfo.bankName',
                        'Ngân hàng',
                      )}
                    </div>
                    <div className='mt-1 rounded-lg border border-[#1f2937] bg-[#0b1220] px-3 py-2 text-[#e5e7eb]'>
                      {bankAccount?.bankName || '—'}
                    </div>
                  </div>

                  <div>
                    <div className='text-[#94a3b8] text-sm'>
                      {t(
                        'pages.invoice.payment.transferInfo.accountNumber',
                        'Số tài khoản',
                      )}
                    </div>
                    <div className='mt-1 flex items-center justify-between gap-2 rounded-lg border border-[#1f2937] bg-[#0b1220] px-3 py-2'>
                      <span className='text-[#e5e7eb] tabular-nums'>
                        {bankAccount?.accountNumber || '—'}
                      </span>
                      <button
                        className='bg-transparent border-none cursor-pointer text-[#94a3b8] hover:text-white'
                        aria-label={t(
                          'pages.invoice.payment.transferInfo.copyAccountNumber',
                          'Copy account number',
                        )}
                        onClick={() => handleCopy(bankAccount?.accountNumber)}
                      >
                        <CopyOutlined />
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className='text-[#94a3b8] text-sm'>
                      {t(
                        'pages.invoice.payment.transferInfo.accountHolder',
                        'Chủ tài khoản',
                      )}
                    </div>
                    <div className='mt-1 rounded-lg border border-[#1f2937] bg-[#0b1220] px-3 py-2 text-[#e5e7eb]'>
                      {bankAccount?.accountHolder || '—'}
                    </div>
                  </div>
                </div>

                <div className='flex flex-col items-center justify-center'>
                  <div className='bg-white p-3 sm:p-4 rounded-lg'>
                    {isCreatingPaymentLink && (
                      <div className='w-48 h-48 sm:w-55 sm:h-55 flex items-center justify-center text-[#0f172a]'>
                        {t('common.loading', 'Đang tải...')}
                      </div>
                    )}
                    {!isCreatingPaymentLink && paymentLink?.qrCode && (
                      <div className='w-48 h-48 sm:w-55 sm:h-55 flex items-center justify-center'>
                        <QRCode value={paymentLink.qrCode} size={212} bordered={false} />
                      </div>
                    )}
                    {!isCreatingPaymentLink && !paymentLink?.qrCode && (
                      <div className='w-48 h-48 sm:w-55 sm:h-55 flex items-center justify-center text-[#0f172a]'>
                        QR
                      </div>
                    )}
                  </div>
                  <div className='mt-2 text-xs text-[#94a3b8]'>
                    {t(
                      'pages.invoice.payment.transferInfo.qrHint',
                      'Quét mã QR để thanh toán nhanh',
                    )}
                  </div>
                  {paymentLink?.checkoutUrl && (
                    <a
                      href={paymentLink.checkoutUrl}
                      target='_blank'
                      rel='noreferrer'
                      className='mt-2 text-xs text-[#60a5fa] hover:text-white underline'
                    >
                      {t(
                        'pages.invoice.payment.openCheckout',
                        'Mở trang thanh toán',
                      )}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className='rounded-xl border border-[#3f3f1f] bg-[#1a170b] p-4'>
              <div className='text-[#facc15] font-semibold text-sm'>
                {t('pages.invoice.payment.note.title', 'Lưu ý quan trọng')}
              </div>
              <ul className='mt-2 list-disc pl-5 text-sm text-[#d1d5db] space-y-1'>
                <li>
                  {t(
                    'pages.invoice.payment.note.line1',
                    'Vui lòng kiểm tra thông tin chính xác trước khi chuyển khoản để hệ thống cập nhật tự động',
                  )}
                </li>
                <li>
                  {t(
                    'pages.invoice.payment.note.line2',
                    'Hóa đơn sẽ được cập nhật sau 1-5 phút kể từ khi chuyển khoản thành công',
                  )}
                </li>
                <li>
                  {t(
                    'pages.invoice.payment.note.line3',
                    'Liên hệ hotline nếu cần hỗ trợ',
                  )}
                </li>
              </ul>
            </div>

            <div className='flex justify-end'>
              <button
                className='w-full sm:w-auto bg-[#1f2937] hover:bg-[#111827] transition-colors border-none text-white px-6 py-2 rounded-md font-medium cursor-pointer'
                onClick={() => setPayingInvoice(null)}
              >
                {t('common.close', 'Đóng')}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
