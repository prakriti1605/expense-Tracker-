import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Header from "../components/header.jsx";
import StatCard from "../components/StatCard.jsx";
import SpendingCharts from '../components/SpendingCharts.jsx';
import CategoryChart from '../components/CategoryChart.jsx';
import TransactionList from '../components/TransactionList.jsx';
import Model from "../components/Model.jsx";

import { getExpenses, updateExpense, deleteExpense, createExpense } from "../axios.js";
import { IndianRupee, ShoppingCart, TrendingUp, Wallet, Sun, Moon } from 'lucide-react';

function Dashboard({setToken}) {
  const token = localStorage.getItem("token");
  console.log(token);
  const navigate = useNavigate();
  
  // 🌙 Gen-Z Theme State - default to dark mode for style
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };
  
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const bodyElement = document.body;
    if (darkMode) {
      bodyElement.classList.add("dark-mode-active");
    } else {
      bodyElement.classList.remove("dark-mode-active");
    }
  }, [darkMode]);


  const [expenses, setExpenses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isModelOpen, setModelOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All"); 
  
  const calculationStats = (expenses) => {
    const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const categoryTotals = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
      return acc;
    }, {});

    return {
      total,
      count: expenses.length,
      avg: expenses.length > 0 ? total / expenses.length : 0,
      highest: expenses.length > 0 ? Math.max(...expenses.map((e) => Number(e.amount) || 0)) : 0,
      categoryTotals
    };
  };

  const stats = calculationStats(expenses);

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      setLoading(true);
      try {
        const expData = await getExpenses();
        const normalized = (expData || []).map((e) => ({
          ...e,
          date: e?.date
            ? String(e.date).split("T")[0]
            : new Date().toISOString().split("T")[0],
        }));
        setExpenses(normalized);
      } catch (error) {
        console.error("load error:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const handleAddExpense = async (payload) => {
    try {
      const created = await createExpense(payload);
      if(!created) throw new Error("Error in creating new expense");
      setExpenses((prev) => [{ ...created, date: created.date.split("T")[0] }, ...prev]);
      setModelOpen(false);
    } catch (error) {
      console.error("Creation error", error);
    }
  };

  const onEdit = (expense) => {
    setEditingExpense(expense);
    setModelOpen(true); 
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const res = await updateExpense(editingExpense._id, updatedData);
      setExpenses(prev =>
        prev.map(exp => exp._id === editingExpense._id ? res : exp)
      );
      setModelOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update expense");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("delete error", error);
    }
  };

  const openAddExpenseModal = () => {
    setEditingExpense(null);
    setModelOpen(true);
  };

  // Inside Dashboard.jsx ...

return (
  <div className={darkMode ? "dark-mode-active" : ""}>
    {/* Dynamic Background Layout */}
    <div 
      className="min-h-screen transition-colors duration-300 py-4"
      style={{ backgroundColor: "var(--brand-bg)", color: "var(--brand-text)" }}
    >
      {/* Navigation Top Bar */}
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center mb-4">
        <Header onAddExpense={openAddExpenseModal} />

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            type="button"
            className="p-3 rounded-2xl glass-panel hover:scale-110 active:scale-95 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-[#22D3EE]" /> 
            ) : (
              <Moon className="w-5 h-5 text-[#8B5CF6]" />
            )}
          </button>

          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-rose-600 hover:to-red-500 text-white font-bold px-5 py-2.5 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content View Frame */}
      <div className="max-w-7xl mx-auto px-6 space-y-8 pb-12">
        {/* Stat Cards Grid Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            value={`₹${stats.total.toFixed(2)}`} 
            title="Total spent"
            icon={Wallet}
            subtitle="This month"
            bgColor="glass-panel"
            iconColor="bg-[#8B5CF6]/15 text-[#8B5CF6]" 
          />

          <StatCard 
            value={`${stats.count}`} 
            title="No. of Transactions"
            icon={ShoppingCart}
            subtitle="This month"
            bgColor="glass-panel"
            iconColor="bg-[#22D3EE]/15 text-[#22D3EE]" 
          />

          <StatCard 
            value={`₹${stats.avg.toFixed(2)}`} 
            title="Average"
            icon={TrendingUp}
            subtitle="This month"
            bgColor="glass-panel"
            iconColor="bg-[#EC4899]/15 text-[#EC4899]" 
          />

          <StatCard 
            value={`₹${stats.highest.toFixed(2)}`} 
            title="Highest transaction"
            icon={IndianRupee}
            subtitle="This month"
            bgColor="glass-panel"
            iconColor="bg-amber-500/15 text-amber-500" 
          />
        </div>

        {/* Charts & Table follow below exactly as you had them... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SpendingCharts expenses={expenses} />
          </div>
          <div>
            <CategoryChart categoryTotal={stats.categoryTotals} />
          </div>
        </div>

        <TransactionList 
          expenses={expenses}
          onDelete={handleDelete}
          onEdit={onEdit}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
      </div>

      <Model 
        isOpen={isModelOpen}
        onClose={() => {
          setModelOpen(false);
          setEditingExpense(null);
        }}
        onSubmit={editingExpense ? handleSaveEdit : handleAddExpense} 
        initialData={editingExpense}
      />
    </div>
  </div>
);
}

export default Dashboard;