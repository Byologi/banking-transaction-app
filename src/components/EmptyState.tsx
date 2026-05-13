function EmptyState() {
  return (
    <div className="text-center py-20">
      <h2 className="text-xl font-semibold text-gray-600">
        No transactions found
      </h2>

      <p className="text-gray-400 mt-2">
        Try changing your filters
      </p>
    </div>
  );
}

export default EmptyState;