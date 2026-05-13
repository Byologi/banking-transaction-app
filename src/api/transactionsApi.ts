import apiClient from "./client";
import type { Transaction } from "../types/transaction";
import type { TransactionFilters } from "../types/filter";

interface TransactionsResponse {
  status: string;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: Transaction[];
}



export const getTransactions = async (
  filters: TransactionFilters
): Promise<TransactionsResponse> => {
  const params: Record<string, string | number> = {
    page: filters.page,
  };

  if (filters.type !== "all") {
    params.type = filters.type;
  }

  if (filters.search) {
    params.search = filters.search;
  }

  if (filters.from) {
    params.from = filters.from;
  }

  if (filters.to) {
    params.to = filters.to;
  }

  const response = await apiClient.get(
    "/api/transactions",
    {
      params,
    }
  );

  return response.data;
};
