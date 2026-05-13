import useTransactionStore from "../store/transactionStore";
import useTransactions from "../hooks/useTransactions";

import TransactionCard from "../components/TransactionCard";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

import { useState } from "react";
import type { Transaction } from "../types/transaction";
import FilterBar from "../components/FilterBar";


function TransactionsPage() {
  const { filters } = useTransactionStore();

  const {
    data,
    isLoading,
    error,
  } = useTransactions(filters);

  const [selectedTx, setSelectedTx] =
    useState<Transaction | null>(null);

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="p-5 text-red-500">
        Failed to load transactions
      </div>
    );

  const transactions = data?.data || [];

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">
        Transaction History
      </h1>
      <FilterBar />

      {transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <TransactionCard
              key={tx.id}
              transaction={tx}
              onClick={(t) => setSelectedTx(t)}
            />
          ))}
        </div>
      )}

      {/* Simple Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
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