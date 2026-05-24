import { IndianRupee } from "lucide-react";
import React, { useEffect, useState } from "react";

// This is the component of edit/add expense form. 
//created a single, smart component that dynamically shapes itself based on what the parent component
export default function Model({ isOpen, onClose, onSubmit, initialData }) {
  // form field states
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
//Itni saari states isiliye banayi kyunki mujhse nested object nhi ban paa raha tha. this is beginner friendly. 
  
  // if initial data exists, fill the boxes, it means that this is edit mode.
  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description || "");
      setAmount(initialData.amount || "");
      setDate(initialData.date || "");
      setCategory(initialData.category || "");
      setNotes(initialData.notes || "");
    } else {
      // reset fields for adding new expense.
      // agar ye nhi likhenege toh voh humesha old values hi fetch karega.
      // if initial data is empty,clear the boxes
      setDescription("");
      setAmount("");
      setDate("");
      setCategory("");
      setNotes("");
    }
  }, [initialData]);//runs everytime initial data changes. -> conditional rendering

  if(!isOpen) return null; // iska mtlb agar user ne form ko open hi nhi kiya hai for adding/editing an expense, toh kuch bhi nhi karenge hum.

  const handleSubmit = () => {
  // simple validation
  if (!description || !amount || !category) return;

  const payload = {
    ...initialData,
    description,
    amount: parseFloat(amount) || 0,
    date,
    category,
    notes,
  };

  onSubmit(payload);  // ✅ only send data, no DOM elements
  onClose();

  // reset fields
  setDescription("");
  setAmount("");
  setDate("");
  setCategory("");
  setNotes("");
};


  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{initialData ? "Edit Expense" : "Add Expense"}</h2>
            <p className="text-sm text-gray-500 mt-1">Track your spending</p>
          </div>
          <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition">
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              What did you buy
            </label>
            <input
              type="text"
              placeholder="Enter description"
              value = {description}
              onChange = {(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Amount
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Category
            </label>
              <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select category</option>
              <option>Food</option>
              <option>Transportation</option>
              <option>Entertainment</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Healthcare</option>
              <option>Lent money to friends</option>
              <option>Other</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Notes
            </label>
            <textarea
            name = "notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            placeholder="Add additional details"
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
            onClick={handleSubmit}
              className="flex-1 py-3 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-900 transition"
            >
            {initialData ? "save changes" : "add expense"}
            </button>
            <button
              onClick={onClose}

              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
/* how is this code handling props of sending edited info as well as adding expense. 
...initialdata ka mtlb jo expense humne create kiya tha, usmein we added id and timestamp. TOh we need those fields before editing an expense, taake pata chale ki kaun sa expense edit karna hai 
But jab hum add ex pense kar rahe honge toh ...intialdata is null. and after this it calls savehandleexpense. 
*/