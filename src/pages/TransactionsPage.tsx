import useTransactionStore from "../store/transactionStore";
import useTransactions from "../hooks/useTransactions";

import TransactionCard from "../components/TransactionCard";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import type { Transaction } from "../types/transaction";
import type { TransactionFilters } from "../types/filter";
import FilterBar from "../components/FilterBar";


function TransactionsPage() {
  const { filters, setFilters } =
    useTransactionStore();
  const [searchParams, setSearchParams] =
    useSearchParams();
  const didInitFromUrl = useRef(false);
  const lastSyncedParamsRef = useRef("");
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useTransactions(filters);

  const [selectedTx, setSelectedTx] =
    useState<Transaction | null>(null);
  const transactions = useMemo(() => {
    const pages = data?.pages ?? [];
    const merged: Transaction[] = [];
    const seen = new Set<string>();

    for (const page of pages) {
      for (const tx of page.data) {
        if (!seen.has(tx.id)) {
          merged.push(tx);
          seen.add(tx.id);
        }
      }
    }

    return merged;
  }, [data]);

  const filteredTransactions = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return transactions.filter((tx) => {
      if (
        filters.type !== "all" &&
        tx.type !== filters.type
      ) {
        return false;
      }

      if (search) {
        const narration =
          tx.narration.toLowerCase();

        if (!narration.includes(search)) {
          return false;
        }
      }

      if (filters.from) {
        if (new Date(tx.date) < new Date(filters.from)) {
          return false;
        }
      }

      if (filters.to) {
        if (new Date(tx.date) > new Date(filters.to)) {
          return false;
        }
      }

      return true;
    });
  }, [filters, transactions]);

  useEffect(() => {
    const paramsKey = searchParams.toString();

    if (!didInitFromUrl.current) {
      lastSyncedParamsRef.current = paramsKey;
    } else if (paramsKey === lastSyncedParamsRef.current) {
      return;
    }

    const typeParam = searchParams.get("type");
    const type: TransactionFilters["type"] =
      typeParam === "debit" ||
      typeParam === "credit"
        ? typeParam
        : "all";
    const nextFilters = {
      type,
      search: searchParams.get("search") || "",
      from: searchParams.get("from") || "",
      to: searchParams.get("to") || "",
      page: 1,
    };

    if (
      nextFilters.type !== filters.type ||
      nextFilters.search !== filters.search ||
      nextFilters.from !== filters.from ||
      nextFilters.to !== filters.to
    ) {
      setFilters(nextFilters);
    }

    didInitFromUrl.current = true;
  }, [filters, searchParams, setFilters]);

  useEffect(() => {
    if (!didInitFromUrl.current) return;

    const nextParams = new URLSearchParams();

    if (filters.type !== "all") {
      nextParams.set("type", filters.type);
    }
    if (filters.search) {
      nextParams.set("search", filters.search);
    }
    if (filters.from) {
      nextParams.set("from", filters.from);
    }
    if (filters.to) {
      nextParams.set("to", filters.to);
    }

    const nextParamsKey = nextParams.toString();

    if (nextParamsKey !== searchParams.toString()) {
      lastSyncedParamsRef.current = nextParamsKey;
      setSearchParams(nextParams, {
        replace: true,
      });
    }
  }, [filters, searchParams, setSearchParams]);

  if (isLoading && transactions.length === 0) {
    return <Loader />;
  }

  if (error)
    return (
      <div className="p-5 text-red-500">
        Failed to load transactions
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">
        Transaction History
      </h1>
      <FilterBar />

      {filteredTransactions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((tx) => (
            <TransactionCard
              key={tx.id}
              transaction={tx}
              onClick={(t) => setSelectedTx(t)}
            />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-black text-white px-5 py-2 rounded disabled:opacity-60"
          >
            {isFetchingNextPage
              ? "Loading..."
              : "Load More"}
          </button>
        </div>
      )}

      {/* Simple Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-100">
            <h2 className="text-lg font-bold mb-2">
              Transaction Details
            </h2>

            <p>
              <strong>Amount:</strong>{" "}
              {selectedTx.amount}
            </p>

            <p>
              <strong>Narration:</strong>{" "}
              {selectedTx.narration}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {selectedTx.date}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {selectedTx.type}
            </p>

            <button
              onClick={() =>
                setSelectedTx(null)
              }
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionsPage;