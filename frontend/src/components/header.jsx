// components/header.jsx
import React from 'react';

function Header({ onAddExpense }) {
  return (
    /* CHANGE: Swap out 'bg-white shadow-md rounded-xl p-6' for our class */
    <div className="glass-panel rounded-[24px] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full max-w-4xl">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Expense Tracker</h1>
        <p className="text-sm font-medium opacity-60 mt-1">Manage your finance with ease</p>
      </div>
      
      <button
        onClick={onAddExpense}
        className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-sm flex items-center gap-2"
      >
        <span className="text-lg font-normal">+</span> Add Expense
      </button>
    </div>
  );
}

export default Header;