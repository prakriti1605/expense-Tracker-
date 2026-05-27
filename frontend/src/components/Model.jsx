import { IndianRupee, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Model({ isOpen, onClose, onSubmit, initialData }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description || "");
      setAmount(initialData.amount || "");
      setDate(initialData.date || "");
      setCategory(initialData.category || "");
      setNotes(initialData.notes || "");
    } else {
      setDescription("");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]); // Default to today
      setCategory("");
      setNotes("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !category) return;

    const payload = {
      ...(initialData || {}),
      description,
      amount: parseFloat(amount) || 0,
      date,
      category,
      notes,
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Added 'glass-panel' for the premium look */}
      <div className="glass-panel w-full max-w-lg rounded-[32px] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              {initialData ? "Edit Expense" : "Add Expense"}
            </h2>
            <p className="text-sm font-medium opacity-50 mt-1">
              {initialData ? "Update your transaction details" : "Record a new spending"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold opacity-70 mb-2 uppercase tracking-wider">What did you buy?</label>
            <input
              type="text"
              placeholder="e.g., Weekly Groceries"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold opacity-70 mb-2 uppercase tracking-wider">Amount</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3.5 w-4 h-4 opacity-40" />
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold opacity-70 mb-2 uppercase tracking-wider">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold opacity-70 mb-2 uppercase tracking-wider">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50"
            >
              <option value="">Select category</option>
              {["Food", "Transportation", "Entertainment", "Shopping", "Bills", "Healthcare", "Lent money to friends", "Other"].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold opacity-70 mb-2 uppercase tracking-wider">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="2"
              placeholder="Optional details..."
              className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 font-bold hover:opacity-70 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-bold shadow-lg shadow-[#8B5CF6]/20 hover:scale-[102%] transition-transform"
            >
              {initialData ? "Save Changes" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}