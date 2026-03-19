export interface BankAccount {
  id?: string;
  workspaceId: string;
  bankCode: string;
  bankBin: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrCodeUrl: string;
  termsAgreed: boolean;
}

export interface ResponseItem<T> {
  data: T;
  message: string;
}

