import { useEffect, useState } from 'react';
import './App.css';

import Header from "./components/header.jsx";
import StatCard from "./components/StatCard.jsx";
import SpendingCharts from './components/SpendingCharts.jsx';
import CategoryChart from './components/CategoryChart.jsx';
import TransactionList from './components/TransactionList.jsx';
import Model from "./components/Model.jsx";


import {getExpenses,updateExpense,deleteExpense,createExpense} from "./axios.js"
import { DollarSign, ShoppingCart, TrendingUp, Wallet } from 'lucide-react';

function App() {

  const [expenses,setExpenses] = useState([]);
  const [isLoading,setLoading] = useState(false);
  const [isModelOpen,setModelOpen] = useState(false);
  const [editingExpense,setEditingExpense] = useState(null);
  const [searchTerm , setSearchTerm] = useState("")
  const [filterCategory,setFilterCategory] = useState("All"); 
  
  const calculationStats = (expenses) => {
    const total = expenses.reduce((sum,e) => sum + Number(e.amount || 0),0);
    console.log(expenses);

    const categoryTotals = expenses.reduce((acc,e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
      return acc;
    },{})

    return{
      total,
      count: expenses.length,
      avg: expenses.length > 0 ? total/expenses.length : 0,
      highest: expenses.length > 0 ? Math.max(...expenses.map((e) => Number(e.amount) || 0)) : 0,
      categoryTotals

    };
  };

  const stats = calculationStats(expenses)
//load initial data for cards
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        
        const [expData] = await Promise.all([getExpenses ()]);

        const normalized = (expData || []).map((e)=>({
          ...e,
          date: e?.date ? String(e.date).split("T")[0] : new Date().toISOString().split("T")[0], 

        }));

        setExpenses(normalized);

      } catch (error) {
        console.error("load error:",error)
      } finally{
        setLoading(false);
      }
    };
    load();
  }, []);

  //add delete edit expenses
  const handleAddExpense = async (payload) => {
    try {
      const created = await createExpense(payload);
      if(!created)
        throw new Error("Error in creating new expense");

      setExpenses((prev) => [{...created,date:created.date.split("T")[0]}, ...prev,])
      setModelOpen(false);

    } catch (error) {
      console.error("Creation error",error);
    }
  }

  const onEdit = (expense) => {
    setEditingExpense(expense);
    setModelOpen(true); 
  }

  // const handleSaveEdit = async (payload) => {
  //   if(!editingExpense) return

  //   try {
  //     const updated = await updateExpense(editingExpense._id,payload);

  //     setExpenses((prev) => prev.map((e) => 
  //     e._id === updated._id ?
  //     {...updated,date:updated.date.split("T")[0]} : e
  //     )
  //   )
  //   setEditingExpense(null);
  //   setModelOpen(false);

  //   } catch (error) {
  //     console.error("update error",error);
  //   }
  // }

//   const handleSaveEdit = async (payload) => {
//   if (!editingExpense) return;

//   try {
//     const response = await updateExpense(editingExpense._id, payload);
//     const updatedExpense = response.data; // <- this is the actual updated expense

//     setExpenses((prev) =>
//       prev.map((e) =>
//         e._id === updatedExpense._id
//           ? { ...updatedExpense, date: updatedExpense.date.split("T")[0] }
//           : e
//       )
//     );

//     setEditingExpense(null);
//     setModelOpen(false);
//   } catch (error) {
//     console.error("update error", error);
//   }
// };

  const handleSaveEdit = async (updatedData) => {
  try {
    // expense._id must be available from editingExpense state
    const res = await updateExpense(editingExpense._id,updatedData);
    
    // update state
    setExpenses(prev =>
      prev.map(exp => exp._id === editingExpense._id ? res : exp)
    );

    setModelOpen(false); // close modal
  } catch (err) {
    console.error(err); // show error
    alert("Failed to update expense");
  }
};


   const handleDelete = async (id) => {
    try{
      await deleteExpense(id); //backend delete
    
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense._id !== id)
    
    );
  }catch (error){
    console.error("delete error");
  }
  };

  const openAddExpenseModal = () => {
  setEditingExpense(null);   // important
  setModelOpen(true);
};

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-slate-100">
      
      <Header onAddExpense={openAddExpenseModal} />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
          value = {`$${stats.total.toFixed(2)}`} title = "Total spent"
          icon = {Wallet}
          subtitle = "This month"
          bgColor = "bg-gradient-to-br from-indigo-500 to-indigo-600" />

          <StatCard 
          value = {`${stats.count}`} title = "No. of Transactions"
          icon = {ShoppingCart}
          subtitle = "This month"
          bgColor = "bg-gradient-to-br from-indigo-500 to-indigo-600" />

          <StatCard 
          value = {`$${stats.avg.toFixed(2)}`} title = "Average"
          icon = {TrendingUp}
          subtitle = "This month"
          bgColor = "bg-gradient-to-br from-indigo-500 to-indigo-600" />

          <StatCard 
          value = {`$${stats.highest.toFixed(2)}`} title = "Highest transaction"
          icon = {DollarSign}
          subtitle = "This month"
          bgColor = "bg-gradient-to-br from-indigo-500 to-indigo-600" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Line Chart */}
          <div className="md:col-span-2">
            <SpendingCharts data={expenses} />
          </div>

          {/* Pie Chart */}
          <CategoryChart categoryTotal = {stats.categoryTotals}/>

        </div>
      </div>
        <TransactionList 
        expenses = {expenses}
        onDelete = {handleDelete}
        onEdit = {onEdit}
        searchTerm = {searchTerm}
        setSearchTerm = {setSearchTerm}
        filterCategory = {filterCategory}
        
        />
        <Model 
        isOpen =  {isModelOpen}
        onClose = {() => {
          setModelOpen(false);
          setEditingExpense(null);
        }}
        onSubmit = {editingExpense ? handleSaveEdit : handleAddExpense} initialData = {editingExpense}
        />
    </div>

  );
}

export default App;
