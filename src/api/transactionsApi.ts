import apiClient from "./client";
import type { Transaction } from "../types/transaction";
import type { TransactionFilters } from "../types/filter";

export interface TransactionsResponse {
  status: string;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: Transaction[];
}

const PAGE_SIZE = 6;



export const getTransactions = async (
  filters: TransactionFilters,
  page: number
): Promise<TransactionsResponse> => {
  const params: Record<string, string | number> = {};

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

  params._page = page;
  params._per_page = PAGE_SIZE;

  const response = await apiClient.get<
    Transaction[] | {
      data: Transaction[];
      items?: number;
      pages?: number;
    }
  >(
    "/transactions",
    { params }
  );

  const payload = response.data;
  const records = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
    ? payload.data
    : [];
  const totalRecords = Array.isArray(payload)
    ? Number(
        response.headers["x-total-count"] ||
          records.length
      )
    : typeof payload?.items === "number"
    ? payload.items
    : records.length;
  const totalPages = Array.isArray(payload)
    ? Math.max(
        1,
        Math.ceil(totalRecords / PAGE_SIZE)
      )
    : typeof payload?.pages === "number"
    ? payload.pages
    : Math.max(
        1,
        Math.ceil(totalRecords / PAGE_SIZE)
      );

  return {
    status: "success",
    page,
    limit: PAGE_SIZE,
    totalRecords,
    totalPages,
    data: records,
  };
};
