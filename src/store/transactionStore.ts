import { create } from "zustand";
import  { type TransactionFilters } from "../types/filter";

interface TransactionStore {
  filters: TransactionFilters;

  setFilters: (
    filters: Partial<TransactionFilters>
  ) => void;

  resetFilters: () => void;
}

const initialFilters: TransactionFilters = {
  type: "all",
  search: "",
  from: "",
  to: "",
  page: 1,
};

const useTransactionStore =
  create<TransactionStore>((set) => ({
    filters: initialFilters,

    setFilters: (newFilters) =>
      set((state) => ({
        filters: {
          ...state.filters,
          ...newFilters,
        },
      })),

    resetFilters: () =>
      set({
        filters: initialFilters,
      }),
  }));

export default useTransactionStore;