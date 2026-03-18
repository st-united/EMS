export interface InvoiceStats {
  totalUnpaidAmount: number;
  unpaidInvoicesCount: number;
  paidThisMonthAmount: number;
  paidThisMonthCount: number;
  totalInvoicesLast6Months: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  notificationTitle: string;
  locationName: string;
  consumedKwh: string;
  issueDate: string;
  dueDate: string;
  status: string;
  totalAmount: string;
  invoiceType: string;
}

export interface InvoiceDetailCommonCustomer {
  name: string;
  phone: string;
  address: string;
  email: string;
}

export interface InvoiceDetailCommonLocation {
  name: string;
  businessType?: string;
}

export interface InvoiceDetailCommonMeterReading {
  meterName: string;
  startIndex: string | number;
  endIndex: string | number;
  consumption: string | number;
}

export interface InvoiceDetailCommonPricingDetail {
  timeFrame: string;
  unitPrice: string | number;
  consumption: string | number;
  amount: string | number;
}

export interface ElectricityInvoiceTariff {
  kind?: string;
  consumption?: {
    meters?: Array<{
      meterName: string;
      tariffs: Array<{
        code: string;
        start: number;
        end: number;
        kwh: number;
      }>;
      tiers?: Array<{ kwh: number }>;
    }>;
    totals?: { kwh: number };
  };
  pricing?: {
    rows?: Array<{
      label: string;
      code: string;
      kwh: number;
      unitPrice: number;
      amount: number;
    }>;
    totals?: {
      kwh: number;
      subtotal: number;
      vatRate: number;
      vatAmount: number;
      total: number;
    };
  };
}

export interface ElectricityInvoiceDetail {
  id: string;
  invoiceNumber: string;
  invoiceMonth: string;
  invoiceStatus: string;
  invoiceStatusCode: string;
  issueDate: string;
  dueDate: string;
  periodFrom: string;
  periodTo: string;
  customer: InvoiceDetailCommonCustomer;
  location: InvoiceDetailCommonLocation;
  meterReadings: InvoiceDetailCommonMeterReading[];
  pricingDetails: InvoiceDetailCommonPricingDetail[];
  tariff?: ElectricityInvoiceTariff;
  summary: {
    totalConsumption: string;
    totalConsumptionRaw: number;
    subtotal: string;
    subtotalRaw: number;
    vatRate: string;
    vatAmount: string;
    vatAmountRaw: number;
    totalAmount: string;
    totalAmountRaw: number;
  };
}

export interface WaterInvoiceDetail {
  invoiceId: string;
  invoiceNumber: string;
  invoiceMonth: string;
  issueDate: string;
  dueDate: string;
  invoiceStatusCode: string;
  periodFrom: string;
  periodTo: string;
  pricingModel?: string;
  householdSize?: number;
  customer: InvoiceDetailCommonCustomer;
  location: InvoiceDetailCommonLocation;
  meterReadings: { meterName: string; startIndex: number; endIndex: number; consumption: number }[];
  pricingDetails: { timeFrame: string; unitPrice: number; consumption: number; amount: number }[];
  summary: {
    totalConsumption: number;
    subtotal: number;
    vatRate: string;
    vatAmount: number;
    wastewaterRate?: string;
    wastewaterAmount?: number;
    totalAmount: number;
  };
}

export interface PaginationMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface InvoicesResponse {
  data: Invoice[];
  meta: PaginationMeta;
  message: string;
}

export interface InvoiceTableProps {
  data: Invoice[];
  isLoading: boolean;
  page: number;
  take: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
}

export interface InvoiceStatsCardsProps {
  stats?: InvoiceStats;
  isLoading?: boolean;
}
