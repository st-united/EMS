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
