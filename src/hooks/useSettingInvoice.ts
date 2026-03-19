import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { API_URL, QueryKeys } from "@/constants";
import type { BankAccount } from "@/interfaces";

export type GenerateQRParams = {
  bankBin: string;
  accountNumber: string;
  accountName: string;
  amount?: number;
  description?: string;
  template?: "compact" | "compact2" | "qr_only";
};

export const generateVietQRUrl = (params: GenerateQRParams): string => {
  const {
    bankBin,
    accountNumber,
    accountName,
    amount,
    description,
    template = "compact2",
  } = params;

  if (!bankBin || !accountNumber || !accountName) return "";

  const baseUrl = "https://img.vietqr.io/image";
  const encodedAccountName = encodeURIComponent(accountName.trim());

  let url = `${baseUrl}/${bankBin}-${accountNumber}-${template}.png?accountName=${encodedAccountName}`;

  if (amount && amount > 0) url += `&amount=${amount}`;

  const trimmedDescription = description?.trim();
  if (trimmedDescription) url += `&addInfo=${encodeURIComponent(trimmedDescription)}`;

  return url;
};

export const useGetBankAccount = (workspaceId?: string) => {
  return useQuery<BankAccount | null>({
    queryKey: [QueryKeys.BANK_ACCOUNT, workspaceId],
    queryFn: async () => {
      if (!workspaceId) return null;
      const { data } = await axios.get(API_URL.GET_BANK_ACCOUNT(workspaceId));
      return (data?.data ?? null) as BankAccount | null;
    },
    enabled: !!workspaceId,
    staleTime: 1000 * 60 * 5,
  });
};

