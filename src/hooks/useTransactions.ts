import {
  useInfiniteQuery,
  type InfiniteData,
} from "@tanstack/react-query";

import { getTransactions } from "../api/transactionsApi";

import type { TransactionFilters } from "../types/filter";
import type { TransactionsResponse } from "../api/transactionsApi";

const useTransactions = (
  filters: TransactionFilters
) => {
  return useInfiniteQuery<
    TransactionsResponse,
    Error,
    InfiniteData<TransactionsResponse, number>,
    (string | TransactionFilters)[],
    number
  >({
    queryKey: ["transactions", filters],
    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getTransactions(filters, pageParam),

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined,

    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) =>
      previousData,
    refetchOnWindowFocus: false,
  });
};

export default useTransactions;