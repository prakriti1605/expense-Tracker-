import React from "react";
import { Receipt, Search, Edit2, Trash2 } from "lucide-react";

function TransactionList({
  expenses = [],
  onDelete,
  onEdit,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
}) {
  const categories = [
    "Food",
    "Shopping",
    "Entertainment",
    "Bills",
    "Healthcare",
    "Other",
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Food: "#10B981",
      Shopping: "#EC4899",
      Entertainment: "#8B5CF6",
      Bills: "#F59E0B",
      Healthcare: "#EF4444",
      Other: "#6B7280",
    };
    return colors[category] || colors.Other;
  };

  // 🔍 Filter logic
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      (expense.description || "")
        .toLowerCase()
        .includes((searchTerm || "").toLowerCase()) ||
      (expense.notes || "")
        .toLowerCase()
        .includes((searchTerm || "").toLowerCase());

    const matchesCategory =
      filterCategory === "All" || expense.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const totalAmount = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Transactions</h3>
          <p className="text-sm text-gray-500 mt-1">
            {filteredExpenses.length} total
          </p>
        </div>
        <div className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-bold">
          ₹{totalAmount.toFixed(2)}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions List */}
      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600 font-semibold">
              No transactions found
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Try different filters
            </p>
          </div>
        ) : (
          filteredExpenses.map((expense) => (
            <div
              key={expense._id}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 border-2 border-gray-100 rounded-xl transition-all group"
            >
              {/* Category Indicator */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{
                  backgroundColor:
                    getCategoryColor(expense.category) + "20",
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: getCategoryColor(expense.category),
                  }}
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h4 className="font-bold text-gray-900 truncate">
                    {expense.description}
                  </h4>
                  <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
                    ₹{Number(expense.amount).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="px-2.5 py-1 rounded-lg font-bold"
                    style={{
                      backgroundColor:
                        getCategoryColor(expense.category) + "15",
                      color: getCategoryColor(expense.category),
                    }}
                  >
                    {expense.category}
                  </span>

                  <span className="text-gray-400">•</span>

                  <span className="text-gray-500 font-medium">
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>

                  {expense.notes && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 font-medium truncate">
                        {expense.notes}
                      </span>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all mt-2">
                  <button
                    onClick={() => onEdit(expense)}
                    className="p-2.5 bg-indigo-500 text-white hover:bg-indigo-600 rounded-xl shadow-sm"
                  >
                    <Edit2 className="w-4 h-4" strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={() => onDelete(expense._id)}
                    className="p-2.5 bg-red-500 text-white hover:bg-red-600 rounded-xl shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionList;
