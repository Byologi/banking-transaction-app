import useTransactionStore from "../store/transactionStore";

function TransactionsPage() {
  const {
    filters,
    setFilters,
    resetFilters,
  } = useTransactionStore();

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">
        Transaction History
      </h1>

      <div className="flex gap-3 mb-5">
        <button
          onClick={() =>
            setFilters({ type: "debit" })
          }
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Debit
        </button>

        <button
          onClick={() =>
            setFilters({ type: "credit" })
          }
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Credit
        </button>

        <button
          onClick={() =>
            resetFilters()
          }
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p>
          Current Type Filter:
          <strong> {filters.type}</strong>
        </p>
      </div>
    </div>
  );
}

export default TransactionsPage;