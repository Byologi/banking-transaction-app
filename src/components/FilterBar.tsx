import useTransactionStore from "../store/transactionStore";
import { useEffect, useRef, useState } from "react";

function FilterBar() {
  const { filters, setFilters } =
    useTransactionStore();

  const [localSearch, setLocalSearch] =
    useState(filters.search);
  const isEditingSearchRef = useRef(false);

  const handleTypeChange = (
    type: "all" | "debit" | "credit"
  ) => {
    setFilters({ type, page: 1 });
  };

  const handleSearch = (value: string) => {
    isEditingSearchRef.current = true;
    setLocalSearch(value);
  };

  useEffect(() => {
    if (filters.search !== localSearch) {
      if (isEditingSearchRef.current) {
        return;
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalSearch(filters.search);
    }
  }, [filters.search, localSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ search: localSearch, page: 1 });
      isEditingSearchRef.current = false;
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, setFilters]);

  const handleDateChange = (
    key: "from" | "to",
    value: string
  ) => {
    setFilters({ [key]: value, page: 1 });
  };

  const validateDates = () => {
    if (!filters.from || !filters.to) return true;

    return (
      new Date(filters.from) <=
      new Date(filters.to)
    );
  };

  const isValid = validateDates();

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-5 space-y-4">
      {/* TYPE FILTER */}
      <div className="flex gap-3">
        <button
          onClick={() =>
            handleTypeChange("all")
          }
          className={`px-3 py-1 rounded ${
            filters.type === "all"
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() =>
            handleTypeChange("debit")
          }
          className={`px-3 py-1 rounded ${
            filters.type === "debit"
              ? "bg-red-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Debit
        </button>

        <button
          onClick={() =>
            handleTypeChange("credit")
          }
          className={`px-3 py-1 rounded ${
            filters.type === "credit"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Credit
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        value={localSearch}
        placeholder="Search narration..."
        onChange={(e) =>
          handleSearch(e.target.value)
        }
        className="w-full border p-2 rounded"
      />

      {/* DATE FILTERS */}
      <div className="flex gap-3">
        <input
          type="date"
          value={filters.from}
          onChange={(e) =>
            handleDateChange(
              "from",
              e.target.value
            )
          }
          className="border p-2 rounded w-full"
        />

        <input
          type="date"
          value={filters.to}
          onChange={(e) =>
            handleDateChange(
              "to",
              e.target.value
            )
          }
          className="border p-2 rounded w-full"
        />
      </div>

      {/* VALIDATION ERROR */}
      {!isValid && (
        <p className="text-red-500 text-sm">
          "From" date cannot be greater than "To"
          date
        </p>
      )}
    </div>
  );
}

export default FilterBar;