export interface TransactionFilters {
  type: "all" | "debit" | "credit";
  search: string;
  from: string;
  to: string;
  page: number;
}