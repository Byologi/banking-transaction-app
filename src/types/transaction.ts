export type TransactionType = "debit" | "credit";

export type TransactionStatus =
  | "successful"
  | "pending"
  | "failed";

export interface Transaction {
  id: string;
  reference: string;
  type: TransactionType;
  amount: number;
  currency: string;
  narration: string;
  channel: string;
  counterpartyName: string;
  counterpartyAccount: string;
  status: TransactionStatus;
  date: string;
  balanceAfter: number;
}