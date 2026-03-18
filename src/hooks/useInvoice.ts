import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { API_URL, QueryKeys } from "@/constants";
import type {
  ElectricityInvoiceDetail,
  InvoiceStats,
  InvoicesResponse,
  WaterInvoiceDetail,
} from "@/interfaces";
import { getElectricityInvoiceDetailApi, getWaterInvoiceDetailApi } from "@/services";

export const useInvoiceStats = (locationId?: string) => {
  const { t } = useTranslation();

  const statsQuery = useQuery<{ data: InvoiceStats }>({
    queryKey: [QueryKeys.INVOICE_STATS, locationId],
    queryFn: async () => {
      if (!locationId)
        throw new Error(
          t("errors.locationIdRequired", "Location ID is required"),
        );
      const { data } = await axios.get(API_URL.GET_INVOICE_STATS(locationId));
      return data;
    },
    enabled: !!locationId,
  });

  return {
    stats: statsQuery.data?.data,
    isLoading: statsQuery.isLoading,
    isError: statsQuery.isError,
  };
};

export interface UseInvoicesParams {
  page: number;
  take: number;
  type?: string;
  status?: string;
}

export const useInvoices = (
  locationId?: string,
  params?: UseInvoicesParams,
) => {
  const { t } = useTranslation();

  const listQuery = useQuery<InvoicesResponse>({
    queryKey: [QueryKeys.INVOICES_LIST, locationId, params],
    queryFn: async () => {
      if (!locationId)
        throw new Error(
          t("errors.locationIdRequired", "Location ID is required"),
        );
      const { data } = await axios.get(API_URL.GET_INVOICES(locationId), {
        params,
      });
      return data;
    },
    enabled: !!locationId,
  });

  return {
    invoicesData: listQuery.data,
    isLoading: listQuery.isLoading,
    isError: listQuery.isError,
  };
};

export const useInvoiceDetail = (invoiceId?: string, invoiceType?: string) => {
  const { t } = useTranslation();

  const isWater =
    (invoiceType ?? "").toLowerCase().includes("nước") ||
    (invoiceType ?? "").toLowerCase().includes("water");

  const detailQuery = useQuery({
    queryKey: [QueryKeys.INVOICE_STATS, "detail", invoiceId, isWater],
    queryFn: async () => {
      if (!invoiceId)
        throw new Error(t("errors.invoiceIdRequired", "Invoice ID is required"));

      const { data } = isWater
        ? await getWaterInvoiceDetailApi(invoiceId)
        : await getElectricityInvoiceDetailApi(invoiceId);

      return data.data as ElectricityInvoiceDetail | WaterInvoiceDetail;
    },
    enabled: !!invoiceId,
  });

  return {
    detail: detailQuery.data,
    isLoading: detailQuery.isLoading,
    isError: detailQuery.isError,
    isWater,
  };
};
