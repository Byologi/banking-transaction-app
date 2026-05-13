import { useQuery } from "@tanstack/react-query";

import { getTransactions } from "../api/transactionsApi";

import type { TransactionFilters } from "../types/filter";

const useTransactions = (
  filters: TransactionFilters
) => {
  return useQuery({
    queryKey: ["transactions", filters],

    queryFn: () =>
      getTransactions(filters),

    staleTime: 1000 * 60 * 5,
  });
};

export default useTransactions;