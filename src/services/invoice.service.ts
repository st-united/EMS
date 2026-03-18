import axios from 'axios';

import { API_URL } from '@/constants';

export const getElectricityInvoiceDetailApi = (invoiceId: string) =>
  axios.get(API_URL.GET_ELECTRICITY_INVOICE_DETAIL(invoiceId));

export const getWaterInvoiceDetailApi = (invoiceId: string) =>
  axios.get(API_URL.GET_WATER_INVOICE_DETAIL(invoiceId));
