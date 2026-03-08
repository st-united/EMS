import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { API_URL, QueryKeys } from "@/constants";
import type { InvoiceStats, InvoicesResponse } from "@/interfaces";

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
