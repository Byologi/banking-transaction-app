import type { Transaction } from "../types/transaction";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

interface Props {
  transaction: Transaction;
  onClick: (tx: Transaction) => void;
}

function TransactionCard({
  transaction,
  onClick,
}: Props) {
  return (
    <div
      onClick={() => onClick(transaction)}
      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-center">
        {/* Left */}
        <div>
          <h2 className="font-semibold text-gray-800">
            {transaction.narration}
          </h2>

          <p className="text-sm text-gray-500">
            {formatDate(transaction.date)}
          </p>

          <p className="text-xs text-gray-400">
            {transaction.channel} • {transaction.status}
          </p>
        </div>

        {/* Right */}
        <div
          className={`font-bold text-right ${
            transaction.type === "debit"
              ? "text-red-500"
              : "text-green-600"
          }`}
        >
          {transaction.type === "debit"
            ? "-"
            : "+"}
          {formatCurrency(
            transaction.amount,
            transaction.currency
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;