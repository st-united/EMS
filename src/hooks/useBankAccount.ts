import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { API_URL, QueryKeys } from "@/constants";
import type { BankAccount, ResponseItem } from "@/interfaces";

export const useBankAccount = (workspaceId?: string) => {
  const { t } = useTranslation();

  const query = useQuery<ResponseItem<BankAccount | null>>({
    queryKey: [QueryKeys.BANK_ACCOUNT, workspaceId],
    queryFn: async () => {
      if (!workspaceId)
        throw new Error(
          t("errors.workspaceIdRequired", "Workspace ID is required"),
        );
      const { data } = await axios.get(API_URL.GET_BANK_ACCOUNT(workspaceId));
      return data;
    },
    enabled: !!workspaceId,
  });

  return {
    bankAccount: query.data?.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};

