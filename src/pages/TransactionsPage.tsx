import useTransactionStore from "../store/transactionStore";

import useTransactions from "../hooks/useTransactions";

function TransactionsPage() {
  const { filters } =
    useTransactionStore();

  const {
    data,
    isLoading,
    error,
  } = useTransactions(filters);

  if (isLoading) {
    return (
      <div className="p-5">
        Loading transactions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 text-red-500">
        Failed to fetch transactions
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">
        Transaction History
      </h1>

      <div className="space-y-4">
        {data?.data.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white shadow rounded-xl p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">
                  {transaction.narration}
                </h2>

                <p className="text-sm text-gray-500">
                  {transaction.date}
                </p>
              </div>

              <div
                className={`font-bold ${
                  transaction.type === "debit"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {transaction.type === "debit"
                  ? "-"
                  : "+"}
                {transaction.currency}
                {transaction.amount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionsPage;