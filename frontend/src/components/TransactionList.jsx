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
  const categories = ["Food", "Shopping", "Entertainment", "Bills", "Healthcare", "Other"];

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

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      (expense.description || "").toLowerCase().includes((searchTerm || "").toLowerCase()) ||
      (expense.notes || "").toLowerCase().includes((searchTerm || "").toLowerCase());
    const matchesCategory = filterCategory === "All" || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalAmount = filteredExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    // Replaced bg-white with glass-panel
    <div className="glass-panel rounded-[28px] p-6 shadow-xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-black tracking-tight">Transactions</h3>
          <p className="text-xs font-semibold opacity-50 mt-1">{filteredExpenses.length} total</p>
        </div>
        <div className="px-4 py-2 bg-[#8B5CF6] text-white rounded-2xl text-sm font-extrabold shadow-lg shadow-[#8B5CF6]/20">
          ₹{totalAmount.toFixed(2)}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-[14px] w-4 h-4 opacity-40" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-11 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl text-sm focus:outline-none focus:border-[#8B5CF6] transition-all placeholder:opacity-40"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl text-sm font-bold opacity-80 focus:outline-none cursor-pointer"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Transactions List */}
      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-16 opacity-40">
            <Receipt className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-bold">No transactions found</p>
          </div>
        ) : (
          filteredExpenses.map((expense) => (
            <div
              key={expense._id}
              className="flex items-center gap-4 p-4 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-black/5 dark:border-white/5 rounded-2xl transition-all group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: getCategoryColor(expense.category) + "15" }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getCategoryColor(expense.category) }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 mb-0.5">
                  <h4 className="font-bold truncate">{expense.description}</h4>
                  <span className="text-lg font-black tracking-tight">₹{Number(expense.amount).toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-bold opacity-60">
                  <span className="px-2 py-0.5 rounded-md" style={{ backgroundColor: getCategoryColor(expense.category) + "15", color: getCategoryColor(expense.category) }}>
                    {expense.category}
                  </span>
                  <span>•</span>
                  <span>{new Date(expense.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                </div>
              </div>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(expense)} className="p-2 bg-indigo-500/20 text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white rounded-xl transition">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(expense._id)} className="p-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionList;